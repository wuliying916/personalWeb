;(function($){

  var Tab = function(tab) {

    var _this_ = this;

    //保存单个tab组建
    this.tab = tab;
    //默认配置参数
    this.config = {
      'triggerType' : 'mouseover',//鼠标的触发类型
      'effect' : 'default',//切换效果
      'invoke' : '1',//默认显示哪个tab
      'auto' : false //轮播5000ms自动切换
    };

    //如果配置参数存在,就扩展掉默认的配置参数
    if (this.getConfig()) {
      $.extend(this.config,this.getConfig());
    }

    //进行事件绑定,保存tab标签列表,保存对应的内容列表
    this.tabItems = this.tab.find('ul li');
    this.contentItems = this.tab.siblings('ul.content-wrap').find('.content-item');

    //保存配置参数
    var config = this.config;

    if(config.triggerType === 'click') {
      this.tabItems.on(config.triggerType , function(){
        _this_.invoke($(this));
      });

    }else if(config.triggerType === 'mouseover' || config.triggerType != 'click') {
      this.tabItems.mouseover(function(){
        _this_.invoke($(this));

      });
    };

    //自动切换

    if(config.auto){

      //定义一个全局的定时器
      this.timer = null;
      //定义一个计数器
      this.loop = 0;

      this.autoPlay();

      this.tab.hover(function(){

        window.clearInterval(_this_.timer);

      },function(){
        _this_.autoPlay();
      });
    };

    //设置默认显示第几个tab
    if(config.invoke > 1){

      _this_.invoke(this.tabItems.eq(config.invoke-1))

    }

  };

  Tab.prototype = {



    //自动间隔时间切换
    autoPlay : function() {

      var _this_ = this,
          tabItems = this.tabItems,//临时保存tab列表
          tablength = tabItems.size(),
          config = this.config;

      this.timer = window.setInterval(function(){

        _this_.loop ++;

        if(_this_.loop >= tablength) {

          _this_.loop = 0;

        };
        //自动触发
        tabItems.eq(_this_.loop).trigger(config.triggerType);

      },config.auto);

    },
    //事件驱动函数
    invoke : function(currentTab){

      var _this = this;

      //执行tab选中状态,把当前选中的li加上actived(标记为白底)

      var index = currentTab.index();
      currentTab.addClass('active').siblings().removeClass('active');

      //切换当前对应的内容,要根据配置参数的effect属性是default还是fade

      var effect = this.config.effect;
      var conItems = this.contentItems;
      var _thisDiv = conItems.eq(index);
      var _thisDivAll = $('.content-wrap').find('li > div');

      if(effect === 'default' || effect != 'fade') {
        _thisDivAll.removeClass('current');
        _thisDiv.parent().find('.content-item').addClass('current');

      }else if(effect === 'fade') {
        _thisDivAll.removeClass('current');
        _thisDivAll.fadeOut();
        _thisDiv.fadeIn();

      }

      //同步loop和index
      if(this.config.auto) {
        this.loop = index;
      };

    },



    //获取配置参数
    getConfig : function(){
    //拿一下tab elem节点上的data-config
    var config = this.tab.attr('data-config')
      //确保有配置参数
      if( config && config != ''){
        return $.parseJSON(config);
      }else{
        return null;
      }
  }

  };

  Tab.init = function (tabs) {
    var _this_ = this;//tab这一个类
    tabs.each(function(){
      new _this_($(this));
    });
  };

  //注册成jq方法
  $.fn.extend({
     tab : function(){
       this.each(function(){
         new Tab($(this));
       });
       return this;//就可以链式调用了
     }
  });


  window.Tab = Tab;

})(jQuery);