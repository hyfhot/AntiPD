Ext.define('pdsencha.view.GoodInfo', {
    extend: 'Ext.Container',
    alias: 'widget.goodinfo',

    requires: [
        'Ext.Img',
        'Ext.Panel',
        'Ext.Label',
        'Ext.Button'
    ],

    config: {
        index: 0, //当前信息页
		interval: undefined, //播放计时器
		ispause: false, //是否暂停中
		//isallready: false, //是否加载完毕？避免创建时触发播放事件
        height: '100%',
        style: {
            'background-color': '#000'
        },
        items: [
            {
                xtype: 'image',
                centered: true,
                height: '100%',
                itemId: 'image',
                width: '100%'
            },
            {
                xtype: 'panel',
                cls: 'my-panel',
                height: '3em',
                itemId: 'toppanel',
                style: {
                    opacity: '0.5',
                    'background-color': '#67c52f'
                },
                top: 0,
                width: '100%'
            },
            {
                xtype: 'panel',
                cls: 'my-panel',
                height: '20%',
                itemId: 'bottompanel',
                minHeight: '20%',
                style: {
                    opacity: '0.5',
                    'background-color': '#67c52f'
                },
                top: '350px',
                width: '100%'
            },
            {
                xtype: 'label',
                docked: 'top',
                height: '2em',
                html: '保持良好心态',
                itemId: 'title',
                left: '0',
                padding: '0.3em',
                style: {
                    'text-align': 'center',
                    'font-size': '1.5em',
                    color: '#FFF',
                    opacity: '1'
                },
                top: 0,
                width: '100%'
            },
            {
                xtype: 'label',
                html: '保持良好的心态是战胜抑郁的有效方式！',
                itemId: 'info',
                padding: '0.5em',
                style: {
                    color: '#FFF'
                },
                top: '350px',
                listeners: [
                    {
                        fn: function(element, eOpts) {
                            var infoMinHeight = '20%';
                            var mainpnl = this.up("goodinfo");
                            var botoompnl = mainpnl.down("#bottompanel");
							var morepnl = mainpnl.down("#moreinfo");

                            //计算信息面板的高度
                            var infoheight = eOpts.height;
                            //bottompanel的默认最小高度设置为3em
                            botoompnl.setMinHeight(infoMinHeight);
                            botoompnl.setHeight(infoheight + 10);
                            //设置信息面板位置与高度
                            var panelheight = botoompnl.element.getHeight();
                            var mainheight = mainpnl.element.getHeight();
                            botoompnl.setTop(mainheight-panelheight);
                            this.setTop(mainheight-panelheight + 5);
							//设置更多精彩位置
							var moreheight = morepnl.element.getHeight();
							morepnl.setTop(mainheight-moreheight);
                        },
                        event: 'resize'
                    }
                ]
            },
            {
               	xtype: 'label',
				centered: false,
				html: '<<< 精彩自动播放中',
				itemId: 'moreinfo',
				width: '100%',
				style: {
					'font-size': '0.8em',
					'text-align': 'right',
					'margin-right': '15px',
					color: '#FFF',
					opacity: '1'
				}
            }
        ],
        listeners: [
			{
                fn: 'onUpdateData',
                event: 'updatedata'
            },{
				event: "hide",
				fn: function(item, eOpts) {
					console.log('show');
					console.log(item);
				}
			}
        ]
    },
	//标识已加载完毕
	//ready: function(){
//		this.isallready = true;
//	},
	//大小变化时，自动调整界面显示
	resize: function(element, eOpts) {
		var infoMinHeight = '20%';
		var mainpnl = Ext.getCmp(element.id);
		var botoompnl = mainpnl.down("#bottompanel");
		var botoominfo = mainpnl.down("#info");
		var morepnl = mainpnl.down("#moreinfo");

		//计算信息面板的高度
		var infoheight = botoominfo.element.getSize().height;
		//bottompanel的默认最小高度设置为3em
		botoompnl.setMinHeight(infoMinHeight);
		botoompnl.setHeight(infoheight + 10);
		//设置信息面板位置与高度
		var panelheight = botoompnl.element.getHeight();
		var mainheight = mainpnl.element.getHeight();
		botoompnl.setTop(mainheight-panelheight);
		botoominfo.setTop(mainheight-panelheight + 5);
		//设置更多精彩位置
		var moreheight = morepnl.element.getHeight();
		morepnl.setTop(mainheight-moreheight-10);
                      
	},
	//开始自动播放内部信息页
	startAutoFilp: function()
	{
		//创建计时器？
		if(Ext.isEmpty(this.interval)){
			//切换计时器
			var fn = function(me){
				//如果暂停，则不做任何处理
				if(me.ispause){
					return;
				}
				//如果未到末尾，则继续播放
				if(me.index < me.data.length)
				{
					var goodinfoitem = me.data[me.index];
					me.down("#title").setHtml(goodinfoitem.data.title);
					me.down("#info").setHtml(goodinfoitem.data.info);
					me.down("#image").setSrc(goodinfoitem.data.image);
	
					me.index = me.index + 1;
				}else{ //如果到最后一页，则清除计时器，并触发当页完成时间
					//me.interval = clearInterval(me.interval);
					me.stopAutoFilp();
					console.log("fire finish");
					me.fireEvent('finish',me);
				}
			};
			
        	this.interval = setInterval(fn,5000,this);
		}
		
		this.resetFilp();
		console.log("fire startAutoFilp");
		this.fireEvent('started',this);
	},
	//停止自动播放内部信息页
	stopAutoFilp: function()
	{
		if(!Ext.isEmpty(this.interval))
		{
			this.interval = clearInterval(this.interval);
			console.log("fire stopAutoFilp");
			this.fireEvent('stoped',this);
		}
	},
	//暂停播放
	pause: function(){
		this.ispause = true;
	},
	//恢复播放
	resume: function(){
		this.ispause = false;
	},
	resetFilp: function(){
        //返回第一个页面
        var goodinfoitem = this.data[0];
        this.down("#title").setHtml(goodinfoitem.data.title);
        this.down("#info").setHtml(goodinfoitem.data.info);
        this.down("#image").setSrc(goodinfoitem.data.image);

        this.index = 1;
		this.ispause = false;
	},
	onUpdateData: function(component, newData, eOpts ){
		console.log("onUpdateData");
        //如果未设置dada，直接返回
        if(!(newData && newData.length && newData.length > 0)){
            return;
        }
		this.data = newData;
		this.resetFilp();
	},
    initialize: function() {
        this.callParent();
		//增加原生事件
		this.element.on({
		    tap: function() { 
				console.log('tapped!'); 
				//启动或停止自动播放	
				var goodinfocmp = Ext.getCmp(this.id);	
				var tabbar = Ext.getCmp("mainview").getTabBar();		
				if(!goodinfocmp.ispause)
				{
					//显示tabbar和toppanel
					goodinfocmp.pause();
					tabbar.show();
				}else
				{
					//隐藏tabbar和toppanel
					goodinfocmp.resume();
					tabbar.hide();
				}
				
				//调整界面
				Ext.getCmp(this.id).resize(this);
			}
        });
    }

});