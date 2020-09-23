<?php
function helloWorld(){
    return "Hello World!"; 
}

function quiEstLeMeilleurProf() {
    return "Le prof de programmation Web";
}

function  jeRetourneMonArgument($arg) {
    return $arg;
}

function concatenation($arg1, $arg2) {
    return $arg1 . $arg2;
}

function concatenationAvecEspace($firstname, $lastname) {
    return $firstname . ' ' . $lastname;
}

function somme($un, $deux) {
    return $un + $deux;
}

function soustraction($un, $deux) {
    return $un - $deux;
}

function multiplication($un, $deux) {
    return $un * $deux;
}

function estIlMajeure($arg) {
    if ($arg < 18) {
        return false;
    } else {
        return true;
    }
}

function plusGrand ($un, $deux) {
    if ($un > $deux) {
        return $un;
    } else {
        return $deux;
    }
}

function plusPetit($un, $deux) {
    if ($un < $deux) {
        return $un;
    } else {
        return $deux;
    }
}

function plusPetit2($un, $deux, $trois) {
    return min($un, $deux, $trois);
}

function premierElementTableau($array) {
    return $array[0];
}

function dernierElementTableau($array) {
    return $array[count($array) - 1];
}

function plusGrand2($array) {
    if (empty($array)) {
        return null;
    } else {
        return max($array);
    }
}

function plusPetit3($array) {
    if (empty($array)) {
        return null;
    } else {
        return min($array);
    }
}

function verificationPassword($password) {
    return strlen($password) >= 8;
}

function verificationPassword2 ($password) {
    if (preg_match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/", $password)) {
        return true;
    } else {
        return false;
    }
}

function capital($pays) {
    switch ($pays):
        case 'France':
            return 'Paris';
        case 'Allemagne':
            return 'Berlin';
        case 'Italie':
            return 'Rome';
        case 'Maroc':
            return 'Rabat';
        case 'Espagne':
            return 'Madrid';
        case 'Portugal':
            return 'Lisbonne';
        case 'Angleterre':
            return 'Londres';
        default:
            return 'Inconnu';
	endswitch;
}

function listHTML($titre, $array) {
    if (is_null($titre)  || empty($titre) || is_null($array) || empty($array)) {
        return null;
    } else {
        $output = '<h3>' . $titre . '</h3><ul>';
        foreach($array as $element) {
            $output .= '<li>' . $element . '</li>';
        }
        $output .= '</ul>';
        return $output;
    }
}

function remplacerLesLettres($string) {
    $tmpString =  str_replace("e", 3, strtolower($string));
    $tmpString = str_replace("i", 1, $tmpString);
    $tmpString = str_replace("o", 0, $tmpString);
    return $tmpString;
}

function quelleAnnee() {
    return intval(date('Y'));
}

function quelleDate () {
    return date("d/m/Y");
}

function fonctionMagique() {
    include './libraryToInclude.php';
    return fonctionDeMaLibrairie();
}

function getUtilisateursAutorises() {
    include './libraryToInclude.php';
    $user = getAllUtilisateurs();
    $cleanList = [];
    foreach($user as $userInfo) {
        if ($userInfo->blocked == false) {
            if ($userInfo->age >= 18) {
                if ($userInfo->email != NULL) {
                    array_push($cleanList, $userInfo);
                }
            }
        }
    }
    return $cleanList;
}

// echo helloWorld();
// echo "<br/>";

// echo quiEstLeMeilleurProf();
// echo "<br/>";

// echojeRetourneMonArgument('argument');
// echo "<br/>";

// echo concatenation('bonjour', 'monsieur');
// echo "<br/>";

// echo concatenationAvecEspace('bonjour', 'monsieur');
// echo "<br/>";

// echo somme(1, 1);
// echo "<br/>";

// echo soustraction(1, 1);
// echo "<br/>";

// echo multiplication(1, 1);
// echo "<br/>";

// echo estIlMajeure(22);
// echo "<br/>";

// echo plusGrand(12, 43);
// echo "<br/>";

// echo plusPetit(12, 43);
// echo "<br/>";

// echo plusPetit2(12, 43, 56);
// echo "<br/>";

// echo premierElementTableau([1, 2, 3, 4]);
// echo "<br/>";

// echo dernierElementTableau([1, 2, 3, 4]);
// echo "<br/>";

// echo plusGrand2([1, 2, 3, 4]);
// echo "<br/>";

// echo plusPetit3([1, 2, 3, 4]);
// echo "<br/>";

// echo verificationPassword('iE3ree4fff');
// echo "<br/>";

// echo verificationPassword2('iE3ree4fff');
// echo "<br/>";

// echo capital('France');
// echo "<br/>";

// echo listHTML('Course', ['lait', 'fromage', 'salade', '...']);
// echo "<br/>";

// echo remplacerLesLettres('Les cours de programmation Web sont trops cools');
// echo "<br/>";

// echo quelleAnnee();
// echo "<br/>";

// echo quelleDate();
// echo "<br/>";
?>