<?php

function setComments($conn) {

    if (isset($_POST['commentSubmit'])) {
        
        $disallowedUsers = ["Moonrunes", "moonrunes", "Tridesert", "tridesert"];
        
        if (empty($uid = $_POST['uid'])) {

            $uid = 'Anonymous';

        } else if (in_array($uid, $disallowedUsers)) {

            echo "<div class='errorMessage'>";
            echo "You can't use our names.";
            echo "</div>";
            return;

        } else {

            $uid = filter_var($uid, FILTER_SANITIZE_STRING);
            
        }

        $colorCode = '';

        if (empty($colorCode = $_POST['colorCode'])) {
            $colorCode = '';
        } else if (str_contains($colorCode, '#')){
            $colorCode = str_replace('#', '', $colorCode);
        } else {
            $colorCode = filter_var($colorCode, FILTER_SANITIZE_STRING);
        }

        $date = $_POST['date'];
        
        if (empty($message = $_POST['message'])) {

            echo "<div class='errorMessage'>";
                echo "Error: Message field is required to comment.";
            echo "</div>";
            return;

        } else {

        $message = filter_var($message, FILTER_SANITIZE_STRING);

        }

        $uniqid = round(microtime(true));

        $sql = "INSERT INTO comments (uid, date, message, uniqid, colorCode) VALUES ('$uid', '$date', '$message', $uniqid, '$colorCode')";
        $result = $conn->query($sql);
    }
}

function getComments($conn) {
    $sql = "SELECT * FROM comments";
    $result = $conn->query($sql);

    if ($result->num_rows === 0) {
        echo "<div class='errorMessage'>";
        echo "No comments, yet. Be the first to comment!";
        echo "</div>";
    } else {

        while ($row = $result->fetch_assoc()) {
                echo "<div class='commentBox'>";
                    echo "<div id=".$row['uniqid'].".postInfo>";
                        echo "<div class='username'>";
                            echo "<span style='color: #".$row['colorCode']."'class='u'>";
                                echo $row['uid'];
                            echo "</span>";
                    echo "</div>";
                    echo "<div class='commentDate'>";
                        echo $row['date'];
                    echo "</div>";
                    echo "<div class='uniqid' id='p".$row['uniqid']."'>";
                    echo "</div>";
                    echo "<span class='usersComment'>";
                        echo 'No.';
                    echo "</span>";    
                    echo "<span class='postNum' title='Reply to this post'>";
                        echo $row['uniqid'];
                    echo "</span>";
                    //echo "<div id='bl_".$row['replies']."'class='backLinks'>";
                    //    echo "<a class='backLink' href='#p".$row['replies']."'>";
                    //        echo '>>' . $row['replies'];
                    //    echo "</a>";
                    //echo "</div>";
                    echo "</a>";
                    echo "</div>";
                    echo "<div class='commentContent'>";
                        echo "<blockquote class='postMessage'>";
                            echo nl2br(htmlspecialchars($row['message']));
                        echo "</blockquote>";
                    echo "</div>";
                echo "</div>";
        }
    }
}