---
title: 'Computer Internet Summary'
date: '2023-05-17'
---

# 计算机网络

## DNS

解决IP地址太长，不方便记忆，将IP地址和域名关联。域名转换IP的过程就是DNS域名解析的过程。

### 域名结构树

### 域名解析过程

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-15-17-15-18-image.png)

### DNS缓存

当一台电脑使用同样的本地DNS服务器访问一个已经访问过的域名时，本地的DNS服务器查询缓存，直接返回该域名的IP地址

## CDN

分发内容有静态内容和动态内容

源服务器发送文件给CDN时候可以利用HTTP头部的cache-control设置文件的缓存形式

### 分发流程

源服务器把内容push到CDN服务器，用户访问最近的CDN服务器获取内容

如果请求的内容在CDN服务器中没用缓存则需要pull源服务器获取内容。

### 安全性和可靠性

任播通信，防止Ddos攻击，利用任播技术把流量转移到另外没超载的服务器

采用TLS/SSL证书进行保护

### CNAME

从CDN服务商购买的CDN服务，需要给你的域名添加一条CNAME记录，CNAME用于将一个域名（同名）映射到另一个域名

## 代理

代理服务器本身不产生内容，它作为一个中继转发上下游的请求

### 正向代理

由于某些原因（防火墙）无法访问其他服务器

1访问2，通过2（正向代理）访问3

通过正向代理隐藏客户端身份

### 反向代理

1访问2，2将1的请求转发给3

## WebSocket

### 经典轮询

轮询是在固定的时间间隔内，由浏览器对服务器发送HTTP请求，服务器返回最新的数据给客户端的浏览器

缺点：浏览器不断向服务器发送请求，HTTP请求包含较长的头部，其中有效的数据只是很少一部分，会浪费很多带宽资源，并且增加服务器的负载

### WebSocket介绍

WebSocket是一个长时连接实现与服务器全双工、双向的通信，webSocket可以主动向客户端发送信息。只要一次握手就可以实现双向推送。它和HTTP sever 共享同一Port

### 和HTTP区别

Websocket是一个独立的基于TCP的协议

它和HTTP协议的唯一关系是它的握手流程是通过HTTP协议来实现的

默认WebSocket协议使用80或者443端口

### 实现

实现浏览器发送HTTP请求在请求头中添加 `Upgrade`字段内容为WebSocket，用于改变HTTP协议或换用其他的协议

`Sec-WebSocket-Key`字段是一个随机的经过base64编码的字符串，是一个服务端和客户端握手的密钥

服务器接收到Upgrade 请求，取Sec-WebSocket-Key的内容追加一个固定的魔串``258EAFA5-E914-47DA-95CA-C5AB0DC85B11``进行HSA-1加密，然后再经过base64生成新的Key作为响应头Sec-WebSocket-Accept字段的内容返回给浏览器

主流浏览器支持WebSocket

```js
const Socket_URL = 'xxx'
const WebSocket = () => {
    let socket = new WebSocket(Socket_URL)
    socket.onopen = () => {
        socket.send('hello world')
}
}
WebSocket()
```

- 状态码为101，表示等待，服务器接收到请求，需要请求者继续执行操作

- Sec-WebSocket-Version 表示WebSocket版本，如果服务器不支持该版本，则response头中包含字段Sec-WebSocket-Versionheader，包含服务端支持的版本号

- Sec-WebSocket-Key 对应服务端response中的Sec-WebSocket-Accept，没有同源限制，WebSocket客户端可连接任意支持WebSocket的服务

## HTTP

### 常见请求方法

#### Options

用于获取目标url所支持的通信选项

- 检测服务端支持的请求方法
  
  `curl -X OPTIONS xxx -i`

- Cros预检请求
  
  发送预检请求时包含以下请求头
  
  Origin
  
  Access-Control-Request-Method：请求希望使用的方法
  
  Access-Control-Request-Headers:  可选自定义头部列表
  
  `OPTIONS xxx HTTP/1.1`
  
  这个请求发送后响应头头包含
  
  Access-Control-Allow-Origin： 支持请求的路径
  
  Access-Control-Allow-Methods: 允许的方法
  
  Access-Control-Allow-Headers: 服务器允许的头部
  
  Access-Control-Max-Age：缓存预检的时间

