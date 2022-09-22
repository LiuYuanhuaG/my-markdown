---
title: 我的TypeScript相关代码
order: 1
nav:
  title: 前端之路
  order: 1
---

# 我的 TypeScript 相关代码

## enum

- [const enum 和 enum 的区别](https://www.typescriptlang.org/docs/handbook/enums.html#const-enums)
- const enum 在计算时会自动清除冗余的转换代码

```ts
enum Methods {
  'GET',
  'POST',
}
type ReqShape = {
  url: string;
  method: keyof typeof Methods; // "GET" | "POST"
};
```

## infer

```ts
// 1.获取索引类型
// type Flatten<T> = T extends any[] ? T[number] : T;
type Flatten<T> = T extends Array<infer Item> ? Item : T;

// 2.获取一个函数的返回值类型
type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;
type Bools = GetReturnType<(a: boolean, b: boolean) => boolean[]>;
// type Bools = boolean[]

// 3.分发条件类型的处理
// 传入联合类型就会变成分发
type ToArray<Type> = Type extends any ? Type[] : never;
type StrArrOrNumArr = ToArray<string | number>;
// type StrArrOrNumArr = string[] | number[]

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;
// 'StrArrOrNumArr' is no longer a union.
type StrArrOrNumArr = ToArrayNonDist<string | number>;
// type StrArrOrNumArr = (string | number)[]
```

## 索引访问类型

- 作为索引的只能是类型

```ts
type Person = { age: number; name: string; alive: boolean };
type I1 = Person['age' | 'name'];
// type I1 = string | number

type I2 = Person[keyof Person];
// type I2 = string | number | boolean

type AliveOrName = 'alive' | 'name';
type I3 = Person[AliveOrName];
// type I3 = string | boolean

const MyArray = [
  { name: 'Alice', age: 15 },
  { name: 'Bob', age: 23 },
  { name: 'Eve', age: 38 },
];

type Person = typeof MyArray[number];
// type Person = {
// name: string;
// age: number;
// }

type Age = typeof MyArray[number][“age”];
// type Age = number
// Or

type Age2 = Person[“age”];
// type Age2 = number

const APP = ['TaoBao', 'Tmall', 'Alipay'] as const;
type app = typeof APP[number];
// type app = “TaoBao” | “Tmall” | “Alipay”
```

## 映射类型

```ts
// 遍历所有属性 都变成布尔类型
type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};
// 映射修饰符: readonly ? - +
// 1.删除属性中的只读属性
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};
// 2.删除属性中的可选属性
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
```

- as

```ts
// 通过模板字面量创建一个新属性名
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};
interface Person {
  name: string;
  age: number;
  location: string;
}
type LazyPerson = Getters<Person>;
// type LazyPerson = {
//    getName: () => string;
//    getAge: () => number;
//    getLocation: () => string;
// }
```

## 模板字面量类型

- 只能用于类型
- 如果是联合类型 就会显示所有的字面量交叉后的可能性

```ts
const person = makeWatchedObject({
firstName: "Saoirse",
lastName: "Ronan",
age: 26
});
// 给事件加一个Changed后缀
// 必须string & keyof Type 因为keyof只能是string number symbol 模板字符串的是 string | number | bigint | boolean | null | undefined
type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};
declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

// 或者这样
type PropEventSource<Type> = {
on(eventName: ${Exclude<keyof Type, symbol>}Changed, callback: (newValue: any) => void): void;
};

// 或者这样
type PropEventSource<Type> = {
on(eventName: ${Extract<keyof Type, string>}Changed, callback: (newValue: any) => void): void;
};

person.on("firstNameChanged", () => {});
```

- 模板字符串的推断

```ts
// 将 on 变成了一个泛型
type PropEventSource<Type> = {
    on<Key extends string & keyof Type>
        (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
};

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", newName => {
                                                          // (parameter) newName: string
    console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => {
    // (parameter) newAge: number
    if (newAge < 0) {
        console.warn("warning! negative age");
    }
})
```

## 内置字符操作类型

```ts
// 1.Uppercase
type Greeting = "Hello, world"
type ShoutyGreeting = Uppercase<Greeting>
// type ShoutyGreeting = "HELLO, WORLD"
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`
type MainID = ASCIICacheKey<"my_app">
// type MainID = "ID-MY_APP"


// 2.Lowercase
type Greeting = "Hello, world"
type QuietGreeting = Lowercase<Greeting>
// type QuietGreeting = "hello, world"

type ASCIICacheKey<Str extends string> = `id-${Lowercase<Str>}`
type MainID = ASCIICacheKey<"MY_APP">
// type MainID = "id-my_app"

// 3.Capitalize 把字符串的第一个字符转为大写形式
type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;
// type Greeting = "Hello, world"

// 4.Uncapitalize 把字符串的第一个字符转换为小写形式：
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
// type UncomfortableGreeting = "hELLO WORLD"
```

## [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)

### `Awaited<Type>`

```ts
```

### `Partial<Type>`

- 传入的属性变成可选
- `type Partial<T> = { [P in keyof T]?: T[P] };`

### `Required<Type>`

- 将传入的属性变为必选项
- `type Required<T> = { [P in keyof T]-?: T[P] };`

### `Readonly<Type>`

- 将传入的属性变为只读
- `type Readonly<T> = { readonly [P in keyof T]: T[P] };`

### `Record<Keys, Type>`

- 将 K 中所有的属性的值转化为 T 类型(定义一个接口的 key 和 value)
- `type Record<K extends keyof any, T> = { [P in K]: T };`

```ts
type keys = 'A' | 'B' | 'C';
const result: Record<keys, number> = {
  A: 1,
  B: 2,
  C: 3,
};
```

### `Pick<Type, Keys>`

- 从 T 中取出 一系列 K 的属性
- `type Pick<T, K extends keyof T> = { [P in K]: T[P] };`

```ts
// Pick<接口,'key1','key2',...>
interface Props {
  name: string;
  label: number;
  value: boolean;
}
type ChildrenProps = Pick<Props, 'name' | 'label'>;
```

### `Omit<Type, Keys>`

```ts
// 忽视重写某个属性
interface A {
  a: number;
  b: number;
}
interface B extends Omit<A, 'a'> {
  a: boolean;
}
```

### `Exclude<UnionType, ExcludedMembers>`

- 从 T 中剔除可以赋值给 U 的类型
- `type Exclude<T, U> = T extends U ? never : T;`

### `Extract<Type, Union>`

- 提取 T 中可以赋值给 U 的类型
- `type Extract<T, U> = T extends U ? T : never;`

### `NonNullable<Type>`

- 从 T 中剔除 null 和 undefined
- `type NonNullable<T> = T extends null | undefined ? never : T;`

### `Parameters<Type>`

```ts
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type A = Parameters<() => void>; // []
type B = Parameters<typeof Array.isArray>; // [any]
type C = Parameters<typeof parseInt>; // [string, (number | undefined)?]
type D = Parameters<typeof Math.max>; // number[]
```

### `ConstructorParameters<Type>`

```ts
/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<
  T extends new (...args: any[]) => any
> = T extends new (...args: infer P) => any ? P : never;
type A = ConstructorParameters<ErrorConstructor>;
// [(string | undefined)?]

type B = ConstructorParameters<FunctionConstructor>;
// string[]

type C = ConstructorParameters<RegExpConstructor>;
// [string, (string | undefined)?]
```

### `ReturnType<Type>`

- 获取函数返回值类型
- `type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;`

```ts
type T0 = ReturnType<() => string>;
```

### `InstanceType<Type>`

- 获取构造函数类型的实例类型

```ts
/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends new (...args: any[]) => any> = T extends new (
  ...args: any[]
) => infer R
  ? R
  : any;
type A = InstanceType<ErrorConstructor>; // Error
type B = InstanceType<FunctionConstructor>; // Function
type C = InstanceType<RegExpConstructor>; // RegExp
```

### `ThisParameterType<Type>`

```ts
```

### `OmitThisParameter<Type>`

```ts
```

### `ThisType<Type>`

```ts
```

## 我的工具函数

### OverrideProperty

- 覆盖接口属性

```ts
/**
 * Returns object T, but with T[K] overridden to type U.
 * @example
 * type MyObject = { a: number, b: string }
 * OverrideProperty<MyObject, "a", string> // returns { a: string, b: string }
 */
export type OverrideProperty<T, K extends keyof T, U> = Omit<T, K> &
  { [P in keyof Pick<T, K>]: U };

// type Modify<T, R> = Omit<T, keyof R> & R;
```

### DeepPartial

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

### DeepRequired

```ts
type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object ? DeepRequired<T[K]> : T[K];
};
```

### GetCommonKeys

```ts
// 提取公众属性
type CommonKeys = Extract<keyof Worker, keyof Student>;
```

### DeletePartial

- 删除属性中的可选属性

```ts
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
```

### 差集

- worKer 在 student 中不存在的 key

```ts
type ExcludeKeys = Exclude<keyof Worker, keyof Student>;
```

### tuple => union

- [string, number] -> string | number

```ts
type TTuple = [string, number];
type Res = TTuple[number]; // string | number
```

### union => intersection

- T1 | T2 -> T1 & T2

```ts
type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

