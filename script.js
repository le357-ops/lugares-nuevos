// Menú móvil
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

// Modo oscuro
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
function applyStoredTheme(){
  const saved = localStorage.getItem('theme');
  if(saved === 'dark'){ body.classList.add('dark'); }
}
applyStoredTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    themeToggle.textContent = body.classList.contains('dark') ? 'Modo claro' : 'Modo oscuro';
  });
  // estado inicial del texto
  themeToggle.textContent = body.classList.contains('dark') ? 'Modo claro' : 'Modo oscuro';
}

// Realce de enlace activo (por URL)
document.querySelectorAll('.site-nav a').forEach(a=>{
  if (a.href && a.href.split('#')[0] === window.location.href.split('#')[0]) {
    a.classList.add('active');
  }
});

// Concept map: click en nodos para hacer scroll a detalle
document.querySelectorAll('.concept-node').forEach(node=>{
  node.addEventListener('click', ()=>{
    const id = node.getAttribute('data-link');
    const target = id ? document.querySelector(id) : null;
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

// Catálogo: búsqueda y filtro
const search = document.getElementById('citySearch');
const filter = document.getElementById('continentFilter');
const cards = document.querySelectorAll('.city-card');

function updateCatalog(){
  const q = (search?.value || '').toLowerCase();
  const f = filter?.value || '';
  cards.forEach(card=>{
    const name = card.getAttribute('data-city')?.toLowerCase() || '';
    const cont = card.getAttribute('data-continent') || '';
    const matchesText = name.includes(q);
    const matchesCont = !f || cont === f;
    card.style.display = (matchesText && matchesCont) ? '' : 'none';
  });
}

if (search) search.addEventListener('input', updateCatalog);
if (filter) filter.addEventListener('change', updateCatalog);

// Modal de imágenes
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.zoomable').forEach(img=>{
  img.addEventListener('click', ()=>{
    if (!modal || !modalImg || !modalCaption) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalCaption.textContent = img.closest('.city-card')?.querySelector('.city-info h3')?.textContent || img.alt || '';
  });
});

if (modalClose) {
  modalClose.addEventListener('click', ()=>{
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  });
}
if (modal) {
  modal.addEventListener('click', (e)=>{
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    }
  });
}

// Formulario de contacto (demo)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    status.textContent = `Gracias, ${data.name}. Te contactaremos pronto sobre "${data.topic}".`;
    form.reset();
  });
}
