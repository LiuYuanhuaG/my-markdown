# method

## Know

### 转换成原始值

```js
toString();
valueOf();
```

### 稀疏数组

```js
const arr = [1, , , 2, , 3, , 4, , 5, , 6];
console.log(arr[1]); // undefined
arr.find((item) => {
  console.log(item);
});
// 1 undefined undefined 2 undefined ...
arr.forEach((item) => {
  console.log(item);
});
// 1 2 3 4 5 6
```

### 读取 getter setter

- **defineGetter** proxy 可以动态设置
  - Object.getOwnPropertyDescriptor(obj,'a').get
- Object.definedProperty 只能定义时候用

```js
Object.prototype.__lookupGetter__()
Object.prototype.__lookupSetter__()
Object.prototype.__defineGetter__()
Object.prototype.__defineSetter__()
#
Object.getOwnPropertyDescriptor(obj,'a').get
#
  let obj = {}
  obj.__defineGetter__('a', function () {
    return 'get a'
  })
  console.log(obj.a);
#
```

### 深拷贝

- es5

```js
var obj = {
  name: 'zs',
  age: 10,
  info: {
    hobby: [
      'play',
      'read',
      {
        a: 1,
      },
    ],
    identity: {
      student: 10,
      engineer: 5,
    },
  },
};
function deepClone(origin, target) {
  var tar = target || {};
  var toStr = Object.prototype.toString;
  for (var k in origin) {
    if (origin.hasOwnProperty(k)) {
      if (typeof origin[k] === 'object' && origin[k] !== null) {
        tar[k] = toStr.call(origin[k]) === '[object Array]' ? [] : {};
        if (toStr.call(origin[k]) === '[object Date]') {
          tar[k] = origin[k];
        }
        deepClone(origin[k], tar[k]);
      } else {
        tar[k] = origin[k];
      }
    }
  }
  return tar;
}
const newObj = deepClone(obj, {});
newObj.info.hobby[2].a = 123;
console.log(obj, newObj);
```

- es6

```js
#
 date reg 通过valueof转换
#
var obj = {
    name: 'zs',
    age: 10,
    info: {
      hobby: ['play', 'read', {
        a: 1
      }],
      identity: {
        student: 10,
        engineer: 5
      }
    },
    date: new Date('2021-01-01')
  }
  function deepClone(origin, hashMap = new WeakMap()) {
    if (origin == undefined || typeof origin !== 'object') {
      return origin
    }
    if (origin instanceof Date) {
      return new Date(origin)
    }
    if (origin instanceof RegExp) {
      return new RegExp(origin)
    }
    const hashKey = hashMap.get(origin);
    if (hashKey) {
      return hashKey;
    }
    const target = new origin.constructor()
    hashMap.set(origin, target)
    for (let k in origin) {
      if (origin.hasOwnProperty(k)) {
        target[k] = deepClone(origin[k], hashMap)
      }
    }
    return target
  }
  const newObj = deepClone(obj)
  newObj.info.hobby[2].a = 123
  newObj.date = new Date()
  console.log(obj, newObj);

  let test1 = {}
  let test2 = {}
  test2.test1 = test1
  test1.test2 = test2
  console.log(deepClone(test2))
```

### prototype

- Function 和 Object 既是函数又是对象

```js
function Test(){}
const test = new Test();
test.__proto__ === Test.prototype  // true
Test.prototype.__proto__ === Object.prototype
// true
Object.prototype.__proto__ // null
Object.prototype.c = 3;
console.log(test)
Test.__proto__ === Function.prototype //true
Function.__proto__=== Function.prototype//true
Object.__proto__ === Function.prototype//true
Object.__proto__ === Function.__proto__//true
test.constructor === Test // true
// constructor 可以更改
#
test {
  a: 1,
  __proto__: Test.prototype = {
    b: 2,
    __proto__: Object.prototype = {
      c: 3,
      __proto__:null
    }
  }
}
```

### 立即执行函数

- 独立作用域
- 执行完立刻销毁
- ES3 的模块
- 在 window 上保存方法

```js
// 直接函数名后加括号会报错 期望是个表达式 需要改成表达式
// () + - ! ~ ...
+(function test() {})();
// 函数表达式直接就能跟() 因为他就是表达式
var a = (function () {
  console.log('--');
})();
// w3c推荐
(function () {
  console.log('-');
})();
// 常用
(function () {
  console.log('--');
})();
```

### this

```js
web: window self frames this
node: global  //用var定义的不是全局
worker: self
通用: globalThis
```

### bind call apply

```js
// bind返回一个函数 只能生效最后一次 类似链式调用
bind(obj,1,...)
call(obj,1,...)
apply(obj,[1,...]
// 箭头函数忽略任何形式的this指向 bind call apply
// 对象函数this 谁调用了他 this就是谁 obj.test() test()
```

- call

```js
// 如果直接Push具体的值  args.push(arguments[i])
// eval执行的时候会自动调用 toString()将数组转成字符串
// 但是外界并没有这个变量
// ['zs,ls'].toString() => zs,ls
// ctx.originFn(zs,ls)

// 直接push字符串 args.push('arguments[' + i + ']')
// 自动转换后可以获取到这个变量
// ['arguments[1]', 'arguments[2]']  =>
//       arguments[1],arguments[2]
// ctx.originFn(arguments[1],arguments[2])

const utilsModule = ((Function) => {
    Function.prototype.myCall = function (ctx) {
      ctx = ctx ? Object(ctx) : window;
      ctx.originFn = this;
      var args = [];
      // ['arguments[1]', 'arguments[2]']

      for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
      }
      var ret = eval('ctx.originFn(' + args + ')')
      delete ctx.originFn
      return ret
    }
  })(Function);

  function test() {
    console.log(this, arguments)
  }

  test.myCall({
    a: 1,
    b: 2,
    test() {
      console.log(this)
    }
  }, 'zs', 'lisi')
# 不拼接字符串
  const utilsModule = ((Function) => {
    Function.prototype.myCall = function (ctx) {
      ctx = ctx ? Object(ctx) : window;
      ctx.originFn = this;
      var obj = {}
      for (var i = 1; i < arguments.length; i++) {
        obj[arguments[i]] = arguments[i]
      }
      var ret = eval('ctx.originFn.apply(ctx,Object.keys(obj))')
      delete ctx.originFn
      return ret
    }
  })(Function);

  function test() {
    console.log(this, arguments)
  }

  test.myCall({
    a: 1,
    b: 2,
    test() {
      console.log(this)
    }
  }, 'zs', 'lisi')
# es6
  const utilsModule = ((Function) => {
    Function.prototype.myCall = function (obj, ...arg) {
      obj = obj == null ? window : Object(obj);
      let val;
      obj._fn_ = this;
      val = obj._fn_(...arg);
      delete obj._fn_;
      return val;
    }
  })(Function);

  function test() {
    console.log(this, arguments)
  }

  test.myCall({
    a: 1,
    b: 2,
    test() {
      console.log(this)
    }
  }, 'zs', 'lisi')
```

- apply

```js
 const utilsModule = ((Function) => {
    Function.prototype.myApply = function (obj, arr) {
      obj = obj == null ? window : Object(obj)
      let args = [];
      let val;
      for (let i = 0; i < arr.length; i++) {
        args.push('arr[' + i + ']');
      }
      obj._fn_ = this;
      val = eval('obj._fn_(' + args + ')')
      delete obj._fn_;
      return val
    }
  })(Function);

  function test() {
    console.log(this, arguments)
  }
  test.myApply({
    a: 1,
    b: 2
  }, ['sz', 'a'])
# es6
 const utilsModule = ((Function) => {
    Function.prototype.myApply = function (obj, arr) {
      obj = obj == null ? window : Object(obj)
      let args = [];
      let val;
      for (let i = 0; i < arr.length; i++) {
        args.push(arr[i]);
      }
      obj._fn_ = this;
      val = eval('obj._fn_(...args)')
      delete obj._fn_;
      return val
    }
  })(Function);

  function test() {
    console.log(this, arguments)
  }
  test.myApply({
    a: 1,
    b: 2
  }, ['sz', 'a'])
```

- bind

```js
 const utilsModule = ((Function) => {
    Function.prototype.myBind = function (ctx) {
      var originFn = this
      var args = [].slice.call(arguments, 1)
      var _tempFn = function () { }
      var newFn = function () {

        var newArgs = [].slice.call(arguments)
        return originFn.apply(this instanceof newFn && ctx ? this : ctx || window, args.concat(newArgs))
      }
      _tempFn.prototype = this.prototype;
      newFn.prototype = new _tempFn
      return newFn;
    }
  })(Function);

  function test() {
    console.log(this, arguments)
  }
  test.prototype.myLove = 'aowo'
  const a = test.myBind({
    a: 1,
    b: 2
  }, 'sz', 'a')
  a()
  console.log(a.prototype.myLove)
#
Function.prototype.myBind = function(obj,...arg1){
    return (...arg2) => {
        let args = arg1.concat(arg2);
        let val ;
        obj._fn_ = this;
        val = obj._fn_( ...args );
        delete obj._fn_;
        return val
    }
}
```

### instanceof

```js
# 重写
class Test { };
  const test = new Test();
  function instanceOf(target, type) {
    type = type.prototype;
    target = target.__proto__;
    while (true) {
      if (target === null) return false;
      if (target === type) return true
      //没找到继续向上一层原型链查找
      target = target.__proto__;
    }
  }
  console.log(test instanceof Test)   // true
  console.log(instanceOf(test, Test)) // true
  console.log(instanceOf([], Array))  // true
  console.log(instanceOf([], Object)) // true
```

### 惰性函数

- 惰性加载表示函数执行的分支只会在函数第一次调用的时候执行。在第一次调用的过程中。该函数被覆盖为另一个按照合适的方式执行的函数。这样任何对原函数的调用就不用再经过执行的分支了

```js
#
 var timeStamp = null;
  function getTimeStamp() {
    if (timeStamp) {
      return timeStamp
    }
    // 直接为外界的变量赋值
    timeStamp = new Date().getTime()
    return timeStamp;
  }
  console.log(getTimeStamp());
  console.log(getTimeStamp());
  console.log(getTimeStamp());
  console.log(getTimeStamp());
# 自执行函数 避免污染全局变量
  var getTimeStamp = (function () {
    var timeStamp = null;
    return function () {
      if (timeStamp) {
        return timeStamp;
      }
      timeStamp = new Date().getTime()
      return timeStamp;
    }
  })()
# 第一次只是在给函数重新定义 第二次执行时候才生效
 var getTimeStamp = function () {
    var timeStamp = new Date().getTime()
    getTimeStamp = function () {
      return timeStamp
    }
    return getTimeStamp()
  }
# element ui 源码 处理 dom 事件
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();
#
   function test(num) {
    switch (num) {
      case 1:
        test = () => 1
        break;
      case 2:
        test = () => 2
        break;
      case 3:
        test = () => 3
        break;
      default:
        test = () => null
        break;
    }
    return test()
  }
  console.log(test(null)); // 3
```

