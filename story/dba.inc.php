<?php

$conn = mysqli_connect('localhost', 'root', '', 'commentsection');

if (!$conn) {
    die ("Fuck, the Connection to database failed. Idiot. Error : ".mysqli_connect_error());
}