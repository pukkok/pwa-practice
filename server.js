const http = require('node:http')
const fs =require('node:fs')

const server = http.createServer((req, res) => {
  if(req.method === "GET") {
    
    if(req.url === '/') {
      fs.readFile('./public/index.html', "utf-8", (err, data) => {
        if(err) throw err
        res.writeHead(200, {"content-type" : "text/html; charset=utf-8"})
        res.end(data)
      })
    }
    if(req.url === '/index.js') {
      fs.readFile('./public/index.js', "utf-8", (err, data) => {
        if(err) throw err
        res.writeHead(200, {"content-type" : "application/javascript"})
        res.end(data)
      })
    }
  }

  if(req.method === "POST") {
    if(req.url === '/click') {
      console.log('사용자가 클릭 눌렀어')
      let minstone = ""
      req.on('data', (data) => {
        let decodedData = decodeURI(data.toString().replace(/\+/g, " "))
        minstone += decodedData
      })
      req.on('end', () => {
        console.log(minstone)
        console.log('요청 종료')
      })
      res.end()
    }
  }
})

server.listen(3000, (err) => {
  if(err) throw err
  console.log("http://localhost:3000")
})