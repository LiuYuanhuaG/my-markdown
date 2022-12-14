# 内置对象

## 值属性

这些全局属性返回一个简单值，这些值没有自己的属性和方法

### [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

​ 一个数值 表示无穷大 只读

### [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

非数字

```js
NaN === NaN; // false
Number.NaN === NaN; // false
isNaN(NaN); // true
isNaN(Number.NaN); // true

function valueIsNaN(v) {
  return v !== v;
}
valueIsNaN(1); // false
valueIsNaN(NaN); // true
valueIsNaN(Number.NaN); // true

isNaN('hello world'); // true 如果当前值是 NaN，或者将其强制转换为数字后将是 NaN
Number.isNaN('hello world'); // false 仅当值当前为 NaN 时才为 true
```

### [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)

全局 undefined 表示的是原始值 undefined 为原始数据类型

### [`globalThis`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

用于在不同环境中获取全局对象

## 函数属性

全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

### [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)

将传入的字符串当作 js 代码执行

```js
console.log(eval('2 + 2')); // 4   建议使用Function('return 1+1')()
```

isFinte()

判断数字是否是一个有限数字

```js
isFinite('1t' / 2); // false
isFinite('1' / 2); // true
isFinite(NaN); // false
isFinite(Infinity); // false
isFinite('cxczxc'); // false
isFinite(-Infinity); // false
isFinite(0); // true
isFinite(2e64); // true，在更强壮的 Number.isFinite(null) 中将会得到 false
isFinite('0'); // true，在更强壮的 Number.isFinite('0') 中将会得到 false
```

### isNaN()

用来确定一个值是否为[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN). 还可以通过 Namber.isNaN （传入值只当为 NaN 时为 true） 来判断 NaN 。两者有些许区别

### parseFloat()

函数解析一个参数（必要时先转换为字符串）并返回一个浮点数 不能转换则返回 NaN

### [`parseInt(string, radix)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

解析一个字符串并返回指定基数的十进制整数，`radix` 是 2-36 之间的整数，表示被解析字符串的基数,也就是进制数 （可选）。

```js
parseInt('123', 5); // 将'123'看作 5 进制数，返回十进制数 38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
parseInt(4.7 * 1e22, 10); // 非常大的数值变成 4
parseInt(0.00000000000434, 10); // 非常小的数值变成 4 而不是0
```

### decodeURI()

函数能解码由[`encodeURI`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) 创建或其它流程得到的统一资源标识符（URI）

### encodeURI()

编码 URI

```js
const uri = 'https://mozilla.org/?x=шеллы';
const encoded = encodeURI(uri);
console.log(encoded); // https://mozilla.org/?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B
const decode = decodeURI(encoded);
console.log(decode); // https://mozilla.org/?x=шеллы
```

### decodeURIComponent

用于解码由 [`encodeURIComponent`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) 方法或者其它类似方法编码的**部分**统一资源标识符（URI）

### encodeURIComponent

将一个，两个，三个或四个表示字符的 UTF-8 编码的转义序列替换某些字符的每个实例来编码 [URI](https://developer.mozilla.org/zh-CN/docs/Glossary/URI)（对于由两个“代理”字符组成的字符而言，将仅是四个转义序列）

```js
const str = `?x=${encodeURIComponent('шеллы')}`;
console.log(str); //"?x=%D1%88%D0%B5%D0%BB%D0%BB%D1%8B"
console.log(decodeURIComponent(str)); // ?x=шеллы
```

## 基本对象

## [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

**`Object`** 是 JavaScript 的一种 [数据类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures) 。它用于存储各种键值集合和更复杂的实体。Objects 可以通过 `Object()` 构造函数或者使用 [对象字面量](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer) 的方式创建

### 常用

### Object.create

用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）

- proto

新创建对象的原型对象。

- propertiesObject 可选

如果该参数被指定且不为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则该传入对象的自有可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）将为新创建的对象添加指定的属性值和对应的属性描述符。这些属性对应于 [`Object.defineProperties()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 的第二个参数。

```js
let _obj = {
  foo: 'foo',
};
let obj = Object.create(_obj, {
  cc: {
    value: 111654,
    writable: true,
    enumerable: true,
  },
});
console.log(obj); // {cc: 111654}
obj.foo; //继承属性
obj.cc; // 属于自有属性
```

### Object.assign

方法将所有[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)（`Object.propertyIsEnumerable()` 返回 true）的[自有](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)（`Object.hasOwnProperty()` 返回 true）属性从一个或多个源对象复制到目标对象，返回修改后的对象。

```js

  var obj = Object.create({ foo: 1 });
  Object.defineProperties(obj, {
    name: {
      value: '张三',
      configurable: false,
      writable: true,
      enumerable: false // 不允许被枚举
    },
    age: {
      // value: 18,
      set(newVale) {
        this.name_age = this.name + newVale
      },
      get() {
        return this.name_age
      },
      configurable: true,
      enumerable: true
    }
  })
  obj.age = 22
  const target = { a: 1, b: 2 };
  const source = { b: 4, c: 5 };
  const returnedTarget = Object.assign(target, source, obj);
# 继承属性非自有 不可枚举 都无法拷贝合并 且为浅拷贝
   console.log(target, target.foo, obj.foo); // {a: 1, b: 4, c: 5, age: '张三22', name_age: '张三22'} undefined 1
```

### Object.keys

返回一个给定对象的所有可枚举属性的属性名组成的数组 ，其属性名先后顺序与遍历时一致

```js
// 简单数组
const arr = ['a', 'b', 'c'];
console.log(Object.keys(arr)); // console: ['0', '1', '2']

// 类数组对象
const obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.keys(obj)); // console: ['0', '1', '2']

// 具有随机键顺序的类数组对象
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj)); // console: ['2', '7', '100']

// getFoo 是一个不可枚举的属性
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  },
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // console: ['foo']
// In ES2015+    ES2015之下版本会报错
Object.keys('foo'); // ["0", "1", "2"]
```

### Object.values

返回一个给定对象自身的所有可枚举属性值的数组 顺序与 for...in 相同 但是 for...in 会遍历不可枚举属性

```js
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
var obj = { foo: 'bar', baz: 42 };
console.log(Object.values(obj)); // ['bar', 42]
console.log(Object.values('foo')); // ['f', 'o', 'o']
```

### Object.toString

返回表示该对象的字符串

每个对象都有一个 `toString()` 方法，当该对象被表示为一个文本值时，或者**一个对象以预期的字符串方式引用时自动调用**。默认情况下，`toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖 **Number Array 等都不尽相同**，`toString()` 返回 "[object *type*]"，其中 `type` 是对象的类型。以下代码说明了这一点

用来判断类型 ：

