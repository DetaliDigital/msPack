<?php
/** @var modX $modx */
/** @var array $scriptProperties */
/** @var msPack $msPack */
if (!$msPack = $modx->getService('mspack', 'msPack', $modx->getOption('mspack_core_path', null,
        $modx->getOption('core_path') . 'components/mspack/') . 'model/mspack/', $scriptProperties)
) {
    return;
}

$tpl = $modx->getOption('tpl', $scriptProperties, 'msPackTpl');
$sortby = $modx->getOption('sortby', $scriptProperties, 'packindex');
$sortdir = $modx->getOption('sortdir', $scriptProperties, 'ASC');
$freePack = $modx->getOption('mspack_pack_free');

$c = $modx->newQuery('msPackList', array('active' => 1));
$c->sortby($sortby, $sortdir);
$items = $modx->getIterator('msPackList', $c);

$list = array();

foreach ($items as $item) {
    $l = $item->toArray();
    if ($l['id'] == $msPack->getIdPack()) {
        $packPrice = $l['pack_price'];
        $modx->toPlaceholder('check', $l['id'], 'pc');
    }
    $output .= $modx->getChunk($tpl, $l);
    
}

$modx->toPlaceholder('packprice', $packPrice, 'pc');

$modx->regClientScript($msPack->config['jsUrl'] . 'web/mspack.js');
$modx->regClientHTMLBlock('<script>msPack.initialize({ "freePack": ' . $freePack . ' });</script>');

return $output;
