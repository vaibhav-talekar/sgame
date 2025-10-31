const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

const server = http.createServer((req, res) => {
  // Always serve index.html for root URL
  let filePath = req.url === "/" ? "/index.html" : req.url;
  const fullPath = path.join(publicDir, filePath);

  fs.readFile(fullPath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      // detect type
      const ext = path.extname(fullPath);
      const contentType =
        ext === ".html" ? "text/html" :
        ext === ".js"   ? "application/javascript" :
        ext === ".css"  ? "text/css" :
        "text/plain";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