```js
var str = new String(222);
console.log(str.toString()); // 222
var arr = ['cxzcz', 5, '--', 'vvv'];
console.log(arr.toString()); // 'cxzcz,5,--,vvv'   会展开数组 的字符串
// 需要使用 Object.prototype.toString 来判断 防止被覆盖
var toString = Object.prototype.toString;

toString.call(new Date()); // [object Date]
toString.call(new String()); // [object String]
toString.call(Math); // [object Math]

//Since JavaScript 1.8.5
toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

### Object.prototype.toLocaleString

**`toLocaleString()`** 方法返回一个该对象的字符串表示。此方法被用于派生对象为了特定语言环境的目的（locale-specific purposes）而重载使用。

`toLocaleString` 返回调用 toString()的结果

```js
let date = new Date();
console.log(date.toLocaleString()); // 2022/10/11 16:01:34
console.log(date.toString()); // Tue Oct 11 2022 16:01:34 GMT+0800 (中国标准时间)
```

### Object.prototype.valueOf

返回指定对象的原始值 一般会自动调用

### Object.entries

返回一个给定对象自身可枚举的键值对数组，其排列与使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）

```js
let _obj = {
  a: 1,
  b: 2,
};
let obj = Object.create(_obj); // 继承_obj属性
// 添加自有属性
obj.d = '_d';
obj.f = '_f';
console.log(obj.a); // 1
console.log(Object.entries(obj)); //[["d","_d"],["f","_f"]]
```

### Object.fromEntries

把键值对列表转换为一个对象

`Object.fromEntries` 是与 [`Object.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) 相反的方法，用 [数组处理函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#methods_2) 可以像下面这样转换对象

```js
const object1 = { a: 1, b: 2, c: 3 };

const object2 = Object.fromEntries(
  Object.entries(object1).map(([key, val]) => [key, val * 2]),
);

console.log(object2); // { a: 2, b: 4, c: 6 }

//Map 转化为 Object
const map = new Map([
  ['foo', 'bar'],
  ['baz', 42],
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

### Object.is

方法判断两个值是否为[同一个值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

Object.is() 与 **==** 区别在于处理 时会强制转换 而 is 不会

Object.is() 与 **===** 区别在于处理 NaN -0 ===+0 (**==** 同样)

前往[mdn](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is#%E4%BD%BF%E7%94%A8_object.is)查看

```js
Object.is(25, 25); // true
Object.is('foo', 'foo'); // true
Object.is('foo', 'bar'); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
```

### Object.hasOwn

查询给定属性是否是自有属性且存在

```js
const object1 = {
  prop: 'exists',
};

console.log(Object.hasOwn(object1, 'prop'));
// expected output: true

console.log(Object.hasOwn(object1, 'toString'));
// expected output: false

console.log(Object.hasOwn(object1, 'xxx'));
// false
```

### Object.prototype.hasOwnProperty

查询给定属性是否是自有属性且存在 与**hasOwn**不同在于 该方法存在于原型链上 可由对象直接点出

```js
const object1 = {
  prop: null,
};
Object.defineProperty(object1, 'c', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: '55555555',
});
console.log(Object.hasOwn(object1, 'prop')); // true
console.log(Object.hasOwn(object1, 'toString')); // false
console.log(Object.hasOwn(object1, 'xxx')); // false
console.log(Object.hasOwn(object1, 'c')); // true
```

### Object.prototype.isPrototypeOf

测试一个对象是否存在于另一个对象的原型链上 `__proto__`

```js
//prototypeObj.isPrototypeOf(object)
let obj = {
  c: '1',
};

let _obj = Object.create(obj);

console.log(obj.isPrototypeOf(_obj)); // true
console.log(_obj.__proto__ === obj); // true
function Foo() {}
function Bar() {}
function Baz() {}

Bar.prototype = Object.create(Foo.prototype);
Baz.prototype = Object.create(Bar.prototype);

var baz = new Baz();

console.log(Baz.prototype.isPrototypeOf(baz)); // true
console.log(Bar.prototype.isPrototypeOf(baz)); // true
console.log(Foo.prototype.isPrototypeOf(baz)); // true
console.log(Object.prototype.isPrototypeOf(baz)); // true
```

###

### 不常用

### Object.freeze

冻结对象 使其不可配置，不可修改删除添加。但只是浅冻结 。返回值为冻结对象本身

```js
let obj = Object.create({});

obj.c = '_c';
obj.g = {};
delete obj.c;
obj.d = '_d';
let c = Object.freeze(obj);
delete obj.d;
obj.f = '_f';
obj.g.c = '_c';
console.log(obj, obj === c); //{d: '_d',g:{c:'_c'}} true
//------------------------------------------------------------------------
//深冻结函数。
function deepFreeze(obj) {
  // 取回定义在 obj 上的属性名
  var propNames = Object.getOwnPropertyNames(obj);
  console.log(propNames, 'propNames');
  // 在冻结自身之前冻结属性
  propNames.forEach(function (name) {
    var prop = obj[name];

    // 如果 prop 是个对象，冻结它
    if (typeof prop == 'object' && prop !== null) deepFreeze(prop);
  });

  // 冻结自身 (no-op if already frozen)
  return Object.freeze(obj);
}
deepFreeze(obj);
```

### Object.isFrozen

方法判断一个对象是否被冻结

```js
// 一个对象默认是可扩展的，所以它也是非冻结的。
Object.isFrozen({}); // === false

// 一个不可扩展的空对象同时也是一个冻结对象。
var vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen); //=== true;

// 一个非空对象默认也是非冻结的。
var oneProp = { p: 42 };
Object.isFrozen(oneProp); //=== false

// 让这个对象变的不可扩展，并不意味着这个对象变成了冻结对象，
// 因为 p 属性仍然是可以配置的 (而且可写的).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp); //=== false

// 此时，如果删除了这个属性，则它会成为一个冻结对象。
delete oneProp.p;
Object.isFrozen(oneProp); //=== true

// 一个不可扩展的对象，拥有一个不可写但可配置的属性，则它仍然是非冻结的。
var nonWritable = { e: 'plep' };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, 'e', { writable: false }); // 变得不可写
Object.isFrozen(nonWritable); //=== false

// 把这个属性改为不可配置，会让这个对象成为冻结对象。
Object.defineProperty(nonWritable, 'e', { configurable: false }); // 变得不可配置
Object.isFrozen(nonWritable); //=== true

// 一个不可扩展的对象，拥有一个不可配置但可写的属性，则它仍然是非冻结的。
var nonConfigurable = { release: 'the kraken!' };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, 'release', { configurable: false });
Object.isFrozen(nonConfigurable); //=== false

// 把这个属性改为不可写，会让这个对象成为冻结对象。
Object.defineProperty(nonConfigurable, 'release', { writable: false });
Object.isFrozen(nonConfigurable); //=== true

// 一个不可扩展的对象，值拥有一个访问器属性，则它仍然是非冻结的。
var accessor = {
  get food() {
    return 'yum';
  },
};
Object.preventExtensions(accessor);
Object.isFrozen(accessor); //=== false

// ...但把这个属性改为不可配置，会让这个对象成为冻结对象。
Object.defineProperty(accessor, 'food', { configurable: false });
Object.isFrozen(accessor); //=== true

