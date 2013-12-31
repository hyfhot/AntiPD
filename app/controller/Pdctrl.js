// JavaScript Document
Ext.define("pdsencha.controller.Pdctrl", {

    extend: "Ext.app.Controller",
    config: {
        refs: {
            // We're going to lookup our views by xtype.
            firstRunView: "firstrunview",
            mainView: "mainview",
			testView: "testview",
			GoodInfo: "goodinfo"
        },
        control: {
            firstRunView: {
                // The commands fired by the notes list container.
                agreeCommand: "onAgreeCommand"
            },
            mainView: {
                // The commands fired by the notes list container.
                testCommand: "onTestCommand"
            },
			testView: {
                finishCommand: "onFinishCommand"
			},
			'goodinfo': {
                show: "onGoodInfoCommand"
			}
        }
    },
    // Transitions
    slideLeftTransition: { type: 'slide', direction: 'left' },
    slideRightTransition: { type: 'slide', direction: 'right' },

    // Helper functions
    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // Commands.
	//同意条款
    onAgreeCommand: function () {
        console.log("onAgreeCommand");
		var mainviewobj = Ext.Viewport.down('mainview');
		if(typeof(mainviewobj) != "undefined" ){
			Ext.Viewport.animateActiveItem("mainview", this.slideLeftTransition);
        	console.log("mainviewobj");
		}else{
			Ext.Viewport.animateActiveItem("mainview", this.slideLeftTransition);
		}
    },
	//开始测试
    onTestCommand: function () {
        console.log("onTestCommand");
		var testviewobj = Ext.Viewport.down('testview');
		if(typeof(testviewobj) != "undefined" ){
			testviewobj.setActiveItem(0);
		}
		Ext.Viewport.animateActiveItem("testview", this.slideLeftTransition);
    },
	//测试完成，显示测试结果
	onFinishCommand: function(sender,score) {
		var resultscore = score;
		var resultlist = [
			{minscore: 0,maxscore: 4,level: "没有抑郁", description: ""},
			{minscore: 5,maxscore: 9,level: "轻度抑郁", description: "继续观察：随访时复查PHQ-9"},
			{minscore: 10,maxscore: 14,level: "中度抑郁", description: "制定治疗计划,考虑咨询、家访和药物治疗"},
			{minscore: 15,maxscore: 19,level: "中重度抑郁", description: "积极药物治疗和心理治疗"},
			{minscore: 20,maxscore: 27,level: "重度抑郁", description: "立即治疗，首先选择药物,若严重损伤或对治疗无效,建议转移至精神疾病专家,进行心理治疗和综合治疗"}
		];
        console.log("onFinishCommand:" + resultscore);
		
		//保存数据
		var resultrecord=[],resultdetail=[];
        var now = new Date();
        var testid = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
        var testRecordStore = Ext.getStore("TestRecord");
		var newTestRecord = Ext.create("pdsencha.model.TestRecord", {
			testId:testid,
			dateCreated: now,
			score: resultscore
		});
		testRecordStore.add(newTestRecord);
		testRecordStore.sync();
		//记录从finishCommand事件的参数传过来？、？待修改
		var testRecords = sender.getTestRecord();
		var testDetailStore = Ext.getStore("TestDetail");
        now = new Date();
		Ext.each(testRecords, function(item, index, allItems) {
			//var detailId = (now.getTime()).toString() + (this.getRandomInt(0, 100)).toString();
			var newTestDetail = Ext.create("pdsencha.model.TestDetail", {
				testId:testid,
				dateCreated: now,
				questionindex: item.index,
				answerindex: item.answer
			});
			testDetailStore.add(newTestDetail);
		});
		testDetailStore.sync();
		
		//显示测试结果
		var result = undefined;
		Ext.each(resultlist, function(item, index, allItems) {
			if(item.minscore <= resultscore && item.maxscore >= resultscore)
			{
				result = item;
			}
		});
		Ext.getCmp('mainview').setActiveItem(Ext.getCmp('testresultview'));
		Ext.getCmp('testresulthtml').showRecord(newTestRecord);		
        Ext.Viewport.animateActiveItem(Ext.getCmp('mainview'), this.slideLeftTransition);
		
		//复原答题项目
		sender.reSet();
	},
	onGoodInfoCommand: function( main, eOpts )
	{
        console.log("onGoodInfoShowCommand");
	},

    // Base Class functions.
    launch: function () {
        this.callParent(arguments);
		
        //var testRecordStore = Ext.getStore("TestRecord");
		//testRecordStore.load();
		
        console.log("launch");
    },
    init: function () {
        this.callParent(arguments);
        console.log("init");
    }
});