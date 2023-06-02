---
title: 'Javascript Advanced'
date: '2023-06-02'
---
# JS advanced

## this

函数调用时候，js会默认给this绑定一个值

this的绑定和定义位置（编写位置）没有关系

this的绑定和调用方式跟调用的位置有关系

this是再运行时被绑定

### 绑定规则

- 默认绑定
  
  ```js
  function setup() {
    console.log("setup", this)
  }
  
  // 直接调用
  setup() // window
  
  // 对象调用
  const obj = {
    name: 'baozi'
  }
  
  obj.setup = setup
  
  obj.setup() // obj
  
  const object = {
    name: 'baozi',
    setup: function () {
      console.log('object',this)
    }
  }
  
  object.setup() // object
  
  const launch = object.setup
  
  launch() // window
  // "use strict"
  // 严格模式下，独立调用函数中的this指向undefined
  
  // 高阶函数
  function test(fn) {
    fn() // 独立调用
  }
  
  test(object.setup) // window
  ```

- 隐式绑定
  
  ```js
  function setup() {
    console.log('setup', this)
  }
  
  const obj = {
    launch: setup
  }
  // 隐式绑定
  obj.launch() // obj
  ```

- new绑定
  
  ```js
  // new 创建一个新对象 步骤
  // step1 将this指向空对象
  // step2 执行函数体中的代码
  // step3 没有显示返回非空对象时，默认返回这个对象
  function setup() {
    this.name = 'baozi'
    console.log('setup',this)
  }
  
  new setup() // 空对象
  ```

- 显示绑定
  
  ```js
  function setup() {
   console.log('setup', this)
  }
  
  const obj = {
   name: 'baozi'
  }
  
  // 显示绑定
  setup.apply(obj)// obj
  
  setup.call(obj)// obj
  ```

```js
func.apply(thisArg,[argArray])

func.call(thisArg,arg1,arg2)

```js
function setup(height, age) {
console.log('setup', this)
console.log({ height, age})
}

const obj = {
name: 'baozi'
}

// 显示绑定
// param1 绑定参数
// param2 传入额外的实参，以数组的形式
setup.apply(obj,[188,20])

// param1 绑定参数
// param2 参数列表
setup.call(obj,188,20)
```

```js
func.apply(thisArg,[argArray])

func.call(thisArg,arg1,arg2)

```js
function setup(height, age) {
console.log('setup', this)
console.log({ height, age})
}

const obj = {
name: 'baozi'
}

// 显示绑定
// param1 绑定参数
// param2 传入额外的实参，以数组的形式
setup.apply(obj,[188,20])

// param1 绑定参数
// param2 参数列表
setup.call(obj,188,20)
```

```js
func.apply(thisArg,[argArray])

func.call(thisArg,arg1,arg2)

```js
function setup(height, age) {
console.log('setup', this)
console.log({ height, age})
}

const obj = {
name: 'baozi'
}

// 显示绑定
// param1 绑定参数
// param2 传入额外的实参，以数组的形式
setup.apply(obj,[188,20])

// param1 绑定参数
// param2 参数列表
setup.call(obj,188,20)
```

```js
func.apply(thisArg,[argArray])

func.call(thisArg,arg1,arg2)

```js
function setup(height, age) {
console.log('setup', this)
console.log({ height, age})
}

const obj = {
name: 'baozi'
}

// 显示绑定
// param1 绑定参数
// param2 传入额外的实参，以数组的形式
setup.apply(obj,[188,20])

// param1 绑定参数
// param2 参数列表
setup.call(obj,188,20)
```

### bind

func.bind(thisArg,arg1,arg2,...)

```js
function setup(height,age) {
  console.log('setup', this)
  console.log({height,age})
}

const obj = {
  name: 'baozi'
}

const launch = setup.bind(obj,188,20)

// 每次调用setup时，总是绑定到obj

launch()
```

- 内置函数调用绑定 根据经验
  
  ```js
  function setup() {
    console.log('setup', this)
  }
  
  setTimeout(setup,1000) // window , 显式绑定window
  ```

```js
const chars = ['a','b','c']

// foreach 第二个参数可以显示绑定 this
chars.forEach(function(item) {
  console.log(this)
},chars) // chars 显式指定
```

### 优先级

默认绑定优先级最低

显示绑定优先级高于隐式绑定

```js
function setup() {
  console.log('setup', this)
}

const starter = {
  setup
}

// 比较优先级
starter.setup.apply('a')// Sting a
```

bind高于隐式绑定

```js
function setup() {
  console.log('setup', this)
}

const launch = setup.bind(1)

const starter = {
  launch
}

starter.launch()// 1
```

new 绑定高于隐式绑定

```js
const starter = {
  launch: function setup() {
    console.log('setup', this)
  }
}

new starter.launch()// {}
```

new 不可以和 apply/call 一起使用

new 和bind new的优先级高于bind

