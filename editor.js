const fields = [
  'eventTitle','honoreeName','date','time','locationName','address','mapsUrl','whatsappNumber','rsvpMessage','heroImage','message','galleryImages','dressCodeText','dressCodeColors'
];

async function loadInitial() {
  try {
    const r = await fetch('config.json', { cache: 'no-store' });
    const cfg = await r.json();
    fillForm(cfg);
  } catch (e) {
    console.warn('Não foi possível carregar config.json inicial. Você pode importar um arquivo.', e);
  }
}

function fillForm(cfg) {
  document.getElementById('eventTitle').value = cfg.eventTitle || '';
  document.getElementById('honoreeName').value = cfg.honoreeName || '';
  document.getElementById('date').value = cfg.date || '';
  document.getElementById('time').value = cfg.time || '';
  document.getElementById('locationName').value = cfg.locationName || '';
  document.getElementById('address').value = cfg.address || '';
  document.getElementById('mapsUrl').value = cfg.mapsUrl || '';
  document.getElementById('whatsappNumber').value = cfg.whatsappNumber || '';
  document.getElementById('rsvpMessage').value = cfg.rsvpMessage || '';
  document.getElementById('heroImage').value = cfg.heroImage || '';
  document.getElementById('message').value = cfg.message || '';
  document.getElementById('galleryImages').value = (cfg.galleryImages || []).join('\n');
  document.getElementById('dressCodeText').value = cfg.dressCodeText || '';
  document.getElementById('dressCodeColors').value = (cfg.dressCodeColors || []).join(', ');
}

function collect() {
  const cfg = {};
  cfg.eventTitle = document.getElementById('eventTitle').value.trim();
  cfg.honoreeName = document.getElementById('honoreeName').value.trim();
  cfg.date = document.getElementById('date').value.trim();
  cfg.time = document.getElementById('time').value.trim();
  cfg.locationName = document.getElementById('locationName').value.trim();
  cfg.address = document.getElementById('address').value.trim();
  cfg.mapsUrl = document.getElementById('mapsUrl').value.trim();
  cfg.whatsappNumber = document.getElementById('whatsappNumber').value.trim();
  cfg.rsvpMessage = document.getElementById('rsvpMessage').value.trim();
  cfg.heroImage = document.getElementById('heroImage').value.trim();
  cfg.message = document.getElementById('message').value;
  cfg.galleryImages = document.getElementById('galleryImages').value.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  cfg.dressCodeText = document.getElementById('dressCodeText').value;
  cfg.dressCodeColors = document.getElementById('dressCodeColors').value.split(',').map(s => s.trim()).filter(Boolean);
  return cfg;
}

function downloadJson(obj, filename) {
  const data = JSON.stringify(obj, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
  loadInitial();

  document.getElementById('downloadBtn').addEventListener('click', () => {
    const cfg = collect();
    downloadJson(cfg, 'config.json');
  });

  document.getElementById('uploadInput').addEventListener('change', async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const cfg = JSON.parse(text);
      fillForm(cfg);
    } catch (err) {
      alert('Arquivo inválido. Certifique-se que é um JSON válido.');
    }
  });
});


