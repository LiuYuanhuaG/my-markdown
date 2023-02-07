---
title: jsApi 深入浅出

order: 1
---

### [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

```js
var weA = {};
function weCC() {}
var weabMap = new WeakMap();
weabMap.set(weA, weCC);
weabMap.set(weB, [weCC]);
console.log(weabMap.has(weA)); // true
console.log(weabMap.get(weA)); // ƒ weCC() { }
console.log(weabMap.has(weB)); // true
console.log(weabMap.get(weB)); // [ƒ]
weabMap.delete(weB);
console.log(weabMap.has(weB)); // false
console.log(weabMap.get(weB)); // undefined
weA = null;
console.log(weabMap.has(weA)); // false
console.log(weabMap.get(weA)); // undefined
console.log(weA); // null
veA = {};
console.log(weabMap.has(weA)); // false
console.log(weabMap.get(weA)); // undfined
```

#### 自带清除的 WeakMap

```js
class ClearWeakMap {
  constructor(init) {
    this._weakMap = new WeakMap(init);
  }
  delete(k) {
    return this._weakMap.delete(k);
  }
  get(k) {
    return this._weakMap.get(k);
  }
  set(k, v) {
    this._weakMap.set(k, v);
    return this;
  }
  has(k) {
    return this._weakMap.has(k);
  }
  clear() {
    this._weakMap = new WeakMap();
    return this._weakMap;
  }
}
```

### ES5 深拷贝

```js
function deepClone(origin, target) {
  var _tar = target ?? {};
  var toStr = Object.prototype.toString;
  for (const key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        var typeStr = toStr.call(origin[key]);
        typeStr === '[object Array]' &&
          deepClone(origin[key], (_tar[key] = []));
        typeStr === '[object Object]' &&
          deepClone(origin[key], (_tar[key] = {}));
        typeStr === '[object Window]' && (_tar[key] = globalThis);
        typeStr === '[object RegExp]' && (_tar[key] = new RegExp(origin[key]));
        typeStr === '[object Date]' && (_tar[key] = new Date(origin[key]));
      } else {
        _tar[key] = origin[key];
      }
    }
  }
  return _tar;
}
const newObj = deepClone(a);
console.log(newObj);
```

### ES6 深拷贝-利用 WeakMap

```js
function deepClone(origin, weakMap = new WeakMap()) {
  // 简单数据类型直接返回
  if (origin == undefined || typeof origin !== 'object') {
    return origin; // 这里函数直接返回 一般克隆函数比较罕见 并且克隆函数比较复杂 基本克隆已经够了
  }

  if (origin instanceof Date) {
    // instanceof 判断是否是同一构造器产生
    return new Date(origin);
  }

  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  const newOrigin = new origin.constructor();
  // 利用weakMap 判断是否存在 存在则返回值 否则会死循环 a.b = b b.a = a
  if (weakMap.has(origin)) {
    return weakMap.get(origin);
  }

  // 存入weakMap 中弱引用 key 被回收 value也会被回收
  weakMap.set(origin, newOrigin);
  for (const key in origin) {
    if (origin.hasOwnProperty(key)) {
      newOrigin[key] = deepClone(origin[key], weakMap);
    }
  }
  return newOrigin;
}
```

### AOP 面向切面编程

```js
// 将通过预编译方式和运行期间动态代理实现程序功能的统一维护的一种技术 。也就是将固定逻辑封装 ，动态逻辑插入
Function.prototype.bef = function (cb) {
  var _this = this;
  return function () {
    cb.apply(_this, arguments);
    return _this.apply(_this, arguments);
  };
};
Function.prototype.arf = function (cb) {
  var _this = this;
  return function () {
    var _val = _this.apply(_this, arguments);
    cb.apply(_this, arguments);
    return _val;
  };
};
function test() {
  console.log(1111111);
  return 'ccc';
}
console.log(test.bef(() => console.log('bef')).arf(() => console.log('arf'))());
执行顺序;
// bef
// 1111111
// arf
// ccc
```
