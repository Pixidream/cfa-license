<?php
require_once("model/messages_model.class.php");

class Controller {
    private $unModel;

    public function __construct ($server, $db, $username, $password) {
        $this->unModel = new Model ($server, $db, $username, $password);
    }

    public function selectAllMessages() {
        $result = $this->unModel->selectAllMessage();

        return $result;
    }

    public function selectOneMessageByID($id) {
        $result = $this->unModel->selectOneMessageById($id);

        return $result;
    }

    public function insertMessage($tab) {
        $this->unModel->insertMessage($tab);
    }

    public function isRead($id) {
        $this->unModel->isRead($id);
    }

    public function deleteOneMessage($id) {
        $this->unModel->deleteOneMessage($id);
    }
}
?>