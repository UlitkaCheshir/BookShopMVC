<?php
/**
 * Created by PhpStorm.
 * User: dreamcast
 * Date: 29.12.2018
 * Time: 2:01
 */

namespace Application\Services;


use Application\Controllers\BaseController;
use Application\Utils\MySQL;

class PersonalPageService  {

    //сохранение аватара(фотографии) пользователя
    public function ChangeUserAvatar( $params = [] ){

        $userID = $params['userID'];

        //получаем файл аватара(фоторграфии) пользователя
        if( isset( $_FILES['avatarFile'] ) ){

            $fileName = $_FILES['avatarFile']['name'];

            $fileName = time() . "_$fileName";

            //если дериктории аваторов не существует
            if( !file_exists("images/avatars") ){

                //создаём директорию
                mkdir("images/avatars");

            }//if

            //создаём папку с ID пользователя
            mkdir("images/avatars/{$userID}");

            //полный путь к аватарке(фотографии) пользователя
            $userAvatarDIrectioryPath = "images/avatars/{$userID}/{$fileName}";

            if( !move_uploaded_file($_FILES['avatarFile']['tmp_name'] , $userAvatarDIrectioryPath) ){

                throw new \Exception('File upload error!');

            }//if

            //создаём запись в базе данных
            $stm = MySQL::$db->prepare("INSERT INTO useravatar VALUES ( DEFAULT , :userID , :userAvatarPath )");
            $stm->bindParam('userID', $userID , \PDO::PARAM_INT);
            $stm->bindParam('userAvatarPath', $userAvatarDIrectioryPath , \PDO::PARAM_STR);
            $result = $stm->execute();

            //если создание записи не удалось
            if( $result === false ){

                $exception = new \stdClass();
                $exception->errorCode = MySQL::$db->errorCode ();
                $exception->errorInfo = MySQL::$db->errorInfo ();

                return $exception;

            }//if

        }//if

    }//ChangeUserAvatar

}//PersonalPageService