const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const baseDir = __dirname;
const cases = [
  {
    file: "Report_complessivo_del_curricolo_istituto.docx",
    title: "Report complessivo del curricolo d’istituto",
  },
  {
    file: "Documento_prodotto_dal_gruppo_di_lavoro.docx",
    title: "Documento prodotto dal gruppo di lavoro",
  },
  {
    file: "Documento_finale_di_dipartimento.docx",
    title: "Documento finale di dipartimento",
  },
  {
    file: "Documento_approvato_validato.docx",
    title: "Documento approvato / validato",
  },
];

function u16(bytes, offset) {
  return bytes[offset] | (bytes[offset + 1] << 8);
}

function u32(bytes, offset) {
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  ) >>> 0;
}

function findEocd(bytes) {
  for (let i = bytes.length - 22; i >= 0 && i >= bytes.length - 65557; i--) {
    if (u32(bytes, i) === 0x06054b50) return i;
  }
  throw new Error("EOCD non trovato");
}

function readZip(filePath) {
  const bytes = fs.readFileSync(filePath);
  const eocd = findEocd(bytes);
  const entryCount = u16(bytes, eocd + 10);
  const centralSize = u32(bytes, eocd + 12);
  const centralOffset = u32(bytes, eocd + 16);
  if (centralOffset + centralSize > eocd) throw new Error("Central directory fuori posizione");
  const entries = new Map();
  let cursor = centralOffset;
  for (let i = 0; i < entryCount; i++) {
    if (u32(bytes, cursor) !== 0x02014b50) throw new Error("Central directory entry non valida");
    const flags = u16(bytes, cursor + 8);
    const method = u16(bytes, cursor + 10);
    const crc = u32(bytes, cursor + 16);
    const compressedSize = u32(bytes, cursor + 20);
    const uncompressedSize = u32(bytes, cursor + 24);
    const nameLength = u16(bytes, cursor + 28);
    const extraLength = u16(bytes, cursor + 30);
    const commentLength = u16(bytes, cursor + 32);
    const localOffset = u32(bytes, cursor + 42);
    const name = Buffer.from(bytes.subarray(cursor + 46, cursor + 46 + nameLength)).toString("utf8");
    if (name.includes("\\") || name.includes("..") || name.startsWith("/")) {
      throw new Error(`Nome entry non stabile: ${name}`);
    }
    if ((flags & 0x0008) !== 0) throw new Error(`Data descriptor non ammesso: ${name}`);
    if (method !== 0 && method !== 8) throw new Error(`Metodo ZIP non supportato ${method}: ${name}`);
    if (u32(bytes, localOffset) !== 0x04034b50) throw new Error(`Local file header mancante: ${name}`);
    const localNameLength = u16(bytes, localOffset + 26);
    const localExtraLength = u16(bytes, localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const raw = bytes.subarray(dataStart, dataStart + compressedSize);
    const data = method === 8 ? zlib.inflateRawSync(raw) : Buffer.from(raw);
    if (data.length !== uncompressedSize) throw new Error(`Dimensione incoerente: ${name}`);
    entries.set(name, { data, flags, method, crc, compressedSize, uncompressedSize, localOffset });
    cursor += 46 + nameLength + extraLength + commentLength;
  }
  return { entries, eocd, centralOffset, centralSize, entryCount };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function validateDocx(item) {
  const filePath = path.join(baseDir, item.file);
  assert(fs.existsSync(filePath), `File mancante: ${item.file}`);
  const zip = readZip(filePath);
  const required = [
    "[Content_Types].xml",
    "_rels/.rels",
    "word/document.xml",
    "word/styles.xml",
    "docProps/core.xml",
    "docProps/app.xml",
  ];
  for (const name of required) assert(zip.entries.has(name), `Entry OPC mancante in ${item.file}: ${name}`);

  const rels = zip.entries.get("_rels/.rels").data.toString("utf8");
  const docRels = zip.entries.get("word/_rels/document.xml.rels")?.data.toString("utf8") || "";
  const documentXml = zip.entries.get("word/document.xml").data.toString("utf8");
  const stylesXml = zip.entries.get("word/styles.xml").data.toString("utf8");

  assert(/Target="word\/document\.xml"/.test(rels), `_rels/.rels non punta a word/document.xml: ${item.file}`);
  assert(/Target="styles\.xml"/.test(docRels), `styles.xml non relazionato: ${item.file}`);
  assert(!/headerReference|footerReference|header1\.xml|footer1\.xml/.test(documentXml + docRels), `Header/footer reali non canonici presenti: ${item.file}`);
  assert(/<w:document[\s>]/.test(documentXml), `w:document mancante: ${item.file}`);
  assert(/<w:body[\s>]/.test(documentXml), `w:body mancante: ${item.file}`);
  assert(/<w:p[\s>]/.test(documentXml), `w:p mancante: ${item.file}`);
  assert(/<w:r[\s>]/.test(documentXml), `w:r mancante: ${item.file}`);
  assert(/<w:t[\s>]/.test(documentXml), `w:t mancante: ${item.file}`);
  assert(/<w:sectPr[\s>]/.test(documentXml), `w:sectPr finale mancante: ${item.file}`);
  assert(/<w:pgSz w:w="11906" w:h="16838"\/>/.test(documentXml), `Formato A4 portrait non rilevato: ${item.file}`);
  assert(!/<!doctype|<html|<head|<style|<\/style>|:root\{|@media|class=|CSS/i.test(documentXml), `HTML/CSS visibile in document.xml: ${item.file}`);
  assert(!/undefined|null|\[object Object\]/.test(documentXml), `Token tecnico in document.xml: ${item.file}`);
  assert(!documentXml.includes("Documento curricolo"), `Titolo generico residuo: ${item.file}`);
  assert(documentXml.includes(item.title), `Titolo reale mancante: ${item.title}`);
  assert(documentXml.includes("Referente") && documentXml.includes("Dirigente"), `Firme mancanti: ${item.file}`);
  assert(documentXml.includes("1. Inquadramento") && documentXml.includes("6. Validazione"), `Sezioni numerate mancanti: ${item.file}`);

  const tableCount = countMatches(documentXml, /<w:tbl>/g);
  assert(tableCount >= 1, `Nessuna tabella in ${item.file}`);
  assert(tableCount === countMatches(documentXml, /<w:tblPr>/g), `tblPr non presente per ogni tabella: ${item.file}`);
  assert(tableCount === countMatches(documentXml, /<w:tblGrid>/g), `tblGrid non presente per ogni tabella: ${item.file}`);
  const gridWidths = [...documentXml.matchAll(/<w:gridCol w:w="(\d+)"\/>/g)].map((m) => Number(m[1]));
  assert(gridWidths.length >= tableCount, `gridCol insufficienti: ${item.file}`);
  assert(gridWidths.every((width) => width > 0), `gridCol a larghezza zero: ${item.file}`);
  const cells = [...documentXml.matchAll(/<w:tc>([\s\S]*?)<\/w:tc>/g)].map((m) => m[1]);
  assert(cells.length > 0, `Celle mancanti: ${item.file}`);
  assert(cells.every((cell) => /<w:tcPr>/.test(cell) && /<w:p[\s>]/.test(cell)), `Celle senza tcPr o p: ${item.file}`);

  for (const style of ["Title", "Heading1", "Heading2", "Footer", "TableText", "TableHeader"]) {
    assert(stylesXml.includes(`w:styleId="${style}"`), `Stile ${style} non definito: ${item.file}`);
  }

  return {
    file: item.file,
    entries: zip.entryCount,
    tables: tableCount,
    cells: cells.length,
    centralDirectory: true,
    eocd: true,
  };
}

const results = cases.map(validateDocx);
console.log(JSON.stringify({ verdict: "MGR028A_VALIDATION_OK", results }, null, 2));