### 状态码

- 1xx 临时响应，服务器收到请求，需要请求者继续执行操作

- 2xx 成功

- 3xx 重定向

- 4xx 客户端错误

- 5xx 服务器错误

#### 常见的状态码

- 100 客户端征询服务器情况，服务器同意返回100，同时客户端可以继续请求，在上传大文件的情况下，客户端先上传请求头部，交给服务端检验权限、文件名称合法性，符合则返回100，客户端再传输剩下的数据，反之，返回400错误，直接终止服务

- 101 服务端应客户端升级协议或者切换协议的请求进行切换

- 200 请求成功

- 301 资源永久转移

- 302 资源暂时性转移

- 304 资源未修改，和缓存机制有关

- 400 客户端请求的语法错误，服务端无法理解

- 401 请求要求用户的身份认证

- 403 服务器理解客户端的请求，但拒绝执行此请求

- 404 找不到资源

- 405 请求的方法被中止

- 500 服务内内部错误

- 501 请求方法不被服务器支持且无法被处理

### 缓存



## HTTPS

### 对称加密

加密和解密使用相同的密钥

### 非对称加密

非对称加密有公钥和私钥，使用公钥加密，只有对应的私钥才能解密    

存在公钥合法性问题，需要用证书

### 签名

在信息后面再加上一段内容，可以证明信息没有被修改过，对信息做一个hash计算得到一个hash值，这个过程是不可逆的，发送信息时，把这个hash值加密后作为一个签名和信息发出去，接收方接收到消息，会重新计算hash值，并和信息所附带的hash值（解密后）进行对比，一致则没有被修改

### 证书

- 对于请求方来说，它怎么能确定它所得到的公钥一定是从目标主机那里发布的，而且没有被篡改过呢？亦或者请求的目标主机本本身就从事窃取用户信息的不正当行为呢？
- 这时候，我们需要有一个权威的值得信赖的第三方机构(一般是由政府审核并授权的机构)来统一对外发放主机机构的公钥，只要请求方这种机构获取公钥，就避免了上述问题的发生。

### 颁发过程

用户产生自己的密钥对，将公钥和部分个人信息传送给认证中心

认证中心将发给用户一个数字证书，证书中包含用户的个人信息和公钥信息，附有认证中心的签名信息

### 验证

浏览器/操作系统 默认内置了CA的根证书。根证书包含了 这个CA的公钥

- 证书颁发的机构是伪造的：浏览器不认识，直接认为是危险证书
- 如果伪造的证书颁发的机构是确实存在的，于是根据 CA 名，找到对应内置的 CA 根证书、CA 的公钥。用 CA 的公钥，对伪造的证书的摘要进行解密，发现解不了, 认为是危险证书。
- 对于篡改的证书，使用 CA 的公钥对数字签名进行解密得到摘要 A,然后再根据签名的 Hash 算法计算出证书的摘要 B，对比 A 与 B，若相等则正常，若不相等则是被篡改过的
- 证书可在其过期前被吊销。较新的浏览器如 Chrome、Firefox、Opera 和 Internet Explorer 都实现了在线证书状态协议（OCSP）以排除这种情形：浏览器将网站提供的证书的序列号通过 OCSP 发送给证书颁发机构，后者会告诉浏览器证书是否还是有效的。

## 通信流程

- TCP三次握手

- TLS 连接

- HTTP请求和响应

![](C:\Users\baozi\AppData\Roaming\marktext\images\2023-05-17-17-40-07-image.png)



## HTTP 2

HTTP 1.x 缺陷

- 同一时间，一个连接只能对应一个请求

- 针对同一个域名，大多数浏览器允许同时最多6个并发连接

- 只允许客户端主动发送请求

- 一个请求只对应一个响应

- 同一个会话的多次请求中，头信息会被重复传输，增加传输开销

- 使用cookie 开销更大

### 二进制分帧



### 多路复用



### 服务端推送



### 头部压缩