<div class="row mt-4">
    <div class="col-6 offset-3">
    <?php
    require_once("controller/messages_controller.class.php");
    $unController = new Controller ("localhost", "mail_project", "cfa-insta", "Azerty@1234");
    $result = $unController->selectAllMessages();
    foreach($result as $data) {
        $badge = $data['new'] == '1' ? "<span class='badge badge-danger ml-2'>new</span>" : "";
        echo '
            <div class="card mb-2 ">
            <a href="http://project-php-1.local/?page=2&id='.$data["id"].'" class="card-body text-decoration-none">
            <div class="float-right text-sm text-muted">'.time2string(time()-strtotime($data['created_at'])).' ago.'. $badge .'</div>
            <h3>'.$data["fullname"].'</h3>
            <h6 class="text-muted">'.$data["email"].'</h6>
            </a>
        </div>
        ';
    }
    ?>
    </div>
</div>