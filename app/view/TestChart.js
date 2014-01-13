//Chart类
Ext.define('pdsencha.view.TestChart', {
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