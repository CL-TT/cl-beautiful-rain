/*
 * @Author: CL
 * @Date: 2021-01-22 14:41:57
 * @LastEditTime: 2021-01-26 18:52:48
 * @Description: 面向对象编程 构造函数的方式
 * 1. 每一个雨滴都是一个对象
 * 
 * 2. 还有一个雨滴的随机颜色没有弄好
 */

//获得画布
const canvas = document.getElementById('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

//获得画笔
const cxt = canvas.getContext('2d');

function Rain(){}

/**
 * 初始化方法，初始化一些雨滴的自身参数
 */
Rain.prototype.init = function(){
  this.x = this.getRandom(5, 1500);    //雨滴的横坐标
  this.y = this.getRandom(5, 100);      //雨滴的纵坐标
  this.w = this.getRandom(1, 1.5);   //雨滴的宽度
  this.h = 20;   //雨滴的长度

  this.maxHeight = 700;   //最大的下落高度
  this.maxR = this.getRandom(30, 65);   //最大的扩散半径

  this.speedY = this.getRandom(2, 10);   //雨滴下落时的速度
  this.opacity = 1;      //开始的透明度

  this.opacityNum = this.getRandom(0.85, 0.96);  //透明系数

  this.r = this.getRandom(2, 3);   //炸开的圆的半径
  this.speedR = this.getRandom(0.4, 1);   //雨滴炸开的速度
}

/**
 * 得到一个范围的随机数
 * @param {*} min 传入一个最小数
 * @param {*} max 传入一个最大数
 */
Rain.prototype.getRandom = function(min, max){
  return (Math.random() * (max - min)) + min;
}

/**
 * 得到一个随机的颜色值
 */
Rain.prototype.getRanColor = function(){
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

/**
 * 绘画雨滴
 */
Rain.prototype.render = function(){
  if(this.y < this.maxHeight){
    //如果雨滴还在下落，还没有达到最大的下落高度，那么还做下落运动
    this.drawRect();
    this.y += this.speedY;
  }else{
    //如果已经达到了最大的高度，就开始做扩散运动
    this.r += this.speedR;
    this.drawArc();

    if(this.r > this.maxR){
      //如果已经扩散到最大的宽度，就开始让雨滴逐渐消失
      this.opacity *= this.opacityNum;

      if(this.opacity < 0.01){
        //如果透明度已经小于0.01了，就停止动画
        this.init();
      }
    }
  }
}

/**
 * 绘制矩形雨滴
 */
Rain.prototype.drawRect = function(){
  cxt.fillStyle = this.getRanColor();
  cxt.fillRect(this.x, this.y, this.w, this.h);
}

/**
 * 绘制扩散雨滴
 */
Rain.prototype.drawArc = function(){
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
  cxt.strokeStyle = `rgba(112, 176, 198, ${this.opacity})`;
  cxt.closePath();
  cxt.stroke();
}

const rainArr = [];

for(let i = 0; i < 100; i++){
  const rain = new Rain();
  rain.init();

  rainArr.push(rain);
}

function move(){
  //先绘制遮罩层
  cxt.fillStyle='rgba(0, 0, 0, 0.1)';
  cxt.fillRect(0, 0, canvas.width, canvas.height);

  //开始雨滴动画
  for(let i = 0; i < rainArr.length; i++){
    rainArr[i].render();
  }

  window.requestAnimationFrame(move);
}

move();