type Result = UnionToIntersection<T1 | T2>; // T1 & T2
```

## 操作符

- [映射修饰符]()
- in
- is

  - this is Networked & this
  - this is { value: T }
  - 用于类型收窄 arr is number[]

- []
- !.xxx
- !:string
- as
- readonly
- ?

## type 与 interface 的区别

- https://www.typescriptlang.org/docs/handbook/advanced-types.html#interfaces-vs-type-aliases
- 同名的 type 不会自动合并
- type 可以使用模板字面量 索引访问类型等特性
- ...

## 提取函数类型

```ts
interface Action<T> {
  payload?: T;
  type: string;
}

interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(action: Action<T>): Action<U>;
}

type FuncName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

type Connect = (module: Module) => { [T in FuncName<Module>]: Module[T] };
/*
 * type Connect = (module: Module) => {
 *   asyncMethod: <T, U>(input: Promise<T>) => Promise<Action<U>>;
 *   syncMethod: <T, U>(action: Action<T>) => Action<U>;
 * }
 */
```

## dispath 转换

```ts
type Action =
  | {
      type: 'INIT';
    }
  | {
      type: 'SYNC';
    }
  | {
      type: 'LOG_IN';
      emailAddress: string;
    }
  | {
      type: 'LOG_IN_SUCCESS';
      accessToken: string;
    };

