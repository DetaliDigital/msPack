msPack.window.CreatePack = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'mspack-pack-window-create';
    }
    Ext.applyIf(config, {
        title: _('mspack_item_create'),
        width: 550,
        autoHeight: true,
        url: msPack.config.connector_url,
        action: 'mgr/pack/create',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    msPack.window.CreatePack.superclass.constructor.call(this, config);
};
Ext.extend(msPack.window.CreatePack, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'textfield',
            fieldLabel: _('mspack_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false,
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Цена',
            name: 'pack_price',
            id: config.id + '-pack-price',
            anchor: '99%',
            allowBlank: false
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Индекс',
            name: 'packindex',
            id: config.id + '-packindex',
            anchor: '99%'
        }, {
            xtype: 'textarea',
            fieldLabel: _('mspack_item_description'),
            name: 'description',
            id: config.id + '-description',
            height: 150,
            anchor: '99%'
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('mspack_item_active'),
            name: 'active',
            id: config.id + '-active',
            checked: true,
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('mspack-pack-window-create', msPack.window.CreatePack);


msPack.window.UpdatePack = function (config) {
    config = config || {};
    if (!config.id) {
        config.id = 'mspack-item-window-update';
    }
    Ext.applyIf(config, {
        title: _('mspack_item_update'),
        width: 550,
        autoHeight: true,
        url: msPack.config.connector_url,
        action: 'mgr/pack/update',
        fields: this.getFields(config),
        keys: [{
            key: Ext.EventObject.ENTER, shift: true, fn: function () {
                this.submit()
            }, scope: this
        }]
    });
    msPack.window.UpdatePack.superclass.constructor.call(this, config);
};
Ext.extend(msPack.window.UpdatePack, MODx.Window, {

    getFields: function (config) {
        return [{
            xtype: 'hidden',
            name: 'id',
            id: config.id + '-id'
        }, {
            xtype: 'textfield',
            fieldLabel: _('mspack_item_name'),
            name: 'name',
            id: config.id + '-name',
            anchor: '99%',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Цена',
            name: 'pack_price',
            id: config.id + '-pack-price',
            anchor: '99%',
            allowBlank: false
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Индекс',
            name: 'packindex',
            id: config.id + '-packindex',
            anchor: '99%'
        }, {
            xtype: 'textarea',
            fieldLabel: _('mspack_item_description'),
            name: 'description',
            id: config.id + '-description',
            anchor: '99%',
            height: 120
        }, {
            xtype: 'xcheckbox',
            boxLabel: _('mspack_item_active'),
            name: 'active',
            id: config.id + '-active'
        }];
    },

    loadDropZones: function () {
    }

});
Ext.reg('mspack-pack-window-update', msPack.window.UpdatePack);