### 防流节抖

- 防抖
  - 将多次执行变为最后一次执行
  - LoL 回城
  - 输入框

```js
function debounce(fn, delay) {
  let timer = null; //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn, delay); // 简化写法
  };
}
```

- 节流
  - 多次执行变成每隔一段时间执行
  - lol 传送
  - 滚动到底部加载更多

```js
function throttle(fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      //休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
}
```

### 树形结构递归

```js
#
1.将顶级与子级数据分开
function getNestedChildren(arr, parent) {
    var out = []
    for (var i in arr) {
      if (arr[i].parent == parent) {
        var children = getNestedChildren(arr, arr[i].id)

        if (children.length) {
          arr[i].children = children
        }
        out.push(arr[i])
      }
    }
    return out
  }

  var flat = [{
    id: 1,
    title: 'hello',
    parent: 0
  },
  {
    id: 2,
    title: 'hello',
    parent: 0
  },
  {
    id: 3,
    title: 'hello',
    parent: 1
  },
  {
    id: 4,
    title: 'hello',
    parent: 3
  },
  {
    id: 5,
    title: 'hello',
    parent: 4
  },
  {
    id: 6,
    title: 'hello',
    parent: 4
  },
  {
    id: 7,
    title: 'hello',
    parent: 3
  },
  {
    id: 8,
    title: 'hello',
    parent: 2
  }
  ]

  var nested = getNestedChildren(flat, 0)
  console.log(nested);
#
```

### class 与构造函数

```js
 function Parents() {
    this.name = name
    this.age = age
    // 原型方法
    this.Hello = function () {
      console.log('--')
    }
  }
  // 静态方法
  Parents.sayHi = function () {
    console.log('---');
  }
  // 添加原型方法
  Parents.prototype.newHello = function () {
    console.log('----')
  }
#
Parents.sayHi()        // 静态方法
new Parents().Hello() // 原型方法
new Parents().newHello() // 添加原型方法
```

```js
  class Parents {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    // 静态方法
    static sayHi() {
      console.log('--')
    }
    // 原型方法
    Hello() {
      console.log('-')
    }
    // 添加原型方法
    newHello() {
      console.log('-')
    }
  }
#
Parents.sayHi() // 静态方法
new Parents().Hello() // 原型方法
new Parents().newHello() // 添加原型方法
```

```js
# 函数声明会预解析提前
# 函数表达式不会发生预解析 因此肯定是2
var getName = function () {
    console.log(2)
  }

function getName() {
    console.log(1);
}
getName() // 2
# 函数 谁调用的他 就指向谁

   function Foo() {
    getName = function () {
      console.log(1)
    }
    // console.log(this)
    return this
  }

  Foo.getName = function () {
    console.log(2)
  }

  var getName = function () {
    console.log(4)
  }

  function getName() {
    console.log(5)
  }

  Foo.getName()           // 2
  getName()               // 4
  Foo().getName()         // 1 Foo调用的他 所以指向他 执行完覆盖掉了全局的 getName 方法
  getName()               // 1 window.getName 指向window
  new Foo.getName()       // 2 new (Foo.getName())
  new Foo().getName()     // 报错 原型链不存在这个方法 (new Foo()).getName()
  new new Foo().getName() // 报错 new ((new.Foo()).getName)
```

### 继承

```js
# 组合继承
  function Parent(name, age) {
    this.name = name;
    this.age = age;
  }
  Parent.prototype.sayHi = function () {
    console.log(this);
  }
  function Student(name, age) {
    Parent.call(this, name, age)
  }
  Student.prototype = new Parent()
  Student.prototype.constructor = Student
  Student.prototype.sayHello = function () {
    console.log('--')
  }
  new Student(1, 1).sayHello()
```

```js
# Object.create  类式继承
 function Parent(name, age) {
    this.name = name;
    this.age = age;
  }
  Parent.prototype.sayHi = function () {
    console.log(this);
  }
  function Student(name, age) {
   Parent.call(this)
  }
  Student.prototype = Object.create(Parent.prototype)
  Student.prototype.constructor = Student
  Student.prototype.sayHello = function () {
    console.log('--')
  }
  new Student(1, 1).sayHello()
```

```js
# 寄生组合继承
砍掉父类的实例属性
在调用两次父类的构造的时候
就不会初始化两次实例方法/属性

  function Parent(value) {
    this.val = value
  }

  Parent.prototype.getValue = function () {
    console.log(this.val);
  }

  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })

  const child = new Child(1)
  child.getValue() // 1
  child instanceof Parent // true
```

### flat

```js
flattenDeep([1, [[2], [3, [4]], 5]]);
const flattenDeep = (arr) =>
  Array.isArray(arr)
    ? arr.reduce((a, b) => [...a, ...flattenDeep(b)], [])
    : [arr];
```

## 1. 内置对象

### Object

#### 常用方法

##### Object.create

- Object.create(proto,[propertiesObject])

```js
// 创造的没有原型链
Object.create(null);
// 以字面量形式创建
o = {};
o = Object.create(Object.prototype);
// 可以继承原型链的配置
Object.create(obj);
// 传入第二个参数
o = Object.create(Object.prototype, {
  foo: {
    writable: true,
    configurable: true,
    value: 'hello',
  },
});
// 浅拷贝
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);
```

##### Object.assign

- `Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象
- 继承和不可枚举属性不可拷贝
  - Object.create({foo: 1} foo 就是继承属性
- 通过 getter setter 进行分配
- `Object.assign(target,...source)`
  - num boolean function 因式转换后不可枚举
  - new String() 后是一个索引和值组成的对象

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);

console.log(target);         // { a: 1, b: 4, c: 5 }
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
console.log(source)          // { b: 4, c: 5 }
# 复制一个对象
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
# 深拷贝
  obj1 = { a: 0 , b: { c: 0}};
  let obj3 = JSON.parse(JSON.stringify(obj1));
```

##### Object.defineProperty

- value: -0 和 value: 0 不是同一个值

```js
// 数组的push不能触发getter setter
const obj = {};
let a = null;
let arr = [];
Object.defineProperties(obj, {
  a: {
    value: 12,
    // 可重新赋值
    writable: true,
    // 可枚举 -> forin
    enumerable: true,
    // 可以被删除 delete defineObj.a
    configurable: true,
    // 不能和value同时用
    get() {
      return a;
    },
    // 不能和writable同时用
    set(newValue) {
      if (newValue < 10) {
        a = newValue;
      } else {
        a = 5;
      }
      arr.push({ value: newValue });
    },
  },
});
obj.a = 4;
obj.a = 10;
obj.a = 3;
console.log(obj.a, arr);
```

##### Object.defineProperties

##### Object.entries

- for-in 循环还会枚举原型链中的属性
- Object.entries() 不会枚举原型链中的属性
  - object.definedProty 需要 enumerable:true 才能可枚举

```js
function Test() {
    this.a = 1
    this.b = 2
  }
  Test.prototype.c = 22
  const test = new Test()

  const testArr = Object.entries(test)
  for (const [key, value] of testArr) {
    console.log(key, value);
    // a 1
    // b 2
  }
# 转换成map
var obj = { foo: "bar", baz: 42 };
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
#
const obj = { a: 1, b: 2 }
  Object.prototype.c = 1;
  Object.myEntries = function (o) {
    var _pool = [];
    if (Object.prototype.toString.call(o) === '[object Object]') {
      for (var k in o) {
        if (o.hasOwnProperty(k)) {
          var _arr = [k, o[k]]
          _pool.push(_arr)
        }
      }
    }
    return _pool
  }
  const r = Object.myEntries(obj);
  console.log(r);
```

##### Object.keys

- 返回可枚举的数组
- Object.getOwnPropertyNames(o); 可以拿到不可枚举的值

##### Object.values

##### Object.toString

- 转换成原始值

```js
Object.prototype.toString.call({});
// [object Object]
// [object Array]
```

##### Object.valueOf

- 转换成原始值

#### 不常用方法

##### Object.isFrozen

- `Object.isFrozen(obj)` 方法判断一个对象是否被冻结。

##### Object.freeze

- 浅冻结
  - 不能被修改 添加 删除 , 可读
  - 不能修改 `writeable,set,get...` 等配置
  - 可以通过 `prototype` 和 `__proto__` 修改其的属性
    - 但是不能修改整个对象(的引用)
- `Object.freeze(obj)` 会返回原对象 并不是新的对象

```js
function Test(){
  this.a = 1;
  this.b = 2;
}
Test.c =3;
const test = new Test();
const newTest = Object;
newTest.protoType.c = 333; // true
newTest.__proto__.c = 333; // true
newTest.protoType = {      // false
  c: 333;
}
# 只能浅冻结
const obj = {
  a: 1,
  b: {
    c: 3
  }
}
Object.freeze(obj)
obj.a = 2  // false
obj.c.d = 4 // true
# 深冻结
const o = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: {
      f: 4
    }
  }
}
Object.deepFreeze = function (o){
  // Objcet.keys() 拿不到不可枚举的属性
  var _keys = Object.getOwnPropertyNames(o);

  if(_keys.length) {
    _keys.forEach(function (k){
      var _value = o[k];

      if(typeof _value === 'object' && _value !== null ){
        Object.deepFreeze(_value);
      }
    })
  }

  return Object.freeze(o)
}
Object.deepFreeze(o)
o.c.e.f = 2222;  // false
```

##### Object.isSealed

- `Object.isSealed(obj)` 方法判断一个对象是否被封闭。

##### Object.seal()

- 浅封闭
- 可读 可修改 不可删除 不可扩展
- 不能修改 `writeable,set,get...` 等配置
- 可以通过 `prototype` 和 `__proto__` 修改其的属性
  - 但是不能修改整个对象(的引用)
- `Object.seal(obj)` 会返回原对象 并不是新的对象

```js
let obj = { a:1 }
let newObj = Object.seal(obj)
newObj.a = 11; //true
newObj.b = 1 // false
#
Object.deepSeal = function (o){
  // Objcet.keys() 拿不到不可枚举的属性
  var _keys = Object.getOwnPropertyNames(o);

  if(_keys.length) {
    _keys.forEach(function (k){
      var _value = o[k];

      if(typeof _value === 'object' && _value !== null ){
        Object.deepSeal(_value);
      }
    })
  }

  return Object.Seal(o)
}
Object.deepSeal(o)
o.c.e.f = 2222;  // false
```

