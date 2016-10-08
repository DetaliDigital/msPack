msPack.page.Home = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        components: [{
            xtype: 'mspack-panel-home',
            renderTo: 'mspack-panel-home-div'
        }]
    });
    msPack.page.Home.superclass.constructor.call(this, config);
};
Ext.extend(msPack.page.Home, MODx.Component);
Ext.reg('mspack-page-home', msPack.page.Home);