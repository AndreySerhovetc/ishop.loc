<?php

namespace app\models;

use ishop\App;
use \RedBeanPHP\R;
class Category extends AppModel{

    public $attributes = [              //валидация в добавлении категории
        'title' => '',
        'parent_id' => '',
        'keywords' => '',
        'description' => '',
        'alias' => '',
    ];

    public $rules = [
        'required' => [
            ['title'],
        ]
    ];

    public function getIds($id){
        $cats = App::$app->getProperty('cats');
        $ids = null;
        foreach ($cats as $k => $v) {
           if($v['parent_id'] == $id){
               $ids .= $k . ',';
               $ids .= $this->getIds($k);
           }
        }
        return $ids;
    }
}