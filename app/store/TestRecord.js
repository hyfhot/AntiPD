Ext.define("pdsencha.store.TestRecord", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        autoSync: true,
        model: "pdsencha.model.TestRecord",
        proxy: {
            type: 'localstorage',
            id: 'testrecord-app-store'
        },
        sorters: [{ property: 'dateCreated', direction: 'DESC'}],
        grouper: {
            sortProperty: "dateCreated",
            direction: "Desc",
            groupFn: function (record) {

                if (record && record.data.dateCreated) {
                    return record.data.dateCreated.getFullYear()+'年'+(record.data.dateCreated.getMonth() + 1).toString()+'月';
                } else {
                    return '';
                }
            }
        }
    }
});