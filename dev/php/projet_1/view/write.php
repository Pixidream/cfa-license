<?php
    require_once("controller/messages_controller.class.php");
    $unController = new Controller ("localhost", "mail_project", "cfa-insta", "Azerty@1234");
    function test_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    $nameErr = $emailErr = $contentErr ="";
    $name = $email = $content ="";
    $valid = true;
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (empty($_POST["fullname"])) {
            $nameErr = "Name is required";
            $valid = false;
        } else {
            $name = test_input($_POST["fullname"]);
            if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
                $nameErr = "Only letters and white space allowed";
                $valid = false;
            }
        }
        if (empty($_POST["email"])) {
            $emailErr = "Email is required";
            $valid = false;
        } else {
            $email = test_input($_POST["email"]);
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $emailErr = "Invalid email format";
                $valid = false;
            }
        }
        if (empty($_POST["content"])) {
            $contentErr = "Content is required";
            $valid = false;
        } else {
            $content = test_input($_POST["content"]);
            if (strlen($content) < 10) {
                $contentErr = "Content need at least 10 characters";
                $valid = false;
            }
        }
        if ($valid) {
            $unController->insertMessage($_POST);
            $nameErr = $emailErr = $contentErr ="";
            $name = $email = $content ="";
            header('Location: /');
        }
    }
?>
<div class="container">
    <div class="row mt-5">
        <div class="col-md-6 offset-md-3">
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
                <div class="form-group">
                    <label for="fillname">Nom & prénom :</label>
                    <input type="text" name="fullname" id="fullname" class="form-control " placeholder="Nom & prénom" value="<?php echo $name;?>" required data-error="Field is required">
                    <span class="error text-danger"><?php echo $nameErr;?></span>
                </div>
                <div class="form-group">
                    <label for="email">Email :</label>
                    <input type="email" name="email" id="email" class="form-control " placeholder="Adresse mail" value="<?php echo $email;?>" required data-error="Field is required">
                    <span class="error text-danger"><?php echo $emailErr;?></span>
                </div>
                <div class="form-group">
                    <label for="content">Message :</label>
                    <textarea name="content" id="content" cols="30" rows="10" class="form-control " placeholder="écrire un message" required data-error="Field is required"><?php echo $content;?></textarea>
                    <span class="error text-danger"><?php echo $contentErr;?></span>
                </div>
                <button type="submit" name="send" class="btn btn-primary float-right">Envoyer</button>
            </form>
        </div>
    </div>
</div>