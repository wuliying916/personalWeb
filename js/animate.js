//点击右箭头进入第二页
$('.right-arrow').on('click',function(){

  $('.js-tab ul li:nth-child(2)').addClass('active').siblings().removeClass('active');
  $('.content-wrap').find('li > div').removeClass('current');
  $('.content-wrap').find('li:nth-child(2) > div').addClass('current');

});
$('.con-wrap img,.con2-wrap img').hover(function(){
  $(this).addClass('conmoverover').removeClass('conmoverout');
},function(){
  $(this).addClass('conmoverout').removeClass('conmoverover');
});

$('.e_background .tou img').click(function(){
  alert(event.offsetX+','+event.offsetY);
});

$('.d_background .icons-ul li img').hover(function(){
  $(this).css({
    'transform': 'scale(1.1)',
    'transition-duration': '1s',
    'cursor': 'pointer'
  });
  $(this).parent().css('border','7px solid rgba(18,150,219,1)');
},function(){
  $(this).css({
    'transform': 'scale(1)',
    'transition-duration': '1s',
    'cursor': 'pointer'
  });
  $(this).parent().css('border','7px solid rgba(18,150,219,0)');
});