function Promise(excutor){
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
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
    }
    function reject(data){
        //判断状态
        if(_this.PromiseState !== 'pending') return;
        //1.修改对象状态(promiseState)
        _this.PromiseState = 'rejected';
        //2.设置对象结果值(promiseResult)
        _this.PromiseResult = data;
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
Promise.prototype.then = function(onResolved,onRjected){

}