//最后一次测试结果
Ext.define('pdsencha.view.TestResult', {
    extend: 'Ext.Panel',
    xtype: 'testresultpanel',
    alias: ['widget.testresultpanel'],
    requires: ['pdsencha.view.HasRecordPanel'],
    config: {
        record: undefined,
		style: {
			'background-color': '#67c52f',
			color: '#FFF',
			margin: 'auto'
		},
    	items:[{
                xtype: 'panel',
                iconCls: 'info',
                padding: '1.2em',
				height: '100%',
                items: [
                    {
                        xtype: 'label',
                        html: '<div style=\'color:#FFF\'>什么是PHQ9？</div>',
                        style: {
                            'font-size': '2em'
                        }
                    },
                    {
                        xtype: 'label',
                        html: '<div style=\'font-size:1.5em;color:#FFF\'>是一个抑郁检测工具，用于协助基层保健医生诊断抑郁症，以及选择和监测治疗</div>',
                        style: {
                            'padding-top': '1em'
                        }
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
            }]
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
	showRecord: function(record) {
		//删除原有结果页
		var resultpage = this.down("hasrecordpanel");
		if(resultpage){
			this.remove(resultpage,true);
		}
		this.removeAll(true,true);
		//新增新结果页
		var hasrecordpnl = Ext.create("pdsencha.view.HasRecordPanel");
		hasrecordpnl.setRecord(record);
		this.add(hasrecordpnl);
		//this.setActiveItem(0);
		
		this.setRecord(record);
	},
	initPanel: function() {
		var lastrecord = this.getLastTestRecord();
		if(lastrecord){
			//刷新数据
			this.showRecord(lastrecord);
		};
	},
	initialize: function () {
        this.callParent(arguments);
				
		this.initPanel();
    }
});