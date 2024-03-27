#!/usr/bin/php-cgi
<?php
    session_start();
    $ret = new stdClass();
    $ret->pairs = $_SESSION['pairs'];
    $ret->points = $_SESSION['points'];
    $ret->cards = $_SESSION['cards'];
    
    $conn = oci_connect('u1987716', 'hpogutoy', 'ORCLCDB');
    $consulta = "SELECT id, pairs, points, cards FROM memory_save ORDER BY id DESC FETCH FIRST 1 ROWS ONLY;";
    $comanda = oci_parse($conn, $consulta);
    $fila = oci_fetch_array($comanda)

    if $fila != false { 
        $ret->pairs = $fila['PAIRS'];
        $ret->points = $fila['POINTS'];
        $ret->cards = $fila['CARDS'];
    }

    # Baixar de la base de dades
    echo json_encode($ret);
?>