```js
function setup() {
  console.log('setup', this)
}

const launch = setup.bind(2)

new launch() // {}
```

### 忽略绑定

```js
function setup() {
  console.log('setup', this)
}

setup.apply(null) // object
setup.call(undefined) // undefined
```

### 间接函数引用

```js
const starter = {
  name: 'starter',
  setup: function setup() {
    console.log('setup', this)
  }
}

const starter2 = {
  name: 'starter2'
}

starter2.setup = starter.setup

starter2.setup() // starter2
```

### 匿名函数

不会绑定this，arguments属性

不能作为构造函数使用（不能和new使用）

只会通过上层作用域寻找，**代码块才有作用域**，**对象没有作用域**

## 浏览器原理

### 渲染原理

网页解析过程

域名解析->静态资源->index.html->根据link和script请求下载css和js文件

浏览器内核WebKit

解析流程：LoadHtml->PraseHTML->LoadCss/PraseCSS->Attach->Create Dom Tree->Display

详细流程

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-25-16-12-38-image.png)

### defer和async

defer 下载的时候不会阻塞，浏览器继续解析html，Dom tree

执行代码，触发DOMContentLoader继续渲染。在defer代码中可以操作DOM

defer可以提高页面性能，推荐放到head中

async 不会阻塞，但是不能保证执行顺序。下载完成立即执行。

## JS执行原理

### JS执行过程

#### 执行上下文（Execution Contexts）

> js引擎在执行代码之前，会在堆内存中创建一个全局对象：Global Object（GO）

- 该对象所有的作用域都可以访问

- 包含Date、Array、String、Number、setTimeout等

- 包含一个window属性指向自己

js 内部有执行上下文栈（Execution Context Stack）,用于执行代码的调用栈

VO对象（Variable Object）

每个执行上下文会关联一个VO对象，变量和函数声明会被添加到这个VO对象中。全局上下文中的VO就是GO

VO中函数先被声明。

> 函数代码执行流程

执行另一段代码，会形成新的执行上下文，关联一个VO对象，函数关联的叫**AO**

AO对象会使用arguments初始化（有值）初始值为传入的参数

#### 作用域和作用域链

全局代码查找变量

```js
var message = 'global' // top[scope]

function setup() { // [scope]
  var message = 'setup'
  function lanuch() { // [scope]
    var message = 'lanuch'
    console.log(message) // 先查找自己的作用域/找不到向上查找
  }
  return lanuch
}

var lanuch = setup()
lanuch()
```

当进入到一个执行上下文时，执行上下文也会关联一个作用域链

- 作用域链是一个对象列表，用于变量标识符求值

- 当进入一个执行上下文时，这个作用域链被创建，并且根据代码类型，添加一系列对象

- 全局代码的作用域链就是GO

- **函数被解析时已经确定。即在定义的时候已经确定作用域链。**

- 当执行到函数的执行上下文，将作用域链中的值保存到自己的VO

作用域链的设计为了闭包。

### 内存管理和闭包

#### 内存管理

代码执行过程中需要分配内存，某些语言需要手动管理内存，某些会自动管理内存。

JS的内存管理是自动的。JS引擎会处理好

Js在定义数据时分配内存

原始数据类型内存分配会在**执行时**直接在栈空间分配-

复杂数据类型内存分配会在堆中开辟空间，并这块空间的地址返回

#### 垃圾回收GC

**引用计数算法**

对象中retainCount记录这块地址被引用的个数。当引用为0时释放对象。

弊端： 可能会产生循环引用

**标记清除算法**

核心思想是可达性

设置一个根对象（Root Object），垃圾回收器定期从根开始，找到从根开始有引用的对象，没用引用到的对象，就认为是不可用的对象

可以解决循环引用的问题

**标记整理**

回收期间会将保留的对象搬运到连续的内存空间，避免内存碎片化

**分代收集**

对象被分为两组：新的和旧的

长期存活的对象会变老旧，被检查的频次会减少

**增量收集**

将垃圾回收工作分为多个部分处理，逐一处理

**闲时收集**

在cpu空闲时，回收

### 闭包（Closure）

- 计算机科学中的闭包

支持头等函数的编程语言中，实现词法绑定的一种技术

闭包是一个结构体，它存储了**一个函数**和**一个关联的环境**

闭包实现：作用域链

- JS中的闭包

js定义的函数就是一个闭包（广义)

访问外层作用域的变量（狭义）

#### 闭包的访问过程

```js
function createAdder(count) {
  function adder(num) { // 上层作用域找count
    return count + num
  }
  return adder
}

var adder5 = createAdder(5)

adder5(10)

var adder8 = createAdder(8)
adder8(10)
```

#### 闭包的内存泄露

