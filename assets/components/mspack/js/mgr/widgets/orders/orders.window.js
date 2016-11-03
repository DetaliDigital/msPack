Ext.ComponentMgr.onAvailable('minishop2-window-order-update', function() {
    this.on('beforerender', function() {
        var packField = this.items.items[0].items.items[0].items.items[0].items.items[3].items.items[0];
        packField.insert(1, {
            id: 'mspack-orders-pack',
            fieldLabel: 'Упаковка',
            anchor: '100%',
            xtype: 'mspack-combo-pack',
            layout: 'form',
            value: 'eeeee'
            //baseParams: {
            //    action: 'mgr/orders/update',
            //}
            //name: 'pack_cost'
            //renderer: true
        });
        
        //console.log(packGrid);
    });
});

msPack.combo.listeners_disable = {
    render: function () {
        this.store.on('load', function () {
            if (this.store.getTotalCount() == 1 && this.store.getAt(0).id == this.value) {
                this.readOnly = true;
                this.addClass('disabled');
            }
            else {
                this.readOnly = false;
                this.removeClass('disabled');
            }
        }, this);
    }
};

msPack.combo.Pack = function (config) {
    config = config || {};
    Ext.applyIf(config, {
        name: 'pack_cost',
        id: 'mspack-combo-pack',
        hiddenName: 'pack_cost',
        displayField: 'name',
        valueField: 'pack_cost',
        fields: ['id', 'name'],
        pageSize: 10,
        emptyText: 'text',
        url: msPack.config['connector_url'],
        //sm: new Ext.grid.CheckboxSelectionModel(),
        baseParams: {
            action: 'mgr/orders/pack/getlist',
            combo: true,
            pack_id: config.pack_id || 0
            //addall: config.addall || 0,
            //order_id: config.order_id || 0
        },
        //listeners: msPack.combo.listeners_disable
        listeners: {
                select: function (combo, row) {
                    
                    console.log(combo, row);
                }
            }
    });
    
    console.log(config);
    console.log(config.baseParams.pack_id);
    
    msPack.combo.Pack.superclass.constructor.call(this, config);
};
Ext.extend(msPack.combo.Pack, MODx.combo.ComboBox);
Ext.reg('mspack-combo-pack', msPack.combo.Pack);

