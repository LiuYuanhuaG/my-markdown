---
title: TypeScript
order: 0
nav:
  title: 周边生态
  order: 2
---

## 原始数据类型

- **number**
- **string**
- **boolean**
- **void** 空值 表示没有任何返回值的函数
- **undefined**
- **null**
- **symbol**
- **bigint**

## 基础类型

### 任意值

**any** 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型

```js
let something; // =>  let something:any;
something = 'seven';
something = 7;
```

### 推断类型

没有明确指定类型时，若赋予初始值则会根据初始值推断类型。如：

```js
let something = true; // =>
something = 'seven'; // 报错Type 'string' is not assignable to type 'boolean'
something = 7; //Type 'number' is not assignable to type 'boolean'
```

### 联合类型

给定多个可选类型

当 ts 无法确定具体是哪个类型时，我们只能访问所有可选类型里的共有属性

联合类型使用 `|` 分隔每个类型

```ts
let something: boolean | string = true; // =>
something = 'seven';
something = false;
something = 7; //Type '7' is not assignable to type 'string | boolean'
```

### 元组（ Tuple ）类型

上面数组类型的方式，只能定义出内部全为同种类型的数组。对于内部不同类型的数组可以使用元组类型来定义

元组（ Tuple ）表示一个已知数量和类型的数组,可以理解为他是一种特殊的数组

```ts
let arr3: [number, string] = [1, '2'];
let arr1: [number, string] = [1, '2', 'dsadas']; // 报错

//Type '[number, string, string]' is not assignable to type '[number, string]'.
//Source has 3 element(s) but target allows only 2.
//类型“[number，string，string]”不能分配给类型“[nnumber，string]”。
//源具有3个元素，但目标仅允许2个。
```

> 需要注意的是，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。例如，一个数组中可能有多种类型，数量和类型都不确定，那就直接 any[]。

### never 类型

never 类型表示的是那些永不存在的值的类型。 例如 never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

值会永不存在的两种情况：

- 1 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）
- 2 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。

```ts
// 异常
function error(msg: string): never {
  // 编译正确
  throw new Error(msg);
}

// 死循环
function loopForever(): never {
  // 编译正确
  while (true) {}
}
```

### unknown 类型

unknown 与 any 一样，所有类型都可以分配给 unknown:

```ts
let value: unknown = 1;
value = 'zhangmazi'; // 编译正确
value = false; // 编译正确
```

unknown 与 any 的最大区别是：

> 任何类型的值可以赋值给 any，同时 any 类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给 unknown 和 any

## 对象类型

这里所说的对象类型，就是我们常说的 `函数、{}、数组、类`

### object,Object,{}

#### object

object 类型用于表示所有非原始类型，严格模式下 null 和 undefined 也不能赋予 object

```ts
let object: object;

object = {}; // 编译正确
object = 1; // 报错
object = 'a'; // 报错
object = true; // 报错
object = null; // 报错
object = undefined; // 报错
object = Symbol('13'); // 报错
object = BigInt(666); // 报错
```

#### Object

Object 类型由两个接口定义：

1. Object 接口定义了 proptype 上的的属性

   ```ts
   interface Object {
     constructor: Function;
     toString(): string;
     toLocaleString(): string;
     valueOf(): Object;
     hasOwnProperty(v: PropertyKey): boolean;
     isPrototypeOf(v: Object): boolean;
     propertyIsEnumerable(v: PropertyKey): boolean;
   }
   ```

2. ObjectConstructor 接口定义了 Object 类的属性

   ```ts
   // node_modules/typescript/lib/lib.es5.d.ts

   interface ObjectConstructor {
     /** Invocation via `new` */
     new (value?: any): Object;
     /** Invocation via function calls */
     (value?: any): any;

     readonly prototype: Object;

     getPrototypeOf(o: any): any;

     // ···
   }

   declare var Object: ObjectConstructor;
   ```

   所以必须符合内置对象 Object 类型的即可赋予 Object 类型变量值

#### {}

{} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合

### class 类

