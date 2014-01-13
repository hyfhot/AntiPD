

Ext.define('pdsencha.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainview',
	id: 'mainview',
    requires: ['Ext.dataview.List' ,'pdsencha.view.TestChart'
		,'Ext.chart.Chart', 'Ext.chart.series.Line', 'Ext.chart.axis.Numeric' 
		,'Ext.draw.modifier.Highlight', 'Ext.chart.axis.Time', 'Ext.chart.interactions.ItemHighlight'
		,'Ext.Loader'
		],
    config: {
        tabBarPosition: 'bottom',

        items: [
			{
                title: '测试',
                iconCls: 'compose',
                xtype: 'panel',
                padding: '1.2em',
			  	style: 'background-color: #67c52f',
                items: [
                    {
                        xtype: 'label',
                        html: '<div style=\'font-size:1.5em;color:#FFF\'>本应用是一个抑郁检测工具，用于协助基层保健医生诊断抑郁症，以及选择和监测治疗</div>'
                    },
                    {
                        xtype: 'container',
                        height: '30%',
                        items: [
                            {
                                xtype: 'button',
                                centered: true,
                                height: '50px',
                                itemId: 'testButton',
                                style: {
                                    color: '#FFF',
                                    margin: 'auto',
                                    'font-size': '1em'
                                },
                                ui: 'action',
                                width: '100px',
                                text: '测试'
                            }
                        ]
                    }
                ]
            },
            {
                title: '结果',
                iconCls: 'info',
				id: "testresultview",
				height:'100%',
				style: {
					'background-color': '#67c52f',
					color: '#FFF'
				},
                items: [
                    {
						id:'testresulthtml',
						height:'100%',
						xtype: 'testresultpanel'
                    }
                ]
            },
            {
                title: '预防',
                iconCls: 'star',
				id: "antiview",
				height:'100%',
				style: {
					'background-color': '#67c52f',
					color: '#FFF'
				},
				xtype: 'carousel',
                items: [
                ],
				listeners: [{
            		delegate: "goodinfo",
					event: "finish",
					fn: function (sender) {
						console.log("anti finish");
						if (this.activeIndex < this.getMaxItemIndex()) {
							this.next();
						}else{
							Ext.getCmp("mainview").getTabBar().show();
							//调整界面
							sender.resize(sender.element);
						}
					}
				},{
					delegate: "goodinfo",
					event: "activate",
					fn: function(newActiveItem, container, oldActiveItem, eOpts) {
						//如果oldActiveItem为空，则说明不是由滑动操作触发的
						if(Ext.isEmpty(oldActiveItem)){
							return;
						}
						//如果TabBar显示，则自动隐藏
						var tabbar = Ext.getCmp("mainview").getTabBar();
						if(!tabbar.isHidden()){
							tabbar.hide();
						}
						//切换显示
						console.log('activate');
						if(!Ext.isEmpty(oldActiveItem)){
							oldActiveItem.stopAutoFilp();
							oldActiveItem.resetFilp();
						}
						if(!Ext.isEmpty(newActiveItem)){
							newActiveItem.startAutoFilp();
							newActiveItem.resize(newActiveItem.element);
						}
					}
				}]
            },
            {
                title: '历史',
                iconCls: 'time',
				id: "testhistoryView",
				
                items: [
				{
					id: 'nohisttory',
					xtype: 'panel',
					height: '100%',
					width: '100%',
					style: {
						//'font-size': '6',
						'background-color': '#67c52f',
						'color': '#FFF',
						'margin':'auto'
					},	
					items: [
						{
							height: '45%'
						},
						{
							height: '10%',
							style: {
								//'font-size': '6',
								'background-color': '#67c52f',
								'color': '#FFF',
								'text-align':'center',
								'font-size': '1.5em'
							},
							html: '您还未进行过抑郁测试!'
						},
						{
							height: '45%'
						}
					]
				},
				{
					xtype: 'testchart',
					store: 'TestRecord',
					id: "testhistorychart"
				},
				{
					xtype: "list",
					store: "TestRecord",
					itemId:"historyList",
					height: '60%',
					loadingText: "Loading ...",
					emptyText: "您还未进行过抑郁测试！",
                    disableSelection:'ture',
					//onItemDisclosure: true,
					grouped: true,
					itemTpl: ['<div>{dateCreated:date("d日")}&nbsp;{[this.getweek(values.dateCreated)]}&nbsp;&nbsp;&nbsp;&nbsp;({score}/27)&nbsp;&nbsp;&nbsp;&nbsp;{[this.getlevel(values.score)]}</div>',
						{
							getweek: function(testdate){
								if(typeof(testdate) != "undefined")
								{
									return new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[testdate.getDay()];
								}
							},
							getlevel: function(score){								
								var resultscore = score;
								var resultlist = [
									{minscore: 0,maxscore: 4,level: "没有抑郁", scoreinfo:"0-4分代表您一切正常", description: "继续保持良好的心态，并积极帮助其他抑郁患者！"},
									{minscore: 5,maxscore: 9,level: "轻度抑郁", scoreinfo:"5-9分代表您轻度抑郁", description: "多回忆一下曾经令您快乐的事情，并继续观察：随访时复查PHQ-9！"},
									{minscore: 10,maxscore: 14,level: "中度抑郁", scoreinfo:"10-14分代表您有中度抑郁", description: "多与身边的亲人和朋友联系，并告诉他们您现在的感受；同时制定治疗计划,考虑咨询、家访和药物治疗！"},
									{minscore: 15,maxscore: 19,level: "中重度抑郁", scoreinfo:"15-19分代表您有中重度抑郁", description: "放松心情，认识到抑郁症可以通过调整自己的心态而得到改善；同时积极药物治疗和心理治疗！"},
									{minscore: 20,maxscore: 27,level: "重度抑郁", scoreinfo:"20-27分代表您有重度抑郁", description: "立即治疗，首先选择药物,若严重损伤或对治疗无效,建议转移至精神疾病专家,进行心理治疗和综合治疗！"}
								];								
								//计算测试结果
								var result = "轻度抑郁";
								Ext.each(resultlist, function(item, index, allItems) {
									if(item.minscore <= resultscore && item.maxscore >= resultscore)
									{
										result = item.level;
									}
								});
								return result;
							}
						}]
	 			}]
            },
            {
                xtype: 'panel',
                title: '更多',
                iconCls: 'more',
                padding: '1.2em',
                style:{
                    'background-color':'#FFF'
                },
                items: [
                    {
                        xtype: 'list',
                        itemId:'moreList',
                        onItemDisclosure: function(record) {
                            Ext.Viewport.animateActiveItem(record.data.view, { type: 'slide', direction: 'left' });
                            console.log("onItemDisclosure");
                        },
                        data: [
                            {
                                name: '关于APP',
                                view: 'aboutapp'
                            },
                            {
                                name: '开发者信息',
                                view: 'aboutdev'
                            },
                            {
                                name: '产后抑郁知识',
                                view: 'moreinfo'
                            }
                            /*,
                            {
                                name: '热门母婴应用',
                                view: 'moreapp'
                            }*/
                        ],
                        docked: 'top',
                        height: '100%',
                        disableSelection:'ture',
                        style:{
                            'background-color':'#FFF'
                        },
                        itemTpl: [
                            '<div>{name}</div>'
                        ]
                    }
                ]
            }
        ],
        listeners: [{
            delegate: "#testButton",
            event: "tap",
			fn: function () {
				console.log("TestCommand");
				this.fireEvent("testCommand", this);
			}
        },{
            event: "activeitemchange",
			order: "before",
            fn: function (item, value, oldValue, eOpts) {
				console.log("onPanelActiveItemChange");
				return true;
			}
        }, {
            delegate: "#historyList",
            event: "disclose",
            fn: function (list, record, target, index, evt, eOpts) {
				console.log("onHistoryListDisclose");
				list.select(record,true,false);
				return true;
			}
        }, {
            delegate: "#historyList",
            event: "select",
            fn: function (list, record, eOpts ) {
				console.log("onHistoryListSelect");
				return true;
			}
        },{
            delegate: "#historyList",
            event: "deselect",
			fn: function (item, eOpts) {		
				console.log("historyList deselect");
			}
        },{
            delegate: "#historyList",
            event: "itemswipe",
            fn: function (item, index, target, record, e, eOpts) {		
				console.log("historyList itemswipe");
			}
        },{
            delegate: "#moreList",
            event: "itemtap",
            fn: function (item,  index, target, record, e, eOpts) {
                Ext.Viewport.animateActiveItem(record.data.view, { type: 'slide', direction: 'left' });
                console.log("moreList itemtap");
                console.log(record);
            }
        },{
			delegate: "#testhistorychart",
			event: "show",
			fn: function () {		
				console.log("testhistorychart");
			}
		},{
			delegate: "#historyList",
			event: "initialize",
			fn:  function () {		
				console.log("historyList");
			}
		},{
			delegate: "#antiview",
			event: "show",
			fn:  function (item, eOpts) {	
				this.getTabBar().hide();
			    //未加载完成？
				if(item.getItems().length <= 1){ //Carousel默认有一个indicator对象
					//获取最后一条记录
					var store = Ext.getStore("GoodInfo");
					var panelList =[];
					//store.load();
					//this.data = store.data;
					var groups = store.getGroups();
					
					Ext.each(groups, function(item, index, allItems) {
						var newGoodInfo = Ext.create("pdsencha.view.GoodInfo", {
							data:item.children
						});
						panelList.push(newGoodInfo);
						//最后一个隐藏'更多精彩'label
						if(index == allItems.length - 1){
							newGoodInfo.down("#moreinfo").hide();
						}
					});
					
					item.add(panelList);
				}
				//设置第一个goodinfo对象自动播放
				item.setActiveItem(0);
				item.getActiveItem().startAutoFilp();
				item.getActiveItem().resize(item.element);
			}
		},{
			delegate: "#testhistoryView",
			event: "show",
			fn:  function (item, eOpts) {
				console.log("testhistoryView");
				//加载列表数据，倒序
				var testRecordStore = Ext.getStore("TestRecord");
				testRecordStore.sort('dateCreated', 'DESC');
				testRecordStore.load();
				//还未进行测试?
				if(testRecordStore.getCount()==0)
				{
					if(navigator.notification)
					{
						navigator.notification.confirm('您还未进行过抑郁测试,是否立即进行测试?', function(e) // 显示信息
							{
								if(e == '1'){
									var mainitem = item.up('mainview');
				    				console.log(mainitem);
									mainitem.fireEvent("testCommand", item);
				    				console.log("fire testCommand");
								}
							}, // 按下按钮后触发的回调函数，返回按下按钮的索引
							'提示', // 标题
							['是','否'] // 按钮标签
						);
					}else{
						Ext.Msg.confirm('提示', '您还未进行过抑郁测试,是否立即进行测试?', function(e)
						{
							if(e == 'yes'){
								var mainitem = item.up('mainview');
								mainitem.fireEvent("testCommand", mainitem);
							}
						});
					}
					
				    console.log("nohisttory");
					item.down('#nohisttory').show( );
					item.down('testchart').hide( );
					item.down('list').hide( );
					return;
				}else{
				    console.log("hashisttory");
					item.down('#nohisttory').hide( );
					item.down('testchart').show( );
					item.down('list').show( );
				}
				//加载图标数据，正序
				var chartStore = new Ext.data.Store({
					model: 'pdsencha.model.TestRecord',
					sorters: [{
						property : 'dateCreated',
						direction: 'ASC'
					}]
				});
				var chartdata = []; 
				Ext.each(testRecordStore.getData().items, function(item, index, allItems) {
					chartdata.push ({"id": "", "testId": "", "dateCreated": item.data['dateCreated'], "score": item.data['score']});						
				});
				chartStore.setData(chartdata);
				this.down('testchart').setStore(chartStore);
			}
		}]
    }
});
