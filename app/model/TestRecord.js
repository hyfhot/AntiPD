// JavaScript Document
Ext.define("pdsencha.model.TestRecord", {
    extend: "Ext.data.Model",
    config: {
		identifier: {
			type: 'uuid'
		},
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'testId', type: 'int' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c' },
            { name: 'score', type: 'int' }
        ],
        validations: [
            { type: 'presence', field: 'testId' },
            { type: 'presence', field: 'dateCreated' }
        ]
    }
});