在 TypeScript 中，我们通过 class 关键字来定义一个类

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHi(): void {
    console.log(`Hi, ${this.name}`);
  }
}
```

### 数组类型

#### 「类型 + 方括号」表示法

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5]; //全为number类型数组
let fibonacci2: string[] = [1, 1, 2, 3, 5]; //全为string类型数组

let fibonacci3: any[] = [1, 1, 2, 3, 5]; //任意类型数组 any[] === []
```

#### Array 泛型表示

关于泛型，可以参考 `<a href="#泛型">`泛型 `</a>`一章。

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5]; //全为number类型数组
let fibonacci2: Array<any> = [1, '1', true, {}, 5];
```

#### 接口 interface 表示

```ts
interface IArr {
  [index: number]: number;
}
let arr: IArr = [1, 2, 3];
//-------------------------------------------
interface IArr2 {
  [index: number]: any;
}
let arr2: IArr2 = [1, true, '3', {}, []];
```

#### 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`：

```ts
interface IFArguments {
  // 内置对象IArguments的实现
  [index: number]: any;
  length: number;
  callee: Function;
}

function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
  let args2: IArguments = arguments;
  let args3: IFArguments = arguments;
}
```

### 函数

#### 函数声明

```ts
function fn(a: number, b?: boolean): number | void {
  if (b) {
    return a;
  }
}
```

#### 函数表达式声明

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：

```ts
let mySum = function (x: number, y: number): number {
  return x + y;
};
```

这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：

```ts
let mySum: (x: number, y: number) => number = function (
  x: number,
  y: number,
): number {
  return x + y;
};
// 或者
type MySum = (x: number, y: number) => number;
let mySum: MySum = function (x: number, y: number): number {
  return x + y;
};
```

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。

在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

在 ES6 中，`=>` 叫做箭头函数，应用十分广泛，可以参考 [ES6 中的箭头函数](http://es6.ruanyifeng.com/#docs/function#箭头函数)。

#### 用接口定义

```ts
interface IFnTest {
  (a: number, b?: boolean): number | void;
}
type MySum = (x: number, y: number) => number | void;
let fn3: IFnTest;
fn3 = (a: number, b): number | void => {
  if (b) {
    return a;
  }
};
```

#### 可选参数

输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 `?` 表示可选的参数：

```ts
let mySum = function (x: number, y?: number): number {
  if (y) x += y;
  return x;
};

console.log(mySum(10)); // 10
console.log(mySum(10, 15)); // 25
console.log(mySum()); //报错 Expected 1-2 arguments, but got 0.
console.log(mySum(10, 15, 1)); // 报错 Expected 1-2 arguments, but got 3.
```

#### 剩余参数

如同正常 js 函数一样 ...xxx 表示剩余参数 类型为 类型[] 一般为 any[]

```ts
function c(b: any, ...a: any[]) {
  console.log(a);
}
c(1, 8, 7, 7, 8, 7);
```

#### 默认参数

```ts
function add(x: number, y: number = 0): number {
  return x + y;
}
```

#### 函数重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
  if (typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('');
  }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。会根据传入参数展示对应的函数定义

**Tip**

TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

## 断言

将一个联合类型断言为其中一个类型

在使用联合类型时，有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法

**值 as 类型**

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof animal.swim === 'function') {
    return true;
  }
  return false;
}
//animal.swim 会报错
```

使用断言将 isFish 修改

```ts
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === 'function') {
    return true;
  }
  return false;
}
```

这样就解决报错问题

### 限制

1. 联合类型可以断言为其中一个类型
2. 父类可以被断言为子类
3. 子类可以断言为父类
4. 任何类型都可以断言为 any
5. any 可以被断言为任何类型

也就是说 若 `A` 兼容 `B`，那么 `A` 能够被断言为 `B`，`B` 也能被断言为 `A`。

具体说就是 类型相互兼容 即可断言（有可能共有的属性）

### 双重断言

既然：

- 任何类型都可以被断言为 any
- any 可以被断言为任何类型

那么

```ts
interface Cat {
  run(): void;
}
interface Fish {
  swim(): void;
}

