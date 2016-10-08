msPack.grid.Pack = function (config) {
    config = config || {};

    Ext.applyIf(config, {
        id: 'mspack-grid-pack',
        url: msPack.config['connector_url'],
        fields: this.getFields(config),
        columns: this.getColumns(config),
        baseParams: { action: 'mgr/pack/getlist' },
        tbar: this.getTopBar(config),
        sm: new Ext.grid.CheckboxSelectionModel(),
        listeners: {
            rowDblClick: function (grid, rowIndex, e) {
                var row = grid.store.getAt(rowIndex);
                this.updatePack(grid, e, row);
            }
        },
        viewConfig: {
            forceFit: true,
            enableRowBody: true,
            autoFill: true,
            showPreview: true,
            scrollOffset: 0,
            getRowClass: function (rec) {
                return !rec.data.active
                    ? 'mspack-grid-row-disabled'
                    : '';
            }
        },
    });
    msPack.grid.Pack.superclass.constructor.call(this, config);
    // Clear selection on grid refresh
    this.store.on('load', function () {
        if (this._getSelectedIds().length) {
            this.getSelectionModel().clearSelections();
        }
    }, this);
};
Ext.extend(msPack.grid.Pack, MODx.grid.Grid, {
    windows: {},

    getMenu: function (grid, rowIndex) {
        var ids = this._getSelectedIds();

        var row = grid.getStore().getAt(rowIndex);
        var menu = msPack.utils.getMenu(row.data['actions'], this, ids);

        this.addContextMenuItem(menu);
    },
    
    getFields: function () {
        return ['id', 'name', 'description', 'pack_price', 'packindex', 'active', 'actions'];
    },

    getColumns: function () {
        return [{
            header: 'Id',
            dataIndex: 'id',
            sortable: true,
            width: 40
        }, {
            header: _('mspack_item_name'),
            dataIndex: 'name',
            sortable: true,
            width: 150,
        }, {
            header: 'Описание',
            dataIndex: 'description',
            sortable: false,
            width: 200,
        }, {
            header: 'Цена',
            dataIndex: 'pack_price',
            sortable: false,
            width: 70
        }, {
            header: 'Индекс',
            dataIndex: 'packindex',
            sortable: true,
            width: 50
        }, {
            header: _('mspack_item_active'),
            dataIndex: 'active',
            renderer: msPack.utils.renderBoolean,
            sortable: true,
            width: 100,
        }, {
            header: _('mspack_grid_actions'),
            dataIndex: 'actions',
            renderer: msPack.utils.renderActions,
            sortable: false,
            width: 100,
            id: 'actions'
        }];
    },

    getTopBar: function () {
        return [{
            text: '<i class="icon icon-plus"></i>&nbsp;Добавить',
            handler: this.createPack,
            scope: this
        }];
    },
    
    createPack: function (btn, e) {
        var w = MODx.load({
            xtype: 'mspack-pack-window-create',
            id: Ext.id(),
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        w.reset();
        w.setValues({active: true});
        w.show(e.target);
    },
    
    updatePack: function (btn, e, row) {
        if (typeof(row) != 'undefined') {
            this.menu.record = row.data;
        }
        else if (!this.menu.record) {
            return false;
        }
        var id = this.menu.record.id;

        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/pack/get',
                id: id
            },
            listeners: {
                success: {
                    fn: function (r) {
                        var w = MODx.load({
                            xtype: 'mspack-pack-window-update',
                            id: Ext.id(),
                            record: r,
                            listeners: {
                                success: {
                                    fn: function () {
                                        this.refresh();
                                    }, scope: this
                                }
                            }
                        });
                        w.reset();
                        w.setValues(r.object);
                        w.show(e.target);
                    }, scope: this
                }
            }
        });
    },
    
    disablePack: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/pack/disable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },

    enablePack: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.Ajax.request({
            url: this.config.url,
            params: {
                action: 'mgr/pack/enable',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        })
    },
    
    removePack: function () {
        var ids = this._getSelectedIds();
        if (!ids.length) {
            return false;
        }
        MODx.msg.confirm({
            title: ids.length > 1
                ? _('mspack_items_remove')
                : _('mspack_item_remove'),
            text: ids.length > 1
                ? _('mspack_items_remove_confirm')
                : _('mspack_item_remove_confirm'),
            url: this.config.url,
            params: {
                action: 'mgr/pack/remove',
                ids: Ext.util.JSON.encode(ids),
            },
            listeners: {
                success: {
                    fn: function () {
                        this.refresh();
                    }, scope: this
                }
            }
        });
        return true;
    },
    
    onClick: function (e) {
        var elem = e.getTarget();
        if (elem.nodeName == 'BUTTON') {
            var row = this.getSelectionModel().getSelected();
            if (typeof(row) != 'undefined') {
                var action = elem.getAttribute('action');
                if (action == 'showMenu') {
                    var ri = this.getStore().find('id', row.id);
                    return this._showMenu(this, ri, e);
                }
                else if (typeof this[action] === 'function') {
                    this.menu.record = row.data;
                    return this[action](this, e);
                }
            }
        }
        return this.processEvent('click', e);
    },
    
    _getSelectedIds: function () {
        var ids = [];
        var selected = this.getSelectionModel().getSelections();

        for (var i in selected) {
            if (!selected.hasOwnProperty(i)) {
                continue;
            }
            ids.push(selected[i]['id']);
        }

        return ids;
    },
});
Ext.reg('mspack-grid-pack', msPack.grid.Pack);
