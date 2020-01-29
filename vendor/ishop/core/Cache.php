<?php


namespace ishop;


class Cache
{
    use TSingletone;

    public function set($key, $data, $second = 3600){                               // створює файл і записує в кеш
        if($second){
            $content['data'] = $data;
            $content['end_time'] = time() + $second;
            if(file_put_contents(CACHE . '/' . md5($key) . '.txt', serialize($content))){
                return true;
            }
        }
        return false;
    }
    public function get($key){                                                  // бере дані з кеша і якщо устрілі удаляє
            $file = CACHE . '/' . md5($key) . '.txt';
            if(file_exists($file)){
                $content = unserialize(file_get_contents($file));
                if(time() <=$content['end_time']){
                    return $content['data'];
                }
                unlink($file);
            }
            return false;
    }
    public function delete($key){
        $file = CACHE . '/' . md5($key) . '.txt';                   // удаляє файл
        if(file_exists($file)){
            unlink($file);
            }

    }
}