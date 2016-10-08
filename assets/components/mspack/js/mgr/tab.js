Ext.ComponentMgr.onAvailable('minishop2-settings-tabs', function() {
    this.on('beforerender', function() {
        this.add({
            title: 'Упаковка',
            id: 'mspack-tab-settings',
            layout: 'anchor',
            items: [{
                html: 'Здесь можно добавить упаковку',
                border: false,
                bodyCssClass: 'panel-desc'
            }, {
                xtype: 'mspack-grid-pack',
                cls: 'main-wrapper'
            }]
        });
    });
});


