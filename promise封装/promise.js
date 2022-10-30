function Promise(excutor){
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //保存实例对象的this的值
    const _this = this;
    //函数声明，形参命名为data
    function resolve(data){
        //1.修改对象状态(promiseState)
        _this.PromiseState = 'fullfilled';
        //2.设置对象结果值(promiseResult)
        _this.PromiseResult = data;
    }
    function reject(data){
        //1.修改对象状态(promiseState)
        _this.PromiseState = 'rejected';
        //2.设置对象结果值(promiseResult)
        _this.PromiseResult = data;
    }
    //同步调用执行器函数
    excutor(resolve,reject);
}

//添加then方法
Promise.prototype.then = function(onResolved,onRjected){

}