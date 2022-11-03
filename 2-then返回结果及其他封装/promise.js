class Promise {
    //构造函数
    constructor(excutor){
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
            setTimeout(() => {
                _this.callbacks.forEach(item => {
                    item.onResolved(data);
                });
            });
        }

        function reject(data){
            //判断状态
            if(_this.PromiseState !== 'pending') return;
            //1.修改对象状态(promiseState)
            _this.PromiseState = 'rejected';
            //2.设置对象结果值(promiseResult)
            _this.PromiseResult = data;
            //调用失败的函数回调
            setTimeout(() => {
                _this.callbacks.forEach(item => {
                    item.onRejected(data);
                });
            });
        }
        
        try {
            //同步调用执行器函数
            excutor(resolve,reject);
        } catch (error) {
            //修改promise对象状态为失败,即是调用reject并传参
            reject(error);
        }
    }

    //then方法
    then(onResolved,onRejected){
        const _this = this;
        //判断回调函数参数
        if(typeof onRejected !== 'function'){
            onRejected = reason => {
                throw reason;
            }
        }
        if(typeof onResolved !== 'function'){
            onResolved = value => value;
            //上面这句等于 value => {return value};
        }
        return new Promise((resolve, reject) => {
            //封装函数
            function callback(type){
                try {
                    //获取回调函数执行结果
                    let result = type(_this.PromiseResult);
                    //判断
                    if (result instanceof Promise) {
                        //如果是promise类型的对象
                        result.then(value => {
                            resolve(value);
                        },reason => {
                            reject(reason);
                        })
                    }else{
                        //结果设置为成功
                        resolve(result);
                    }
                }
                catch (error) {
                    reject(error);
                }
            }
            //调用回调函数 PromiseState
            if(this.PromiseState === 'fullfilled'){
                setTimeout(() => {
                    callback(onResolved); 
                });
            } 
            
            if(this.PromiseState === 'rejected'){
                setTimeout(() => {
                    callback(onRejected);
                });
            }

            //判断pending状态
            if(this.PromiseState === 'pending'){
                //保存回调函数
                this.callbacks.push({
                    onResolved:function(){
                        //执行成功的回调函数
                        callback(onResolved);
                    },
                    onRejected:function(){
                        //失败回调
                        callback(onRejected);
                    }
                });
            }
        });
    }

    //catch方法
    catch(onRejected){
        return this.then(undefined,onRejected);
    }

    //resolve方法
    static resolve(value){
        //返回promise对象
        return new Promise((resolve, reject) => {
            if(value instanceof Promise){
                value.then(value => {
                    resolve(value);
                },reason => {
                    reject(reason);
                })
            }else{
                //状态设置为成功
                resolve(value);
            }
        });
    }

    //reject方法
    static reject(reason){
        return new Promise((resolve, reject) => {
            reject(reason);
        })
    }
    
    //all方法
    static all(promises){
        //返回结果为promise对象
        return new Promise((resolve, reject) => {
            let cnt = 0;
            let arr = [];
            //遍历
            for(let i = 0;i < promises.length;i++){
                promises[i].then(value => {
                   //对象状态成功
                   //全部promise都成功才能执行resolve
                   cnt++;
                   //当前成功的promise成功结果存入数组
                   arr[i] = value;
                    if(cnt === promises.length){
                       //修改状态
                       resolve(arr);
                    }
                },reason => {
                   //失败就能直接调用
                   reject(reason);
                });
            }
        });
    }

    //race方法
    static race(promises){
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(value => {
                    //直接返回修改对象状态为成功
                    resolve(value);
                },reason => {
                    //同理修改为失败
                    reject(reason);
                })
            }
        })
    }
}