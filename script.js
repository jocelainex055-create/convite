async function loadConfig() {
  try {
    const response = await fetch('config.json', { cache: 'no-store' });
    const config = await response.json();
    return config;
  } catch (err) {
    console.error('Falha ao carregar config.json', err);
    return null;
  }
}

function formatDateTime(dateStr, timeStr) {
  try {
    const date = new Date(`${dateStr}T${timeStr || '00:00'}`);
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
    const datePart = isNaN(date.getTime()) ? dateStr : fmt.format(date);
    const timePart = timeStr ? ` às ${timeStr}` : '';
    return `${datePart}${timePart}`;
  } catch {
    return `${dateStr} ${timeStr || ''}`.trim();
  }
}

function buildWhatsAppLink(number, message) {
  const clean = (number || '').replace(/[^0-9]/g, '');
  const text = encodeURIComponent(message || 'Olá, gostaria de confirmar presença.');
  return `https://wa.me/${clean}?text=${text}`;
}

function render(config) {
  const heroImage = document.getElementById('heroImage');
  const eventTitle = document.getElementById('eventTitle');
  const honoreeName = document.getElementById('honoreeName');
  const eventDateTime = document.getElementById('eventDateTime');
  const eventLocation = document.getElementById('eventLocation');
  const rsvpButton = document.getElementById('rsvpButton');
  const routeButton = document.getElementById('routeButton');
  const eventMessage = document.getElementById('eventMessage');
  const gallery = document.getElementById('gallery');
  const dressCodeText = document.getElementById('dressCodeText');
  const palette = document.getElementById('dressCodePalette');

  heroImage.src = config.heroImage || 'assets/hero.jpg';
  eventTitle.textContent = config.eventTitle || 'Minha Celebração';
  honoreeName.textContent = config.honoreeName || '';
  eventDateTime.textContent = formatDateTime(config.date || '', config.time || '');
  eventLocation.textContent = [config.locationName, config.address].filter(Boolean).join(' • ');

  const defaultMessage = `Olá! Quero confirmar presença para o evento ${config.eventTitle || ''} de ${config.honoreeName || ''}.`;
  rsvpButton.href = buildWhatsAppLink(config.whatsappNumber || '', config.rsvpMessage || defaultMessage);
  routeButton.href = config.mapsUrl || '#';

  eventMessage.textContent = config.message || 'Estamos muito felizes em compartilhar este momento especial com você!';

  gallery.innerHTML = '';
  (config.galleryImages || []).forEach(src => {
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = 'Foto da galeria';
    gallery.appendChild(img);
  });

  dressCodeText.textContent = config.dressCodeText || 'Venha com cores claras e tons pastel.';
  palette.innerHTML = '';
  (config.dressCodeColors || ['#c7e3ff', '#ffe3a3', '#e3c7ff', '#ffffff', '#ffc7a3', '#c7ffd6', '#ddff7c']).forEach(c => {
    const sw = document.createElement('div');
    sw.className = 'swatch';
    sw.style.background = c;
    palette.appendChild(sw);
  });
}

function setupModal() {
  const modal = document.getElementById('dressCodeModal');
  const open = document.getElementById('dressCodeOpen');
  const close = document.getElementById('dressCodeClose');
  open.addEventListener('click', () => modal.showModal());
  close.addEventListener('click', () => modal.close());
}

document.addEventListener('DOMContentLoaded', async () => {
  setupModal();
  const config = await loadConfig();
  if (config) render(config);
});


