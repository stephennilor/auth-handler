const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/callback', (req, res) => {
  const code = req.query.code;
  
  res.send(`
    <script>
      if (window.opener) {
        window.opener.postMessage({ code: '${code}' }, '*');
        window.close();
      }
    </script>
  `);
});

app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
});
