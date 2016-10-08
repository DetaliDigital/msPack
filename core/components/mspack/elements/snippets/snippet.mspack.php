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
$toPlaceholder = $modx->getOption('toPlaceholder', $scriptProperties, false);




$c = $modx->newQuery('msPackList', array('active' => 1));
$c->sortby($sortby, $sortdir);
$items = $modx->getIterator('msPackList', $c);

// Iterate through items
$list = array();
//$l = array();
/** @var msPackItem $item */
foreach ($items as $item) {
    $l = $item->toArray();
    if ($l['id'] == $msPack->getIdPack()) {
        $packPrice = $l['pack_price'];
        $modx->toPlaceholder('check', $l['id'], 'pc');
    }
    $output .= $modx->getChunk($tpl, $l);
    
}

print '<pre>';
//print_r($msPack->get());
print '</pre>';

$modx->toPlaceholder('packprice', $packPrice, 'pc');

$modx->regClientScript($msPack->config['jsUrl'] . 'web/mspack.js');
$modx->regClientHTMLBlock('<script>msPack.initialize({ "actionUrl":"'
        . $msPack->config['actionUrl'] . '"});</script>');

return $output;