```js
function createAdder(count) {
  function adder(num) { // 上层作用域找count
    return count + num
  }
  return adder
}

var adder5 = createAdder(5)

adder5(10)

var adder8 = createAdder(8)

adder8(20)

// 内存泄漏：如果后面不再使用adder8，GC保留，造成内存泄漏
adder8 = null // 手动释放内存，下次GC就会回收
```

#### 浏览器的优化

```js
function setup() {
  var name = 'setup'
  var options = 'option'
  function lanuch() {
    console.log(name)
  }
  return lanuch
}

var fn = setup()

fn() // 闭包中没有用到的属性会被浏览器优化
```

## 函数增强

函数属性和arguments

```js
function setup() {
}
setup.applay() // applay 就是属性
```

```js
function setup() {

}

var lanuch = function() {

}

// 自定义属性
setup.title = 'setup'

// 默认函数对象就有自己的属性
// 1.name
console.log(setup.name)

// 2.length 获取参数本来接收的参数个数,剩余参数不会算入length中

setup(1,2,3)
```

#### arguments

```js
function setup(_1,_2) {
  // 类似数组（array-like）对象,是一个可迭代对象
  // 不是数组类型，是对象类型
  // 有特性，lenthg/index
  // 没有数组中的一些方法 filter/map
  console.log(arguments)

  console.log(arguments[0])
  for (const argu of arguments) {
    console.log(argu)
  }

  // 获取参数中全部偶数，arguments没有filter方法，它不是一个数组
}

setup(1,2,3,4)
```

arguments 转 Array

- 遍历arguments，添加到新数组中

- ES6中，Array.from(arguments), Array.from参数必须是一个可迭代对象

- 展开运算符[...arguments]

- 调用slice方法
  
  ```js
  [].slice.apply(arguments)
  ```

箭头函数不绑定arguments

#### 函数的剩余参数rest

ES6中引入了rest parameter, 剩余参数需要写到最后。作为arguments的替代品

```js
function setup(arg1, arg2, ...rest) {
  console.log({arg1,arg2,rest})
  // { arg1: 10, arg2: 20, rest: [ 30, 40 ] }
}

setup(10,20,30,40)
```

### 纯函数（Pure function）

相同的输入相同的输出

输入输出值以外的其他隐藏信息或状态无关

确定的输入，一定产生确定的输出

函数执行过程不能产生副作用

```js
function setup(obj){
  console.log(obj)
  obj.name = 'obj' // side effect
}

var obj = {
  age: 18
}

setup(obj)
```

数组slice和splice

```js
var names = ['a','b','c','d','e']

names.slice(0,2) // 不修改原来数组 本质是调用this

names.splice(0,2) // 修改原数组

console.log(names)
```

### 柯里化Currying

把接收多个参数的函数，变成接收一个单一参数的函数，并且接受余下的参数，返回结果的新函数的技术

```js
function setup(x, y, z) {
  console.log( {x,y,z})
}

setup(10,10,10)

// 柯里化
// 柯里化函数
function enhanceSetup(x) {
  return function(y) {
    return function(z) {
      console.log( {x,y,z})
    }
  }
}

enhanceSetup(20)(20)(20)
```

另一种写法：箭头函数写法

```js
// 优化
var enhanceSetup2 = x=> y=> z=> console.log({x,y,z})
enhanceSetup2(30)(30)(30)
```

自动柯里化

```js
function setup(x,y,z) {
  console.log(x,y,z)
}

function sum(x,y) {
  return x+y
}

// 自动柯里化
function transformCurring(fn) {
  function curryFn(...rest) {
    // 继续返回新的函数
    // 执行fn函数
    if (rest.length >= fn.length) {
      // 参数足够，执行fn
      return fn(...rest)
    }else { // 执行第一类
      return function(...newRest) {
        // 保存原来的参数
       return curryFn(...rest.concat(newRest))
      }
    }
  }
  return curryFn
}

var enhanceSetup = transformCurring(setup)
enhanceSetup(1)(1)(1)
```

### 组合函数Compose

```js
var num = 100

function double(num) {
  return num * 2
}

function pow(num) {
  return num ** 2
}

// 将两个函数组合再一起生成一个新函数
function composeFn(num) {
  return pow(double(2))
}

// 通用组合函数

function transformCompose(...fns){
  // 边界判断
  if(fns.length <= 0) return
  for (const fn of fns) {
    if(typeof fn !== 'function') {
      throw new Error(`param ${fn} is not a function`)
    }
  }

  function enhanceCompose(...args) {
    var res = fns[0].apply(this,args)
    for (var i = 1; i < fns.length; i++) {
      var fn = fns[i]
      res = fn.apply(this,[res])
    }
    return res
  }

  return enhanceCompose
}

var newFn = transformCompose(pow,double)

console.log(newFn(2))
```

### with

扩展语句的作用域链

```js
var obj = {
  namea: 'obj'
}

with(obj) {
  console.log(namea)
}
```

### eval函数