// 用类型查询查出Action中所有type的联合类型
type ActionType = Action['type'];

// 把类型中key为"type"去掉
type ExcludeTypeField<A> = { [K in Exclude<keyof A, 'type'>]: A[K] };

type ExtractActionParameters<A, T> = A extends { type: T } ? A : never;
// 把参数对象中的type去掉
// Extract<A, { type: T }会挑选出能extend { type: T }这个结构的Action中的类型
type ExtractActionParametersWithoutType<A, T> = ExcludeTypeField<
  ExtractActionParameters<A, T>
>;

type ExtractSimpleAction<A> = A extends any
  ? {} extends ExcludeTypeField<A>
    ? A
    : never
  : never;

type SimpleActionType = ExtractSimpleAction<Action>['type'];
type ComplexActionType = Exclude<ActionType, SimpleActionType>;

// 简单参数类型
function dispatch<T extends SimpleActionType>(type: T): void;
// 复杂参数类型
function dispatch<T extends ComplexActionType>(
  type: T,
  args: ExtractActionParametersWithoutType<Action, T>,
): void;
// 实现
function dispatch(arg: any, payload?: any) {}

dispatch('SYNC');

dispatch('LOG_IN', {
  emailAddress: 'ssh@qq.com',
});
```

## 混合继承

```ts
// 混合接受一个类，并且使用新功能扩展它
type Constructor<T = {}> = new (...args: any[]) => T;

/////////////
// mixins 例子
////////////

// 添加属性的混合例子 扩展一个类并且返回它
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

// 添加属性和方法的混合例子
function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    isActivated = false;

    activate() {
      this.isActivated = true;
    }

    deactivate() {
      this.isActivated = false;
    }
  };
}

///////////
// 组合类
///////////

// 简单的类
class User {
  name = '';
}

// 添加 Timestamped 的 User
const TimestampedUser = Timestamped(User);

// Tina Timestamped 和 Activatable 的类
const TimestampedActivatableUser = Timestamped(Activatable(User));

//////////
// 使用组合类
//////////

const timestampedUserExample = new TimestampedUser();
console.log(timestampedUserExample.timestamp);

const timestampedActivatableUserExample = new TimestampedActivatableUser();
console.log(timestampedActivatableUserExample.timestamp);
console.log(timestampedActivatableUserExample.isActivated);
```

## React 与 TypeScript

```ts
// props
React.ComponentProps<'button'>
React.ButtonHTMLAttributes<HTMLButtonElement>
// node
React.ReactNode
// css
React.CSSProperties
// children
React.FunctionComponentElement
// 事件
onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
React.FormEvent<HTMLInputElement>
onSubmit: e: React.SyntheticEvent
e.target as typeof e.target & {
  email: {value: string }
}
e.target.email.value
// 键盘事件
e:React.KeyboardEvent

// 返回空的类型
as any as JSX.Element
// forwardRef
forwardRef<useImperativeHandle里面方法的type, props的type>
// this.setState报错
React.Component<P,S>定义state的type

// getDerivedStateFromProps
static getDerivedStateFromProps(
    props: Props,
    state: State
  ): Partial<State> | null {
    //
  }
