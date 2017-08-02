function Swipe(container) {
  var element = container.find('.content-wrap');
  var swipe = {};
  var slides = element.find('li');

  //获取容器尺寸
  var width = container.width();
  var height = container.height();

  //设置li的页面总宽度
  element.css({
    width : (slides.length * width) +'px',
    height: height + 'px'
  });

  //设置每一个页面li的宽度
  $.each(slides,function(index) {
    var slide = slides.eq(index);
    slide.css({
      width: width + 'px',
      height: height + 'px'
    })
  });

  //监控完成与移动
  swipe.scrollTo = function(x,speed) {
    element.css({
      'transition-timing-function' : 'linear',
      'transition-duration' : speed + 'ms',
      'transform' : 'translate3d(-'+x+'px,0px,0px)'
    });
    return this;
  }
  return swipe;
}