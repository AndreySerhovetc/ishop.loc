<?php

namespace app\controllers;

use \RedBeanPHP\R;
use ishop\App;

class MainController extends AppController {

    public function indexAction(){
        $posts = R::findAll('test');
        $this->setMeta(App::$app->getProperty('shop_name'),"Описание...", "Ключевики...");


        $name = 'John';
        $age = 30;
        $names = ['andrey', 'Fin'];
        $this->set(compact('name', 'age', 'names', 'posts'));
    }

}