可以将传入的字符串作为函数代码执行,将最后一行代码作为返回值

## 对象增强

对象属性操作的控制,使用属性描述符

### Object.defineProperty

这个方法会直接在对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

Object.defineProperty( obj, prop ,description)

obj 定义属性的对象，prop修改的属性名或Symbol，description修改的属性描述符

属性描述符分类

configurable： 是否可以delete删除属性，或者修改它的特性，或者是否可以将它修改为存取属性描述符

enumerable：表示该属性是否可以通过for-in或者Object.keys返回该属性

writeable：表示是否可以修改属性的值 ，只读属性

value: 返回的value

存取属性描述符

set:

get:

拦截set和get

多个属性描述符

Object.defineProperties(obj,{})

## 原型和原型链

### 对象和函数的原型

> 对象的原型

对象中存在一个[[Prototype]]属性称为对象的原型,这个特殊的对象可以指向另外一个对象

浏览器会添加一个属性`__proto__` 可以获取到原型，浏览器可能未实现

也可以通过标准方法Object.getPrototypeOf(obj)获得

当通过[[get]]方式获取一个属性对应的value时，它优先在自己的对象中查找，查找到直接返回，没有找到则会在原型对象中查找

```js
var obj = {
  name: 'baozi',
  title: 'hi'
}
console.log(obj.message)// undefined
obj.__proto__.message = 'hi coder'

console.log(obj.message)// 'hi coder'
```

> 函数对象的原型

```js
function setup() {

}

// 函数看做普通对象时，也有__proto__（隐式原型）
console.log(setup.__proto__)

// 函数看做一个函数时，具备prototype，对象没有这个属性（显式原型）
// 作用：构建对象时，给对象设置隐式原型
console.log(setup.prototype)
```

new操作符

- 创建空对象
  
  `var obj = {}`

- 将空对象赋值给this
  
  `this = obj`

- 将函数的显式原型赋值给这个对象作为它的隐式原型
  
  `obj.__proto__ = Person.prototype`

- 执行函数体中的代码

- 将对象默认返回

当多个实例化对象有共同的方法时，可以把该方法放到构造函数对象的显示原型上，所有实例化的对象都会共享该方法

```js
function Student(name,number){
  this.name = name
  this.number = number
  // 实例化会产生很多个函数对象
  // this.happying = function() {
  //   console.log(this.name + 'happying')
  // } 
}
Student.prototype.running = function(){
  console.log(this.name + ' running')
}

// stu1的隐式原型就是Student.prototype
var stu1 = new Student('lili',1)
// 查找，现在自己身上查找，没找到，到原型上查找
stu1.running() // this 隐式绑定

var stu2 = new Student('ming',2)
```

### 显式原型上的属性

函数的显示原型对象上有一个constructor属性指向函数

```js
function Person() {

}

var PersonPrototype = Person.prototype
console.log(PersonPrototype.constructor === Person ) //true
```

### 重写原型对象

当需要在原型上添加过多的对象时，往往会重写原型对象

```js
function Person() {

}

console.log(Person.prototype)

Person.prototype.message = 'message'
Person.prototype.info = 'info'
Person.prototype.running = function(){

}

// 直接赋值一个新的原型对象
// 但是没有Constructor,可以手动添加
Person.prototype = {
  message: 'new message',
  info: 'new info',
  running: function(){
    console.log('new running')
  },
  constructor: Person
}
```

直接重写后会把Constructor 的enumable变成true，用Objec.defineProperty()修改更好

### 继承

```js
var info = {} // 对象字面量的本质
// 等价于
var info = new Object()
console.log(info.__proto__ === Object.prototype) // true
```

### 原型链

从一个对象上获取属性，如果在当前对象中没有获取到就会去他的原型上面获取

```js
var obj = {
  name: 'obj',
  title: 'title'
}

// 查找顺序
// obj上面寻找
// obj.__proto__上面寻找
// obj.__proto__.__proto__ ->null 上面寻找 undefined
console.log(obj.message)
```

Object对象的隐式原型为null，是所有类的父类

### 原型链实现继承

不可以把父类的原型赋值给子类的原型

```js
function Person(name, age) { 
  this.name = name;
  this.age = age;
}

Person.prototype.running = function () {
  console.log('Running')
}

Person.prototype.eating = function () {
  console.log('eating')
}

function Student(name,age,score) {
  // 1.属性继承
  this.name = name;
  this.age = age;

  this.score = score;
}

// 创建一个父类的实例对象，用这个实例对象作为子类的原型
var person = new Person('person',99)
Student.prototype = person

// 2.方法继承
// Student.prototype.running = function () {
//   console.log('Running')
// }

// Student.prototype.eating = function () {
//   console.log('eating')
// }

Student.prototype.studying = function () {
  console.log('studying')
}

var stu1 = new Student('baozi',18,100)
stu1.running()
```

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-28-15-14-45-image.png)

