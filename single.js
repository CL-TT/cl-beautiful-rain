/*
 * @Author: CL
 * @Date: 2021-01-21 15:08:02
 * @LastEditTime: 2021-01-21 15:33:08
 * @Description: 单对象的模式  浪漫雨滴
 * 
 * 每一个雨滴都是一个单体对象
 */

(function(){
  const Rain = {
    canvas: document.getElementById('canvas'),  //获取到画布
    canvasWidth: document.body.clientWidth,     //画布的宽度
    canvasHeight: document.body.clientHeight,   //画布的高度
    cxt: canvas.getContext('2d'),               //画笔

    x: Math.random(0, 1000),   //雨滴的横坐标
    y: Math.random(0, 50),     //雨滴的纵坐标
    w: Math.random(5, 10),     //雨滴的宽度
    h: Math.random(5, 10),     //雨滴的高度

    /**
     * 画雨滴的方法
     */
    drawRain: function(){
      // console.log(this.getRandomColor());
      this.cxt.fillStyle = 'rgba(98, 87, 23)';
      this.cxt.fillRect(this.x, this.y, this.w, this.h);
    },

    /**
     * 得到随机的颜色
     */
    getRandomColor: function(){
      return `rgba(${Math.random(0, 255)}, ${Math.random(0, 255)}, ${Math.random(0, 255)})`;
    },

    /**
     * 初始化
     */
    init: function(){

    }
  };

  function move(){
    //在这之前加上一个蒙层
    Rain.cxt.fillStyle = 'rgba(0,0,0,0.1)';
    Rain.cxt.fillRect(0, 0, Rain.canvasWidth, Rain.canvasHeight);

    Rain.drawRain();
    Rain.y += 5;
    
    stop = requestAnimationFrame(move);
    
    if(Rain.y > 500){
      cancelAnimationFrame(stop);
    }
  }

  function init(){
    // for(let i = 0; i < 10; i++){
    //   move();
    // }
    move();
  };

  init();
})()