##### Object.fromEntries

- 把键值对列表转换为一个新的对象

```js
#  Map 转化为 Object
const map = new Map([ ['foo', 'bar'], ['baz', 42] ]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
# array转Object
const arr = [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
#
 const obj = { a: 1, b: 2 }
  Object.prototype.c = 1;
  const r = Object.entries(obj)
  // console.log(r)
  Object.myFromEntries = function (o) {
    var _obj = {};
    for (const item of o) {
      _obj[item[0]] = item[1]
    }
    return _obj
  }
  const newObj = Object.myFromEntries(r);
  console.log(newObj);
```

##### Object.is

- 确定两个值是否 相同

##### Object.toLocaleString

- 返回一个表示对象的字符串。此方法旨在被派生对象覆盖以用于特定于语言环境的目的。

#### 内置构造器

##### Object.getPrototypeOf

- 返回对象的原型

##### Object.setPrototypeOf

- 设置一个对象的原型

```js
Object.setPrototypeOf(obj, prototype);
```

##### Object.isExtensible

- 确定对象是否可扩展

```js
Object.isExtensible({}) //true
#
Object.isExtensible(Object.seal({}))
Object.isExtensible(Object.freeze({}));
```

##### Object.preventExtensions

- 浅操作

- 让一个对象不可拓展

- 可删除 可修改 不可拓展

- 返回不可拓展的对象

  - 仅阻止添加自身的属性

  - 原型链属性还可以添加 但不能解除引用关系

```js
let obj = Object.preventExtensions(obj)
#
freeze 不可修改 不可删除 不可拓展
seal 可修改 不可删除 不可拓展
preventExtensions 可修改 可删除 不可拓展
# 空对象都是false
var obj = {}
Object.preventExtensions(obj)
Object.isFrozen(Obj) // true
Object.isSealed(obj) // ture
#
  const obj = {
    a: 1,
    b: {
      c: {
        d: 3
      }
    }
  }
  Object.deepPreventExtensions = function (o) {
    var _keys = Object.getOwnPropertyNames(o)
    if (_keys.length) {
      _keys.forEach((k) => {
        var _v = o[k];
        if (typeof _v === 'object' && _v !== null) {
          Object.deepPreventExtensions(_v)
        }
      })
    }
    return Object.preventExtensions(o)
  }

  Object.deepPreventExtensions(obj)
  obj.b.c.e = 5
  console.log(obj);  // 不存在e
```

##### Object.getOwnPropertyDescriptor

- 返回指定对象上一个自有属性对应的描述符
  - getter
  - setter
  - ...
- `Object.getOwnPropertyDescriptor(obj, prop)`

```js
Object.getOwnPropertyDescriptor(obj, 'a').get.value;
obj.__lookupGetter__('a');
```

##### Object.getOwnPropertyDescriptors

- Object.getOwnPropertyDescriptors(obj)

##### Object.hasOwnProperty

- 返回一个布尔值，指示对象是否具有指定的属性作为它自己的属性（排除了继承的属性）

- obj.hasOwnProperty(prop)

```js
# 属性值是null undefined
也返回true
```

##### Object.getOwnPropertyNames

- 包括不可枚举的属性

```js
var Obj = {
  a: 1,
  b: 2,
  c: 3,
};
Object.defineProperty(obj, 'b', {
  enumerable: false,
});
console.log(Object.keys(obj)); // ["a","c"]
console.log(Object.getOwnPropertyNames(obj));
// ["a","b","c"]
```

##### Object.getOwnPropertySymbols(obj)

- 返回 Symbol 数组

##### Object.isPrototypeOf

- 检查一个对象是否存在于另一个对象的原型链中

##### Object.propertyIsEnumerable

- 指示指定的属性是否是可枚举的并且是对象自己的属性

### Array

#### API

| 方法                                            | 描述                                                                         |
| ----------------------------------------------- | ---------------------------------------------------------------------------- |
| # Array.isArray(对象)                           | ie9 以上:这个对象是不是数组                                                  |
| Array.from(arr.[fn],{})                         | 克隆数组 返回值是克隆一个新空间的数组                                        |
| # arr1. concat(arr2)                            | 组合成一个新的数组                                                           |
| instanceof 关键字 Array                         | 这个对象是不是数组                                                           |
| .push(值)                                       | 把值追加到数组最后面,返回值是:追加数据之后的数组长度                         |
| .unshift();                                     | 数组第一个元素前面插入一个新的元素,返回值是插入后的长度                      |
| .pop();                                         | 删除数组中最后一个元素,返回值就是删除的这个值                                |
| .shift()                                        | 删除数组中第一个元素,返回值就是删除的这个值                                  |
| .join("字符串")                                 | 加入字符串 返回的是一个字符串                                                |
| .indexOf(元素值)                                | 返回的是索引,没有则是-1 某个指定的字符串值在字符串中首次出现的位置           |
| includes(ele)                                   | 是否包含 返回布尔值                                                          |
| .laseIndexOf(元素值)                            | 倒序查找 首个字符串出现的位置的索引 没有则是-1                               |
| .slice(开始的索引,结束的索引,添加的元素)        | 把截取的数组的值放在一个新的数组中,但是不包含结束的索引对应的元素值 c 浅拷贝 |
| .splice(开始的位置,要删除的个数,替换的元素的值) | 一般是用于删除数组中的元素,或者是替换元素,或者是插入元素                     |
| .reverse ( )                                    | 反转数组                                                                     |
| .sort(函数)                                     | 函数 2 个形参 第一个用于比较的元素 第二个用于比较的元素。                    |
| .forEach(函数)                                  |                                                                              |
| .map(函数)                                      | 数组中的每个元素都要执行这个函数,执行后结果放到一个新数组 后面可放 math 函数 |
| .every(函数)                                    |                                                                              |
| .filter(函数)                                   | 返回筛选的结果                                                               |
| .reduce((total,ele)=>total+=ele.num,initValue)  | 求和                                                                         |
| find                                            | 找出第一个符合条件的数组成员,没有就是 undefined                              |
| arr.findIndex                                   | 返回规则 没有则返回-1                                                        |
|                                                 |                                                                              |
|                                                 |                                                                              |

#### slice

```js
// 将arguments转换成数组
Array.prototype.slice.call(arguments);
[].slice.call(arguments, 0);
```

#### Array.from

```js
# Array.from(类数组或可迭代对象,fn,this.arg)
let newArr = Array.from([1, 2, 3], function (item) {
    return item + this.a
  }, { a: 3 });
console.log(newArr); //4,5,6
```

#### forEach

- forEach 稀疏数组 自动过滤空值
- 内部用了 while 。循环 await 需要注意

```js
# 重写
var arr = [
    { name: 'zs', age: 1 },
    { name: 'l4', age: 2 },
    { name: 'w5', age: 3 },
    { name: 'ss', age: 4 },
  ]
  var obj = {
    name: 'thisArg',
    age: 2222
  }
  // arr.forEach(function (item, index, arr) {
  //   console.log(item, index, arr, this);
  // }, obj)
  Array.prototype.myForEach = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;
    for (let i = 0; i < _len; i++) {
      cb.apply(_arg2, [_arr[i], i, _arr]);
    }
  }

  // Array.prototype.myForEach = function (cb, _this) {
  //   _this = cb.prototype ? _this : window

  //   for (let i = 0; i < _this.length; i++) {

  //     if (_this[i]) {
  //       cb(_this[i], i, _this)
  //     }
  //   }
  //   // let index = 0
  //   // while (index < _this.length) {
  //   //   if (_this[index]) {
  //   //     cb.call(_this,this[index], index, this)
  //   //   }

  //   //   index++
  //   // }
  // };
  arr.myForEach(function (item, index, arr) {
    console.log(item, index, arr, this);
  }, obj)
```

#### map

```js
# 重写
<script>
  var arr = [
    { name: 'zs', age: 1 },
    { name: 'l4', age: 2 },
    { name: 'w5', age: 3 },
    { name: 'ss', age: 4 },
  ]
  var obj = {
    name: 'thisArg',
    age: 2222
  }
  // var newArr = arr.map(function (item, index, arr) {
  //   console.log(item, index, arr, this);
  //   return item.name
  // }, obj)
  // console.log(newArr)
  function deepClone(origin, hashMap = new WeakMap()) {
    if (origin == undefined || typeof origin !== 'object') {
      return origin
    }
    if (origin instanceof Date) {
      return new Date(origin)
    }
    if (origin instanceof RegExp) {
      return new RegExp(origin)
    }
    const hashKey = hashMap.get(origin);
    if (hashKey) {
      return hashKey;
    }
    const target = new origin.constructor()
    hashMap.set(origin, target)
    for (let k in origin) {
      if (origin.hasOwnProperty(k)) {
        target[k] = deepClone(origin[k], hashMap)
      }
    }
    return target
  }
  Array.prototype.myMap = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;
    var _newArr = []
    var _item;
    var _res;
    for (let i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      var res = cb.apply(_arg2, [_item, i, _arr]);
      _res && _newArr.push(_res);
    }
    return _newArr
  }
  // Array.prototype.myMap = function (cb, _this) {

  //   _this = cb.prototype ? _this : window
  //   const _arr = []
  //   for (let index = 0; index < this.length; index++) {
  //     _arr[index] = cb.call(_this, this[index], index, this)
  //   }
  //   return _arr
  // };
  var newArr = arr.myMap(function (item, index, arr) {
    console.log(item, index, arr, this);
    return item.name
  }, obj)
  console.log(newArr)

</script>
```

#### filter

