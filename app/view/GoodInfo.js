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
        index: 0,
        height: '100%',
        style: {
            'background-color': '#000'
        },
        items: [
            {
                xtype: 'image',
                centered: true,
                height: '100%',
                id: 'image',
                width: '100%',
                src: './images/%E6%94%BE%E6%9D%BE.jpg'
            },
            {
                xtype: 'panel',
                cls: 'my-panel',
                height: '3em',
                id: 'toppanel',
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
                id: 'bottompanel',
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
                id: 'title',
                left: '2em',
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
                id: 'info',
                itemId: 'mylabel20',
                padding: '0.5em',
                style: {
                    color: '#FFF'
                },
                top: '350px',
                listeners: [
                    {
                        fn: function(element, eOpts) {
                            var infoMinHeight = '20%';
                            var mainpnl = this.up("");
                            var botoompnl = mainpnl.down("#bottompanel");

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
                        },
                        event: 'resize'
                    }
                ]
            },
            {
                xtype: 'button',
                handler: function(button, e) {
        			Ext.Viewport.animateActiveItem("mainview", { type: 'slide', direction: 'right' });
                },
                height: '2.5em',
                id: 'backbutton',
                left: '5px',
                style: {
                    opacity: '0.5'
                },
                top: '5px',
                ui: 'action',
                width: '3em',
                iconCls: 'arrow_left',
                text: ''
            }
        ],
        listeners: [
            {
                fn: 'onContainerShow',
                event: 'show'
            }
        ]
    },

    onContainerShow: function(component, eOpts) {
        //如果未设置dada，直接返回
        if(!(this.data && this.data.length && this.data.length > 0)){
            return;
        }

        //切换计时器
        var fn = function(me){
            //load the list's store here. The list will be automatically updated
            if(me.index < me.data.length)
            {
                var goodinfoitem = me.data.items[me.index];
                me.down("#title").setHtml(goodinfoitem.data.title);
                me.down("#info").setHtml(goodinfoitem.data.info);
                me.down("#image").setSrc(goodinfoitem.data.image);

                me.index = me.index + 1;
            }else{
                clearInterval(interval);
            }
        };

        var interval = setInterval(fn,5000,this);

        //立即刷新第一个页面
        var goodinfoitem = this.data.items[0];
        this.down("#title").setHtml(goodinfoitem.data.title);
        this.down("#info").setHtml(goodinfoitem.data.info);
        this.down("#image").setSrc(goodinfoitem.data.image);

        this.down("#title").setLeft(this.down("#backbutton").element.getRight());

        this.index = 1;
    },

    initialize: function() {
        this.callParent();

        var store = Ext.getStore("GoodInfo");
        store.load();
        this.data = store.data;
    }

});