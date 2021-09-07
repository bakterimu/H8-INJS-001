const http = require('http')
const fs = require('fs') 
http.createServer((req, res) => {
  html = fs.readFileSync('./index.html', 'utf-8')
  res.writeHead(200,{
    'Content-Type': 'text/html'
  })
  res.write(html)
  res.end()
}).listen(8000)

console.log('Listening on port 8000')