```js
# 重写
var arr = [
    { name: 'zs', age: 1 },
    { name: 'l4', age: 2 },
    { name: 'w5', age: 3 },
    { name: 'ss', age: 4 },
  ]
  var obj = {
    name: 'thisArg',
    age: 2222
  }
  // var newArr = arr.filter(function (item, index, arr) {
  //   console.log(item, index, arr, this);
  //   return item.age > 2
  // }, obj)
  // console.log(newArr)
  function deepClone(origin, hashMap = new WeakMap()) {
    if (origin == undefined || typeof origin !== 'object') {
      return origin
    }
    if (origin instanceof Date) {
      return new Date(origin)
    }
    if (origin instanceof RegExp) {
      return new RegExp(origin)
    }
    const hashKey = hashMap.get(origin);
    if (hashKey) {
      return hashKey;
    }
    const target = new origin.constructor()
    hashMap.set(origin, target)
    for (let k in origin) {
      if (origin.hasOwnProperty(k)) {
        target[k] = deepClone(origin[k], hashMap)
      }
    }
    return target
  }
  Array.prototype.myFilter = function (cb) {
    var _arr = this;
    var _len = _arr.length;
    var _arg2 = arguments[1] || window;
    var _newArr = []
    var _item;
    var _res;
    for (let i = 0; i < _len; i++) {
      _item = deepClone(_arr[i]);
      _res = cb.apply(_arg2, [_item, i, _arr]);
      _res && _newArr.push(_item)
    }
    return _newArr
  }
  var newArr = arr.myFilter(function (item, index, arr) {
    console.log(item, index, arr, this);
    return item.age > 2
  }, obj)
  console.log(newArr)
```

#### every

```js
var arr = [
  { name: 'zs', age: 1 },
  { name: 'l4', age: 2 },
  { name: 'w5', age: 3 },
  { name: 'ss', age: 4 },
];
var obj = {
  name: 'thisArg',
  age: 2222,
};
var flag = arr.every(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item.age > 0;
}, obj);
console.log(flag);
Array.prototype.myEvery = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  var _res = true;
  for (let i = 0; i < _len; i++) {
    if (!cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = false;
      break;
    }
  }
  return _res;
};
var flag = arr.myEvery(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item.age > 0;
}, obj);
console.log(flag);
```

#### some

```js
var arr = [
  { name: 'zs', age: 1 },
  { name: 'l4', age: 2 },
  { name: 'w5', age: 3 },
  { name: 'ss', age: 4 },
];
var obj = {
  name: 'thisArg',
  age: 2222,
};
// var flag = arr.some(function (item, index, arr) {
//   console.log(item, index, arr, this);
//   return item.age > 5
// }, obj)
// console.log(flag)
Array.prototype.mySome = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  var _res = false;
  for (let i = 0; i < _len; i++) {
    if (cb.apply(_arg2, [_arr[i], i, _arr])) {
      _res = true;
      break;
    }
  }
  return _res;
};
var flag = arr.mySome(function (item, index, arr) {
  console.log(item, index, arr, this);
  return item.age > 3;
}, obj);
console.log(flag);
```

#### reduce

```js
var arr = [
  { name: 'zs', age: 1 },
  { name: 'l4', age: 2 },
  { name: 'w5', age: 3 },
  { name: 'ss', age: 4 },
];
var obj = {
  name: 'thisArg',
  age: 2222,
};
// var flag = arr.reduce(function (prev, item, index, arr) {
//   console.log(prev);
//   return item.age > 2 && prev + item.age
// }, 0)
// console.log(flag)
function deepClone(origin, hashMap = new WeakMap()) {
  if (origin == undefined || typeof origin !== 'object') {
    return origin;
  }
  if (origin instanceof Date) {
    return new Date(origin);
  }
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }
  const hashKey = hashMap.get(origin);
  if (hashKey) {
    return hashKey;
  }
  const target = new origin.constructor();
  hashMap.set(origin, target);
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone(origin[k], hashMap);
    }
  }
  return target;
}
Array.prototype.myReduce = function (cb, initValue) {
  var _arr = this;
  var _len = _arr.length;
  var _arg3 = arguments[2] || window;
  var _item;
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    initValue = cb.apply(_arg3, [initValue, _item, i, _arr]);
  }
  return initValue;
};
var flag = arr.myReduce(
  function (prev, item, index, arr) {
    console.log(prev, this);
    return item.age > 2 && prev + item.age;
  },
  0,
  obj,
);
console.log(flag);
```

#### reduceRight

- reduce 是正序
- reduceRight 是倒序

```js
var arr = [
  { name: 'zs', age: 1 },
  { name: 'l4', age: 2 },
  { name: 'w5', age: 3 },
  { name: 'ss', age: 4 },
];
var obj = {
  name: 'thisArg',
  age: 2222,
};
// var flag = arr.reduceRight(function (prev, item, index, arr) {
//   console.log(item);
//   return item.age > 2 && prev + item.age
// }, 0)
// console.log(flag)
function deepClone(origin, hashMap = new WeakMap()) {
  if (origin == undefined || typeof origin !== 'object') {
    return origin;
  }
  if (origin instanceof Date) {
    return new Date(origin);
  }
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }
  const hashKey = hashMap.get(origin);
  if (hashKey) {
    return hashKey;
  }
  const target = new origin.constructor();
  hashMap.set(origin, target);
  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone(origin[k], hashMap);
    }
  }
  return target;
}
Array.prototype.myReduceRight = function (cb, initValue) {
  var _arr = this;
  var _len = _arr.length;
  var _arg3 = arguments[2] || window;
  var _item;
  for (let i = _len - 1; i >= 0; i--) {
    _item = deepClone(_arr[i]);
    initValue = cb.apply(_arg3, [initValue, _item, i, _arr]);
  }
  return initValue;
};
var flag = arr.myReduceRight(
  function (prev, item, index, arr) {
    if (item.age > 2) {
      console.log(prev, item, this);
      prev += item.age;
    }
    return prev;
  },
  0,
  obj,
);
console.log(flag);
```

### String

| 方法                                       | 描述                                                                                                           |     |     |     |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | --- | --- | --- |
| #.charAt(索引)                             | 查找某索引位置的字符串 超出索引为空字符串                                                                      |     |     |     |
| #String.fromCharCode(数字值,可是多个参数)  | 返回的是 ASCII 码对应的值(字符串形式)                                                                          |     |     |     |
| # .concat(字符串 1,字符串 2,...”你好”)     | 返回拼接后字符串 定义的字符串.concat("后续内容","内容");                                                       |     |     |     |
| #.toLocaleLowerCase()                      | 转小写 基本没区别 某些语言字符 有区别 需要用某个转换                                                           |     |     |     |
| #.toLocaleUpperCase()                      | 转大写                                                                                                         |     |     |     |
| # String.charCodeAt(索引值)                | 返回索引值 对应的 ASCLL 码的值                                                                                 |     |     |     |
| # str[index]                               | 类似 charAt IE9 以上可用                                                                                       |     |     |     |
| # startsWith()                             | 表示参数字符串是否在原字符串的头部，返回布尔值                                                                 |     |     |     |
| # endsWith()                               | 表示参数字符串是否在原字符串的尾部，返回布尔值                                                                 |     |     |     |
| # str.repeat(n)                            | 示将原字符串重复 n 次，返回一个新字符串。                                                                      |     |     |     |
| .length                                    | 字符串的长度                                                                                                   |     |     |     |
| .indexOf(要找的字符串,从某位置开始的索引); | 字符串中找字符串 返回的是这个字符串的索引值,没找到则返回-1                                                     |     |     |     |
| .lastIndexOf(要找的字符串)                 | 从后向前找,但是索引仍然是从左向右的方式,找不到则返回-1                                                         |     |     |     |
| .replace("原来的字符串","新的字符串")      | 替换一个字符串 只会替换第一个                                                                                  |     |     |     |
| .split("要干掉的字符串",切割后留下的个数); | 切割字符串                                                                                                     |     |     |     |
| .splice.(开始的索引,结束的索引)            | 截取字符串 数组也可以用 但是第一参数必须小于等于第二参数 可负数                                                |     |     |     |
| .substr(开始的位置,返回的字符串个数)       | 截取字符串 返回值是截取的的字符串 第二个参数 和 slice substring 有区别 第二参数为负数方法无效 第二个参数可省略 |     |     |     |
| #.substring(开始的索引,结束的索引)         | 截取字符串 返回值是截取的的字符串 第二参数为负数方法无效                                                       |     |     |     |
| .toLowerCase()                             | 转小写                                                                                                         |     |     |     |
| toLocaleLowerCase( )                       | 转小写                                                                                                         |     |     |     |
| .trim();                                   | 干掉字符串两端的空格                                                                                           |     |     |     |
|                                            |                                                                                                                |     |     |     |

### Math

| 方法                  | 代码 | 描述           | 其他 | 注意                                           |
| --------------------- | ---- | -------------- | ---- | ---------------------------------------------- |
| # Math.PI             |      | π              |      |                                                |
| # Math.E              |      | 常数的底数     |      |                                                |
| # Math.sqrt           |      | 平方根         |      | sqrt(16) => 4                                  |
| Math.abs(值)          |      | 绝对值         |      |                                                |
| Math.ceil(值)         |      | 向上取整       |      | 只要有小数就多 1                               |
| Math.floor(值)        |      | 向下取整       |      | 去掉小数                                       |
| Math.fround(值)       |      | 数字转成浮点型 |      |                                                |
| Math.max(值)          |      | 最大值         |      | 一组数                                         |
| Math.min              |      | 最小值         |      |                                                |
| Math.pow(x,y)         |      | 幂             |      | Math.pow(7,2) => 7² \|\| 2\*\*3 = 8            |
| Math.random()\*100)+1 |      | 伪随机数[0,1)  |      | parseInt(Math.random ( )\*5 ); => 0-4 的随机数 |
| Math.round( )         |      | 四舍五入       |      | 小数点是 5 时候 向大取整                       |

### Set

#### 方法

| 方法          | 描述                      | 返回值            |
| ------------- | ------------------------- | ----------------- |
|               | Set 每一个值都是唯一的    |                   |
| size          | 查看 set 的长度           |                   |
| add(value)    | 添加某个值                | 返回 Set 结构本身 |
| delete(value) | 删除某个值                | 返回一个布尔值    |
| has(value)    | 表示该值是否为 Set 的成员 | 返回一个布尔值    |
| clear()       | 清除所有成员              | 没有返回值        |
| forEach       | 遍历                      | 没有返回值        |

#### 数组去重

```js
# 1.
[...new Set(arr)]
# 2.
var newArr =arr.filter((ele, index, arr) => arr.indexOf(ele)== index);
#
  var arr = [{
    name: 'zs',
    age: 10
  }, {
    name: 'ls',
    age: 10
  }, {
    name: 'ls',
    age: 12
  }];

  var hash = {};
  arr = arr.reduce((pre, item) => {
    hash[item.name] ? '' : hash[item.name] = true && pre.push(item);
    return pre
  }, [])
  console.log(arr)
```

#### 并集

```js
let num1 = new Set([1, 2, 3, 4]);
let num2 = new Set([3, 4, 5, 6]);
//并集
let union = new Set([...num1, ...num2]);
console.log(union); //Set { 1, 2, 3, 4, 5, 6 }
```

#### 交集

