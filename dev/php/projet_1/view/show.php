<?php
    require_once("controller/messages_controller.class.php");
    $unController = new Controller ("localhost", "mail_project", "cfa-insta", "Azerty@1234");
    if(isset($_GET['id'])) {
        $id = $_GET['id'];
    } else {
        header('Location: /?page=4');
    }
    $unController->isRead($id);
?>
<div class="row mt-4">
    <div class="col-8 offset-2">
    <?php
        $result = $unController->selectOneMessageByID($id);
        if ($result == null) {
            header('Location: /?page=4');
        }
        $result = $result[0];
        echo '
            <div class="card">
                <div class="card-header">
                    <div class="float-right">
                        '.$result['email'].'
                    </div>
                    <h1 class="h4">'.$result['fullname'].'</h1>
                </div>
                <div class="card-body">
                '.$result['content'].'
                </div>
                <div class="card-footer">
                    <div class="float-right">
                        <a href="/?page=3&id='.$result['id'].'" class="btn btn-danger btn-sm">Supprimer</a>
                    </div>
                    '.time2string(time()-strtotime($result['created_at'])).' ago
                </div>
            </div>
            '
    ?>
    </div>
</div>