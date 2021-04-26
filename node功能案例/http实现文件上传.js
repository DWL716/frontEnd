const http = require('http');
const fs = require('fs');
const qs = require('querystring');

const server = http.createServer((req, res) => {
  if (req.url === '/upload') {
    if (req.method === 'POST') {
      req.setEncoding('binary');

      let body = '';
      const totalBoundary = req.headers['content-type'].split(';')[1];
      const boundary = totalBoundary.split('=')[1];
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        console.log(body);
        // 处理body
        // 1.获取image/png的位置
        const payload = qs.parse(body, "\r\n", ": ");
        const type = payload["Content-Type"];

        // 2.开始在image/png的位置进行截取
        const typeIndex = body.indexOf(type);
        const typeLength = type.length;
        let imageData = body.substring(typeIndex + typeLength);
        console.log('imageData1', imageData);
        // 3.将中间的两个空格去掉
        imageData = imageData.replace(/^\s\s*/, '');
        console.log('imageData2', imageData);

        // 4.将最后的boundary去掉
        imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));

        fs.writeFile('./foo.txt', imageData, 'binary', (err) => {
          res.end("文件上传成功~");
        })
      })
    }
  }
});

server.listen(8000, () => {
  console.log("文件上传服务器开启成功~");
})


/* 
'\r\n\r\nåååååé¡ºä¸°å¥å°æ¹æ¶å°åé¡ºä¸°å¤§åçåå¥å°æ¹ç®æ³æ¶å°åçè¯´æ³åæ¶å°åå¥çåå¥åå¥å°æ¹é¿æ¶å°åå¥åï¼åé¡ºä¸°å¥çåå½æ¶åçç\r\nåååååé¡ºä¸°å¥å°æ¹æ¶å°åé¡ºä¸°å¤§åçåå¥å°æ¹ç®æ³æ¶å°åçè¯´æ³åæ¶å°åå¥çåå¥åå¥å°æ¹é¿æ¶å°åå¥åï¼åé¡ºä¸°å¥çåå½æ¶åçç\r\n\r\n----------------------------211550457351670575260400--\r\n'
'åååååé¡ºä¸°å¥å°æ¹æ¶å°åé¡ºä¸°å¤§åçåå¥å°æ¹ç®æ³æ¶å°åçè¯´æ³åæ¶å°åå¥çåå¥åå¥å°æ¹é¿æ¶å°åå¥åï¼åé¡ºä¸°å¥çåå½æ¶åçç\r\nåååååé¡ºä¸°å¥å°æ¹æ¶å°åé¡ºä¸°å¤§åçåå¥å°æ¹ç®æ³æ¶å°åçè¯´æ³åæ¶å°åå¥çåå¥åå¥å°æ¹é¿æ¶å°åå¥åï¼åé¡ºä¸°å¥çåå½æ¶åçç\r\n\r\n----------------------------211550457351670575260400--\r\n'

*/