```js
let intersect = new Set([...num1].filter((x) => num2.has(x)));
console.log(intersect); //Set { 3, 4 }
```

#### 差集

```js
let difference = new Set([...num1].filter((x) => !num2.has(x)));
console.log(difference); //Set { 1, 2 }
```

### Map

```js
var map = new Map();
map.set('key', value);
map.set('key1', value1);
map.set('key2', value2);
map.has(key);
map.get(key);
map.clear();
delete map[key] || map.delete(key);
map.forEach(function (key) {
  console.log('key', key); //输出的是map中的value值
});
```

### Promise

#### Promise

- then 得到异步任务的正确结果
- catch 得到异常信息
- finally 成功与否都会执行 ( 尚且不是正式标准 )
- Promise.resolve() 将这个对象转为 Promise 对象 立即执行 then 方法
- Promise.reject()
- Promise.all (interable[] ) 传入可迭代对象
  - 并发处理多个异步任务,所有任务都执行完成才能得到结
  - 一个 promise 是 reject 回调就是 reject
  - 失败原因是第一个失败的结果
- Promise.race( )
  - 并发处理多个异步任务 只要有一个任务完成就能得到结果
  - 如果元素是空 返回永远是 pedding

```js
var p = new Promise(function (resolve, reject) {
 //这里是同步的
 //成功时调用resolve回调函数
 //失败时调用reject回调函数
 });

p.then(
   function(data){/*从resolve中得到正常结果*/},
   function(data){/*从reject中得到错误结果*/}
  );

p.then(function(data){ return p}
#
Promise.all([p1,p2,p3]).then((result) => {
   console.log(result)
});
Promise.race([p1,p2,p3]).then((result) => {
   console.log(result)
});
```

#### 实现一个 Promise

##### 1.实现基本的 excutor

```js
let promise = new myPromise((resolve, reject) => {
  // resolve('success');
  // reject('failure');
  throw new Error('Expected success');
});
promise.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log('error---', reason);
  },
);
```

- 1.`Promise` 分为三种状态 `PENDING FULFILL REJECTED`
  - 只可以从 `PENDING => FULFILL` 或 `PENDING => REJECTED`
  - 不可以从 `FULFILL => REJECTED` `FULFILL => PENDING` `REJECTED => PENDING`
  - 且默认是`PENDING`的状态
- 2.`new Promise(executor)` 实例化时候传入一个函数, 里面又有包含 `resolve和reject两个回调函数`
  - 因此也就是 `constructor(executor)` 就是实例化时候传入的函数
  - 同时这个 `executor => (resolve,reject)=>{ }`
  - 所以需要定义`executor的两个回调`
  - 在对应的回调改变对应的状态, 并存储对应传入的值
- 3.`let Promise = new Promise(executor)` , `Promise.then((value)=>{}, (reason)=>{})`
  - 实例化对象需要`.then` 来对结果进行处理, 因此需要给实例对象添加 `then` 方法
  - 用 `class` 直接就与 `constructor` 同级处添加 `then` 方法就可以了
  - 如果是构造函数的话, 就是 `myPromise.prototype.then = function(){ }`
- 4.在使用 `then` 方法时, 我们在这个函数参数中得到 `resolve` 和 `reject` 传入的对应的值
  - 因此在 `class` 的 `then` 方法定义中, 我们根据不同的`Promise`状态, 在正确的回调中传入正确的参数就可以了
- 5.当 `executor` 中手动抛出错误的时候, 我们需要在 `executor` 函数执行的地方进行 `try-catch` 捕获
  - 如果捕获到异常了直接执行 `reject`

```js
const PENDING = 'PENDING';
const FULFILL = 'FULFILL';
const REJECTED = 'REJECTED';

class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILL;
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILL) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
```

##### 2.异步执行,多个 Promise 依次执行

```js
let promise = new myPromise((resolve, reject) => {
  // resolve('success');
  // reject('failure');
  // throw new Error('Expected success');
  setTimeout(() => {
    resolve('success');
  }, 2000);
});
promise.then(
  (value) => {
    console.log(value + '--1');
  },
  (reason) => {
    console.log('error---', reason);
  },
);

promise.then(
  (value) => {
    console.log(value + '--2');
  },
  (reason) => {
    console.log('error---', reason);
  },
);
```

- 1.当`executor`传入异步的处理后, `.then` 的时候并没有处理`pending`的状态
  - 使用发布订阅模式
  - 订阅
    - 在`then`方法中如果是 `pending` 状态则收集所有`resolve`和`reject`的回调
    - 因此在`constructor`中定义两个数组来进行收集 `onFulfilledCallbacks` `onRejectedCallbacks`
  - 发布
    - 需要在`resolve` `reject` 函数中执行之前订阅收集的结果
    - `this.onFulfilledCallbacks.forEach(cb => cb());`
    - `this.onRejectedCallbacks.forEach(cb => cb());`
- 2.如果有多个 `promise.then` 需要依次执行各自的回调
  - 同步
    - 当是同步的时候默认就是依次执行的
  - 异步
    - 使用发布订阅的模式, 当异步`pending`的时候 将`resove reject`的值都进行收集
    - 在`resove` `reject` 的函数中执行所有的收集的状态

```js
const PENDING = 'PENDING';
const FULFILL = 'FULFILL';
const REJECTED = 'REJECTED';

class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILL;
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    if (this.status === FULFILL) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
```

##### 3.链式调用

###### 3.1 细节

- `catch`
  - `catch` 在 `Promise` 的源码层面就是一个 `then`
  - 和 `then` 的逻辑相同
- 成功的条件
  - `then return` 普通的值
  - `then return` 一个`Promise`且是 `resolve` 成功的回调
- 失败的条件
  - `then` 抛出了异常 `throw new Error`
  - `then return` 一个`Promise`且是 `reject` 失败的回调
- Promise 链式调用
  - `jQuery` 链式调用 在函数内部返回一个`this`
  - 在每一个 `then` 的时候返回一个新的 `new Promise.then()`
    - 如果不是链式调用.直接创建新的调用 调用的将是第一的值
- `Promise.resolve()`

  - 在`then中`如果需要 `return` 一个 `Promise`
  - 可以直接通过语法糖 `return Promise.resolve('xxx')`
  - 或者自己创建一个新的 `promise` 对象并 `return`

- 1. `return` 传递普通的值
- 2. `return` 一个`Promise` 传入 `resolve` 的结果
  - 同步异步都可以
- 3. `return` 一个`Promise` 传入 `reject` 的结果
  - 下一段链式调用执行 `reject` 的回调
- 4. `then`走了失败的回调函数后 再走了 `then`
- 5. 如果 `then throw new Error`
  - 就会走到下一段的 reject 中
- 6. 用`catch` 捕获异常
  - `then`会找最新的失败的调用 不论是 `catch` 还是 `reject`
  - 如果 `catch` `return` 一个普通值 在下一个`then` `resolve` 进行捕获

```js
let promise = new myPromise((resolve, reject) => {
  resolve('First resolve');
});

// 1
promise
  .then((res) => {
    return res;
  })
  .then((res) => {
    console.log(res); // First resolve
  });

// 2.
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      // resolve(res)
      setTimeout(() => {
        resolve(res);
      }, 2000);
    });
  })
  .then((res) => {
    console.log(res); // First resolve
  });

// 3.
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Error');
      }, 2000);
    });
  })
  .then(
    (res) => {
      console.log(res); // undefined
    },
    (err) => {
      console.log(err); // Error
    },
  );

// 4
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Error');
      }, 2000);
    });
  })
  .then(
    (res) => {
      console.log(res); // 没有执行
    },
    (err) => {
      console.log(err); // Error
      // 默认 return undefined
    },
  )
  .then(
    (res) => {
      // 在这里接收上一段的 reject return 的值
      console.log(res); // undefined
    },
    (err) => {
      console.log(err); // 没有执行
    },
  );

// 5
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Error');
      }, 2000);
    });
  })
  .then(
    (res) => {
      console.log(res); // 没有执行
    },
    (err) => {
      console.log(err); // Error
      // 默认 return undefined
    },
  )
  .then(
    (res) => {
      // 在这里接收上一段的 reject return 的值
      console.log(res); // undefined
      throw new Error('new Error');
    },
    (err) => {
      console.log(err); // 没有执行
    },
  )
  .then(
    (value) => {
      console.log(value); // 没有执行
    },
    (err) => {
      console.log(err); // new Error
    },
  );

// 6
promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Error');
      }, 2000);
    });
  })
  .then(
    (res) => {
      console.log(res); // 没有执行
    },
    (err) => {
      console.log(err); // Error
      // 默认 return undefined
    },
  )
  .then(
    (res) => {
      // 在这里接收上一段的 reject return 的值
      console.log(res); // undefined
      throw new Error('new Error');
    },
    (err) => {
      console.log(err); // 没有执行
    },
  )
  .then((value) => {
    console.log(value); // 没有执行
  })
  .catch((err) => {
    console.log(err); // new Error
  });

promise
  .then((res) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('Error');
      }, 2000);
    });
  })
  .then(
    (res) => {
      console.log(res); // 没有执行
    },
    (err) => {
      console.log(err); // Error
      // 默认 return undefined
    },
  )
  .then(
    (res) => {
      // 在这里接收上一段的 reject return 的值
      console.log(res); // undefined
      throw new Error('new Error');
    },
    (err) => {
      console.log(err); // 没有执行
    },
  )
  .then(
    (value) => {
      console.log(value); // 没有执行
    },
    (err) => {
      console.log(err); //  new Error
    },
  )
  .catch((err) => {
    console.log(err); // 没有执行
  });
```

###### 3.2 实现

- 如果返回新的 `Promise`
- 用`x`函数存储, 如果是 `Promise` 需要利用 `resolve` 进行抛出
- 如果 `throw Error`
- 进行 `try catch` 如果失败直接 `reject`
- `resolvePromise(x);` 用来处理 `x`
- 为了保证 `resolvePromise` 接受到 `promise2`
- 用 `setTimeout` 让其变成异步
- 当执行的时候 已经可以获取到 `promise2` 对象了

