<?php


namespace Application\Services;


use Application\Utils\MySQL;


use Bcrypt\Bcrypt;

class AuthorizeService{

    public function LogIn( $login, $password ){

        $bcrypt = new Bcrypt();

        //ищем пользователя
        $stm = MySQL::$db->prepare( "SELECT * FROM users WHERE userLogin = :login OR userEmail = :login" );
        $stm->bindParam(':login', $login, \PDO::PARAM_STR);
        $stm->execute();

        //возвращаем объект из базы данных
        $result = $stm->fetch(\PDO::FETCH_OBJ);

        //есди пользователь не найден
        if(!$result){
            return $result;
        }//if

        //проверяем пароль пользователя
        $verifyPassword = $bcrypt->verify($password, $result.userPassword);

        //даём разрешение на авторизацию
        if($verifyPassword){
           return true;
        }//if

//        $stm = MySQL::$db->prepare("SELECT * FROM users WHERE (userLogin = :login OR userEmail = :login) AND userPassword = :password");
//        $stm->bindParam(':login', $login, \PDO::PARAM_STR);
//        $stm->bindParam(':password', $password, \PDO::PARAM_STR);
//        $stm->execute();
//
//        return $stm->fetch(\PDO::FETCH_OBJ);

    }//LogIn

}//AuthorizeService