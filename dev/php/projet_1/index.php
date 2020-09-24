<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <title>Messagerie</title>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
        <a class="navbar-brand" href="http://project-php-1.local/">Historique E-mail</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" href="http://project-php-1.local/?page=1">Écrire un e-mail</a>
            </li>
            </ul>
        </div>
    </div>
    <?php
        function time2string($timeline) {
            $periods = array('day' => 86400, 'hour' => 3600, 'minute' => 60, 'second' => 1);
            foreach($periods AS $name => $seconds){
                $num = floor($timeline / $seconds);
                $timeline -= ($num * $seconds);
                $ret .= $num.' '.$name.(($num > 1) ? 's' : '').' ';
            }
            return trim($ret);
        }
        if(isset($_GET['page'])) {
            $page = $_GET['page'];
            }
            else {
            $page = 0;
            }
            switch($page) {
            case 1 : $page = "write.php";
            break;
            case 2 : $page = "show.php";
            break;
            case 3 : $page = "delete.php";
            break;
            case 4 : $page = "404.php";
            break;
            default: $page = "list.php";
            break;
            }
    ?>
    </nav>
    <?php
    require_once("view/$page");
    ?>

    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
</body>
</html>