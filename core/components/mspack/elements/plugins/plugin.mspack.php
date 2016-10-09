<?php

if (!$msPack = $modx->getService('mspack', 'msPack', $modx->getOption('mspack_core_path', null,
        $modx->getOption('core_path') . 'components/mspack/') . 'model/mspack/', $scriptProperties)
) {
    return;
}

switch ($modx->event->name) {
    case 'OnManagerPageBeforeRender':
        if ($_GET['a'] == 'mgr/settings' && $_GET['namespace'] == 'minishop2') {
            $msPack = $modx->getService('mspack', 'msPack', MODX_CORE_PATH . 'components/mspack/model/mspack/');
            $controller = $modx->controller;
        } else {
            return;
        }
        
        $controller->addLexiconTopic('mspack:default');
        $controller->addCss($msPack->config['cssUrl'] . 'mgr/main.css');
        
        $modx->regClientStartupScript($msPack->config['jsUrl'] . 'mgr/mspack.js');
        $modx->regClientStartupScript($msPack->config['jsUrl'] . 'mgr/tab.js');
        $modx->regClientStartupScript($msPack->config['jsUrl'] . 'mgr/widgets/mspack.grid.js');
        $modx->regClientStartupScript($msPack->config['jsUrl'] . 'mgr/widgets/pack.windows.js');
        $modx->regClientStartupScript($msPack->config['jsUrl'] . 'mgr/misc/utils.js');
        $modx->regClientStartupHTMLBlock('<script type="text/javascript">
            msPack.config = {
                connector_url : "' . $msPack->config['connectorUrl'] . '" }
            </script>
        ');
        
        break;
        
    case 'OnMODXInit':
        $map = array(
            'msOrder' => array(
                'fields' => array(
                    'pack_cost' => 0,
                ),
                'fieldMeta' => array(
                    'pack_cost' => array (
                        'dbtype' => 'decimal',
                        'precision' => '12,2',
                        'phptype' => 'float',
                        'null' => true,
                        'default' => 0,
                    ),
                ),
            )
        );
        
        foreach ($map as $class => $data) {
            $modx->loadClass($class);
            foreach ($data as $tmp => $fields) {
                if ($tmp == 'fields') {
                    foreach ($fields as $field => $value) {
                        foreach (array(
                            'fields',
							'fieldMeta',
							'indexes',
							'composites',
							'aggregates',
							'fieldAliases',
							) as $key) {
                            if (isset($data[$key][$field])) {
								$modx->map[$class][$key][$field] = $data[$key][$field];
							}
                        }
                    }
                }
            }
            
        }
        
        break;
        
        case 'msOnCreateOrder':
            $arrOrder = $order->get();
            $packObj = $modx->getObject('msPackList', array('id' => $arrOrder['mspack']));
            if ($packObj) {
                $packPrice = $packObj->get('pack_price');
                if ($packPrice) {
                    $msOrder->set('pack_cost', $packPrice);
                    $msOrder->set('cost', $msOrder->get('cost') + $packPrice);
                    $msOrder->save();
                }
            }
        
        break;
}
