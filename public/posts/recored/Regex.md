---
title: 'Regex'
date: '2023-06-08'
---

# Regex

正则表达式由两部分组成： 模式（patterns） 和 修饰符（flags）

## 创建正则表达式

```js
const RE1 = new RegExp("hello","i")
const RE2 = /hello/i
```

- patterns 是匹配的规则

- flags 匹配的修饰符

## 正则使用

### 使用正则对象的实例方法

- `test` 检测某一个字符串是否符合正则的规则 返回`true/false`

- `exec` 使用正则执行一个字符串,返回一个数组

```js
[
  'abc',
  index: 3,
  input: 'asdabc123 Abc123 asdasd234  ABc1234',
  groups: undefined
]
```

### 使用字符串的方法，传入正则表达式

- metch方法
  
  不加g会返回第一个匹配的详情，加g会得到全部匹配到内容的数组

- metchAll

        metchAll传入的正则必须加g， 返回一个迭代器，这个迭代器的对象中包含每一个匹配到的详情

- replace/ replaceAll 第一个参数可以传入一个正则表达式

- split 根据匹配到的正则进行切割

- search 返回匹配到位置的索引，失败时返回-1

## 修饰符

- g global 全局匹配

- i ignore 忽略大小写

- m 多行匹配 通常于^$$ 一起使用

## 规则

### 字符类

`\d === [0-9]`  这个 \d 就是一个字符类

`\d` 匹配0-9的数字，匹配一个数字

`\s` 匹配空格包括制表符\t,换行符\n

`\w` 匹配单字字符：拉丁字母或者数字或者下划线 === [a-z A-Z 0-9 _]

`.`  匹配除了换行符之外的任意字符

### 反向类

`\D` 非数字

`\S` 非空格

`\W` 非拉丁字母或者空格

### 锚点

`^` 和`$`  称为毛带你

`^` 表示匹配开头

`$` 表示匹配结尾

### 词边界

匹配一个单独的词，不希望一个词左右有多余的东西 除了空格等特殊的符号

`\b`

### 转义字符串

将特殊的字符作为常规的字符使用 加上`\` 转义符号即可

常见需要转义字符

[],\,^,$,.,|,?,*,+,()

### 集合（Sets）和范围（Ranges）

在方括号[...]中的几个字符或者字符类，意味着匹配其中一个

[abc] 意味着匹配‘a’,'b','c'其中的一个

方括号也可以表示范围

[a-z]表示匹配a到z范围内的字母，[0-5]表示从0到5的数字

[0-9A-f]

[0-9] === \d

[a-zA-z_] === \w

[^0-9] === \D

[^...] 表示排除某个范围

### 量词

数量{n} 匹配到的数量

确定的{3}

范围{3,5}

缩写

`+` 表示一个或者多个 相当于{1,}

`?` 表示 0个或者一个 相当于{0,1}

`*` 表示 0个或者多个 相当于{0,}

### 贪婪模式(greedy)和lazy模式

```js
const message = '我喜欢：《javascript》和《你好》'

const RE = /《.+》/ig
console.log(message.match(RE)) // [ '《javascript》和《你好》' ]
```

贪婪模式下匹配结果

默认 .+ 就是贪婪模式

惰性模式 加上`？`开启惰性模式

### 捕获组

模式中用() 的称为捕获组

```js
const message = '我喜欢：《javascript》和《你好》'

const RE = /《(.+?)》/ig
const itera =message.matchAll(RE)
for (const re of itera) {
  console.log(re[1])
}
```

每一个小括号就是一个索引

```js
[
  '《javascript》',
  'javascript',
  index: 4,
  input: '我喜欢：《javascript》和《你好》',
  groups: undefined
]
[
  '《你好》',
  '你好',
  index: 17,
  input: '我喜欢：《javascript》和《你好》',
  groups: undefined
]
```

将捕获组作为整体 可添加量词

### 命名组

?<name> 可以放入groups里面的

？： 可以把一个组在结果中排除

### 或or

 可以在组中添加`|`