// 使用 Object.freeze 是冻结一个对象最方便的方法。
var frozen = { 1: 81 };
Object.isFrozen(frozen); //=== false
Object.freeze(frozen);
Object.isFrozen(frozen); //=== true

// 一个冻结对象也是一个密封对象。
Object.isSealed(frozen); //=== true

// 当然，更是一个不可扩展的对象。
Object.isExtensible(frozen); //=== false
```

### Object.seal

方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要原来是可写的就可以改变。**与 freeze 不同在于 seal 可以改变当前可写值**

```js
const object1 = {
  property1: 42,
};
Object.seal(object1);
object1.property1 = 33;
console.log(object1.property1); // 33
delete object1.property1; // cannot delete when sealed
console.log(object1.property1); // 33
```

### Object.isSealed

判断方法是否被封闭

```js
// 新建的对象默认不是密封的。
var empty = {};
Object.isSealed(empty); // === false

// 如果你把一个空对象变的不可扩展，则它同时也会变成个密封对象。
Object.preventExtensions(empty);
Object.isSealed(empty); // === true

// 但如果这个对象不是空对象，则它不会变成密封对象，因为密封对象的所有自身属性必须是不可配置的。
var hasProp = { fee: 'fie foe fum' };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // === false

// 如果把这个属性变的不可配置，则这个属性也就成了密封对象。
Object.defineProperty(hasProp, 'fee', {
  configurable: false,
});
Object.isSealed(hasProp); // === true

// 最简单的方法来生成一个密封对象，当然是使用 Object.seal.
var sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // === true

// 一个密封对象同时也是不可扩展的。
Object.isExtensible(sealed); // === false

// 一个密封对象也可以是一个冻结对象，但不是必须的。
Object.isFrozen(sealed); // === true，所有的属性都是不可写的
var s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // === false，属性"p"可写

var s3 = Object.seal({
  get p() {
    return 0;
  },
});
Object.isFrozen(s3); // === true，访问器属性不考虑可写不可写，只考虑是否可配置
```

### Object.preventExtensions

让一个对象变的不可扩展，也就是永远不能再添加新的属性 可以删除

```js
const object1 = { a: 1, b: 2 };
Object.preventExtensions(object1);
try {
  object1.cc = 1;
  delete object1.a;
  console.log(object1); // {b: 2}
  Object.defineProperty(object1, 'property1', {
    value: 42,
  });
} catch (e) {
  console.log(e);
  // expected output: TypeError: Cannot define property property1, object is not extensible
}
```

### Object.isExtensible

判断对象是否可扩展

默认情况下，对象是可扩展的：即可以为他们添加新的属性。以及它们的 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)已弃用 属性可以被更改。[`Object.preventExtensions`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)，[`Object.seal`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) 或 [`Object.freeze`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 方法都可以标记一个对象为不可扩展（non-extensible）。

```js
// 新对象默认是可扩展的。
var empty = {};
Object.isExtensible(empty); // === true

// ...可以变的不可扩展。
Object.preventExtensions(empty);
Object.isExtensible(empty); // === false

// 密封对象是不可扩展的。
var sealed = Object.seal({});
Object.isExtensible(sealed); // === false

// 冻结对象也是不可扩展。
var frozen = Object.freeze({});
Object.isExtensible(frozen); // === false
```

### Object.getOwnPropertyDescriptor

返回指定对象上一个自有属性对应的属性描述符 (自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性)

```js
let owns = { cc: 1 };
let owns2 = {
  get cc() {
    return 11;
  },
};
let _ow = Object.getOwnPropertyDescriptor(owns, 'cc');
let _ow2 = Object.getOwnPropertyDescriptor(owns2, 'cc');
console.log(_ow); //{value: 1, writable: true, enumerable: true, configurable: true}
console.log(_ow2); //{set: undefined, enumerable: true, configurable: true, get: ƒ}
```

### Object.getOwnPropertyDescriptors

方法用来获取一个对象的所有自身属性的描述符

```js
let owns = {
  cc: 1,
  get ccv() {
    return 11;
  },
};
let owns2 = 1;
let _ow = Object.getOwnPropertyDescriptors(owns);
let _ow2 = Object.getOwnPropertyDescriptors(owns2);
console.log(_ow); //{"cc": {"value": 1,"writable": true,"enumerable": true,"configurable": true},"ccv": {"enumerable": true,"configurable": true}}
console.log(_ow2); //{}
```

### Object.getPrototypeOf

方法返回指定对象的原型（内部`[[Prototype]]`属性的值）

```js
const prototype1 = {};
const object1 = Object.create(prototype1);

console.log(Object.getPrototypeOf(object1) === prototype1); // true
var reg = /a/;
Object.getPrototypeOf(reg) === RegExp.prototype; // true
```

### Object.getOwnPropertyNames

获取指定对象的所有自有属性名，包括不可枚举属性

```js
let obj = {
  c: '1',
};
let _obj = Object.create(obj, {
  a: {
    value: 'a',
    enumerable: true,
  },
  b: {
    writable: true,
    enumerable: false,
  },
});
_obj[Symbol.for('b')] = 222;
console.log(Object.getOwnPropertyNames(_obj), Object.keys(_obj)); //{a: 'a', b: undefined, Symbol(b): 222}  ['a', 'b']   ['a']
```

### Object.getOwnPropertySymbols

返回一个给定对象自身的所有 Symbol 属性的数组

```js
var obj = {};
var a = Symbol('a');
var b = Symbol.for('b');

obj[a] = 'localSymbol';
obj[b] = 'globalSymbol';
obj.c = '_c';
var objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols); // [Symbol(a), Symbol(b)]
```

### Object.prototype.propertyIsEnumerable

返回布尔值， 查询属性是否可以被枚举

### Object.defineProperty

方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定 configurable, writable, enumerable ，则这些属性默认值为 false，如果不指定 value, get, set，则这些属性默认值为 undefined

```js
var obj = {};
Object.defineProperty(obj, 'key', {
  enumerable: false, // enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举。
  configurable: false, // configurable 特性表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改。
  writable: false, // 是否能被重新赋值
  value: 'static', // 初始值
  // 自定义getter setter  不可同时设置writable 和 value 属性
  //set(newValue) {
  // 设置值的处理方法
  // return newValue
  // },
  //get(newValue) {
  // 获取值的处理方法
  // return newValue
  // },
});
```

### Object.defineProperties

方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象

```js
var obj = new Object();
Object.defineProperties(obj, {
  name: {
    value: '张三',
    configurable: false,
    writable: true,
    enumerable: true,
  },
  age: {
    // value: 18,
    set(newVale) {
      this.name_age = this.name + newVale;
    },
    get() {
      return this.name_age;
    },
    configurable: true,
    enumerable: true,
  },
});
obj.age = 22;
console.log(obj.name, obj.age, obj); // 张三 张三22 {name: '张三', name_age: '张三22'}
```

###

## Function

function(){}).constructor === Function // true 每一个函数都是 Function 对象

```js
var a = 3;
function fn() {
  var a = 1;
  return Function('return a');
}
console.log(fn()()); // 3  Function构造函数创建的函数不会 创建当前环境的闭包 也就意味着通常情况无法访问到局部变量  ，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造函数创建时所在的作用域的变量。这一点与使用 eval() 执行创建函数的代码不同

