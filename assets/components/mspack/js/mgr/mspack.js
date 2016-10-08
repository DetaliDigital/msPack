var msPack = function (config) {
    config = config || {};
    msPack.superclass.constructor.call(this, config);
};
Ext.extend(msPack, Ext.Component, {
    page: {}, window: {}, grid: {}, tree: {}, panel: {}, combo: {}, config: {}, view: {}, utils: {}
});
Ext.reg('mspack', msPack);

msPack = new msPack();