#### 借用构造函数继承

```js
function Student(name,age,score) {
  // 借用构造函数
  Person.call(this,name,age)
  this.score = score;
}
```

以上是组合继承的实现。

组合继承总是会调用两次父类构造函数，子类有两份父类属性

#### 原型式继承函数（寄生组合式）

```js
function Person(name,age) {

}

Person.prototype.running = function () {
  console.log('Running')
}

function Student(name,age,score) {

}

function createObject(obj) { // 接收父类显式原型
  var _obj = {}
  _obj.__proto__ = obj
  return _obj
}

Student.prototype = createObject(Person.prototype)
var stu1 = new Student('baozi',18)
stu1.running()
```

方案二

```js
Student.prototype = Object.create(Person.prototype)
```

```js
function inherit(subClass,superType) {// 最终方案
  subType.prototype = Object.create(superType)
}
```

```js
function inherit(subClass,superType) { // 完善
  subType.prototype = Object.create(superType)
  // SubClass 是 子类函数
  Object.defineProperty(subClass,"constructor",{
    enumerable: false,
    configurable: true,
    writable: true,
    value: subClass
  })
}
```

## ES6继承

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-28-20-15-04-image.png)

Class类定义

添加到对象原型上的方法称为实例方法，添加到对象上的方法称为类方法

### 类使用

```js
class Person {
  constructor(name,age) {
    console.log({name,age})
  }
}

const p1 = new Person('baozi',1)
const p2 = new Person()

// 表达式

const Student = class {

}

const stu1 = new Student()
```

### class类和function类的区别

function可以作为普通函数调用。

class不可以作为普通函数调用

### class的访问器方法（access）

对象访问器方法

```js
// 直接在对象中定义访问器

const obj = {
  _name: 'baozi',
  set name(value) { // setter
    this._name = value
  },
  get name() {// getter
    return this._name
  }
}
```

类对象访问器方法

```js
class Person {
  constructor(name,age) {
    this._name = name
    this._age = age
  }
  set name(value) {
    this._name = value
  }
  get name() {
    return this._name
  }
}

const p1 = new Person('baozi',18)
console.log(p1.name)
```

### 类的静态方法

加上static关键字

### 继承内置类

对内置类进行扩展。也可以直接对Array进行扩展，在Array的显式原型上扩展

### 类的mixins

Js只支持单继承

```js
class Animal {
  running(){}
}

function minxinAnimal(BaseClass) {
  return class extends BaseClass {
    running(){}
  }
}
class newClass extends mininAnimal(Animal) {

}
```

## Babel ES6转化为ES5

## 对象增强

计算属性名

`[<变量>]: value`

### 数组增强

数组解构

```js
const names = [1,2,3,4,5]
const [name1,name2,name3] = names
```

## 手写apply/call/bind

```js
function setup() {
  console.log(this,'setup')
}
// setup 作为一个对象获取apply方法
// setup 的apply函数 来自于Function.prototype
setup.apply(1)
```

apply

```js
function setup(aname) {
  console.log(this,aname)
}
// setup 作为一个对象获取apply方法
// setup 的apply函数 来自于Function.prototype
// setup.apply(1,[1])

Function.prototype.myApply = function(_this,param = []) {
  // 1.this.apply(_this)
  // 2.隐式绑定实现
  // _this.fn = this
  // _this.fn()
  // delete _this.fn
  // 3.优化
  // 边界 case 基本数据类型
  _this = (_this === undefined || _this === null)? window : Object(_this)
  Object.defineProperty(_this,'fn',{
    configurable: true,
    writable: false,
    enumerable: false,
    value: this
  })
  _this.fn(param)
  delete _this.fn
}

setup.myApply({aname: 'baozi'},['myApply'])
```

bind

```js
function setup(aname) {
  console.log(this,aname)
}

// bind return 一个新函数

Function.prototype.myBind = function myBind(_this,...rest) {
  // this setup 隐式调用

  Object.defineProperty(_this,'fn',{
    configurable: true,
    enumerable: false,
    writable: false,
    value: this
  })

  return (...param) => {
    _this.fn(...rest,...param)
  }
}

const newFn = setup.myBind({aname: 'myBind'})

newFn('baozi')
```

## ES6-ES13新特性

作用域提升

var声明的变量会有作用域提升，可以提前访问

let/const创建的变量并不是执行到这一行才被创建出来，当他们的词法环境被创建对的时候就已经创建，但是不能被提前访问。

### 暂时性死区（TDZ）

块作用域的顶部到变量被声明之前的区域为暂时性死区。

暂时性死区和定义的**位置无关，和执行的顺序有关**

```js
function setup() {
  console.log(message)
}

let message = 'hi'

setup()
```

```js
let message = 'hi'

function setup() {
  console.log(message)

  let message = 'hello'
}

setup() // error 形成暂时性死区
```

### let/const 定义的变量 不添加到window

