// script.js
async function injectPartials() {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async (el) => {
    const file = el.getAttribute('data-include');
    const res = await fetch(file, { cache: 'no-cache' });
    el.innerHTML = await res.text();
  }));
  wireNav(); // set up event listeners after injection
}

function wireNav() {
  const menu = document.querySelector('#hamburger-nav .menu-links');
  const icon = document.querySelector('#hamburger-nav .hamburger-icon');
  if (!menu || !icon) return;

  const toggle = () => {
    const open = menu.classList.toggle('open');
    icon.classList.toggle('open', open);
    icon.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  icon.addEventListener('click', toggle);
  // Close menu when a link is clicked
  document.querySelectorAll('#hamburger-nav .menu-links a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      icon.classList.remove('open');
      icon.setAttribute('aria-expanded', 'false');
    });
  });
}

document.addEventListener('DOMContentLoaded', injectPartials);
