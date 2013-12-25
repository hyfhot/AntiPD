// JavaScript Document
Ext.define("pdsencha.model.RunLog", {
    extend: "Ext.data.Model",
	
    config: {
		identifier: {
			type: 'uuid'
		},
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c'}
        ]
    }
});