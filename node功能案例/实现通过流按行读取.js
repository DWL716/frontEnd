const fs = require('fs');
// 简单的思路
// 流的方式读取
const reader = fs.createReadStream("./txt/foo.txt", {
  start: 0,
  highWaterMark: 1
});

// 数据读取的过程
let str = []
reader.on("data", (data) => {
  // console.log(data);
  
  if (data.toString()=='\n') {
    let bufStr = Buffer.from(str)
    // console.log(bufStr);
    console.log(bufStr.toString());
    str=[]
  }else {
    str.push(data[0])
  }

  reader.pause();

  // setTimeout(() => {
    reader.resume();
  // }, 1000);
});

reader.on('open', () => {
  console.log("文件被打开");
})

reader.on('close', () => {
  let bufStr = Buffer.from(str)
  console.log(bufStr.toString());
  str=[]
  console.log("文件被关闭");
})
