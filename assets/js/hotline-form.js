document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hotline-form');
  if (!form) return;
  const HOTLINE_URL = 'https://script.google.com/macros/s/AKfycbzgpzkZmtJkDE_Q1IYR1cIyI5cdijHKQ1oYrFVV7jH3oF3sXkdSWg_H6YDjyplXv4_8pw/exec';
  const sendBtn = form.querySelector('button[type="submit"]');
  const statusEl = document.getElementById('hotline-status');
  const showStatus = (msg, ok) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'hotline-status ' + (ok ? 'ok' : 'err');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const message = String(data.get('message') || '').trim();
    if (!message) { showStatus('Pesan belum diisi.', false); return; }
    const anon = !!data.get('anon');
    const body = new URLSearchParams({
      name: anon ? 'Anonim' : (String(data.get('name') || '').trim() || '-'),
      unit: String(data.get('unit') || '').trim() || '-',
      topic: String(data.get('topic') || 'Lainnya'),
      message: message,
      anon: anon ? 'Ya' : 'Tidak'
    });
    const oldText = sendBtn.textContent;
    sendBtn.disabled = true; sendBtn.textContent = 'Mengirim...';
    showStatus('', true);
    try {
      await fetch(HOTLINE_URL, { method: 'POST', mode: 'no-cors', body });
      form.reset();
      showStatus('Terkirim. Terima kasih, pesan Anda sudah diterima HRD.', true);
    } catch (err) {
      showStatus('Gagal mengirim. Periksa koneksi internet lalu coba lagi.', false);
    } finally {
      sendBtn.disabled = false; sendBtn.textContent = oldText;
    }
  });
});
