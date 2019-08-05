const zimo = {
    obj: {},
    newObj: {},
    $on: function(key, fn) {
      if(this.obj[key] === undefined) {
        this.obj[key] = [];
      }
  
      this.obj[key].push(fn);
    },
    $one: function(key, fn) {
      if(this.newObj[key] === undefined) {
        this.newObj[key] = [];
      }
  
      this.newObj[key].push(fn);
    },
    $off: function(key) {
      this.obj[key] = [];
      this.newObj[key] = [];
    },
    $emit: function() {
      let key, args;
      if(arguments.length == 0) {
        return false;
      }
      key = arguments[0];
      args = [].concat(Array.prototype.slice.call(arguments, 1));
  
      if(this.obj[key] !== undefined
        && this.obj[key].length > 0) {
        for(let i in this.obj[key]) {
          this.obj[key][i].apply(null, args);
        }
      }
      if(this.newObj[key] !== undefined
        && this.newObj[key].length > 0) {
        for(let i in this.newObj[key]) {
          this.newObj[key][i].apply(null, args);
          this.newObj[key][i] = undefined;
        }
        this.newObj[key] = [];
      }
    }
  };
  
  export default zimo;
  // vue组件之间的通信  数据传递
  //   父 ->子：
  //       1、父级里面通过给子组件绑定属性的方式将数据传递给子组件
  //       2、在子组件中通过props接收父组件传递过来的数据
  //       父组件中通过v-bind进行绑定数据，=前面的属性名 是子组件中props接收的属性名
  //       父组件中= 后面的是当前父组件中的数据变量名
  //   总结：属性前加:,则传的是data中的数据，不加:，则传的是字符串

  //   子 ->父
  //       1、子组件里面发送数据，父组件接收数据
  //           子组件通过$emit()方法发送数据
  //           $emit()：接收两个参数，第一个是要发送数据的监听函数名，第二个参数是需要发送的数据
  //           父组件里面通过绑定$emit()中的第一个参数，也就是发送数据的监听函数名
  //           父组件中必须有接收数据的响应函数，并进行赋值给data里面的变量 再绑定到子组件的标签上

  //   同页面的兄弟组件
  //       1、子->父->子组件
  //       2、信息转换站
  //           eventBus:思想是从Java中得来的，
  //           发送数据用$emit() 参数不变 只负责发送数据
  //           接收数据用$on():接收两个参数，第一个是发送数据的监听函数名，第二个是接收一个回调函数作为参数
  //               回调函数里面进行数据的接收并赋值  只负责接收数据
        
  //       A组件将数据传递到B组件，需要在A组件中写$emit()方法发送数据 
  //       B组件必须在存在期(挂载中生命周期)之前的生命周期中调用$on()方法
        
  //           原因：浏览器从上到下解析页面结构，vue实例中 页面想要数据，模板中只会去data函数中找数据
  //                 B组件已经加载完成，但是数据还没有传递过来，所以接收不到数据

  //       接收数据的生命周期函数：created、beforeCreate、beforeMount

  //   不同页面的兄弟组件
  //       eventBus 信息转换站可以进行任何组件之间的通信 万能的
  //       A组件跳转到B组件， 旧组件等新组件挂在之前，新组件等旧组件销毁之前的生命周期及之后的生命周期
  //       页面销毁前可以发送数据 
  //           可以发送数据
  //           beforeDestroy、
  //           destroyed 
  //       页面挂载前可以接受数据
  //           可以接收数据 
  //           beforeCreate、
  //           created、
  //           beforeMount

  //       this.$emit() 发送数据
  //       this.$on()   接收数据
  //       this.$off()  解绑上下文  清除队列  函数防抖