function testCat(cat: Cat) {
  return cat as any as Fish; // 可以成功，但是慎用。 一般多半会运行时错误
}
```

### 非空断言

在上下文中当类型检查器无法断定类型时，可以使用缀表达式操作符 **`!`** 进行断言操作对象是非 null 和非 undefined 的类型，**即 x!的值不会为 null 或 undefined**

```ts
let user: string | null | undefined;
console.log(user!.toUpperCase()); // 编译正确
console.log(user.toUpperCase()); // 错误
```

### 确定赋值断言

```ts
let value: number;
console.log(value); // Variable 'value' is used before being assigned.
```

我们定义了变量, 没有赋值就使用，则会报错

通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。

```ts
let value!: number;
console.log(value); // undefined 编译正确
```

## 声明文件

- [`declare var`](http://ts.xcatliu.com/basics/declaration-files.html#declare-var) 声明全局变量
- [`declare function`](http://ts.xcatliu.com/basics/declaration-files.html#declare-function) 声明全局方法
- [`declare class`](http://ts.xcatliu.com/basics/declaration-files.html#declare-class) 声明全局类
- [`declare enum`](http://ts.xcatliu.com/basics/declaration-files.html#declare-enum) 声明全局枚举类型
- [`declare namespace`](http://ts.xcatliu.com/basics/declaration-files.html#declare-namespace) 声明（含有子属性的）全局对象
- [`interface` 和 `type`](http://ts.xcatliu.com/basics/declaration-files.html#interface-和-type) 声明全局类型
- [`export`](http://ts.xcatliu.com/basics/declaration-files.html#export) 导出变量
- [`export namespace`](http://ts.xcatliu.com/basics/declaration-files.html#export-namespace) 导出（含有子属性的）对象
- [`export default`](http://ts.xcatliu.com/basics/declaration-files.html#export-default) ES6 默认导出
- [`export =`](http://ts.xcatliu.com/basics/declaration-files.html#export-1) commonjs 导出模块
- [`export as namespace`](http://ts.xcatliu.com/basics/declaration-files.html#export-as-namespace) UMD 库声明全局变量
- [`declare global`](http://ts.xcatliu.com/basics/declaration-files.html#declare-global) 扩展全局变量
- [`declare module`](http://ts.xcatliu.com/basics/declaration-files.html#declare-module) 扩展模块
- [`/// `](http://ts.xcatliu.com/basics/declaration-files.html#san-xie-xian-zhi-ling) 三斜线指令

## 内置对象

### ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有：

`Boolean`、`Error`、`Date`、`RegExp` 等。

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

### DOM 和 BOM 的内置对象

DOM 和 BOM 提供的内置对象有：

`Document`、`HTMLElement`、`Event`、`NodeList` 等。

TypeScript 中会经常用到这些类型：

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function (e: MouseEvent) {
  // Do something
});
```

### 用 TypeScript 写 Node.js

```bash
npm install @types/node --save-dev
```

## 交叉类型

交叉类型就是跟联合类型相反，用 `&`操作符表示，交叉类型就是两个类型并集必须存在，且若存在相同 key 类型却不同 则该类型为 never 类型

```js
interface IpersonA {
  name: string;
  age: number;
}
interface IpersonB {
  name: string;
  gender: string;
}
interface IpersonB2 {
  name: boolean;
  gender: string;
}
let person: IpersonA & IpersonB = {
  name: '师爷',
  age: 18,
  gender: '男',
};
let person: IpersonA & IpersonB2 = {
  // 报错 IpersonA & IpersonB2 应为never类型
  name: '师爷',
  age: 18,
  gender: '男',
};
```

## 类型守卫

**类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内**。 换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。

换句话说：**类型守卫是运行时检查，确保一个值在所要类型的范围内**

目前主要有四种的方式来实现类型保护：

- 1、in 关键字

```ts
interface InObj1 {
  a: number;
  x: string;
}
interface InObj2 {
  a: number;
  y: string;
}
function isIn(arg: InObj1 | InObj2) {
  // x 在 arg 打印 x
  if ('x' in arg) console.log('x');
  // y 在 arg 打印 y
  if ('y' in arg) console.log('y');
}
isIn({ a: 1, x: 'xxx' });
isIn({ a: 1, y: 'yyy' });
```

- 2、typeof 关键字

```ts
function isTypeof(val: string | number) {
  if (typeof val === 'number') return 'number';
  if (typeof val === 'string') return 'string';
  return '啥也不是';
}
```

> typeof 只支持：typeof 'x' === 'typeName' 和 typeof 'x' !== 'typeName'，x 必须是 'number', 'string', 'boolean', 'symbol'。

- 3、instanceof

```ts
function creatDate(date: Date | string) {
  console.log(date);
  if (date instanceof Date) {
    date.getDate();
  } else {
    return new Date(date);
  }
}
```

- 4、自定义类型保护的类型谓词

```ts
  function 函数名(形参: 参数类型[参数类型大多为any]): 形参 is A类型 {
            return true or false
  }

