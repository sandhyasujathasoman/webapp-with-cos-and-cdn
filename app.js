const fs = require('fs');
const express = require('express');
const app = express();

app.get('*', (req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    const page = data.toString()
      .split('__CDN_URL__')
      .join(`http://poccdnbucket.s3-website-us-east-1.amazonaws.com`);
    res.setHeader('Content-Type', 'text/html');
    res.send(page);
  });
});

const port = process.env.PORT || 8080;
var cdnname= process.env.CDN_CNAME;
app.listen(port, function(){
    console.info(`cdn url from env:${cdnname}/`);
  console.info(`server listening on http://localhost:${port}/`);
});
