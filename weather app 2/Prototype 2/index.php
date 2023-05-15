<?php

// making the page to reload after 30 minutes for new value
$page = $_SERVER['PHP_SELF'];
$sec = "1800";
header("Refresh: $sec; url=$page");

// fetching data from open weather map api
$data = file_get_contents("https://api.openweathermap.org/data/2.5/weather?q=south lanarkshire&appid=319c7bcf7f8ee62ca3f70908a33cd5e7&units=metric");

$content = json_decode($data);

// accessing required values from api and storing them in variables
$city_name = $content->name;
$temperature = $content->main->temp;
$pressure = $content->main->pressure;
$humidity = $content->main->humidity;
$wind_speed = $content->wind->speed;
$wind_deg = $content->wind->deg;
$dt = $content->dt;
$weather_description = $content->weather[0]->description;
$icon = $content->weather[0]->icon;


// making connection to mysql 
$connection  = mysqli_connect('localhost', 'root', '');

// creating database for weather app
mysqli_query($connection, 'create database weatherapp;');

// selecting weatherapp database
mysqli_query($connection, 'use weatherapp;');

// creating tables to store data
mysqli_query($connection, 'create table if not exists data(Name varchar(20), temperature int(5),pressure int, humidity int, wind_speed int,wind_deg int, dt int(20),weather_description varchar(50), icon varchar(10))');

// inserting values in table
echo mysqli_query($connection, "insert into data(Name, temperature, pressure, humidity, wind_speed, wind_deg, dt, weather_description, icon) values ('$city_name',$temperature,$pressure, $humidity, $wind_speed, $wind_deg, $dt, '$weather_description', '$icon')");
