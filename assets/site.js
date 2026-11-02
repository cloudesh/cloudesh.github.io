(() => {
  'use strict';
  const button = document.getElementById('copy-repo');
  const field = document.getElementById('repo-url');
  const status = document.getElementById('copy-status');
  if (!button || !field || !status) return;

  button.hidden = false;
  button.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(field.value);
        copied = true;
      }
    } catch {
      // A blocked clipboard still leaves a selectable address and manual instructions.
    }
    if (!copied) {
      field.focus();
      field.select();
      field.setSelectionRange(0, field.value.length);
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
    }
    status.textContent = copied
      ? 'Copied! Paste it in Custom Plugin Repositories, then add and save.'
      : 'Address selected. Press Ctrl+C (⌘C on Mac), or touch and hold to copy.';
    if (copied) {
      button.textContent = 'Copied ✓';
      button.focus({ preventScroll: true });
    }
  });
})();
