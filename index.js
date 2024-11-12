const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/callback', (req, res) => {
  const code = req.query.code;
  
  // Send a more robust response that ensures the window.opener exists
  res.send(`
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        try {
          if (window.opener) {
            window.opener.postMessage({type: 'SPOTIFY_AUTH', code: '${code}'}, '*');
            window.close();
          } else {
            document.body.innerHTML = 'Please copy this code: ${code}';
          }
        } catch (e) {
          document.body.innerHTML = 'Error: ' + e.message;
        }
      </script>
      <p>Authentication successful! You can close this window.</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
});