```js
let promise1 = new myPromise((resolve, reject) => {
  resolve('First resolve');
  // reject(new Error('Error'))
});

let promise2 = promise1.then(
  (value) => {
    // return 'then promise';
    // return new Error('Error')
    // return Promise.resolve('promise resolve');
    return new myPromise((resolve, reject) => {
      // resolve('new mypromise resolve')

      // setTimeout(() => {
      //   resolve('new mypromise resolve')
      // }, 2000);

      setTimeout(() => {
        resolve(
          new myPromise((resolve, reject) => {
            resolve(
              new myPromise((resolve, reject) => {
                resolve('new mypromise resolve');
              }),
            );
          }),
        );
      }, 2000);
    });
  },
  (reason) => {
    return reason;
  },
);

// promise2.then((value) => {
//   console.log(value)  // 1
// }, (reason) => {
//   console.log(reason) // Error
// })

// promise2.then().then().then().then().then((value) => {
//   console.log(value)  // 1
// }, (reason) => {
//   console.log(reason) // Error
// })

promise2
  .then()
  .then()
  .then()
  .then()
  .then(
    (value) => {
      throw new Error('Error');
    },
    (reason) => {
      console.log(reason); // Error
    },
  )
  .catch((e) => {
    console.log(e);
  });
```

```js
const PENDING = 'PENDING';
const FULFILL = 'FULFILL';
const REJECTED = 'REJECTED';

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected from promise #<MyPromise>'),
    );
  }
  let called = false;
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          },
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

class myPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILL;
        this.value = value;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reson) => {
            throw reason;
          };
    let promise2 = new myPromise((resolve, reject) => {
      if (this.status === FULFILL) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
    return promise2;
  }
  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
}
```

### proxy

- Proxy 是代理, 和 Object.defineproperty 完全不同

- Object.defineProperty 是用于监听属性,而 Proxy 是监听整个对象

```js
let target = {
  a: 1,
  b: 2,
};
let proxy = new Proxy(target, {
  get(target, property, receiver) {
    return target;
  },
  set(target, property, value, receiver) {
    target[prop] = value;
  },
});
target.b = 3;
console.log(proxy, target);
```

- Proxy.revocable()

```js
- `Proxy.revocable(target, handler)`
- `Proxy.revocable()`方法可以用来创建一个可撤销的代理对象，其返回一个包含了代理对象本身和它的撤销方法的可撤销`Proxy`对象。
#
handler.getPrototypeOf() // 获取原型
handler.setPrototypeOf() // 设置原型
handler.isExtensible()  // 获取对象的可拓展性
handler.preventExtensions() // 禁止拓展对象
handler.getOwnPropertyDescriptor() // 获取自有属性
handler.defineProperty() // 拦截对象操作
handler.has(): in操作符的捕捉器  // 判断是否是自身属性
handler.get(): 属性读取操作的捕捉器 // 'a' in obj  obj.a
handler.set(): 属性设置操作的捕捉器 // obj.a = 3
handler.deleteProperty(): delete操作符的捕捉器 // 可删除
handler.ownKeys(): Reflect.ownKeys、Object.getOwnPropertyNames、Object.keys、Object.getOwnPropertySymbols方法的捕捉器 // 获取键集合
handler.apply(): 函数调用操作的捕捉器
handler.construct(): new操作符的捕捉器

#
var revocable = Proxy.revocable({}, {
  get: function(target, key) {
    return `[[ ${key} ]]`;
  }
});
var proxy = revocable.proxy;
console.log(proxy.example); // [[ example ]]
revocable.revoke();
// console.log(proxy.example);  // 抛出 TypeError
// proxy.example = 1;           // 抛出 TypeError
// delete proxy.example;        // 抛出 TypeError
// typeof proxy                 // "object"，因为 typeof 不属于可代理操作
```

```js
function MyProxy(target, handler) {
  let _target = deepClone(target);
  Object.keys(_target).forEach((key) => {
    Object.defineProperty(_target, key, {
      get: function () {
        return handler.get && handler.get(target, key);
      },
      set: function (newVal) {
        handler.set && handler.set(target, key, newVal);
      },
    });
  });
  return _target;

  function deepClone(org, tar) {
    var tar = tar || {},
      toStr = Object.prototype.toString,
      arrType = '[object Array]';
    for (var key in org) {
      if (org.hasOwnProperty(key)) {
        if (typeof org[key] === 'object' && org[key] !== null) {
          tar[key] = toStr.call(org[key]) === arrType ? [] : {};
          deepClone(org[key], tar[key]);
        } else {
          tar[key] = org[key];
        }
      } else {
        tar[key] = org[key];
      }
    }
    return tar;
  }
}

let target = { a: 1, b: 2 };
let proxy = new MyProxy(target, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
  },
});
console.log(proxy.a);
proxy.b = 3;
```

### RegExp

#### base

- 构造函数
  - var 变量= `new RegExp ( /\w+/,'gi' )`
  - var 变量=` new RegExp ( '\\w' ,'gi' )`
    - 字符串可以传入变量
- 字面量
  - var rg = /123/; => 里面不能放变量
- flags
  - g 全局匹配
  - m 多行匹配
  - i 忽略大小写
  - s 点号匹配所有字符
  - u unicode
  - y 粘性匹配

#### 静态属性

```js
# RegExp.lastIndex 必须使用全局匹配
指定下一次匹配的起始索引
```

#### 实例属性

```js
# RegExp.prototype.flags
按abcd... 顺序排序
返回修饰符 : string
# RegExp.prototype.dotAll
是否使用了 s 修饰符
# RegExp.prototype.global
是否使用了 g 修饰符
# RegExp.prototype.hasIndices
是否使用了 d 修饰符
# RegExp.prototype.ignoreCase
是否使用了 i 修饰符
# RegExp.prototype.multiline
是否使用了 m 修饰符
# RegExp.prototype.source
返回一个值为当前正则表达式对象的模式文本的字符串
该字符串不会包含正则字面量两边的斜杠以及任何的标志字符
# RegExp.prototype.sticky
是否粘性匹配
# RegExp.prototype.unicode
正则中是否使用了u
```

#### 实例方法

##### RegExp.prototype.exec

```js
# 设置了 g|y 修饰符的时候 上次匹配的位置会记录
lastIndex
如果匹配失败 exec(str)返回null 并将lastIndex重置为0
还会打印出子表达式
# match只会返回匹配的结果
Reg.exec(str)
```

<table class="fullwidth-table">
 <tbody>
  <tr>
   <th>对象</th>
   <th>属性/索引</th>
   <th>描述</th>
   <th>例子</th>
  </tr>
  <tr>
   <td rowspan="4"><code>result</code></td>
   <td><code>[0]</code></td>
   <td>匹配的全部字符串</td>
   <td><code>Quick Brown Fox Jumps</code></td>
  </tr>
  <tr>
   <td><code>[1], ...[<em>n</em> ]</code></td>
   <td>括号中的分组捕获</td>
   <td><code>[1] = Brown<br>
    [2] = Jumps</code></td>
  </tr>
  <tr>
   <td><code>index</code></td>
   <td>匹配到的字符位于原始字符串的基于0的索引值</td>
   <td><code>4</code></td>
  </tr>
  <tr>
   <td><code>input</code></td>
   <td>原始字符串</td>
   <td><code>The Quick Brown Fox Jumps Over The Lazy Dog</code></td>
  </tr>
  <tr>
   <td rowspan="5"><code>re</code></td>
   <td><code>lastIndex</code></td>
   <td>下一次匹配开始的位置</td>
   <td><code>25</code></td>
  </tr>
  <tr>
   <td><code>ignoreCase</code></td>
   <td>是否使用了 "<code>i</code>" 标记使正则匹配忽略大小写</td>
   <td><code>true</code></td>
  </tr>
  <tr>
   <td><code>global</code></td>
   <td>是否使用了 "<code>g</code>" 标记来进行全局的匹配.</td>
   <td><code>true</code></td>
  </tr>
  <tr>
   <td><code>multiline</code></td>
   <td>
    <p>是否使用了 "<code>m</code>" 标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。）</p>
   </td>
   <td><code>false</code></td>
  </tr>
  <tr>
   <td><code>source</code></td>
   <td>正则匹配的字符串</td>
   <td><code>quick\s(brown).+?(jumps)</code></td>
  </tr>
 </tbody>
</table>

#### function

```js
test()      测试正则表达式是否匹配
match(/ /)  写入正则表达式 返回数组
exec()      于检索字符串中的正则表达式的匹配
            如果字符串中有匹配的值，则返回该匹配值，否则返回 null。
replace()   replace(/激情|gay/g, '**')

g          表示全局模式匹配
i          忽略大小写
gi         全局忽略
```

#### 元字符

```js
正则表达式:是匹配字符串

正则表达式的组成:是由元字符或者是限定符组成的一个式子

    元字符:
    .  表示的是:除了\n以外的任意的一个字符   "fdsfs238"
    [] 表示的是:范围,  [0-9] 表示的是0到9之间的任意的一个数字,
       "789"
    [1-7] 表示的是1到7之间的任意的一个数字
    [a-z] 表示的是:所有的小写的字母中的任意的一个
    [A-Z] 表示的是:所有的大写的字母中的任意的一个
    [a-zA-Z] 表示的是:所有的字母的任意的一个
    [0-9a-zA-Z] 表示的是: 所有的数字或者是字母中的一个
    [0-z]
    [] 另一个函数: 把正则表达式中元字符的意义干掉 [.] 就是一个.

    | 或者     [0-9]|[a-z]
               表示的是要么是一个数字,要么是一个小写的字母
    () 分组 提升优先级   [0-9]|([a-z])|[A-Z]
         ([0-9])([1-5])([a-z]) 三组,
          (()(()))  从最左边开始计算


    都是元字符,但是也可以叫限定符,下面的这些
    * 表示的是:前面的表达式出现了0次到多次
       [a-z][0-9]* 小写字母中的任意一个
       后面是要么是没有数字的,要么是多个数字的
       "fdsfs3223323"  [a-z][0-9]*

    +  表示的是:前面的表达式出现了1次到多次
       [a-z][9]+  小写字母一个后面最少一个9,或者多个9
       "fesfewww9fefds"

    ?  表示的是:前面的表达式出现了0次到1次,最少是0次,最多1次
       另一个含义:阻止贪婪模式
       [4][a-z]? "1231234ij"


     限定符:限定前面的表达式出现的次数
     {} 更加的明确前面的表达式出现的次数
     {0,} 表示的是前面的表达式出现了0次到多次,和 *一样的
     {1,} 表示的是前面的表达式出现了1次到多次,和 +一样的
     {0,1} 表示的是前面的表达式出现了0次到1次,和 ?一样的
     {5,10} 表示的是前面的表达式出现了5次到10次
     {4} 前面的表达式出现了4次
     {,10} 错误的========不能这么写

     ^ 表示的是以什么开始,或者是取非(取反) ^[0-9] 以数字开头
     ^[a-z] 以小写字母开始
     [^0-9] 取反,非数字
     [^a-z] 非小写字母
     [^0-9a-zA-Z_]   _不是特殊符号

     $ 表示的是以什么结束   [0-9][a-z]$  必须以小写字母结束
     ^[0-9][a-z] 相当于是严格模式   "3f2432e"  "4f"
      \d 数字中的任意一个
      \D 非数字中的一个
      \s 空白符中的一个 [\r\n\t\v\f]
      \S 非空白符
      \w 非特殊符号  [0-0A-z_]
      \W 特殊符号    [!\w]
      \b 单词的边界    "what are you no sha lei"
      \B
      [\w\W] ... 匹配所有的
```

