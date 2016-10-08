<?php
if (file_exists(dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php')) {
    /** @noinspection PhpIncludeInspection */
    require_once dirname(dirname(dirname(dirname(__FILE__)))) . '/config.core.php';
}
else {
    require_once dirname(dirname(dirname(dirname(dirname(__FILE__))))) . '/config.core.php';
}
/** @noinspection PhpIncludeInspection */
require_once MODX_CORE_PATH . 'config/' . MODX_CONFIG_KEY . '.inc.php';
/** @noinspection PhpIncludeInspection */
require_once MODX_CONNECTORS_PATH . 'index.php';
/** @var msPack $msPack */
$msPack = $modx->getService('mspack', 'msPack', $modx->getOption('mspack_core_path', null,
        $modx->getOption('core_path') . 'components/mspack/') . 'model/mspack/'
);
$modx->lexicon->load('mspack:default');

// handle request
$corePath = $modx->getOption('mspack_core_path', null, $modx->getOption('core_path') . 'components/mspack/');
$path = $modx->getOption('processorsPath', $msPack->config, $corePath . 'processors/');
$modx->getRequest();

/** @var modConnectorRequest $request */
$request = $modx->request;
$request->handleRequest(array(
    'processors_path' => $path,
    'location' => '',
));