<?php

/**
 * The home manager controller for msPack.
 *
 */
class msPackHomeManagerController extends modExtraManagerController
{
    /** @var msPack $msPack */
    public $msPack;


    /**
     *
     */
    public function initialize()
    {
        $path = $this->modx->getOption('mspack_core_path', null,
                $this->modx->getOption('core_path') . 'components/mspack/') . 'model/mspack/';
        $this->msPack = $this->modx->getService('mspack', 'msPack', $path);
        parent::initialize();
    }


    /**
     * @return array
     */
    public function getLanguageTopics()
    {
        return array('mspack:default');
    }


    /**
     * @return bool
     */
    public function checkPermissions()
    {
        return true;
    }


    /**
     * @return null|string
     */
    public function getPageTitle()
    {
        return $this->modx->lexicon('mspack');
    }


    /**
     * @return void
     */
    public function loadCustomCssJs()
    {
        $this->addCss($this->msPack->config['cssUrl'] . 'mgr/main.css');
        $this->addCss($this->msPack->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/mspack.js');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/misc/utils.js');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/misc/combo.js');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/widgets/items.grid.js');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/widgets/items.windows.js');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/widgets/home.panel.js');
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/sections/home.js');
        
        
        $this->addJavascript($this->msPack->config['jsUrl'] . 'mgr/sections/pack.js');

        $this->addHtml('<script type="text/javascript">
        msPack.config = ' . json_encode($this->msPack->config) . ';
        msPack.config.connector_url = "' . $this->msPack->config['connectorUrl'] . '";
        Ext.onReady(function() {
            MODx.load({ xtype: "mspack-page-home"});
        });
        </script>
        ');
    }


    /**
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->msPack->config['templatesPath'] . 'home.tpl';
    }
}