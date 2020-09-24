<?php
        require_once("controller/messages_controller.class.php");
        $unController = new Controller ("localhost", "mail_project", "cfa-insta", "Azerty@1234");
        if(isset($_GET['id'])) {
                $id = $_GET['id'];
        } else {
                header('Location: /?page=3');
        }
        if ($unController->selectOneMessageByID($id) == null) {
                header('Location: /?page=3');
        } else {
                $unController->deleteOneMessage($id);
        }
        header('Location: /');
?>