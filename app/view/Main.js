//Chart类
Ext.define('pdsencha.view.Chart', {
    extend: 'Ext.chart.CartesianChart',
    xtype: 'testchart',
	alias: ['widget.testchart'],
	config:{
		background: 'white',
		showAnimation: 'popOut',
		height: '40%',
		series: [
			{
				type: 'line',
				xField: 'dateCreated',
				yField: 'score',
				step:true,
				smooth: true,
				style: {
					stroke: 'green',
					fill: 'palegreen',
					lineWidth: 4
				},
				marker: {
					type: 'circle',
					fill: 'palegreen',
					radius: 6
				},
				renderer: function(sprite, config, rendererData, index) {
					var store = rendererData.store,
						storeItems = store.getData().items,
						currentRecord = storeItems[index],
						previousRecord = (index > 0 ? storeItems[index-1] : currentRecord),
						current = currentRecord && currentRecord.data['score'],
						previous = previousRecord && previousRecord.data['score'],
						changes = {};
						
					switch(config.type) {
						case "marker":
						changes.lineWidth = 2;
						break;
					case "line":
						changes.fillOpacity = .1;
						break;
					}
					if(current < 5){ //无抑郁									
						switch(config.type) {
							case "marker":
							changes.strokeStyle = 'green';//(current >= previous ? 'green' : 'red');
							changes.fillStyle = 'palegreen';//(current >= previous ? 'palegreen' : 'lightpink');
							break;
						case "line":
							changes.strokeStyle = 'green';// (current >= previous ? 'green' : 'red');
							changes.fillStyle = 'palegreen';// (current >= previous ? 'palegreen' : 'tomato');
							break;
						}
					}else if(current >= 5 && current < 10){//轻度抑郁					
						switch(config.type) {
							case "marker":
							changes.strokeStyle = 'Chartreuse' ;
							changes.fillStyle = 'GreenYellow' ;
							break;
						case "line":
							changes.strokeStyle = 'Chartreuse' ;
							changes.fillStyle = 'GreenYellow' ;
							break;
						}
					}else if(current >= 10 && current < 15){//中度抑郁					
						switch(config.type) {
							case "marker":
							changes.strokeStyle = 'LightSeaGreen' ;
							changes.fillStyle = 'LightSkyBlue' ;
							break;
						case "line":
							changes.strokeStyle = 'LightSeaGreen' ;
							changes.fillStyle = 'LightSkyBlue' ;
							break;
						}
					}else if(current >= 15 && current < 20){//中重度抑郁					
						switch(config.type) {
							case "marker":
							changes.strokeStyle = 'LightCoral' ;
							changes.fillStyle = 'Pink'  ;
							break;
						case "line":
							changes.strokeStyle = 'LightCoral' ;
							changes.fillStyle = 'Pink' ;
							break;
						}
					}else { //重度抑郁					
						switch(config.type) {
							case "marker":
							changes.strokeStyle = 'Red' ;
							changes.fillStyle = 'DeepPink ';
							break;
						case "line":
							changes.strokeStyle = 'Red' ;
							changes.fillStyle = 'DeepPink ';
							break;
						}
					}
					return changes;
				}
			}
		],
		axes: [
			{
				type: 'numeric',
				position: 'left',
				fields: ['score'],
				minimum: 0,
				maximum: 30
			},
			{
				type: 'time',
				position: 'bottom',
				fields: 'dateCreated',
				renderer: function(label, layout, lastLabel) {
					//每天一个Label标签
					var curdate = new Date(label);
					label = (curdate.getMonth()+1) + '月' + curdate.getDate() + '日';
					if(lastLabel){
						var predate = new Date(lastLabel);
						if(predate.getFullYear() != curdate.getFullYear()){
							label = curdate.getFullYear().toString() + (curdate.getMonth()+1).toString() + '月' + curdate.getDate().toString() + '日';
						}else if(predate.getMonth() != curdate.getMonth()){
							label = (curdate.getMonth()+1).toString() + '月';
						}else if(predate.getDate() != curdate.getDate()){
							label = curdate.getDate().toString() + '日';
						}else {
							label = '';
						}
					}
					return label;
				}
			}
		]
	},
	initialize: function () {
        this.callParent(arguments);
    }
});

Ext.define('pdsencha.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'mainview',
	id: 'mainview',
    requires: ['Ext.dataview.List' 
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
                styleHtmlContent: true,
                scrollable: false,
				height: '100%',
			  	style: 'background-color: #67c52f',
				id: "testTaskview",
                items: [
                    {
						xtype: 'panel',
						height: '100%',
						//width: '100%',
						style: {
							'position': 'inherit',
							'margin':'auto'
						},					
						items: [{
							width: '100%',
							height: '50%',
							html: "<div style='font-size:1.8em;color:#FFF'>本应用是一个抑郁检测工具，用于协助基层保健医生诊断抑郁症，以及选择和监测治疗</div>"
						},
						{
							width: '100%',
							height: '50%',
							items:[{
								xtype: 'button',
								width: '100px',
								height: '50px',
								text: '开始测试',
								//centered: true,
								style: {
									'color': '#FFF',
									'margin':'auto'
								},						
								ui: 'action',
								itemId: "testButton"
							}]
											
						}]
                    }
                ]
            },
            {
                title: '预防',
                iconCls: 'star',
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
					emptyText: "<div class=\"notes-list-empty-text\">No records found.</div>",
					onItemDisclosure: true,
					grouped: true,
					itemTpl: ['<div>{dateCreated:date("d日")} {[this.getWeek(values.dateCreated)]}</div><div>{score}</div>',
						{
							getWeek: function(testdate){
								if(typeof(testdate) != "undefined")
								{
									return new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[testdate.getDay()];
								}
							}
						}]
	 			}]
            },
            {
                title: '更多',
                iconCls: 'more',

                items: [
                    {
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
