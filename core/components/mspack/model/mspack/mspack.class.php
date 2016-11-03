<?php

class msPack
{
    /** @var modX $modx */
    public $modx;


    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = array())
    {
        $this->modx =& $modx;

        $corePath = $this->modx->getOption('mspack_core_path', $config,
            $this->modx->getOption('core_path') . 'components/mspack/'
        );
        $assetsUrl = $this->modx->getOption('mspack_assets_url', $config,
            $this->modx->getOption('assets_url') . 'components/mspack/'
        );
        $connectorUrl = $assetsUrl . 'connector.php';
        $actionUrl = $assetsUrl . 'action.php';

        $this->config = array_merge(array(
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/',
            'imagesUrl' => $assetsUrl . 'images/',
            'connectorUrl' => $connectorUrl,
            'actionUrl' => $actionUrl,

            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'chunksPath' => $corePath . 'elements/chunks/',
            'templatesPath' => $corePath . 'elements/templates/',
            'chunkSuffix' => '.chunk.tpl',
            'snippetsPath' => $corePath . 'elements/snippets/',
            'processorsPath' => $corePath . 'processors/',
        ), $config);

        $this->modx->addPackage('mspack', $this->config['modelPath']);
        $this->modx->lexicon->load('mspack:default');
    }
    
    
    public function get()
    {
        $obj = $this->modx->getObject(modSnippet, array('name' => 'msPack'));
        if ($obj) {
            $arr = $obj->get('properties');
        }
        return $arr;
        $c = $this->modx->newQuery('msPackList', array('active' => 1));
        $c->sortby($sortby, $sortdir);
        $items = $this->modx->getIterator('msPackList', $c);
    }
    
    
    public function getIdPack()
    {
        $idPack = $_SESSION['minishop2']['order']['mspack'];
        if ($idPack && !empty($idPack)) {
            return $idPack;
        } else {
            $objPack = $this->modx->getObject('msPackList', array('packindex' => 1));
            if ($objPack) {
                $packId = $objPack->get('id');
                $_SESSION['minishop2']['order']['mspack'] = $packId;
            }
        }
        
        return $packId;
    }
}