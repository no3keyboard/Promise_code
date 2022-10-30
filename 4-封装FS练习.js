/*
    封装minReadFile读取文件内容
    参数:path 路径
    返回：promise对象
*/
function minReadFile(path){
    return new Promise((reslove,reject) => {
        //读取文件
        require('fs').readFile(path,(err,data) => {
            //判断
            if(err)//失败
                reject(err);
            //成功
            reslove(data);
        });
    });
}

minReadFile('./resoure/content.tx')
.then(value => {
    //输出文件内容
    console.log(value.toString());
},reason => {
    console.log(reason);
});