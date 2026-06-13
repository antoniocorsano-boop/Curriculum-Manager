/**
 * NoticeBox component - alerts and informational messages
 * Vanilla JS, no dependencies
 */

function _esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function renderNoticeBox({ type = "neutral", title = "", content = "" }) {
  const typeClass = `notice ${type === "warn" ? "warn" : type === "danger" ? "danger" : ""}`;
  const titleHtml = title ? `<strong>${_esc(title)}:</strong> ` : "";
  return `
    <div class="${typeClass}">
      ${titleHtml}${content}
    </div>
  `;
}

function renderNoticeBoxRaw({ type = "neutral", html = "" }) {
  const typeClass = `notice ${type === "warn" ? "warn" : type === "danger" ? "danger" : ""}`;
  return `
    <div class="${typeClass}">
      ${html}
    </div>
  `;
}