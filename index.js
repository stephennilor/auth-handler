const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Original Spotify callback endpoint
app.get('/callback', (req, res) => {
  const code = req.query.code;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Spotify Authentication</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
          background: #f5f5f5;
        }
        .code-box {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border: 1px solid #ddd;
          word-break: break-all;
        }
        .copy-button {
          background: #1DB954;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .copy-button:hover {
          background: #1ed760;
        }
      </style>
    </head>
    <body>
      <h2>Authentication Successful! ✅</h2>
      <p>Please copy this URL and paste it back in the main window:</p>
      <div class="code-box" id="codeUrl">
        https://auth-handler-xfgq.onrender.com/callback?code=${code}
      </div>
      <button class="copy-button" onclick="copyToClipboard()">
        Copy to Clipboard
      </button>

      <script>
        function copyToClipboard() {
          const url = document.getElementById('codeUrl').innerText;
          navigator.clipboard.writeText(url).then(() => {
            const button = document.querySelector('.copy-button');
            button.textContent = 'Copied!';
            setTimeout(() => {
              button.textContent = 'Copy to Clipboard';
            }, 2000);
          });
        }

        try {
          if (window.opener) {
            window.opener.postMessage({
              type: 'SPOTIFY_AUTH',
              code: '${code}'
            }, '*');
          }
        } catch (e) {
          console.error('Error posting message:', e);
        }
      </script>
    </body>
    </html>
  `);
});

// New Google OAuth callback endpoint
app.get('/google-callback', (req, res) => {
  const code = req.query.code;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Google Authentication</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
          background: #f5f5f5;
        }
        .code-box {
          background: white;
          padding: 15px;
          border-radius: 8px;
          margin: 20px 0;
          border: 1px solid #ddd;
          word-break: break-all;
        }
        .copy-button {
          background: #4285f4;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
        }
        .copy-button:hover {
          background: #5294ff;
        }
      </style>
    </head>
    <body>
      <h2>Authentication Successful! ✅</h2>
      <p>Please copy this URL and paste it back in the main window:</p>
      <div class="code-box" id="codeUrl">
        https://auth-handler-xfgq.onrender.com/google-callback?code=${code}
      </div>
      <button class="copy-button" onclick="copyToClipboard()">
        Copy to Clipboard
      </button>

      <script>
        function copyToClipboard() {
          const url = document.getElementById('codeUrl').innerText;
          navigator.clipboard.writeText(url).then(() => {
            const button = document.querySelector('.copy-button');
            button.textContent = 'Copied!';
            setTimeout(() => {
              button.textContent = 'Copy to Clipboard';
            }, 2000);
          });
        }

        try {
          if (window.opener) {
            window.opener.postMessage({
              type: 'GOOGLE_AUTH',
              code: '${code}'
            }, '*');
            setTimeout(() => window.close(), 1000);
          }
        } catch (e) {
          console.error('Error posting message:', e);
        }
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
});