```

```ts
function isNumber(num: any): num is number {
  return typeof num === 'number';
}
function isString(str: any): str is string {
  return typeof str === 'string';
}
function a(c: any) {
  if (isString(c)) {
    c.slice(); // 在这里会有提示 相当于高速ts这里一定会执行到会有类型相应的属性提示
  }
}
```

参考[博客](https://blog.csdn.net/qq_43853213/article/details/124913738)

## 类型别名

起一个名称

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```

## 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```ts
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll'); // 没问题
handleEvent(document.getElementById('world'), 'dblclick'); // 报错，event 不能为 'dblclick'

// index.ts(7,47): error TS2345: Argument of type '"dblclick"' is not assignable to parameter of type 'EventNames'.
```

上例中，我们使用 `type` 定了一个字符串字面量类型 `EventNames`，它只能取三种字符串中的一种。

注意，**类型别名与字符串字面量类型都是使用 `type` 进行定义**

## interface 接口

### 基本用法

```ts
interface IPerson {
  name: string;
  age?: number; // 可选属性
}

let person: IPerson = {
  name: 'zs',
  sex: 'nan',
  age: 18, // 会报错
};
```

### 任意属性

允许除接口定义属性之外的额外符合规则的属性。

索引签名参数类型必须是“string”、“number”、“symbol”或模板文本类型

```ts
interface IPerson {
  name: string;
  [propName: string | number | symbol]: any; // 任意属性
}
let person: IPerson = {
  name: 'zs',
  sex: 'nan',
  age: 18,
  1: true,
  [Symbol('233')]: {},
};
//---------------------------------------------------------------------------
interface IPerson2 {
  name: string;
  [propName: string]: any; //  [propName:boolean]: any | [propName:any]: any  报错
}
let person2: IPerson2 = {
  name: 'zs',
  age: 18,
  1: true, // 报错 索引应为string类型
  [Symbol('233')]: {}, // 报错 索引应为string类型
};

//---------------------------------------------------------------------------

interface IPerson3 {
  name: string;
  [propName: string]: string | boolean;
}
let person3: IPerson3 = {
  name: 'zs',
  sex: '18',
  ts: true,
  age: 18, // 报错 值应为string|boolean类型
  1: true, // 报错 索引应为string类型
  [Symbol('233')]: {}, // 报错 索引应为string类型
};
```

一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集

```ts
interface IPerson {
  name: string;
  age?: number; // 报错 number 不是 string 的子集
  [propName: string]: string; // [propName:string]: any  或者 [propName:string]: string|number|undefined 都可以解决 因为有可选属性所以必须添加undefined类型
}
let person: IPerson = {
  name: 'zs',
  sex: 'nan',
  age: 18,
};
```

### 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性：

```ts
interface IPerson {
  readonly id: number;
}
let person: IPerson = {
  id: 666,
};
person.id = 999; // 报错 Cannot assign to 'id' because it is a read-only property. 无法分配给“id”，因为它是只读属性。
```

## interface 与 type

### 相同

**接口和类型别名都可以用来描述对象或函数的类型，只是语法不同**

```ts
type MyTYpe = {
  name: string;
  say(): void;
};

