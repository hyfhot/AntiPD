// JavaScript Document
Ext.define('pdsencha.view.FirstRun', {
    extend: 'Ext.Carousel',
    xtype: 'firstrun',
    alias: "widget.firstrunview",

    config: {
        tabBarPosition: 'bottom',
		fullscreen: true,
		indicator: true,
		defaults: {
		 	styleHtmlContent: true,
			style: {
				'background-color': '#67c52f',
				'color': '#FFF'
			}
		},

	  items: [
		  {
			  html : '<div style="font-size:2em;color:#FFF">什么是PHQ-9？</div><div style="font-size:1.5em;color:#FFF;">PHQ-9是一个抑郁检测工具，以协助基层保健医生诊断抑郁症，以及筛选、监测、治疗！</div>'
		  },
		  {
			  html : '<div style="font-size:2em;color:#FFF">9个问题</div><div style="font-size:1.5em;color:#FFF;">该测试包括9个问题，这将帮助您评估您是否患上抑郁症，这些问题必须诚实回答。</div>'
		  },
		  {
			  html : '<div style="font-size:2em;color:red">请注意</div><div style="font-size:1.5em;color:#FFF;">此应用程序仅供参考之用，并不能替代医生。如果您认为您可能有抑郁症，请咨询您的医生。</div>'
		  },
		  {
			items: [
				
				{
					html : '<div style="font-size:2em;color:#FFF">免责声明</div><div style="font-size:1.3em;color:#FFF;">这个应用程序的开发人员对您使用本应用程序、依赖于本网站上的信息、根据这种依赖所采取的行动导致可能蒙受直接或间接的任何损失不承担任何责任。这种排除损害赔偿应包括但不限于直接的、间接的、特殊的、偶然的或间接的损害。如果您不同意本免责声明的条款，您不应该使用这个程序。</div>',
					height: '75%'
				},
				{
					height: '25%',
					items: [
					{
						xtype: 'button',
						width: '100px',
						height: '50px',
						style: {
							'color': '#FFF',
							'font-size': '1.3em'
						},
						text: '我同意',
						centered: true,
						ui: 'action',
						itemId: "agreeButton"
					}]
				}
			]
		  }
	  	],
        listeners: [{
            delegate: "#agreeButton",
            event: "tap",
            fn: "onAgreeButtonTap"
        },{
            event: "activeitemchange",
            fn: "onActiveItemChange",
			order: "before"
        }]
	},    
    onAgreeButtonTap: function () {
        console.log("agreeCommand");
        this.fireEvent("agreeCommand", this);
    },    
    onActiveItemChange: function (item, value, oldValue, eOpts) {
        console.log("onActiveItemChange");
        return true;
    }
});