// 以下方法可使其访问局部变量
var a = 3;
function fn() {
  var a = 1;
  return Function(`return ${a}`);
}
console.log(fn()()); // 1
```

### 属性

##### Function.prototype.length

指明函数的形参个数

```js
function func1() {}

function func2(a, b) {}

console.log(func1.length); //0
console.log(func2.length); // 2
```

##### Function.prototype.name

获取函数名称

```js
function func1() {}

function func2(a, b) {}

console.log(func1.name); // func1
console.log(func2.name); // func2
```

### 方法

#### Function.prototype.apply

调用一个具有给定 `this` 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数。

```js
function Ctor(val1) {
  console.log(this, val1); // {a: '_a', b: '_B'} 22
  return this.a + this.b + val1;
}
console.log(Ctor.apply({ a: '_a', b: '_B' }, [22, 1])); // _a_B22
let arr = [1, 2, 3];
Array().push.apply(arr, [4, 5]);
console.log(arr); //[1, 2, 3, 4, 5]
```

手动实现

```js
// ES5
# 这里使用eval 是因为 ES5 无法处理数组展开 使用eval 可以通过字符串获取变量，执行函数。Function() 无法获取到局部变量。
# 在通过 字符串拼接 使其数组自动调用toString 方法展开数组为每一个元素拼接的字符串  '_this.fn(' + ['a','b','c'] + ')' ==> '_this.fn(a,b,c)'
  Function.prototype.myApply = function (thisArg, argsArray) {
    var _this = thisArg == null ? globalThis : thisArg
    var _arr = []
    for (var index = 0; index < argsArray.length; index++) {

      _arr.push('argsArray[' + index + ']')
    }
    _this.fn = this
    var res = eval('_this.fn(' + _arr + ')')
    delete _this.fn
    return res
  }
// ES6
Function.prototype.myApply = function (_this,arr) {
    _this = _this == null ? gloablThis : Object(_this)
    let _arr = [];
    for (let i=0; i<arr.length ; i++) {
        _arr.push(arr[i])
    }
    _this.fn = this
  	let res =   _this.fn(..._arr)
    delete _this.fn
    return res
}
```

#### Function.prototype.call

调用一个具有给定 `this` 值的函数，以及以一个或多个参数的形式提供的参数。

```js
function Ctor(val) {
  console.log(this, val); // {a: '_a', b: '_B'} [22, 1]
  return this.a + this.b + val;
}
console.log(Ctor.call({ a: '_a', b: '_B' }, [22, 1])); // _a_B22,1
let arr = [1, 2, 3];
Array().push.call(arr, [4, 5]);
console.log(arr); //[1, 2, 3, Array(2)]
```

手动实现：

```js
  //# ES5
	# 使用eval 原因同 上手动实现apply
  Function.prototype.myCall = function (_this) {
    _this = _this == null ? globalThis : Object(_this)
    var _arr = []
    for (var i = 1; i < arguments.length; i++) {
      _arr.push('arguments[' + i + ']')
    }
    _this.fn = this
    var res = eval('_this.fn(' + _arr + ')')
    delete _this.fn
    return res
  }
  // #ES6
  Function.prototype.myCall = function (_this) {
    _this = _this == null ? globalThis : Object(_this)
    let _arr = []
    for (let i = 1; i < arguments.length; i++) {
      _arr.push(arguments[i])
    }
    _this.fn = this
    let res = _this.fn(..._arr)
    delete _this.fn
    return res
  }

  function Ctor(arr) {
    return this.a + this.b + arr
  }
  console.log(Ctor.myCall({ a: '_a', b: '_B' }, [22, 1])); // _a_B22,1
  let arr = [1, 2, 3]
  Array().push.myCall(arr, [4, 5])
  console.log(arr); //[1, 2, 3, Array(2)]
```

#### Function.prototype.bind

返回一个新的函数。调用时 bind 时 会将第一个参数指定为新函数的 this 并将剩余参数变函数的新参数传递下去。

```js
function Ctor(arr, h) {
  return this.a + this.b + arr + h;
}
console.log(Ctor.bind({ a: '_a', b: '_B' }, [22, 1], 'hahhaha')()); // _a_B22,1hahhaha
let arr = [1, 2, 3];
Array().push.bind(arr, [4, 5])();
console.log(arr); //[1, 2, 3, Array(2)]
```

手动实现：

```js
// # ES5
Function.prototype.myBind = function (_this) {
  _this = _this == null ? globalThis : Object(_this);
  var _arr = [];
  var _arg1 = Array.from(arguments);
  var __this = this;
  for (var index = 1; index < _arg1.length; index++) {
    _arr.push('_arg1[' + index + ']');
  }
  return function () {
    _this._fn_ = __this;
    var _arg2 = Array.from(arguments);
    for (var index = 0; index < _arg2.length; index++) {
      _arr.push('_arg2[' + index + ']');
    }
    var res = eval('_this._fn_(' + _arr + ')');
    delete _this._fn_;
    return res;
  };
};
// #ES6
Function.prototype.myBind = function (_this, ..._arguments) {
  return (..._arg) => {
    let arg = [..._arguments, ..._arg];
    _this = _this == null ? globalThis : Object(_this);
    _this._fn_ = this;
    let res = _this._fn_(...arg);
    delete _this._fn_;
    return res;
  };
};
```

#### Function.prototype.toString

返回一个表示当前函数源代码的字符串

在 `Function` 需要表示为字符串时，JavaScript 会自动调用函数的 `toString` 方法，例如：函数与一个字符串进行拼接。

```js
function test(fn) {
  console.log(fn.toString());
}

function f() {}
class A {
  a() {}
}
function* g() {}

