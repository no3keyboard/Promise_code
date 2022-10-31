//构造函数声明
function Promise(excutor){
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存实例对象的this的值
    const _this = this;
    //函数声明，形参命名为data
    function resolve(data){
        //判断状态
        if(_this.PromiseState !== 'pending') return;
        //1.修改对象状态(promiseState)
        _this.PromiseState = 'fullfilled';
        //2.设置对象结果值(promiseResult)
        _this.PromiseResult = data;
        //调用成功的回调函数
        _this.callbacks.forEach(item => {
            item.onResolved(data);
        })
    }
    function reject(data){
        //判断状态
        if(_this.PromiseState !== 'pending') return;
        //1.修改对象状态(promiseState)
        _this.PromiseState = 'rejected';
        //2.设置对象结果值(promiseResult)
        _this.PromiseResult = data;
        //调用失败的函数回调
        _this.callbacks.forEach(item => {
            item.onRejected(data);
        })
    }
    try {
        //同步调用执行器函数
        excutor(resolve,reject);
    } catch (error) {
        //修改promise对象状态为失败,即是调用reject并传参
        reject(error);
    }
}

//添加then方法
Promise.prototype.then = function(onResolved,onRejected){
    //调用回调函数 PromiseState
    if(this.PromiseState === 'fullfilled'){
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState === 'rejected'){
        onRejected(this.PromiseResult);
    }
    //判断pending状态
    if(this.PromiseState === 'pending'){
        //保存回调函数
        this.callbacks.push({
            onResolved:onResolved,
            onRejected:onRejected
        });
    }
}