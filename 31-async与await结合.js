const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

//async与await实现
async function kunaa(){
    try {
        //读取文件内容
        let data1 = await mineReadFile('./resoure/1.html');
        let data2 = await mineReadFile('./resoure/2.html');
        let data3 = await mineReadFile('./resoure/3.html');
        console.log(data1 + data2 + data3);
    } catch (error) {
        console.log('error :>> ', error);
    }
}
kunaa();