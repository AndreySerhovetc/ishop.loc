<?php
namespace app\widgets\filter;


use ishop\Cache;
use RedBeanPHP\R;

class Filter
{
    public $groups;
    public $attrs;
    public $tpl;

    public function __construct()
    {
        $this->tpl = __DIR__ . '/filter_tpl.php';
        $this->run();

    }

    protected function run()
    {
        $cache = new Cache();
        $this->groups = $cache->get('filter_group');
        if (!$this->groups) {
            $this->groups = $this->getGroups();
            $cache->set('filter_group', $this->groups, 1);
        }
        $this->attrs = $cache->get('filter_attrs');
        if (!$this->attrs) {
            $this->attrs = $this->getAttrs();
            $cache->set('filter_attrs', $this->attrs, 1);
        }
        $filters = $this->getHtml();
        echo $filters;
    }

    protected function getGroups()
    {
        return R::getAssoc('SELECT id, title FROM attribute_group');
    }

    protected function getAttrs()
    {
        $data = R::getAssoc('SELECT * FROM attribute_value');
        $attrs = [];
        foreach ($data as $k => $v) {
            $attrs[$v['attr_group_id']][$k] = $v['value'];
        }
        return $attrs;
    }

    protected function getHtml(){
        ob_start();
        require $this->tpl;
        return ob_get_clean();
    }
}