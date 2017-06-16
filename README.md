# stopwatch.js
A simple stopwatch by plain JavaScript. 一个简单的纯js实现的秒表   
效果如下：   
**00 : 02 : 34 : 40**

### How to use it?

```
// initialization 初始化
var sw = new stopwatch({
    el: '#container', // element,  default value is '.stopwatch'.
    startTime: 0, // start time by Second, default value is 0.
    displayTpl: '{hour} : {minute} : {second} : {millisecond}' // display template
});

// pause 暂停
sw.pause();

// start 继续
sw.start();

// reset 重设
sw.reset();

```
-----------------------

###  Live Demo

[STOPWATCH](http://www.iampua.com/pui/stopwatch.html)

### License
simplepen is available under the terms of the [MIT License](http://www.opensource.org/licenses/mit-license.php).