test(f); // "function f() {}"
test(A); // "class A { a() {} }"
test(g); // "function* g() {}"
test((a) => a); // "(a) => a"
test({ a() {} }.a); // "a() {}"
test({ *a() {} }.a); // "*a() {}"
test({ [0]() {} }[0]); // "[0]() {}"
test(
  Object.getOwnPropertyDescriptor(
    {
      get a() {},
    },
    'a',
  ).get,
); // "get a() {}"
test(
  Object.getOwnPropertyDescriptor(
    {
      set a(x) {},
    },
    'a',
  ).set,
); // "set a(x) {}"
test(Function.prototype.toString); // "function toString() { [native code] }"
test(function f() {}.bind(0)); // "function () { [native code] }"
test(Function('a', 'b')); // function anonymous(a\n) {\nb\n}
```

## Math

常用如下查看[其他](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

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

## Date

创建一个新`Date`对象的唯一方法是通过[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符，例如：`let now = new Date();` 若将它作为常规函数调用（即不加 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 操作符），将返回一个字符串，而非 `Date` 对象

一下是常用的：

1970 年 1 月 1 日 0 时 0 分 0 秒（UTC，即协调世界时）

| 方法                 | 描述                                                       | 注意点                    |
| -------------------- | ---------------------------------------------------------- | ------------------------- |
| let now = new Date() | 创建一个新的 Date 对象                                     | 常规函数调用返回字符串    |
| now.getDate()        | 获取 Date 对象中的 日                                      |                           |
| now.getDay()         | 具体日期中一周的第几天                                     | 0-6 ，0 表示星期天        |
| now.getFullYear()    | 指定日期的年份                                             |                           |
| now.getHours()       | 指定的日期对象的小时                                       |                           |
| now.getMonth()       | 指定的日期对象的月份                                       | 0-11 0 表示一年中的第一月 |
| Date.now()           | 返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数 |                           |
| now.getSeconds()     | 指定的日期对象的秒数                                       |                           |
| now.getTime()        | UTC 距离该日期对象所代表时间的毫秒数                       |                           |
| Date.parse()         | 解析一个表示某个日期的字符串 返回 UTC 值日期的毫秒数       |                           |

## String

| 属性   | 描述       |     |
| ------ | ---------- | --- |
| length | 字符串长度 |     |

常用：

| 方法                                             | 描述                                                                                                                    | 详解                                                                                                    |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| str.charAt(index)                                | 根据索引返回指定字符 默认 0                                                                                             |                                                                                                         |
| str.charCodeAt(index)                            | 返回给定索引处的 UTF-16 代码单元 Unicode 码 索引超出为 NaN                                                              | [更多](https://www.cnblogs.com/yongG/p/12153646.html)                                                   |
| str.codePointAt(index)                           | 返回给定索引处的 UTF-16 代码单元 Unicode 码 索引超出为 undefined。与 charCodeAt 不同在于可识别两个码元的字符            | [更多](https://www.cnblogs.com/yongG/p/12153646.html)                                                   |
| str.concat(str2, [, ...strN])                    | 合并字符串 更推荐使用 + +=                                                                                              |                                                                                                         |
| str.endsWith(searchString[, length])             | 判断当前字符串是否是以另外一个给定的子字符串“结尾”的 length 代表末尾到哪儿 console.log('abc?'.endsWith('bc',3)) // true |                                                                                                         |
| str.includes(searchString[, position])           | 判断一个字符串是否包含在另一个字符串 返回布尔值 （position 从哪个位置开始）                                             |                                                                                                         |
| indexOf(searchString, position)                  | 判断一个字符串是在另一个字符串的位置 索引值未找到-1 （position 从哪个位置开始）                                         |                                                                                                         |
| str.lastIndexOf(searchValue[, fromIndex])        | 判断一个字符串是在另一个字符串的最后出现位置 索引值未找到-1 （position 从哪个位置开始向左查找）                         |                                                                                                         |
| str.match(regexp)                                | 返回匹配正则表达式的结果                                                                                                | [更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)   |
| str.padEnd(length,str)                           | 从当前字符串的末尾（右侧）开始填充指定字符 length 表示填充后的字符长度                                                  |                                                                                                         |
| str.padStart(length,str)                         | 从当前字符串的开头（左侧）开始填充指定字符 length 表示填充后的字符长度                                                  |                                                                                                         |
| str.repeat(count)                                | 构造并返回一个新字符串 count 重复次数                                                                                   |                                                                                                         |
| str.replace(regexp\|substr, newSubStr\|function) | 将符合指定规则的字符串 替换成指定字符                                                                                   | [更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) |
| str.replaceAll()                                 | 将符合指定规则的所有字符串 替换成指定字符 参数同上 当为正则是需指定 g                                                   |                                                                                                         |
| str.search(regexp)                               | 根据指定正则 搜索符合规则的字符 返回首次匹配项的索引;否则，返回 `-1`                                                    |                                                                                                         |
| str.slice(beginIndex[, endIndex])                | 提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串                                                        |                                                                                                         |
| str.split(str,length)                            | 使用指定的分隔符字符串 返回一个数组 length 分割后数组最大长度                                                           |                                                                                                         |
| str.startsWith(searchString[, position])         | 判断当前字符串是否是以另外一个给定的子字符串“开头”的 position 位置                                                      |                                                                                                         |
| str.substring(indexStart[, indexEnd])            | 截取给定索引的字符串                                                                                                    |                                                                                                         |
| str.trim()                                       | 方法返回一个从两头去掉空白字符的字符串，并不影响原字符串本身                                                            |                                                                                                         |
| str.trimRight()                                  | trimEnd 别名                                                                                                            |                                                                                                         |
| str.trimEnd()                                    | 一个字符串的末端移除空白字符                                                                                            |                                                                                                         |

## RegExp

正则表达式

### 属性

#### lastIndex

是正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引

只有正则表达式使用了表示全局检索的 "`g`" 或者粘性检索的 "`y`" 标志时，该属性才会起作用。此时应用下面的规则：

- 如果 `lastIndex` 大于字符串的长度，则 `regexp.test` 和 `regexp.exec` 将会匹配失败，然后 `lastIndex` 被设置为 0。
- 如果 lastIndex 等于或小于字符串的长度，则该正则表达式匹配从 lastIndex 位置开始的字符串。
  - 如果 `regexp.test` 和 `regexp.exec` 匹配成功，`lastIndex` 会被设置为紧随最近一次成功匹配的下一个位置。
  - 如果 `regexp.test` 和 `regexp.exec` 匹配失败，`lastIndex` 会被设置为 0

### 实例方法

#### test

用来查看正则表达式与指定的字符串是否匹配。返回 `true` 或 `false`。

```js
var str = 'regx?'
/gx/.test(str) // true
#如果正则表达式设置了全局标志，test() 的执行会改变正则表达式 lastIndex属性。连续的执行test()方法，后续的执行将会从 lastIndex 处开始匹配字符串，(exec() 同样改变正则本身的 lastIndex 属性值).
```

#### exec

在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)。

```js
const regex1 = RegExp('foo*', 'g');
const str1 = 'table football, foosball';
const res = regex1.exec(str1);
console.log(res); // ['foo', index: 6, input: 'table football, foosball', groups: undefined]
```

### 修饰符

| 修饰符 | 描述              | 代码   |
| :----: | ----------------- | ------ |
|   g    | 全局匹配          | /reg/g |
|   i    | 不区分大小写      | /reg/i |
|   m    | 多行匹配          | /reg/m |
|   s    | 匹配包含换行符 \n | /reg/s |

### 元字符

```js
\s  匹配任何空白字符，包括空格、制表符、换页符等等。
\S  匹配任何非空白字符。
\t  匹配一个制表符。 // tab键  制表符 不是多个空格
\d  匹配一个数字字符。
\D  匹配一个非数字字符。
\w  匹配字母、数字、下划线。
\W  匹配非字母、数字、下划线。
\b  匹配一个单词边界 单词与空格直接的距离 // ' aw'
点（.） 表示非换行的任意字符
斜线(\) 表示转义字符，把没有意义的内容转成有意义的内容，把有意义的内容转成没有意义的内容
[]  匹配内含的 中任意一个字符 //[xyz]
[a-z]  匹配所有的小写字母
[A-Z]  匹配所有的大写字母
[a-zA-Z]  匹配所有的字母
[0-9]  匹配所有的数字
[0-9\.\-]  匹配所有的数字，句号和减号
[ \f\r\t\n]  匹配所有的白字符
{n}  匹配前面确定的n次
{n,}  匹配前面至少n次
{n,m}  匹配前面至少n次 最多匹配m次
^  匹配输入字符串的开始位置 在 [] 中代表 非 如：
	[^0-9] 就是除了0-9的数字和任意其他字符
