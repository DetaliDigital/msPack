<?php

class msPackPackCreateProcessor extends modObjectCreateProcessor
{
    public $objectType = 'msPackList';
    public $classKey = 'msPackList';
    public $languageTopics = array('mspack');
    //public $permission = 'create';


    /**
     * @return bool
     */
    public function beforeSet()
    {
        $name = trim($this->getProperty('name'));
        if (empty($name)) {
            $this->modx->error->addField('name', $this->modx->lexicon('mspack_item_err_name'));
        } elseif ($this->modx->getCount($this->classKey, array('name' => $name))) {
            $this->modx->error->addField('name', $this->modx->lexicon('mspack_item_err_ae'));
        }

        return parent::beforeSet();
    }

}

return 'msPackPackCreateProcessor';