会把定义的变量放到环境记录上，这个环境记录不等于window

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-29-16-09-10-image.png)

### let/const块级作用域

ES6之前只有全局和函数有自己的作用域

ES6开始let、const、function、class声明的变量有块级作用域

function浏览器做了特殊处理/访问过可以访问。

### 展开语法是浅拷贝

可以展开字符串，ES9可以展开对象对象要有可迭代属性

### 浅拷贝

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-29-19-33-35-image.png)

### 深拷贝

#### JSON拷贝

缺点：**不会拷贝函数**

```js
const obj = {
  name: 'obj',
  age: 18,
  setup: {
    name: 'setup',
  }
}

const copiedObj = JSON.parse(JSON.stringify(obj))
```

**手写**

### 数值表示

```js
// ES2021 数字过长可以用下划线分割
const money = 100_00_00_00000_00000
```

### Symbol

是ES6中新增的基本数据类型、用于生成一个**独一无二**的值

对象的属性的key是string，可能会产生冲突。

当操作对象时，出现相同的属性，必然有一个会被覆盖

```js
const s = Symbol('name')

const obj = {
  [s]: 'object'
}

console.log(obj)
```

ES10中也可以在创建Symbol时传入一个description

Object.Keys()获取不到symbol的key

可以通过Object.getOwnPropertySymbols（obj）获取

通过调用Symbol生成的Symbol都是独一无二的

Symbol.for(Symbol.description)可以生成相同的Symbol

keyFor 可以获取Symbol的值

### Set/Map数据结构

Set集合不能重复

Set是集合，元素不能重复。可以给**数组去重**

参数是可迭代对象

Set 属性 size 元素个数

- add

- delete

- has 是否有这个元素

- clear 清空set

- forEach

```js
const set = new Set()

// 添加元素
set.add(1)
```

### WeakSet

Weak Reference 弱引用

可以获取到，但是不能保证GC会不会回收

只能放对象类型，不能放基本类型

对对象的引用都是弱引用

GC会对弱引用回收

WeakSet中的对象是没办法获取的

### Map

当使用对象作为对象的key时，key都相同会覆盖。

### WeakMap

key只能是对象，并且对key是弱引用会被GC回收

### Object.entries

把对象key，value转化为一个数组

### String Padding

padStart 前面尾数不足补齐

padEnd 后面尾数不足补齐

应用场景：对敏感数据格式化

### flatMap

先进行map操作，再做flat操作

flatmap的深度是1

### Object.fromEntiries

### URLSearchParams

```js
const searchString = "?name=why&age=18"

const param = new URLSearchParams(searchString)
console.log(param)// URLSearchParams { 'name' => 'why', 'age' => '18' }
```

param 存在get方法可以拿到值

param是可以遍历的。param有entries

把param转为对象

```js
const paramObj = Object.fromEntries(param.entries())
```

### TrimStart/TrimEnd

去除首部/尾部空格

### FinalizationRegistry

提供一个方法，当在注册表的对象被回收时，请求在某个时间点上调用一个清理回调。

### WeakRef

```js
const setup = {
  name: 'setup',
  number: 1
}

let obj = new WeakRef(setup)

// deref 解析原来的对象，原来对象存在可以解析出来
// 原来对象被回收则不能解析出来
console.log(obj.deref())
```

## 词法环境

执行上下文有两个词法环境

LexicalEnvironment 处理let and const 声明的表示符

VariableEnvironment 处理var和function声明的标识符

## Proxy-Reflect

Objec.defineProperty()做监听对象所有的属性时，不能监听整个对象，只能监听一个属性，不能监听新增/删除属性

Proxy创建一个代理对象，之后对该对象的操作，通过代理对象来完成。

```js
const p = new Proxy(target,handler)
```

之后的操作直接操作代理对象

在handler捕获器中

- set函数有4个参数

    target： 目标对象（监听的对象）

    property： 将被设置的的属性key

    value： 新属性值

    receiver：调用的代理对象

- get函数有三个参数
  
  target: 目标对象
  
  property： 被获取的属性key
  
  receiver： 调用的代理对象

- deleteProperty // 监听对象delete

        target

        key

- has // 监听in操作，判断属性是否在对象中

```js
const obj = {
  name: 'obj'
}

const objProxy = new Proxy(obj,{
  set(traget,key,value) {
    traget[key] = value
  }
  ,
  get(traget,key) {
    return traget[key] 
  }
})
objProxy.name = 'setup'

console.log(objProxy.name)
```

### 监听函数对象的操作

```js
function setup(...rest) {
  console.log(this,rest)
}

const setupProxy = new Proxy(setup, {
  apply: function(traget,_this,rest) {
    traget.apply(_this,rest)
  },
  construct: function(traget,rest) { //监听new操作
    return new traget(...rest)
  }
})

setupProxy.apply({name:'setup'},[1,2])

console.log(new setupProxy(1,2,3))
```

