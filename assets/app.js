document.querySelectorAll('[data-icon]').forEach(element => element.setAttribute('data-lucide', element.dataset.icon));
lucide.createIcons({ attrs: { 'stroke-width': 1.65, 'aria-hidden': 'true' } });
const dialog = document.querySelector('#figure-dialog');
document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
  const img = document.querySelector('#dialog-image');
  img.src = button.dataset.zoom;
  img.alt = button.querySelector('img').alt;
  document.querySelector('#dialog-caption').textContent = button.parentElement.querySelector('figcaption').textContent;
  dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
document.querySelector('#copy-citation').addEventListener('click', async () => {
  const code = document.querySelector('#bibtex');
  try {
    await navigator.clipboard.writeText(code.textContent);
    document.querySelector('#copy-label').textContent = 'Copied';
    document.querySelector('#copy-status').textContent = 'BibTeX copied to clipboard.';
    setTimeout(() => { document.querySelector('#copy-label').textContent = 'Copy BibTeX'; }, 2200);
  } catch {
    const selection = window.getSelection();
    const selected = document.createRange(); selected.selectNodeContents(code); selection.removeAllRanges(); selection.addRange(selected);
    document.querySelector('#copy-status').textContent = 'Citation selected. Press Ctrl+C or Command+C to copy.';
  }
});
function updateProgress() {
  const height = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.reading-progress').style.width = `${height > 0 ? scrollY / height * 100 : 0}%`;
}
addEventListener('scroll', updateProgress, { passive: true });
updateProgress();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) document.querySelectorAll('.nav-sections a').forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
}), { rootMargin: '-15% 0px -60% 0px' });
document.querySelectorAll('#video,#method,#dataset,#results').forEach(section => observer.observe(section));
