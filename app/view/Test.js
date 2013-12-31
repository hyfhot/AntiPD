//问题面板类
Ext.define('pdsencha.view.QuestionPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'questionpanel',
    alias: ['widget.questionpanel'],
    config: {
        score: -1,
		index: -1 
    },
	initialize: function () {
        this.callParent(arguments);
    }
});
//答案选项类
Ext.define('pdsencha.view.AnswersRadioField', {
    extend: 'Ext.field.Radio',
    xtype: 'answersradio',
    alias: ['widget.answersradio'],
	
    config: {
        score: -1,  
		index: -1,
		parentCarousel: null
    },
	initialize: function () {
        this.callParent(arguments);
    }
});	
// JavaScript Document
Ext.define('pdsencha.view.Test', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'testview',
    alias: "widget.firstrunview",
	id: 'testView',
    requires: [
        'Ext.form.Panel',
        'Ext.field.Radio'
    ],

    config: {
        tabBarPosition: 'bottom',
		fullscreen: true,
		indicator: true,
        //layout: 'card',
		//draggable: true,
		defaults: {
		 	styleHtmlContent: true,
			scrollable: null
		},

	  	items: [
	  	],
        listeners: [{
            event: "activeitemchange",
            fn: "onActiveitemchange"
		},{
            event: "show",
            fn: "onShow"
		}]
	},
	
	onActiveitemchange: function ( sender, value, oldValue, eOpts ){
		return true;
	},
		
	onShow: function (item, eOpts) {
		//this.reSet();
	},
	
    // Helper functions
	//获取下一个未回答的问题
    getNextQuestion: function () {
		var questions = this.getItems();
		var nextitem = undefined;
		Ext.each(questions.items, function(item, index, allItems) {
			if(typeof(item.getScore) != "undefined" && item.getScore() == -1)
			{
				nextitem = item
				return false;
			}
		});
        return nextitem;
    },
	//获取测试的总分
    getTestScore: function () {
		var questions = this.getItems();
		var score = 0, testitems=[];
		Ext.each(questions.items, function(item, index, allItems) {
			if(typeof(item.getScore) != "undefined" && item.getScore() != -1)
			{
				score = score + item.getScore();
				testitems.push({});
			}
		});
        return score;
    },
	//获取测试记录
	getTestRecord: function(){
		var records = [];
		var questions = this.getItems();
		Ext.each(questions.items, function(item, index, allItems) {
			if(typeof(item.getScore) != "undefined" && item.getScore() != -1)
			{
				var value = item.getValues().answer;
				records.push({index:item.getIndex(),answer:value});		
			}
		});
		
		return records;
	},
	//重置测试页面
	reSet: function() {
		var questions = this.getItems();
		Ext.each(questions.items, function(item, index, allItems) {
			if(typeof(item.getScore) != "undefined" && item.getScore() != -1)
			{
				item.setScore(-1);
				var radiolist = item.query('answersradio');
				Ext.each(radiolist,function(radioitem,index,allItems){
					radioitem.uncheck();
				});				
			}
		});
		this.setActiveItem(0);
	},
	
	//测试页面初始化
	initialize: function () {
        this.callParent(arguments);
		
		var listQuestions = [
			{index:0, html: "<div style='font-size:2em;color:#67c52f;'>1、做事时提不起劲或没有兴趣</div>" },
			{index:1, html: "<div style='font-size:2em;color:#67c52f;'>2、感到心情低落、沮丧或无助</div>" },
			{index:2, html: "<div style='font-size:2em;color:#67c52f;'>3、入睡困难、睡不安或睡眠太多</div>" },
			{index:3, html: "<div style='font-size:2em;color:#67c52f;'>4、感觉疲倦或没有活力</div>" },
			{index:4, html: "<div style='font-size:2em;color:#67c52f;'>5、食欲不振或吃太多</div>" },
			{index:5, html: "<div style='font-size:1.5em;color:#67c52f;'>6、觉得自己很糟—或觉得自己很失败，或让自己或家人失望</div>" },
			{index:6, html: "<div style='font-size:1.5em;color:#67c52f;'>7、对事物专注有困难，例如阅读报纸或看电视时</div>" },
			{index:7, html: "<div style='font-size:1.5em;color:#67c52f;'>8、动作或说话速度缓慢到别人已经觉察？或正好相反-烦躁或坐立不安、动来动去的情况更胜于平常</div>" },
			{index:8, html: "<div style='font-size:2em;color:#67c52f;'>9、有不如死掉或用某种方式伤害自己的念头</div>" }
		];
		var listAnswers = [
			{xtype: 'panel', height: '20px'},
			{index:0, label: '完全不会', value: 0, score: 0},
			{index:1, label: '偶尔', value: 1, score: 1},
			{index:2, label: '一半以上的天数', value: 2, score: 2},
			{index:3, label: '几乎每天', value: 3, score: 3}
		];
		
		var panelList =[
			{
				html : "<div style='font-size:1.8em;color:#FFF;'><p style='margin:0;'>在生命中总会遇到一些麻烦，您越担心它，它越麻烦。</p><p style='margin:0;'>不要担心，要快乐。 </p><br><p style='text-align:right;'>- EDGAR</p></div>",
				style: 'background-color:#67c52f;'
			},{
				html : "<div style='font-size:1.5em;color:#FFF;'>病人健康问卷—9(Patient Health Questionair—9，PHQ—9)是由《基层医疗精神疾病评估工具》(Primary Care Evaluation of Mental Disorders，PRI—MD)发展而来的抑郁筛选工具，具有简单易操作且信度和效度较高的特点</div>",
				style: 'background-color:#67c52f;'
			}
		];

		Ext.each(listQuestions, function(question) {
			var configItems= {}; 
			configItems = Ext.apply(configItems,{xtype:'questionpanel',fullscreen: true,score: -1});
			configItems = Ext.apply(configItems,question);
			var answeritems = {
				items: [{
					docked: 'bottom',
		 			styleHtmlContent: true,
					defaults: {
						xtype: 'answersradio',
						//name: 'answer',
						//height: '50px',
						//labelAlign: 'right',
						//labelWidth: '75%',
						//style: {
						//	'font-size': '1.5em',
						//	'padding':'0'
						//},		
						name: 'answer',
						docked: 'bottom',
						labelAlign: 'right',
						labelWidth: '80%',
						listeners: {
							check: function (sender){
								var answerscore = this.getScore();
								var myquestionpanel = sender.up('questionpanel');
								myquestionpanel.setScore(answerscore);
								console.log("radio check"); 
								console.log(answerscore); 
								var parentCarousel = sender.up('carousel');
								var nextItem = parentCarousel.getNextQuestion();
								if(typeof(nextItem) != "undefined")
								{
									console.log("nextitem" + nextItem.index); 
									if(nextItem.getIndex() === myquestionpanel.getIndex() + 1){
										parentCarousel.next();
									} else if(nextItem.getIndex() === myquestionpanel.getIndex() - 1){											
										parentCarousel.previous();
									}else{
										parentCarousel.animateActiveItem(nextItem, { type: 'slide', direction: 'left' });
									}
								}else
								{
									parentCarousel.fireEvent("finishCommand", parentCarousel,parentCarousel.getTestScore());
								}
							}
						}
					},
					items:listAnswers
				}]
			};
			configItems = Ext.apply(configItems,answeritems);	
			panelList.push(configItems);
		});
				
		this.add(panelList);
		this.setActiveItem(0);
    }
});

