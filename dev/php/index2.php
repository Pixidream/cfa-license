<?php
// ex 1
$a = "42";
$b = 42;
$c = "Hello World!";
$d = array_map(function ($v) {return $v**2; }, range(0, 5));

// ex2
foreach($tab as $key => $value) {
    echo "$key:$value\n";
}

// ex3
$var = (empty($var)) ? 10 : $var;

// ex4
$res = checkdate($mois, $jour, $annee)

// ex5
$res = array_key_exists($cle, $tableau)

// ex 6
function validateDate($date, $format = 'Y-m-d H:i:s')
{
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) == $date;
}

function check_form($data)
{
$match_regex = [
'nom' => '#^[A-Za-z -]*$#',
'prenom' => '#^[A-Za-z -]*$#',
'naissance' => '#^[0-9]{1,2}/[0-9]{1,2}/[0-9]{1,4}$#',
'banque' => '#^BE[0-9]{2}( ?[0-9]{4}){3}$#',
];

foreach ($match_regex as $key => $regex) {
$v[$key]['valide'] = boolval(preg_match($regex, $data[$key]));
$v[$key]['message'] = ($v[$key]['valide']) ? $key.' est valide' : false;
}
$v['naissance']['valide'] = validateDate($data['naissance'], 'd/m/Y');
$v['CP']['valide'] = boolval(($data['CP'] > 999 && $data['CP'] < 1e4));
$v['CP']['message'] = ($v['CP']['valide']) ? 'CP est valide' : false;

$match_regex['CP'] = '';
$v['valide'] =1;
foreach ($match_regex as $key => $regex) {
$v['valide'] *= $v[$key]['valide'];
}

return $v;
}

// ex 7
function distance($x1,$y1,$x2,$y2) {form-control is-invalid
// ex 8
function estPremier($n) {
    if ($n <= 1) 
        return false; 
    for ($i = 2; $i < $n; $i++) 
        if ($n % $i == 0) 
            return false; 
    return true; 
}

function premiers ($n) {
    $tab = [];
    for ($i = 2; $i <= $n; $i++) {
        if (estPremier($i))
            array_push($tab, $i);
    }
    var_dump($tab);
    return $tab;
}
?>