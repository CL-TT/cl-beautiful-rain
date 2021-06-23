# 浪漫雨滴效果

## 1. 主要运用的知识

1. canvas知识

2. js动画函数 requestAnimationFrame的知识点

2.1 这个函数是通过屏幕的刷新率，来自动调用的函数， 一般的频率在60hz, 每秒60次刷新屏幕

2.2 和setTimeout和setInterval进行比较

setTimeout和setInterval    低端机会出现卡顿，抖动现象
而使用requestAnimationFrame会使动画更加顺滑