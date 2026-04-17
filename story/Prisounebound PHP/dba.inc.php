<?php

$conn = mysqli_connect('localhost', 'root', '', 'commentsection');

if (!$conn) {
    die ("The connection to database failed. Error : ".mysqli_connect_error());
}