#### 反向引用

```js
# 子表达式
(a)
# aaaa 格式 反向引用第几个表达式 \1
var str = 'bbbbaaaaccaaaaaddddaaa'
reg= /(a)\1\1\1/g; // 'aaaa', 'aaaa'
reg= /(\w)\1\1\1/g;
// 'bbbb', 'aaaa', 'aaaa', 'dddd'
# aabb
reg = /(\w)\1(\w)\2/g
// ['bbbb', 'aaaa', 'ccaa', 'aadd', 'ddaa']
# replace $$ 转义 $
var str= 'aabbccdd'
    reg= /(\w)\1(\w)\2/g
var str1 = str.replace(reg,'$2$2$1$1')
// bbaaddcc
var str1 = str.replace(reg,function($,$1,$2){
  return $2+$2+$1+$2
})
// 模板字符串
 var str = "my name is {{name}} sda {{age}}"
  str1 = str.replace(/\{\{(.*?)\}\}/g, function (node, key) {
    return {
      name: 'zs',
      age: '12'
    }[key]
  })
  console.log(str1);
```

#### 正向预查

```js
   ?:n 参与匹配不单独捕获
   ?=n 匹配任何其后紧接着指定字符串n的字符串
     'abcdaccd'  a后面跟的是b的
     'a(?=b)/g'  // a

   ?!n 匹配任何其后紧接着指定字符串不是n的字符串
     'abcdaccda'  a后面跟的不是b的
     'a(?!b)/g'  // a  a
```

#### 贪婪模式

```js
// 默认是匹配最大可能
var str='abcd{{efg}}abcd{{xyc}}'
reg = /{{.*}}/g // {{efg}}abcd{{xyz}}
# 非贪婪模式 *? ?? +?
reg = /{{.*?}}/g // {{efg}} {{xyz}
```

#### 常用正则

```js
# 去除空格
/\s+/g
```

### Date

- var _dt_ = new _Date_();

| 方法                      | 描述                 | 代码                   | 其他 | 注意                    |
| ------------------------- | -------------------- | ---------------------- | ---- | ----------------------- |
| Date.now( );              | H5 浏览器 毫秒用这个 | var _tm_=_Date_.now(); |      | tm 就是数值             |
| _dt_.getFullYear()        | 获取年份             |                        |      |                         |
| dt.getMonth()+1           | 获取月份             | 从 0 开始              |      | 真实的月份是需要加 1 的 |
| dt.getDate()              | 获取日期             |                        |      |                         |
| dt.getHours()             | 获取小时             |                        |      |                         |
| dt.getMinutes()           | 获取分钟             |                        |      |                         |
| dt.getSeconds()           | 获取秒               |                        |      |                         |
| dt.getDay()               | 获取星期             | 不常用                 |      | 0 指星期天              |
| _dt_.toDateString()       | 英文的日期           | 不常用                 |      | Fri Aug 28 2020         |
| _dt_.toLocaleDateString() | 数字格式日期         | 不常用                 |      | 2020/8/28               |
| _dt_.toTimeString()       | 小时分钟秒           | 不常用                 |      | 17:05:46 GMT+0800       |
| _dt_.toLocaleTimeString() | 时间段 小时分钟秒    | 不常用                 |      | 下午 5:05:46            |
| _dt_.valueOf()            | 毫秒值               | 不常用                 |      | 1598605546006           |
| var _dt_=+new _Date_();   | 毫秒数               | +号 只支持 Date 对象   |      | _console_.log(_dt_);    |
| dt.getTime()              | 毫秒数               |                        |      |                         |

```javascript
var dt = new Date();
function getDate(dt) {
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var hour = dt.getHours();
  var minute = dt.getMinutes();
  var second = dt.getSeconds();
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return (
    year +
    '年' +
    month +
    '月' +
    day +
    '日 ' +
    hour +
    ':' +
    minute +
    ':' +
    second
  );
}
console.log(getDate(dt));
```

### Function

```js
 const test = new Function('a', 'b', 'c', 'console.log(a+b+c)')

   const test = new Function('a,b,c', 'console.log(a+b+c)')

  test(1, 2, 3) // 6
#
var a=1，
b=2;
function test (){
  var b= 3;
  return new Function('c','console.log(a+b+c)')
// eval('!function _(c){console.log(a+b+c)}(4)')
// 8
}
var t= test()
t(4) // 7
// 不会闭包 直接使用全局的变量或自己Function内部定义的
// node的全局在global
//  用var定义的 获取不到 会直接报错
//  用eval定义的 可以访问内部作用域
```

### undefined

- 不可写 不可配置 不可枚举 不可配置

```js
# 既是一个原始数据类型 也是一个原始值类型

undefined == null //true
判断值为空情况下不用两个都写
# 局部作用域可以定义叫做 undefined的变量
```

### void

```js
// 返回undefined
void 0 === undefined;
// 可以防止别人用undefined做变量 导致判断错误
```

### 不常用对象

#### Symbol

#### Reflect

- 反射 内置对象 方法集合的容器
- 不是构造函数 只能点出来方法
- 类似 Math 都是静态方法
- 与 Proxy 方法相似

```js
Reflect.ownKeys方法返回一个由指定对象自身的属性键组成的数组，包括不可枚举属性与Symbol属性，它的返回值等同于Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target))。

#
Reflect.get(target, key, value, reciver)
target[key] = value;
```

#### WeakMap

- 弱引用
- 如果传入当做 key 的变量引用没了 就自动垃圾回收了

```js
{} 键名只能是字符串
Map 键名可以是任意类型 {} []
WeakMap 键名只能是对象
```

#### WeakSet

#### WeakRef

- WeakRef 对象允许您保留对另一个对象的弱引用，而不会阻止被弱引用对象被 GC 回收

#### BigInt

- 只表示整数 没有位数的限制

#### eval

- 耗费性能
- 执行了两次 一次解析成 js 一次执行

```js
eval('!function _(c){console.log(a+b+c)}(4)');
```

## 2. 表格式和运算符

### ${}

```js
# 模板字符串
`aaaa
${xxx}`
等同于
'aaa\n'+xxx+''
```

### ~~

```js
// 用于向下取整
~~1.5; // 1
```

### !!

```js
// 用于转换成布尔值
console.log(!!7); // true
console.log(!![]); // true
console.log(!!{}); // true
console.log(!!null); // false
console.log(!!undefined); // false
```

### \*\*

```js
// 指数运算
Math.pow(7, 2) == 49;
7 ** 2 == 49;
```

### ?. ??

```js
// 链判断运算符
# ?.
a ?. b
// 如果左侧对象为 null 或 undefined 就不再往下进行直接返回 undefined
# 使用方式
obj?.prop
obj?.[expr]
arr?.[index]
func?.(args)
// 和正常一样 就是加了个 符号  如果不存在就返回undefined
# ??
a ?? b
//当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
```

### >>

```js
     9 (十进制): 00000000000000000000000000001001 (二进制)
                  --------------------------------

9 >> 2 (十进制): 00000000000000000000000000000010 (二进制) = 2 (十进制)

// 9>>2 =2

```

### n&(n-1)

```js
# 将n的二进制表示中的最低位为1的改为0
n&(n-1)
# 判断一个数是否是2的方幂
n > 0 && ((n & (n - 1)) == 0 )
# 求某一个数的二进制表示中1的个数
var hammingWeight = function(n) {
    let ret = 0;
    while (n) {
        n &= n - 1;
        ret++;
    }
    return ret;
};
```

### 属性名表达式

- 将表达式 放在 [ ]内
  - [e.target.name] => [username] => username

### 相等性

- `全等 === `
- 等于 ==
- 零值相等 -0 === +0
- 同值相等 -0 !== +0 NaN === NaN
  - Object.definedProperty 定义 value 的时候

```js
# 严格相等 === Strict Equality
// 引用值必须是同一地址 不进行隐式转换
+0 === -0   // true
{} === {}   // false
NaN === NaN // false
Infinity === Infinity // true
+Infinity === -Infinity // false
undefined == null
# 分严格 (抽象/非约束) 相等 == Abstract Equality
// 隐式类型转换 转换后用严格模式判断
//窄对象 Narrow Object =>document.all 待定的类型
// falsy值 8个
   // 0 +/-0 8n "" '' `` null undefined NaN
typeof document.all // "undefined"
document.all == 'undefined' // true
# Object.is(v1,v2) 判断两个参数是否是同一个值
// 同值相等的实现
+0 === -0 //true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
# 重写Object.is
 Object.myIs = function (a, b) {
    if (a === b) {
      // 1/+0 === Infinity
      // 1/-0 === -Infinity
      return a !== 0 || 1 / a === 1 / b
    }
    return a !== a && b !== b
  }
  const result = Object.myIs(NaN, NaN)
  console.log(result); // true
```

### new

- 一旦 new 了就是基本包装类型
- 除了 new Object 指向引用是全等的
- 其他都是不全等的,两个等号会自动转换

```js
var obj = {}
var newObj = new Object(obj)
// true 引用 object.prototype
console.log(newObj === obj)
#
let arr = [1,2,3]
let newArr = new Array(arr)
// let newArr = new Array(arr,3,4,5)
console.los(arr === newArr) //false
#
var a = 1
var newA = new Number(a)
console.log(a===newA) //false 原始类型和包装类型不相等
console.log(a==newA) // true 非严格基本包装类型自动转换

# 重写
  function myNew() {
    var constructor = [].shift.call(arguments)
    var _this = {};
    _this.__proto__ = constructor.prototype;
    var res = constructor.apply(_this, arguments)
    return typeof res === 'object' ? res : _this
  }

  function Test(a, b) {
    this.a = a;
    this.b = b;
    // return {
    //   c: 3,
    //   d: 4
    // }
  }
  Test.prototype.add = function () {
    return this.a + this.b;
  }
  var test = myNew(Test, 1, 2)
  // console.log(Test(1, 2));
```

## 3. 语句和声明

#### for-in

- for-in 循环还会枚举原型链属性
  - 不包括`Symbol`属性。
  - Object.entries() 不会