interface MyInterface {
  name: string;
  say(): void;
}
```

**都允许扩展**

interface 通过 extends 实现扩展

```ts
interface MyInterface {
  name: string;
  say(): void;
}
interface MyInterface2 extends MyInterface {
  sex: string;
  hai(): void;
}
const a: MyInterface2 = {
  name: '',
  sex: '',
  hai: () => {},
  say: () => {},
};
```

type 通过**&** 继承

```ts
type T1 = {
  name: string;
};
type T2 = T1 & {
  age: number;
};
const p: T2 = {
  name: 'zs',
  age: 18,
};
```

### 不同

type 可以声明联合类型 interface 不行

```ts
type T0 = number | string | boolean;
type T1 = 'name' | 'age' | 'sex';
type T2 = [number, boolean];
type T3 = Pig | Dog | Cat; // 其他接口
```

interface 可以合并声明 type 不行

```ts
interface I1 {
  zhang: string;
}
interface I1 {
  zhang1: string;
}
interface I1 {
  zhang2: string;
}
let c: I1;
```

## 泛型

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

上面的需求，我们如果用泛型来解决的话：

```ts
function getValue<T>(arg: T): T {
  return arg;
}
```

泛型的语法是尖括号 `<>` 里面写类型参数，一般用 `T` 来表示第一个类型变量名称，其实它可以用任何有效名称来代替,比如我们用 `NIUBI`也是编译正常的

> 泛型就像一个占位符一个变量，在使用的时候我们可以将定义好的类型像参数一样传入，原封不动的输出

**使用**

我们有两种方式来使用：

- 1. 定义要使用的类型，比如：

```ts
getValue<string>('树哥'); // 定义 T 为 string 类型
```

- 1. 利用 typescript 的类型推断，比如：

```ts
getValue('树哥'); // 自动推导类型为 string
```

### 多个参数

其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U

```ts
function getValue<T, U>(arg: [T, U]): [T, U] {
  return arg;
}

// 使用
const str = getValue(['树哥', 18]);
复制代码;
```

![fanxing1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/979c154e11414883b4ccf7e0f1e93565~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) typescript 给我们自动推断出输入、返回的类型

### 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function getLength<T>(arg: T): T {
  console.log(arg.length); // 报错，不能调用 length 属性
}
```

因为泛型 T 不一定包含属性 length，那么我想 getLength 这个函数只允许传入包含 length 属性的变量，该怎么做呢

这时，我们可以使用 `extends`关键字来对泛型进行约束

```ts
interface Lengthwise {
  length: number;
}

function getLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

使用：

```ts
const str = getLength('树哥');
const arr = getLength([1, 2, 3]);
const obj = getLength({ length: 5 });
复制代码;
```

> 这里可以看出，不管你是 str，arr 还是 obj，只要具有 length 属性，都可以

具体参考[轻松拿下 TS 泛型](https://juejin.cn/post/7064351631072526350)

### 泛型接口

```ts
interface KeyValue<T, U> {
  key: T;
  value: U;
}

const person1: KeyValue<string, number> = {
  key: '树哥',
  value: 18,
};
const person2: KeyValue<string, number> = {
  key: 20, // Type 'number' is not assignable to type 'string'
  value: '张麻子', // Type 'string' is not assignable to type 'number'.
};
```

### 泛型类型别名

```ts
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ['1'] };
let c2: Cart<number> = [1];
```

### 泛型类

```ts
class Test<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myTest = new Test<number>();
myTest.value = 0;
myTest.add = function (x, y) {
  return x + y;
};
```

### 泛型默认值

我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray(4, 1); // function createArray<number>(length: number, value: number): number[]
createArray(4, true); // function createArray<boolean>(length: number, value: boolean): boolean[]
createArray(4, 'true'); // function createArray<string>(length: number, value: string): string[]
```

### 泛型工具类型

