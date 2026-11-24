const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const mimeTypes={'.html':'text/html;charset=utf-8','.jpg':'image/jpg','.jpeg':'image/jpeg','.png':'image/png','.ico':'image/x-icon',}
const PUBLIC_DIR = path.join(__dirname,'public')
console.log(PUBLIC_DIR)
const server = http.createServer(async(request, response) => {
    const urlPath = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
    const filePath = path.resolve(PUBLIC_DIR,'.' + urlPath);
    try {
        await fs.access(filePath);
        const ext = path.extname(filePath).toLocaleLowerCase();
        const contentType=mimeTypes[ext]
        const content = await fs.readFile(filePath)
        response.writeHead(200, { 'Content-Type': contentType })
        response.end(content)
    } catch {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        response.end('Ты ошибся. Тут ничего нет');
    }
    
});
server.listen(3000, () => {
    console.log('Сервер запущен')
});

