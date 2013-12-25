// JavaScript Document
Ext.define("pdsencha.model.TestDetail", {
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
            { name: 'questionindex', type: 'int' },
            { name: 'answerindex', type: 'int' }
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'testId' },
            { type: 'presence', field: 'dateCreated' },
            { type: 'presence', field: 'questionindex' },
            { type: 'presence', field: 'answerindex' }
        ]
    }
});