- typeof

  关键词除了做类型保护，还可以从实现推出类型，

  ```ts
  //先定义变量，再定义类型
  let p1 = {
    name: '树哥',
    age: 18,
    gender: 'male',
  };
  type People = typeof p1;
  function getName(p: People): string {
    return p.name;
  }
  getName(p1);
  ```

- typeof

  可以用来获取一个接口中所有的 key 值

  ```ts
  interface Person {
    name: string;
    age: number;
    gender: 'male' | 'female';
  }

  type PersonKey = keyof Person; //type PersonKey = 'name'|'age'|'gender';

  function getValueByKey(p: Person, key: PersonKey) {
    return p[key];
  }
  let val = getValueByKey({ name: '树哥', age: 18, gender: 'male' }, 'gender');
  console.log(val); // 树哥
  ```

- in

  用于遍历枚举对象

  ```ts
  type Keys = 'a' | 'b' | 'c';

  type Obj = {
    [p in Keys]: any;
  }; // -> { a: any, b: any, c: any }
  ```

- infer

  在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

  `infer`语法的限制如下：

  1. `infer`只能在条件类型的 extends 子句中使用
  2. `infer`得到的类型只能在 `true`语句中使用, 即 `X`中使用

  ```ts
  type MySum = (x: number, y: number) => number;
  type ReturnTypes<T> = T extends (...args: any[]) => infer R ? R : any;
  let fn: ReturnTypes<MySum> = 1; // let fn: number

  // 或者
  type MySum2 = (x: number, y: number) => number;
  type ReturnTypes2<T> = T extends (...args: infer B) => any ? B : never;
  let fn: ReturnTypes2<MySum2> = [1, 2]; // let fn: [x: number, y: number]

  type InferReturnType<T extends Function> = T extends (...args: any) => infer R
    ? R
    : never;
  type I6 = InferReturnType<() => string>; // string
  type InferString<T> = T extends `${infer _} ${infer c}` ? c : [];
  type I8 = InferString<'[123,45,6]'>; // 123,45,6]
  type InferLast<T> = T extends [...infer _, infer Last] ? Last : never;
  type I9 = InferLast<[123, 456]>; // 456
  type Shift<T> = T extends [infer L, ...infer R] ? [...R] : [];
  type I10 = Shift<[1, 2, 4, 5]>; // [2,4,5]
  ```

  infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

  参考文章https://www.jianshu.com/p/707a304d7752

- 索引访问操作符

  使用 `[]` 操作符可以进行索引访问：

  ```ts
  interface Person {
    name: string;
    age: number;
    0: 'aa';
  }
  type x = Person['name']; // x is string
  type x2 = Person[0]; // x is 'aa'
  ```

### 内置工具函数

1. Required

   将类型的属性变为必选

   ```ts
   interface Person2 {
     name?: string;
     age?: number;
     hobby?: string[];
   }

   const user: Required<Person2> = {
     // 报错，缺少hobby属性
     name: '树哥',
     age: 18,
   };
   ```

2. Partial

   与 Required 相反，将所有属性转换为可选属性

   ```ts
   const user: Partial<Required<Person2>> = {
     name: '树哥',
     age: 18,
   };
   // 与上相比 全部转为可选，所以缺少hobby属性也不会报错
   ```