### Reflect的作用

reflect是一个对象，可以代替对象本身操作

它提供了很多操作JS对象的方法，类似于Object中操作对象的方法

对对象本身的操作，向Object对象上添加太多类方法，不是非常合适

把各种方法放到Reflect上

由Proxy和Reflect共同完成代理

代理对象的目的是不直接操作原对象

```js
const obj = {
  name: 'obj'
}

const objProxy = new Proxy(obj,{
  set(traget,key,value,receiver) {
    // traget[key] = value
    // 通过代理进行操作, 不操作原对象
    // 好处：以得知操作成功还是失败
    const status = Reflect.set(traget,key,value)
    if(!status) {
      throw new Error(`set ${key} error`)
    }
  }
  ,
  get(traget,key,receiver) {
    return traget[key] 
  }
})
objProxy.name = 'setup'

console.log(objProxy.name)
```

Reflect可以设置Receiver（Proxy）

在拦截器拦截obj的时，需要加上Receiver可以让obj完全被监听到

`Reflect.set(target,key,value,receiver)`

### Reflect Construct

```js
function setup(name) {
  this.name = name
}

function lanuch(name) {
  setup.call(this,name) // 借用构造函数
}

const lan = Reflect.construct(setup,['a'],lanuch)

console.log(lan)
```

## Promise

resolve(promise) 当前的promise的状态会由传入的Promise决定

resolve(thenable) 由传入的决定。

### then的返回值

then方法的返回值也是一个新的Promise，链式中的then在等待新的Promise 状态之后执行

第二个Promise是第一个的返回值

then 方法 中return一个Promise等待这个Promise 决议，实现thenable方法，执行then方法。

### catch方法的返回值

catch也会返回一个Promise对象

catch会被最近的promise reject执行

在then中抛出异常会被reject

### finally方法

无论Promise的状态是rejected还是fulfilled都会执行。

### Promise 类方法

```js
Promise.resolve('hi')
```

当已经有了现有的内容，可以直接转为一个Promise

### all方法

将多个Promise包裹在一起，形成一个新的Promise

新的Promise状态由包裹的所有Promise共同决定

当所有的Promise状态变成fulfilled状态时，新的Promise状态返回值组成一个数组

当有一个Promise状态为Rejected，新的Promise的状态为Rejected，并且将第一个rejected的返回值作为参数

```js
const p1 = new Promise((resolve, reject) =>{
  setTimeout(()=>{
    resolve('p1 resolved successfully')
  },3000)
})

const p2 = new Promise((resolve, reject) =>{
  setTimeout(()=>{
    resolve('p2 resolved successfully')
  },2000)
})

const p3 = new Promise((resolve, reject) =>{
```

`[`

`'p1 resolved successfully',`

`'p2 resolved successfully',`

`'p3 resolved successfully'`

`]`

### allSettled方法

all方法有缺陷，当有一个Promise变成rejected状态时，新的promise就会立即变成对应的rejected状态，这样获取不到Pedding的promise

allSettled会等到所有的Promise都有结果。结果是一个数组包含所有Promise的状态和值

### race方法

如果有一个Promise有了结果，就决定最终的Promise状态

### any方法

any方法会等到一个fulfilled状态，才会决定新Promise状态

## Iterator-Generator

迭代器帮助我们对某个数据结构进行遍历的对象

Js 迭代器协议必须有一个next方法

next方法要求

- 一个无参数或者一个参数的函数，返回一个应当拥有一下两个属性的对象

- done(Boolean)

- value 具体值or undefined

```js
// 给数组创建一个迭代器

const names = ['nickname', 'aaa','bbb','ccc']

let index = 0
const nameIterator = {
  next() {
    if(index<names.length) {
      return {done: false, value: names[index++]}
    }
    return {
      done: true
    }
  }
}

console.log(nameIterator.next())
console.log(nameIterator.next())
```

创建数组通用迭代器

```js
const names = ['a', 'b', 'c', 'd', 'e', 'f']
const nums = [1,2,3,4,5,6,7,8,9,10]

function createArrayIterator(arr) {
  let index = 0
  return {
    next(){
      if(index< arr.length) {
        return {
          done: false,
          value: arr[index++]
        }
      }
      return {done: true, value: undefined}
    }
  }
}

const namesIterator = createArrayIterator(names)
const numsIterator = createArrayIterator(nums)
console.log(numsIterator.next())
```

可迭代对象

实现一个[Symbol.iterator] 函数，这个函数要返回一个迭代器用于迭代当前的对象

```js
const obj = {
  names: ['foo', 'bar'],
  [Symbol.iterator](){
    let index = 0
    const nameIterator = {
      next() {
        if(index<obj.names.length) {
          return {done: false, value: obj.names[index++]}
        }
        return {
          done: true
        }
      }
    }
    return nameIterator
  }
}

// 可迭代对象可以使用 for of操作
for (const o of obj) {
  console.log(o)
}
```