$  匹配输入字符串的结束位置
*  匹配前面的子表达式零次或多次
+  匹配前面的子表达式一次或多次
?  匹配前面的子表达式零次或一次 // 等价于 {0,1} 加在其他规则之后使其变为非贪婪模式 （默认为贪婪模式，找到每一个） +？只0或一次
(pattern)
匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到，在VBScript 中使用 SubMatches 集合，在JScript 中则使用 $0…$9 属性。要匹配圆括号字符，请使用 '\(' 或 '\)'。

(?:pattern)
匹配 pattern 但不获取匹配结果，也就是说这是一个非获取匹配，不进行存储供以后使用。这在使用 "或" 字符 (|) 来组合一个模式的各个部分是很有用。例如， 'industr(?:y|ies) 就是一个比 'industry|industries' 更简略的表达式。

(?=pattern)
正向肯定预查（look ahead positive assert），在任何匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如，"Windows(?=95|98|NT|2000)"能匹配"Windows2000"中的"Windows"，但不能匹配"Windows3.1"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。

(?!pattern)
正向否定预查(negative assert)，在任何不匹配pattern的字符串开始处匹配查找字符串。这是一个非获取匹配，也就是说，该匹配不需要获取供以后使用。例如"Windows(?!95|98|NT|2000)"能匹配"Windows3.1"中的"Windows"，但不能匹配"Windows2000"中的"Windows"。预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，而不是从包含预查的字符之后开始。

(?<=pattern)	反向(look behind)肯定预查，与正向肯定预查类似，只是方向相反。例如，"(?<=95|98|NT|2000)Windows"能匹配"2000Windows"中的"Windows"，但不能匹配"3.1Windows"中的"Windows"。
```

### 正则表达式 - 运算符优先级

| 运算符                        | 描述                                                                                                                                               |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| \                             | 转义符                                                                                                                                             |
| (), (?:), (?=), (?<=),(?!),[] | 圆括号和方括号                                                                                                                                     |
| \*, +, ?, {n}, {n,}, {n,m}    | 限定符                                                                                                                                             |
| ^, \$, \任何元字符、任何字符  | 定位点和序列（即：位置和顺序）                                                                                                                     |
| \|                            | 替换，"或"操作 字符具有高于替换运算符的优先级，使得"m\|food"匹配"m"或"food"。若要匹配"mood"或"food"，请使用括号创建子表达式，从而产生"(m\|f)ood"。 |

#### 贪婪模式

```js
// 默认是匹配最大可能 即贪婪模式
var str='abcd{{efg}}abcd{{xyc}}'
reg = /{{.*}}/g // {{efg}}abcd{{xyz}}
# 非贪婪模式 *? ?? +?
reg = /{{.*?}}/g // {{efg}} {{xyz}
```

## Array

### 属性

#### length

返回或设置一个数组中的元素个数

### 方法

#### from

对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

```js
 # Array.from(伪数组||数组,fn,this) 若指定了 fn 新数组中的每个元素会执行该回调函数。 若指定 this 则为fn的this
  function fn() {
    console.log(Array.from(arguments)) //  [1, 2, 35, 'xcz', 3, 123]
  }
  fn(1, 2., 5, 8, 42, 2, 45, 35, 33, 12, 'xcz', 3, 123,)
```

#### isArray

用于确定传递的值是否是一个 Array

```js
# 当检测 `Array` 实例时，`Array.isArray` 优于 `instanceof`，因为 `Array.isArray` 能检测 `iframes`。
```

#### of

创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

```js
Array.of(1);         // [1]
Array.of(1, 2, 3);   // [1, 2, 3]
Array.of(undefined); // [undefined]
# 与 Array(7) 区别  Array(7)会创建一个长度为7的空数组 而不是[7]
```

### 实例方法

#### at

根据索引返回数组相应元素

```js
#  获取数组最后一位元素
[1.2,2,3,5,4].at(-1) // 4
```

#### concat

合并两个或多个数组不改变原数组 返回新数组

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
```

#### entries

返回一个新的 **Array Iterator** 对象（迭代器），该对象包含数组中每个索引的键/值对

```
  const array1 = ['a', 'b', 'c'];
  const iterator1 = array1.entries();
  console.log(iterator1.next());
  console.log(iterator1.next());
  console.log(iterator1.next());
```

#### fill

用一个固定值填充 开始位置到结束位置到数组中

```js
# fill(value, start, end) start默认 0  end 默认 length
const array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4)); // [1,2,0,0]
```

#### every

测试一个数组内的所有元素是否都能通过某个指定函数的测试 返回一个布尔值

```js
# every(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
['a', 'b', 'c'].every((item)=>item)
```

#### some

测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

```js
# some(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
['a', 'b', 'c'].every((item)=>item=='a') // true
```

#### filter

根据回调函数条件筛选数组元素 ，返回符合条件的数组 否则返回 undefined

```js
# filter(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[1,2,3,4,5,6].filter((item,index,sourceArr) => item>4) // [5,6]
```

#### find

根据回调函数条件查找 返回满足条件的第一个元素 否则返回 undefined

```js
# find(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[1,2,3,4].find((item,index,sourceArr) => item==4) // 4
```

#### findIndex

根据回调函数条件查找 返回满足条件的第一个元素索引 未查找到返回-1

```js
# findIndex(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[1,2,3,4].findIndex((item,index,sourceArr) =>  item>2) // 2
```

#### findLast

返回测试函数条件的最后一个元素的值 未找到返回 undefined

```js
# findLast(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[10, 1, 5, 2].findLast(item => item > 2) // 5
```

#### findIndexLast

根据回调函数条件查找 返回满足条件的最后一个元素索引 未查找到返回-1

```js
# findIndex(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[1,2,3,4].findIndex((item,index,sourceArr) => item>2) // 3
```

#### flat

按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

一般用于扁平化处理数据

