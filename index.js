const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/callback', (req, res) => {
  const code = req.query.code;
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
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
        }
        .code {
          font-family: monospace;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <script>
        try {
          // Try to communicate with parent window
          window.opener.postMessage({
            type: 'SPOTIFY_AUTH',
            code: '${code}'
          }, '*');
          
          // Wait a moment before showing manual instructions
          setTimeout(() => {
            document.getElementById('manual-instructions').style.display = 'block';
          }, 1000);
        } catch (e) {
          console.error('Error:', e);
          document.getElementById('manual-instructions').style.display = 'block';
        }
      </script>
      
      <div id="manual-instructions" style="display: none;">
        <h3>Authentication Successful!</h3>
        <p>Please copy this URL and paste it back in the main window:</p>
        <div class="code-box">
          <code class="code">https://auth-handler-xfgq.onrender.com/callback?code=${code}</code>
        </div>
        <button onclick="navigator.clipboard.writeText('https://auth-handler-xfgq.onrender.com/callback?code=${code}')">
          Copy to Clipboard
        </button>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
});
