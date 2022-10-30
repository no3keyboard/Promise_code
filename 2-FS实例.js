//引入FS 
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
//回调函数
// fs.readFile('./resoure/content.txt',(err,data) => {
//     //出错则抛出错误
//     if(err)
//         throw err;
//     //输出文件内容
//     console.log(data.toString());
// });

//Promise 形式
let p = new Promise((resolve,reject) => {
    fs.readFile('./resoure/content.txt',(err,data) => {
        //出错
        if(err)
            reject(err);
        //成功
        resolve(data);
    })
});

//调用then
p.then(value => {
    console.log(value.toString());
},reason => {
    console.log(reason);
})
