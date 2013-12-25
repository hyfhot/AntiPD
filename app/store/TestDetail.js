// JavaScript Document
Ext.define("pdsencha.store.TestDetail", {
    extend: "Ext.data.Store",
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        autoSync: true,
        model: "pdsencha.model.TestDetail",
        proxy: {
            type: 'localstorage',
            id: 'testdetail-app-store'
        }
    }
});