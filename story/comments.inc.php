<?php

function setComments($conn) {

    if (isset($_POST['commentSubmit'])) {
        if (empty($uid = $_POST['uid'])) {
            $uid = 'Anonymous';
        }
        $date = $_POST['date'];
        if (empty($message = $_POST['message'])) {
            echo "Error: This field is required to comment.";
        } else {
        $message = $_POST['message'];
        }
        $uniqid = round(microtime(true) * 1000);

        $sql = "INSERT INTO comments (uid, date, message, uniqid) VALUES ('$uid', '$date', '$message', $uniqid)";
        $result = $conn->query($sql);
    }

}

function getComments($conn) {
    $sql = "SELECT * FROM comments";
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        echo "<div class='commentBox'>";
            echo "<div class='username'>";
                echo "<span class='u'>";
                    echo $row['uid'];
                echo "</span>";
            echo "</div>";
            echo "<div class='commentDate'>";
                echo $row['date'];
            echo "</div>";
            echo "<div id='uniqid'>";
                echo "<span class='usersComment'>";
                    echo 'No.';
                echo "</span>";    
                echo "<span class='postNum'>";
                    echo "<a href='{$row['uniqid']}' class='id' title='Reply to this post'>";
                        echo $row['uniqid'];
                    echo "</a>";
                echo "</span>";
            echo "</div>";
            echo "<div class='commentContent'>";
                echo "<blockquote class='postMessage'>";
                        echo nl2br($row['message']);
                echo "</blockquote>";
            echo "</div>";
        echo "</div>";
    }
}