//最后一次测试结果
Ext.define('pdsencha.view.TestResult', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'testresultpanel',
　　 alias: ['widget.testresultpanel'],
    requires: [
        'pdsencha.view.HasRecordPanel'
    ],
	
    config: {
        record: undefined,
		style: {
			'background-color': '#67c52f',
			color: '#FFF',
			margin: 'auto'
		},
    	items:[]
 　　 },
 	getLastTestRecord: function(){
		//加载测试记录数据，倒序
		var testRecordStore = Ext.getStore("TestRecord");
		testRecordStore.sort('dateCreated', 'DESC');
		testRecordStore.load();
		//尚未测试？
		if(testRecordStore.getCount()>0)
		{
			return testRecordStore.getAt(0);
		}else{	
			return undefined;
		}
	},
	genHappyPage: function(){
		var panelList =[
			{
				html : "<div style='font-size:2em;color:#FFF;'>开心1</div>",
				style: 'background-color:#67c52f;'
			},{
				html : "<div style='font-size:2em;color:#FFF;'>开心2</div>",
				style: 'background-color:#67c52f;'
			},{
				html : "<div style='font-size:2em;color:#FFF;'>开心3</div>",
				style: 'background-color:#67c52f;'
			}
		];
		
		this.add(panelList);
	},
	showRecord: function(record) {
		//删除原有结果页
		var resultpage = this.down("hasrecordpanel");
		if(resultpage){
			this.remove(resultpage,true);
		}
		//新增新结果页
		var hasrecordpnl = Ext.create("pdsencha.view.HasRecordPanel");
		hasrecordpnl.setRecord(record);
		this.insert(0,hasrecordpnl);
		this.setActiveItem(0);
		
		this.setRecord(record);
	},
	initPanel: function() {
		var lastrecord = this.getLastTestRecord();
		if(lastrecord){
			//刷新数据
			this.showRecord(lastrecord);
		};
		this.genHappyPage();
		this.setActiveItem(0);
	},
	initialize: function () {
        this.callParent(arguments);
				
		this.initPanel();
    }
});