- 遍历可枚举无序对象

#### for-of

- 与 forEach 相比 他可以 return
- 只要 prototype 有 Symbol.iterator 就可以用
- Map Set String Array arguments
- object 不能用

```js
const m = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
for (const [k, v] of m) {
  console.log(k, v);
}
```

#### Symbol.iterator

- 不可写 不可枚举 不可拓展
- @@iterator 方法在不传参的时候就会诶调用
- generator

```js
# 没有 return 就结束了  可以通过yield 返回多次
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
  let g = foo() //这个g不执行 只有通过 next() 才执行
  g.next()
# .next()
当 console.log(g.next())的时候
依照顺序 依次先执行 yield 最后执行 return 的东西
每次遇到 yield 就返回一个对象{value: x, done: true/false} 然后暂停

     value 就是 yield 的返回值 done:false

     done:true 的时候这个函数就执行完毕了 value 就是函数 return 的值
# next()可以接受传参 这个参数是上一个 yield 语句的返回值
...
let a = yield 1+1
// console.log(a) 2
...
console.log(g.next(2))
# 手动实现
 const o = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
  }
  Object.prototype[Symbol.iterator] = function () {
    var index = 0;
    var _this = this;
    return {
      next() {
        return index < _this.length
          ?
          { value: _this[index++], done: false }
          :
          { value: undefined, done: true }
      }
    }
  }
  for (const v of o) {
    console.log(v)  // 1 2 3
  }
```

#### esmodules

```js
// 必须加js后端 必须以服务器形式启动  npx server
// nomodule 兼容不支持esmodules的浏览器
<script type="module" nomodule src='xxx/js'>
    import('./index.js').then(() => {

    })
  </script>
# 导出json
  fetch('./db.json').then(async (res) => console.log(await res.json()))
# import.map
//html
<script type="importmap">
  {
    "imports":{
      "vue":"https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js"
    }
  }
</script>
<script type="module" src="/index.js"></script>

//index.js
 import Vue from 'vue'
 new Vue({
    el: '#container',
    data:{
    name: 'Bob'
    }
 })
# import.meta

 <script type="module" src="/index.js"></script>
 //index.js
 console.log(import.meta.url) //输出http://localhost:8080/index.js
#  import.meta.scriptElement
元属性  返回加载模块的那个<script>元素，相当于document.currentScript属性
```

#### Import

- node. => >=V14.5.1. &&package.json "type":"module"
- commentjs 的模块是变量是拷贝了一份 没有引用关系

  - 在运行时加载

- es6 有引用关系
  - 在编译时加载

```javascript
 # 1. 默认导入|导出
 默认导入  =>  import  接收名称   from '模块标识符'
 默认导出  =>  export default
       每个模块中 只能使用唯一的一次 export default
 # 2. 按需导入|导出
 按需导入 =>  import m1, { s1, s2 as ss2, say } from "./1";
             可以使用as改别名
 按需导出 =>   export let s1 = 'aaa'  可以使用多次
 # 3. 直接导入并执行模块代码
  import './m2.js'
 # 导入所有按需导出
 - import * as xxx from '/'
 - 得到的xxx是一个对象
# 动态导入
let flag = false
if (flag) {
	System.import('./1.css')
		.then(() => {

		})
} else {
	System.import('./2.css')
		.then(() => {

		})
}
#
require.ensure([],function(_require){
  _require('./xxx')
})


async function importModule() {
   try {
      const module = await import('./path/module.js');
   } catch (error) {
      console.error('import failed');
   }
}
#
webpack的默认配置 @就是指项目里的src

文件导入 =>  import request from '@/utils/request'
less    =>  @import './icon.less';
css导入  =>  	background: url("~@/assets/banner.png");
```

## 5. Class

#### 类表达式

```js
const aaa = class {
  // 匿名
}
const bbb = class ccc {
  ccc.name
  // 只有内部可以访问ccc
}
```

#### 4 个状态

##### public

```js
实例和父类能都访问;
```

##### static

```js
// 只能父类点出来
// 类似于直接在 Person.prototype.aaaa = '孙悟空'
//  constructor() { this.bbb = 12; }
class Person {
  static aaaa: string = ' 孙悟空';
  bbb: number = 12;
}
const per = new Person();
console.log(Person.aaaa);
```

##### private

```js
// private    私有的         外界无法访问 不能被继承
为了避免直接修改 class中的属性 产生数据混乱
用private 定义属性 拒绝外界访问
同时在class内部 定义 getter setter 向外界开放 获取和修改的方法
内部可以设计 方法的权限
class Person {
  _name: string;
  private _age: number;
  constructor(_name: string, _age: number = 10) {
    this._name = _name;
    this._age = _age;
  }
  get age() {
    return this._age
  }
  set age(value: number) {
    if (value < 10) {
      this._age = value
    }
  }
}
const per = new Person('张三', 10)
per.age = 200
console.log(per) //10
```

##### protected

```js
// protected  受保护的       外界无法访问 可以被继承
```

#### readonly

```js
readonly ccc: string = 'ss'
static readonly ccc: string = 'ss'
```

#### get set

```js
// 手动定义 获取和更改方法 的computed
// get 定义的 可以直接点出来 不用调方法
// 如果不是关键字 get 就得使用定义的方法修改
class Person {
  _name: string;
  private _age: number;
  constructor(_name: string, _age: number = 10) {
    this._name = _name;
    this._age = _age;
  }
  get age() {
    return this._age
  }
  set age(value: number) {
    if (value < 10) {
      this._age = value
    }
  }
}
const per = new Person('张三', 10)
per.age = 200
console.log(per) //10
```

#### constructor

##### constructor

```js
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
 // 让函数内部的this指向固定
 // this.book = this.book.bind(this)

    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log('hello')
  }
}
const per: Person = new Person('2', 2)
# 或者
class Person {
  constructor(public name: string,public age: number) {
  }
  sayHi() {
    console.log('hello')
  }
}
const per: Person = new Person('2', 2)
```

##### super

```js
class Animal {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHi() {
    console.log('sss');
  }
}

class Cat extends Animal {
  type: string;
  constructor(name: string, age: number, type: string) {
    super(name, age);
    this.type = type;
  }
  sayHi() {
    super.sayHi();
  }
}
new Cat('as', 1, 'asd').sayHi();
```

#### extends

```js
子类重写方法 在子类中 会覆盖父类的方法
// 如果要加属性 必须写super 重写属性
```

#### implements

```js
# implements  需要重写属性和方法
class A implements 接口{
   /**
    * @override
    */
}
// 不用定义 super() 可以重写 属性和方法
```

#### abstract

```js
# 抽象类 禁止被实例化 用来被继承的
abstract class Parent{

}
# 父类指定结构 子类来实现 避免忘记重写方法导致使用默认的方法
// 抽象方法只能以abstract开头 没有方法体
// 只能定义在抽象类里面 子类必须重写
abstract class Parent{
 abstract sayHi():void;
}
```

## 6.websocket

#### 前端发送请求

```js
// ws:借用http  wss:借用https
new WebSocket('ws://127.0.0.1:8080')
# 监听事件
webSocket.onopen = function(){
// 0链接还没有建立/正在建立 1链接建立成功 2链接正在关闭 3链接已经关闭
  console.log(webSocket.readyState)
}
# 发送数据
// 当点击按钮时候 发数据
  websocket.send('数据')
# 接受数据
websocket.onmessage = function({data}){
  console.log(data)
}
```

#### webSocket-node

```js
import webSocketServer from 'websocket'
import http form 'http'
const server = http.createServer((req,res)=>{
})

server.listen(3000,()=>'localhost://3000')
const webSocketServer = new webSocketServer({
   httpServer:server,
   autoAcceptConnections:false  // http 跨域控制
})

// 开启链接
webSocketServer.on('request',(req)=>{

  if(!orginIsAllowed(req.origin)){//允许的请求
    request.reject()
    return;
  }

  let connection = request.accept('echo-protocol');
  // 有消息过来了
  connection.on('message',(message)=>{
     connection.sendBytes()
     // 给前端发送数据
     connection.send('发送数据')
  })

  connection.on('close',(reasonCode,description)=>{
    // 断开链接
  })
})
# 识别不同的客户端
let conArr = []
webSocketServer.on('request',(req)=>{
  let connection = req.accept()
  conArr.push(connection)

  connection.on('message',(msg)=>{
     for(let i =0;i<conArr.length;i++){
       conArr[i].send('xxx')
      // 为不同的客户端返回不同的数据
     }
  })
})
```

#### ws

```js
# open close error message connection
yarn add ws
#
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
```

#### 项目

```js
# model
*fetch({ payload: { listData } }, { call, put, select }) {
      let { dd, dindex } = yield select((state) => state.MoltenIronLadle);
      dd.push({
        year: listData.monitorCPU[0][0],
        value: listData.monitorCPU[0][1],
      });
      if (dd.lenth > 300) {
        dd.splice(0, dd.lenth - 300);
      }
      yield put({
        type: 'save',
        payload: {
          dd: dd,
          dindex: ++dindex,
        },
      });
    },

openSocket({ dispatch }) {
      return webServer.websocketPromise((data) => {
        dispatch({ type: 'fetch', payload: { listData: data } });
      });
    },
```

```js
# websockt
/*
 * url 定义路由参数
 *
 */
export function websocketPromise(action) {
  let ws;
  ws = new WebSocket('ws://47.96.224.206:8080/ws/monitor');
  ws.onopen = (wtr) => {
    ws.send('12321');
  };
  ws.onmessage = function ({ data }) {
    if (data.indexOf('monitorCPU') > -1) {
      let list = eval('(' + data + ')');
      action(list);
    }
  };
  ws.onclose = function (evt) {
    console.log('Connection closed.');
  };
  return ws;
}

```

## 7. SSE

- Server-sent Events 服务端主动推送

#### socket.io@4.1.2

```js
# 对websocket的封装
import {createServer} form 'http'
import {Server} form 'socket.io'
const httpServer = createServer()
const io = new Server(httpServer,{
  // 允许跨域
  cors:{
    origin:"*",
    methods:['GET','POST']
  }
})
io.on("connection",(socket)=>{
  socket.on("自定义事件1",(data)=>{
    socket.emit()
    io.emit('自定义事件2',数据)
  })
})
httpServer.listen(3000)
```

#### 前端

```js
# 引入 socket.io.min.js
const socket = io.connect('http://127.0.0.1:8000')
// 点击按钮时
socket.emit('自定义事件1',发送数据)
// 接受数据
socket.on('自定义事件2',(data)=>{ })
```
