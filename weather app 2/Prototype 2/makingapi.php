<?php
// cors access for all urls
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

// connecting to sql
$connection  = mysqli_connect('localhost', 'root', '');

// using weatherapp database
mysqli_query($connection, 'use weatherapp');

// selecting data from data table
$result = mysqli_query($connection, 'select* from data;');

// converting the data to new object
$weatherdata = new stdClass;
while ($row = mysqli_fetch_assoc($result)) {
    $weatherdata = $row;
}

// returning values in json format
echo json_encode($weatherdata);
