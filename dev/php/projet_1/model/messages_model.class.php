<?php
class Model {
    private $unPdo;
    public function __construct($server, $db, $username, $password) {
        $this->unPdo = null;
        try {
            $this->unPdo = new PDO ("mysql:host=".$server.";dbname=".$db,$username,$password);
        } catch(PDOExeption $exp) {
            return "Erreur de connexion à la base de donnée: $exp->getMessage()";
        }
    }

    public function selectAllMessage() {
        if ($this->unPdo != null) {
            $request = "select * from messages ORDER BY id DESC;";
            $select = $this->unPdo->prepare($request);
            $select->execute();

            $result = $select->fetchAll();
            return $result;
        }
    }

    public function selectOneMessageById($id) {
        if ($this->unPdo != null) {
            $request = "select * from messages where id=$id;";
            $select = $this->unPdo->prepare($request);
            $select->execute();

            $result = $select->fetchAll();
            return $result;
        }
    }

    public function insertMessage($tab) {
        if ($this->unPdo != null) {
            $request = "insert into messages values (null, :fullname,:email, :content, :new, default);";
            $data = array(
                ":fullname"=>$tab['fullname'],
                ":email"=>$tab['email'],
                ":content"=>$tab['content'],
                ":new"=>1
            );
            $insert = $this->unPdo->prepare($request);
            $insert->execute($data);
        }
    }

    public function isRead($id) {
        if ($this->unPdo != null) {
            $request = "update messages set new = 0 where id=".$id.";";
            $insert = $this->unPdo->prepare($request);
            $insert->execute();
        }
    }

    public function deleteOneMessage($id) {
        if ($this->unPdo != null) {
            $request = "delete from messages where id=".$id.";";
            $insert = $this->unPdo->prepare($request);
            $insert->execute();
        }
    }
}
?>