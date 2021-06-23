/*
 * @Author: CL
 * @Date: 2020-12-28 18:10:26
 * @LastEditTime: 2021-01-21 21:07:37
 * @Description: 浪漫雨滴
 */

(() => {
  //获得画布
  const canvas = document.getElementById('canvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  //获得画笔
  const cxt = canvas.getContext('2d');

  function renderRect(x = 0, y = 0, w = 100, h = 100, color = 'red', lineWidth = 1){
    cxt.beginPath();
    cxt.fillStyle = color;
    cxt.lineWidth = lineWidth;
    cxt.fillRect(x, y, w, h);
    cxt.fill();
    cxt.closePath();
  }

  let height = 10;

  let stop = null

  const single = {
    x: 200,

    y: 50,

    r: 2,

    opacity: 1,

    w: 20,

    h: 20,

    drawRect: function(){
      cxt.fillStyle = 'rgba(23, 87, 99)';
      cxt.fillRect(this.x, this.y, 2, 20);
    },

    drawArc: function(){
      cxt.beginPath();
      cxt.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      cxt.strokeStyle = `rgba(112, 176, 198, ${this.opacity})`;
      cxt.closePath();
      cxt.stroke();
    },

    drawSqure: function(){
      cxt.beginPath();
      cxt.rect((this.x/1.5), (this.y/1.5), this.w, this.h);
      cxt.strokeStyle = `rgba(112, 176, 198, ${this.opacity})`;
      cxt.closePath();
      cxt.stroke();
    }
  }

  function move(){
    //在这之前加上一个蒙层
    cxt.fillStyle = 'rgba(0,0,0,0.1)';
    cxt.fillRect(0, 0, canvas.width, canvas.height);

    if(single.y > 600){
      //在达到一个临界点， 雨滴开始下落炸开
      single.r += 0.7;
      single.drawArc();
      
      if(single.r > 50){
        //在炸到一定的程度时，逐渐消失
        single.opacity *= 0.96;

        if(single.opacity < 0.01){
          return;
        }
      }

      /**
       * 创建雨滴
       */
      function createRain(){
        const rain = new Rain();
        rain.init();   //初始化雨滴的一些位置坐标
      }

      // single.w += 0.8;
      // single.h += 0.8;

      // single.drawSqure();

      // if(single.w > 50 || single.h > 50){
      //   single.opacity *= 0.96;

      //   if(single.opacity < 0.02){
      //     return;
      //   }
      // }
    }else{
      single.drawRect();
      single.y += 5;
    }

    stop = requestAnimationFrame(move);
  }

  move();



  //构造函数的方式


  /**
   * 雨滴构造函数
   */
  // function Rain(){
  //   this.canvas = document.querySelector('#canvas');
  //   this.cxt = this.canvas.getContext('2d');

  //   this.canvas.width = document.body.clientWidth;
  //   this.canvas.height = document.body.clientHeight;

  //   this.height = 10;
  //   this.stop = null;
  // }

  /**
   * 初始化函数
   * 1.初始化一些参数
   */
  // Rain.prototype.init = function(){
  //   console.log('init', this);
  //   this.moveDis();
  // };

  /**
   * 绘制矩形
   * @param {*} x 绘制的x坐标
   * @param {*} y 绘制的y坐标
   * @param {*} w 矩形的宽度
   * @param {*} h 矩形的高度
   * @param {*} color 画笔的颜色
   */
  // Rain.prototype.drawRect = function(x = 0, y = 0, w = 100, h = 100, color = 'red', lineWidth = 1){
  //   this.cxt.beginPath();
  //   this.cxt.lineWidth = lineWidth;
  //   this.cxt.color = color;
  //   this.cxt.rect(x, y, w, h);
  //   this.cxt.fill();
  //   this.cxt.closePath();
  // }

  /**
   * 图形运行的方法
   */
  // Rain.prototype.moveDis = function(){
  //   console.log(this);
  //   this.drawRect(200, 50, 5, this.height);

  //   this.height += 5;

  //   this.stop = requestAnimationFrame(this.moveDis);

  //   if(this.height > 500){
  //     cancelAnimationFrame(this.stop);
  //   }
  // }

  // const rain = new Rain();

  // rain.init();
})()