let a = 3;
let b = 4;
tagTemplate`Hello ${a + b} World ${a * b}`

function tagTemplate(strs, a, b) {
  Number.parseInt("1");
  var t = {};
  t.age = 13;
  t['time'] = 23;//新增属性的另一种方式,也是变量值访问的方式['属性名']
  t.run = function () {

  };
  delete t.age //删自定义属性
  delete t['age'] //删自定义属性另一种方式
  if('age' in t){ //检查属性是否在t中

  }

  if(t.hasOwnProperty('age'))//

  for (var i in t) {
    // for in 遍历对象 i表示属性名，如果遍历数组，i表示索引
    console.log(i); // 打印属性名字
    if(typeof(t[i]) === "number"){
      console.log(t[i])//打印属性的值
    }
  }

  //数组操作
  var array = [1,2,3,4,5];
  var ar1 = ['a','b'];
  array.pop();//尾部出栈,返回新长度
  array.push(6);//尾部入栈
  array.push(...ar1);//入栈整个数组ar1到尾部，而不是 array.push(ar1) --> Array[2]
  array.shift();//头部出栈
  array.unshift(0);//头部入栈
  array.sort();//默认按照字符串排序
  array.sort((a,b) => a - b);//a - b 递增, b - a 递减
  array.join('-');//数组元素连接成字符串，默认是,分割
  array.concat(...ar1);//对原数组没有影响,...加与否都ok
  //切数组,不影响原数组
  array.slice(2,4);// 起点和结束位置截取  [3,4,5] 整数从0开始
  array.slice(-3,-1);//[3,4,5] 负数从-1开始,从后面往前截取
  //拼接原数组,影响原数组 -- 删除或者添加元素来更改数组
  array.splice(1,0,'6');//在1的位置插入'6' [1,'6',2,3,4,5]
  array.splice(1,1,'a')//删出1位置的'6'，用'a'代替 [1,'a',2,3,4,5]
  array.splice(1,1)//删出1位置的'6', [1,2,3,4,5]

  var str = "i'm dog";
  str.split()

  eval('console.log(9 * 9)');//将传入的字符串当做js执行
  array.map((item) => {
    return item * 2;
  });
  //js中没有块级作用域，只有函数作用域和全局作用域
  //闭包是引用了自由变量的函数
  function foo(x) {
    var tmp = 3;
    return function (y) {
      console.log(x + y + tmp);
    }
  }

  var bar = foo(1);//bar是闭包，匿名内携带了外部作用域的变量存在
  bar(2);//全局变量指向匿名函数

  ;(function (a) {
    console.log(a);//a = 3
  }(3));//匿名自执行函数 模拟块级作用域，防止污染全局变量
 //另一种用法
  for(var i = 0; i < 10; i++){

    //输出的值全是10，因为var i是全局变量
    // setTimeout(() => {
    //   console.log(i);
    // },1000);

    //用匿名自执行函数创建i的副本inner
    (function (inner) {
      setTimeout(() => {
        console.log(inner);
      },1000);
    })(i);
  }

  //原型构建对象
  function Cat() {

  }
  Cat.prototype.run = function () {
    console.log("running");
  }
  Cat.prototype.name = "Cat";
  Cat.prototype.age = 1;
  //属性全部是共享的
  var ca1 = new Cat();
  var ca2 = new Cat();
  //ca1.name === ca2.name
  ca1.name = "Cat1";//此时 ca2.name 还是等于 Cat，设置属性没有就添加自己私有的，读取时自己没有读取prototype的
  Object.freeze(Cat)//冻结 不能更改？

  //原型继承模式
  function Animal(name,age) {
    this.age = age;
    this.name = name;
    this.foods = ['A','B'];
  }


  //父类animal原型上创建一个run方法
  Animal.prototype.run = function () {
    console.log("running");
  }
  //定义子类
  function Dog(name, age) {
    // Animal(name,age)  此时animal调用者是window对象,当成了函数执行模式
    //继承父类的构造函数的属性
    Animal.call(this, name, age);//借用父类的构造函数,给子类创建实例属性,就是 age和name
  }

  //继承父类原型中的方法
  var dog = new Animal();//组合原型继承模式
  Dog.prototype.constructor = Dog;//重置构造函数的指向

  //原型式继承 -- 借用对象构建另外一个对象，而不用构造函数
  function object(o) { //o是借用的对象
    function F() {}
    F.prototype = 0;
    return new F();
  }

  //ES5开始封装成以下方法了
  Object.create(dog);

  //js中无私有变量,可以通过其他方式模拟 --- 自执行函数

  //js只能控制标签的style属性 (style="left:100px")（不能读取控制class css中的属性）

  // var liEle = document.createElement("li");
  // liEle.setAttribute('id', "ID");

}
