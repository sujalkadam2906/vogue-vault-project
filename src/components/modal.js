export function renderModal(title, content) {
  return `
    <div class="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal">
        <div class="modal-header">
          <h2 id="modal-title" class="modal-title">${title}</h2>
          <button class="modal-close-btn" type="button" aria-label="Close modal" onclick="this.closest('.modal-overlay').remove()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">${content}</div>
        <div class="modal-footer">
          <button type="button" class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
        </div>
      </div>
    </div>
  `;
}
