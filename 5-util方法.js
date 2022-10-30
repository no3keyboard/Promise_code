/**
 * unil.promisify方法
 */
//引入util模块
const util = require('util');
//引入FS模块
const fs = require('fs');
//返回一个新的函数
let minReadFile = util.promisify(fs.readFile);

minReadFile('./resoure/content.txt').then(value => {
    console.log(value.toString());
},reason => {
    console.log(reason);
});