```js
# flat(depth) depth指定要提取嵌套数组的结构深度，默认值为 1。
  var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
  let res = arr4.flat(2); // [1, 2, 3, 4, 5, 6, Array(3)]
  # 当设置为 Infinity 无穷大时可以展开任意深度的数组
  //let res = arr4.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  console.log(res);
```

#### flatMap

映射函数映射每个元素，然后将结果压缩成一个新数组。它与 [map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 连着深度值为 1 的 [flat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些

也就是可以扁平化一级数据 并且可以像 map 一样修改元素 . PS:但是 map 不可以修改数组长度 flatMap 可以 。这是因为他可以扁平化数组还具有 map 特性

```js
# flatMap(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[10, [1, 3], 5, 2].flatMap(item => Number.isNaN(item * 1) ? item : [1 * item, 2 * item]); // [10, 20, 1, 3, 5, 10, 2, 4]
```

#### map

创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成

```js
# map(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[1,2,3,4].findIndex((item,index,sourceArr) => item*2) // [2,4,6,8]
```

#### forEach

方法对数组的每个元素执行一次给定的函数。

```js
# forEach(function(element, index, array) { /* … */ }, thisArg) 不使用箭头函数时 可指定this
[10, [1, 3], 5, 2].forEach(item => {
    console.log(item)
});
```

#### includes

方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`。

```js
[1, 2, 3]
  .includes(2) // true
  [(1, 2, 3)].includes(2, 2); // false
```

#### indexOf

返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回 -1。 使用全等运算判断元素是否相等

```js
['a', 'b', 'c']
  .indexOf('b') // 1
  [('a', 'b', 'c')].indexOf('b', 2); //-1
```

#### lastIndexOf

返回在数组中从后向前可以找到给定元素的第一个索引，如果不存在，则返回 -1。 使用全等运算判断元素是否相等

```js
['a', 'b', 'c']
  .lastIndexOf('c') // 2
  [('a', 'b', 'c')].lastIndexOf('c', 1); //-1
```

#### join

将一个数组的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```js
['Fire', 'Air', 'Water']
  .join('') // "FireAirWater"
  [('Fire', 'Air', 'Water')].join('-') // "Fire-Air-Water"
  [('Fire', 'Air', 'Water')].join(); // "Fire,Air,Water"
```

#### keys

返回一个数组所有的索引集合

```js
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
```

#### values

返回数组每个元素组成的数组

```js
const arr = ['a', 'b', 'c', 'd', 'e'];
const iterator = arr.values();

for (const letter of iterator) {
  console.log(letter);
} //"a" "b" "c" "d" "e"
```

#### pop

方法从数组中删除最后一个元素，并返回该元素的值。此方法会更改数组的长度。

#### shift

方法从数组中删除**第一个**元素，并返回该元素的值。此方法更改数组的长度。

#### unshift

方法将一个或多个元素添加到数组的**开头**，并返回该数组的**新长度**。

#### push

方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

#### reduce

对数组中的每个元素按序执行一个由您提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

传入初始值 则初始索引从 0 开始 否则 从 1 开始

```js
# reduce((previousValue, currentValue, currentIndex, array) => { /* … */ }, initialValue) // initialValue初始值
  const initialValue = 0;
  const sumWithInitial = array1.reduce(
    (previousValue, currentValue) => {
      console.log(previousValue, currentValue); // 上一次计算值 当前数值
      return previousValue + currentValue
    },
    initialValue
  );

  console.log(sumWithInitial);
```

#### reduceRight

同**reduce** 不过顺序是从右向左计算

#### reverse

翻转数组 该方法会改变原数组。

#### sort

用[原地算法](https://zh.wikipedia.org/wiki/原地算法)对数组的元素进行排序，并返回数组。 查看[更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

| `compareFn(a, b)` 返回值 | 排序顺序               |
| :----------------------- | :--------------------- |
| > 0                      | `a` 在 `b` 后          |
| < 0                      | `a` 在 `b` 前          |
| === 0                    | 保持 `a` 和 `b` 的顺序 |

```js
var arr3 = [30, 10, 111, 35, 1899, 50, 45];
arr3.sort(function (a, b) {
  console.log(a, b, '---------------------');
  return a - b;
});
console.log(arr3); //输出  [10, 30, 35, 45, 50, 111, 1899]

var arr4 = [30, 10, 111, 35, 1899, 50, 45];
arr4.sort(function (a, b) {
  return b - a;
});
console.log(arr4); //输出 [1899, 111, 50, 45, 35, 30, 10]
```

#### splice

通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。

```js
# splice(start, deleteCount, item1, item2, itemN)
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum', 'guitar');
// 运算后的 myFish: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// 被删除的元素：[], 没有元素被删除

var myFish2 = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish2.splice(3, 1);
// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素：["mandarin"]
```

## Map

保存键值对，并且能够记住键的原始插入顺序。任何值都可以作为键和值

## Set

允许你存储任何类型的唯一值

可用来数组去重

```js
let arr = [1, 2, 3];
let arr2 = [2, 3, 4];
let mySet = new Set([...arr, ...arr2]);
let arr3 = [...mySet]; // [1, 2, 3, 4]
```

## Map 与 Set Api

```js
let myMap = new Map();
let mySet = new Set();
```

| 属性或方法 |                                                                         Map                                                                          | 用法                                                | 属性或方法 | Set                                                                                                                                                                          | 用法（Set 中没有键）                                                            |
| :--------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: | --------------------------------------------------- | :--------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
|    size    |                                                                返回 Map 中的成员数量                                                                 |                                                     |    size    | 返回插入元素个数                                                                                                                                                             |                                                                                 |
|    set     |                                                                 添加或更新一个键值对                                                                 | myMap.set('a',1)<br />myMap.set('c',1)              |    add     | 若无该元素则在后方添加一个新元素                                                                                                                                             | mySet.add('a').add('b')                                                         |
|   delete   |                                                                   根据键名移除元素                                                                   | myMap.delete('a')                                   |   delete   | 若该值存在则删除该元素                                                                                                                                                       | mySet.delete('a')                                                               |
|    has     |                                                                 查询指定元素是否存在                                                                 | myMap.has('a')                                      |    has     | 查询指定元素是否存在                                                                                                                                                         | mySet.has('a')                                                                  |
|    get     | 从 `Map` 对象返回指定的元素。如果与所提供的键相关联的值是一个对象，那么你将获得该对象的引用，对该对象所做的任何更改都会有效地在 `Map` 对象中修改它。 | myMap.get('c')                                      |            |                                                                                                                                                                              |                                                                                 |
|   clear    |                                                              清除 Map 对象中所有键值对                                                               | myMap.clear()                                       |   clear    | 清除 Set 对象中所有元素                                                                                                                                                      | mySet.clear()                                                                   |
|  forEach   |                                               按照插入顺序依次对 `Map` 中每个键/值对执行一次给定的函数                                               | myMap.forEach((value, key, map) => { /_ ... _/ } )  |  forEach   | 对 `Set` 对象中的每个值按插入顺序执行一次提供的函数                                                                                                                          | mySet.forEach((value, key, set) => { /_ ... _/ } )<br />**这里的 key 与值相同** |
|    keys    |                                     返回一个引用的迭代器对象。它包含按照顺序插入 `Map` 对象中每个元素的 key 值。                                     | ( new Map([['0', 'foo'],[1, 'bar']])).keys().next() |    keys    | 返回一个新的[迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)对象，该对象按插入顺序包含 `Set` 对象中每个元素的值              | mySet.keys().next()                                                             |
|   values   |                                    返回一个引用的迭代器对象。它包含按照顺序插入 `Map` 对象中每个元素的 value 值。                                    | ( new Map([['0', 'foo'])).values().next()           |            | 同 keys，keys 方法为 values 方法别名                                                                                                                                         | mySet.values().next()                                                           |
|  entries   |                              返回一个新的迭代器对象，其中包含 `Map` 对象中按插入顺序排列的每个元素的 `[key, value]` 对                               | myMap.entries().next()                              |  entries   | 返回一个新的[迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators)对象，这个对象包含的元素是类似 **`[value, value]` 形式的数组**。 | mySet.entries().next()                                                          |

## WeakMap

**`WeakMap`** 对象是一组键/值对的集合，其中的键是**弱引用**的。其**键必须是对象**，而值可以是任意的。可以更好的被垃圾回收机制回收

其 key 是不可遍历的 这里与 Map 是不同的 若想遍历所有 key 则使用 map

### set

根据指定的 `key` 和 `value` 在 `WeakMap`对象中添加新/更新元素。

### get

获取指定元素

### delete

删除指定元素

### has

查询指定元素是否存在

## WeakSet

**`WeakSet`** 对象允许你将**弱保持*对象***存储在一个集合中。 集合中所有元素具有唯一性

### add

添加一个**弱保持*对象***

### delete

从集合中删除指定对象

### has

根据`WeakSet` 是否存在相应对象返回布尔值。

## Reflect

**Reflect** 是一个内置的对象，它提供拦截 JavaScript 操作的方法。`Reflect`的所有属性和方法都是静态的（就像 Math)对象）。

其中的一些方法与 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 相同，但存在不同

要是使用 Object 更改对象的 一些属性之后 可能需要通过 try catch 来进行捕获错误 改成 Reflect 之后 如果 更改失败会给我们返回一个 false

[意义](https://blog.csdn.net/qq_39852145/article/details/114240895)

- Reflect.deleteProperty(target, propertyKey) // 相当于函数的 delete 操作符 delete target[name]

- Reflect.defineProperty(target, propertyKey, attributes) // 相当于 Object.defineProperty()

- Reflect.apply(target, thisArgument, argumentsList) // 相当于 Function.prototype.apply()

- Reflect.construct(target,argumentsList) // new target(...args)

  ```js
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  var a = new Person('小明', 22);
  var b = Reflect.construct(Person, ['小明', 22]);
  console.log(b);
  console.log(a);
  ```

* Reflect.ownKeys(target) // 返回一个包含所有自身属性（不包含继承属性）的数组。(类似于 Object.keys(), 但不会受`enumerable` 影响)

* Reflect.has(target, propertyKey) // 与 in 操作符相同

* ```js
  #方法与从 对象 (target[propertyKey]) 中读取属性类似，但它是通过一个函数执行来操作的。
  Reflect.get(target, propertyKey[, receiver])
  //target
  //需要取值的目标对象
  //propertyKey
  //需要获取的值的键值
  //receiver
  //如果target对象中指定了getter，receiver则为getter调用时的this值。
  ```

## Proxy

用来包装一个对象 将其代理。以便实现基本操作的自定义和拦截

构造器接收两个主要参数：

- `target` 被代理的对象
- `handler` 被代理对象上的自定义行为

### Proxy.revocable

​ 可创建一个可撤销的代理 直接执行 revoke() 方法 可以撤销代理

```js
var revocable = Proxy.revocable(
  { a: '1' },
  {
    get(target, name) {
      return '[[' + name + ']]';
    },
  },
);
var proxy = revocable.proxy;
proxy.foo; // "[[foo]]"

revocable.revoke();
typeof proxy; // "object"，因为 typeof 不属于可代理操作
console.log(proxy.foo); // 抛出 TypeError
proxy.foo = 1; // 还是 TypeError
delete proxy.foo; // 又是 TypeError
```

### handler

#### set

**`handler.set()`** 方法是设置属性值操作的捕获器。

```js
const monster1 = { eyeCount: 4 };

const handler1 = {
  set(obj, prop, value) {
    console.log(obj, prop, value);
    if (prop === 'eyeCount' && value % 2 !== 0) {
      console.log('Monsters must have an even number of eyes');
    } else {
      return Reflect.set(...arguments);
    }
  },
};

const proxy1 = new Proxy(monster1, handler1);
```

#### get

**`handler.get()`** 方法用于拦截对象的读取属性操作

```js
var p = new Proxy(
  { a: '2' },
  {
    get: function (target, property, receiver) {
      //target 目标对象。
      //property 被获取的属性名。
      //receiver Proxy 或者继承 Proxy 的对象
      return target[property];
    },
  },
);
```

#### has

**`handler.has()`** 方法是针对 [`in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 操作符的代理方法。

```js
var p = new Proxy(
  { a: '1' },
  {
    has: function (target, key) {
      // 这里可以做你想要的操作
      return key in target;
    },
  },
);
```

#### construct

**`handler.construct()`** 方法用于拦截 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)操作符。

```js
function monster1(disposition) {
  this.disposition = disposition;
}

const handler1 = {
  construct(target, args) {
    console.log(target, args);
    // 使用自己自定义的操作 如
    if (args[0] == 1) {
      return new Array();
    }
    return new target(...args);
  },
};

const proxy1 = new Proxy(monster1, handler1); // 代理后的对象
console.log(new proxy1(1)); // []
console.log(new proxy1('11')); //monster1 {disposition: 11}
```

#### apply

**`handler.apply()`** 方法用于拦截函数的调用。

该方法会拦截目标对象的以下操作：

- `proxy(...args)`
- [`Function.prototype.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 和 [`Function.prototype.call()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [`Reflect.apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply)

```js
var p = new Proxy(function () {}, {
  apply: function (target, thisArg, argumentsList) {
    console.log('called: ' + argumentsList.join(', '));
    return argumentsList[0] + argumentsList[1] + argumentsList[2];
  },
});
console.log(proxy1(1, 2, 3)); // 6
```

#### deleteProperty

**`handler.deleteProperty()`** 方法用于拦截对对象属性的 **delete** 操作。

```js
var p = new Proxy(
  {},
  {
    deleteProperty: function (target, prop) {
      console.log('called: ' + prop);
      // 使用自己自定义的操作
      return true;
    },
  },
);

delete p.a; // "called: a"
```

> 更多属性请[前往](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)