class Comp extends React.Component<
  Props,
  ReturnType<typeof Comp["getDerivedStateFromProps"]>
> {
  static getDerivedStateFromProps(props: Props) {}
}
// defaultProps
  // internal contract, should not be exported out
type GreetProps = {
  age: number;
};

class Greet extends Component<GreetProps> {
  static defaultProps = { age: 21 };
}

  // external contract
export type ApparentGreetProps = JSX.LibraryManagedAttributes<
  typeof Greet,
  GreetProps
>;
type ComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? JSX.LibraryManagedAttributes<T, P>
  : never;

const TestComponent = (props: ComponentProps<typeof GreetComponent>) => {
  return <h1 />;
};

  // No error
const el = <TestComponent name="foo" />;
```

```ts
  children?: React.ReactNode;
  childrenElement: JSX.Element;
  style?: React.CSSProperties;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  props: Props & React.ComponentPropsWithoutRef<"button">;   // 不转发的props
  props2: Props & React.ComponentPropsWithRef<MyButtonWithForwardRef>;  // 转发的props

 onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ text: e.currentTarget.value });
  };
  onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({text: e.currentTarget.value})
  }
  // 不关心事件的类型
  e: React.SyntheticEvent
  const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
  };
```

### TypeScript 获取 react 及 vue 组件实例

#### class 获取组件实例

```tsx | pure
import React from 'react';
export default class Child extends React.Component {
  b = () => {};
  render() {
    return <>Child</>;
  }
}
class AAA extends React.Component {
  myRef = React.createRef<InstanceType<typeof Child>>(null!);
  state = {};

  backgroundOrigin = () => {
    this.myRef.current?.b();
  };

  render() {
    return (
      <>
        <Child ref={this.myRef} />
      </>
    );
  }
}
```

#### hook 获取 ref - 1

```tsx | pure
import React from 'react';
import Countdown, { CountdownHandle } from './Countdown';

function App() {
  const countdownEl = React.useRef<CountdownHandle>(null!);

  React.useEffect(() => {
    if (countdownEl.current) {
      countdownEl.current.a = 10;
    }
  }, []);

  return <Countdown ref={countdownEl} />;
}
```

```tsx | pure
import React from 'react';
export type CountdownHandle = {
  start: () => void;
  a: number;
};

type Props = {};

const Countdown = React.forwardRef<CountdownHandle, Props>((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    // start() has type inferrence here
    start() {
      alert('Start');
    },
    a: 1,
  }));

  return <div>Countdown</div>;
});

export default Countdown;
```

#### hook 获取 ref - 2

```tsx | pure
import React from 'react';
type CountdownHandle = {
  start: () => void;
};
type CountdownProps = {};
const Countdown: React.ForwardRefRenderFunction<
  CountdownHandle,
  CountdownProps
> = (props, forwardedRef) => {
  React.useImperativeHandle(forwardedRef, () => ({
    start() {
      alert('Start');
    },
  }));
  return <div>Countdown</div>;
};

export default React.forwardRef(Countdown);
```

```tsx | pure
import React from 'react';
import Countdown from './Countdown';

const App: React.FC = () => {
  const ref = React.useRef<React.ElementRef<typeof Countdown>>(null!); // assign null makes it compatible with elements.
  ref.current?.start();
  return <Countdown ref={ref} />;
};
```

#### vue3

```js | pure
<script setup lang="ts">
import xxx from './xxx'
const Child = ref<InstanceType<typeof xxx>>(null!)
</script>
```

## 报错的解决

### 元组

```ts
const args = [8, 5] as const;
const angle = Math.atan2(...args);
```

### 对象索引形式

```ts
const props = {
  foo: 'bar',
};
props['foo'] = 'baz'; // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
```

```ts
interface Props {
  foo: string;
  [key: string]: Props[keyof Props];
}

const props: Props = {
  foo: 'bar',
};

props['foo'] = 'baz'; // ok
props['bar'] = 'baz'; // error
```

### 对象尚未定义

```ts
class Component extends React.Component<{}, {}> {
    // 这个属性可能是undefined
    graph: Graph?;

    componentDidMount() {
      this.graph = new Graph()
      this.init(this.graph)
    }

    init() {
      this.graph.on("click", () => {})  // Object is possibly 'undefined'
    }

    render() {
        return <div>foo</div>
    }
}
```

```ts
// 需要使用 type guards
init() {
    if (this.graph) this.graph.on("click", () => {})  // ok
}
// !.xxx
init() {
    this.graph!.on("click", () => {})  // ok
}
// ?.
init() {
   this.graph?.on("click", () => {})  // ok
}
```
