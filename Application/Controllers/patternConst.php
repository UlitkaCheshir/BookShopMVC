<?php
/**
 * Created by PhpStorm.
 * User: YukaSan
 * Date: 19.12.2018
 * Time: 16:54
 */

namespace Application\Controllers;


class patternConst{

    public $LoginPattern = '/^[a-zA-ZА-Яа-я\d]{4,16}$/i';
    public $EmailPattern = '/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i';
    public $PasswordPattern = '/^[a-z0-9_?!^%()\d]{6,30}$/i';
}//patternConst