迭代对象entries

```js
const obj = {
  name: 'obj',
  desc: 'a Object',
  [Symbol.iterator]() {
    let index = 0
    const entries = Object.entries(this)
    const iterator = {
      next(){
        if(index < entries.length) {
          return {done: false,value: entries[index++]};
        }
        return {done: true}
      }
    }
    return iterator
  }
}

for (const o of obj) {
  console.log(o)
}
```

原生可迭代对象

String、Array、Set

应用场景

for of 、展开运算符、yield*、解构赋值

创建一些对象时：new Map([Iterable])、WeakMap、Set、WeakSet

一些方法调用时

Promsie.all(iterable)、Promise.race(iterable)、Array.form(iterable)

类的迭代

```js
class Person {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  // 实例方法
  [Symbol.iterator]() {
    let index = 0
    const keys = Object.keys(this)
    const iterator = {
      next:() => {
        if(index < keys.length) {
          return {done: false, value: keys[index++]}
        }
        return {done: true}
      }
    }
    return iterator
  }
}

const p1 = new Person('baozi',18)

for (const key of p1) {
  console.log(key)
}
```

### 生成器

生成器是ES6新增的一种函数控制、使用方案，它可以更加灵活的控制函数什么时候继续执行、暂停执行

生成器函数是一个函数、和普通的函数有一些区别

- 生成器函数需要在function的后面加一个符号 *

- 生成器函数可以通过yield关键字来控制函数的执行流程

- 生成器函数返回一个Gnerator（生成器）

        生成器实际是一种特殊的迭代器

```js
function* setup() {
  console.log(1)
  console.log('s')
  yield
  console.log(2)
  yield
  console.log(3)
}

// 代码执行被yield控制
// 返回一个生成器对象
// 当遇到yield中断执行,需要再次调用next继续执行代码
const generator = setup()

generator.next()
```

### yield 可以返回结果

generator.next ==> {done: , value}

`yield 'aaa'` ==> {doen, value: aaa}

如果代码中间位置直接return

{done： true,value: <return Content>}

### 函数调用参数

在yield前面接收参数

generator.next('baozi')

const name = yield "aaa"

第一次调用传入参在调用生成器函数时传入

generator.return 可以提前中断

generator.throw 可以向函数抛出一个异常

### 生成器替换迭代器

```js
const names = ['ads','asd']
const nums = [1,2,3,4,5,6,7,8]

function* createArrayIterator(arr) {
  for(let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const nameIterator = createArrayIterator(names)
for (const value of nameIterator) {
  console.log(value)
}
const numsIterator = createArrayIterator(nums)
```

### 生成器生成一定范围的值

```js
function* createRangeGenerator(start, end) {
  for(let i = start; i < end; i++) {
    yield i
  }
}
const generator = createRangeGenerator(3,9)
```

### 生成器yield语法糖

yield* + 可迭代对象

```js
function* createArrayIterator(arr) {
  yield* arr
}
```

```js
class Person {
  constructor(name,age) {
    this.name = name
    this.age = age
  }
  // 实例方法
  *[Symbol.iterator]() {
    yield* Object.keys(this)
    yield* Object.values(this)
    yield* Object.entries(this)
  }
}
```

## 异步

```js
function* getData(){
  const res1 = yield requestData('1')
  const res2 = yield requestData('2'+ res1)
  const res3 = yield requestData('3' + res2)
}

const generator = getData()
generator.next().value.then(res1=>{
  generator.next(res1).value.then(res2=>{
    generator.next(res2).value.then(res3=>{
      generator.next(res3)
    })
  })
})
```

### async await

```js
async function getData(){
  const res1 = await requestData('1')
  const res2 = await requestData('2'+ res1)
  const res3 = await requestData('3' + res2)
}

const generator = getData()
```

自动化执行generator next函数

```js
async function getData(){
  const res1 = await requestData('1')
  const res2 = await requestData('2'+ res1)
  const res3 = await requestData('3' + res2)
}

const generator = getData()

function autoGenFn(genFn) {
  const generator = genFn()

  function exec(res) {
    const {done,value} = generator.next(res)
    if(done) return
    value.then(res => {
      exec(res)
    })
  }

  exec()
}
```

async 函数用于声明一个异步函数、异步函数返回一个Promise

异步函数中await关键字使用，await 后为一个Promise，当Promise的状态为fufilled状态才会继续执行

## 事件循环

Js是单线程的。浏览器又一个专门的线程来处理JavaScript代码

### 微任务和宏任务

Promise 中then的回调也会加入到队列中

宏任务队列

ajax、setTimeout、setInterval、Dom监听、UI rendering

微任务队列

Promise then的回调、Mutation Observer API、

执行新的宏任务之前、会先把微任务执行完。