3. Exclde

   `Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉,剩余的属性构成新的类型

   ```ts
   type T0 = Exclude<'a' | 'b' | 'c', 'a'>; // "b" | "c"
   type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // "c"
   type T2 = Exclude<string | number | (() => void), Function>; // string | number
   ```

4. Extract

   和 Exclude 相反，`Extract<T,U>` 从 T 中提取出 U。

   ```ts
   type T3 = Extract<'a' | 'b' | 'c', 'a' | 'f'>; // "a"
   type T4 = Extract<string | number | (() => void), Function>; // () =>void
   ```

5. Readonly

   把数组或对象的所有属性值转换为只读的，这就意味着这些属性不能被重新赋值。

   ```ts
   interface Person {
     name: string;
     age: number;
     gender?: 'male' | 'female';
   }

   let p: Readonly<Person> = {
     name: 'hello',
     age: 10,
     gender: 'male',
   };
   p.age = 11; // error  Cannot assign to 'age' because it is a read-only property.
   ```

6. Record

   Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

   ```ts
   type Property = 'key1' | 'key2';
   type Person = Record<Property, string>;

   const p: Person = {
     key1: 'hello 啊',
     key2: '树哥',
   };
   ```

7. Pick

   从某个类型中挑出一些属性出来

   Pick<接口,属性名|属性名|....>

   ```ts
   type Person = {
     name: string;
     age: number;
     gender: string;
   };

   type P1 = Pick<Person, 'name' | 'age'>; // { name: string; age: number; }

   const user: P1 = {
     name: '树哥',
     age: 18,
   };
   ```

8. Omit

   与 Pick 相反，`Omit<T,K>` 从 T 中取出除去 K 的其他所有属性。

   Omit<接口,属性名|属性名|....>

   ```ts
   interface Person {
     name: string;
     age: number;
     gender: string;
   }
   type P1 = Omit<Person, 'age' | 'gender'>;
   const user: P1 = {
     name: '树哥',
   };
   ```

9. NonNullable

   去除类型中的 `null` 和 `undefined`

   ```ts
   type P1 = NonNullable<string | number | undefined>; // string | number
   type P2 = NonNullable<string[] | null | undefined>; // string[]
   ```

10. ReturnType

    用来得到一个函数的返回值类型

    ```ts
    type Func = (value: string) => string;
    const test: ReturnType<Func> = '1';
    ```

11. Parameters

    用于获得函数的参数类型所组成的元组类型。

    ```ts
    type P1 = Parameters<(a: number, b: string) => void>; // [number, string]
    ```

12. InstanceType

    返回构造函数类型 T 的实例类型

    ```ts
    class C {
      x = 0;
      y = 0;
    }

    type D = InstanceType<typeof C>; // C
    ```

## tsconfig.json

在文章开头环境安装部分，记得我们有生成一个 tsconfig.json 文件，那么这个文件究竟有什么用呢

tsconfig.json 是 TypeScript 项目的配置文件。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。

### 重要字段

- files - 设置要编译的文件的名称；
- include - 设置需要进行编译的文件，支持路径模式匹配；
- exclude - 设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 设置与编译流程相关的选项。

### compilerOptions 选项

```json
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es5", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  }
}
```

## TypeScript 进阶文章

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [TypeScript 中文汉化部分文档](https://github.com/mqyqingfeng/Blog)
- [深刻理解 TypeScript 英语文档](https://basarat.gitbook.io/typescript/type-system)
- [深刻理解 TypeScript 中文文档](https://jkchao.github.io/typescript-book-chinese/)
- [React+TypeScript](https://github.com/typescript-cheatsheets/react)
- [TypeScript 官网文档 Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [TypeScript 参数简化实战（进阶知识点 conditional types，中高级必会）](https://juejin.cn/post/6844904057010651143)
- [有趣的 TypeScript 代码](https://github.com/sl1673495/typescript-codes)

## 其他文档

- [React + Typescript 工程化治理实践](https://juejin.cn/post/6844903996826583048)
- [Writing Type-Safe Polymorphic React Components (Without Crashing TypeScript)](https://blog.andrewbran.ch/polymorphic-react-components/)
- [10++ TypeScript Pro tips/patterns with (or without) React](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680)
- [TS 一些工具泛型的使用及其实现](https://zhuanlan.zhihu.com/p/40311981)
- [巧用 TypeScript（五）-- infer](https://juejin.cn/post/6844903796997357582)
- [Conditional Types in TypeScript](https://mariusschulz.com/blog/conditional-types-in-typescript)
- [Vue Ref 拆包源代码](https://github.com/vuejs/core/blob/985f4c91d9d3f47e1314d230c249b3faf79c6b90/packages/reactivity/src/ref.ts#L89)
- [Vue3 跟着尤雨溪学 TypeScript 之 Ref 类型从零实现](https://juejin.cn/post/6844904126283776014)
