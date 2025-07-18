<?php
    date_default_timezone_set('America/New_York');
    include 'comments.inc.php';
    include 'dba.inc.php';
?>

<!DOCTYPE html>
<html>
  <head>
    <title>PRISOUNEBOUND</title>
    <link rel="stylesheet" href="prisounebound.css">
    <link rel="icon" href="https://file.garden/ZXENUjtcLzaPWMyp/penta.png" type="image/x-icon">
    
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4190910180759514"
     crossorigin="anonymous"></script>
     
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://cspaintadventures.com/story/prisounebound.html?p=1">
    <meta property="og:title" content="Prisounebound">
    <meta property="og:description" content="Two lonely trolls finally have a break of their prolonged imprisonment to enjoy a harmless game of Sgrub. A Fan Adventure with a focus on the older feel of the original Homestuck.">
    <meta property="og:image" content="https://file.garden/ZXENUjtcLzaPWMyp/logo.gif">

    <style>

    .main {
      margin-top: 0px;
    }

    a {
        color: #ff8800;

    }

    </style>
  </head>
  <body>
    <div class="main">
      <div class="titlecard"><img src="https://file.garden/ZXENUjtcLzaPWMyp/PRISON.png"></div>
      <div class="header"><a href="/index.html">HOME</a> || MERCH || <a href="https://mspfa.com/?s=54371&p=1">MSPFA</a> || <a href='/credits.html'>CREDITS</a> || <a href='https://www.patreon.com/c/PRISOUNEBOUND'>DONATE</a></div>
      <div id="container">
        <div id="slide">
          <div id="command"></div>
          <div id="content">
          </div>
          <div class="foot">
            <div class="links"></div>
            <br>
            <br>
          <div class="footlinks"></div>      
        </div>
      </div>
    </div>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4190910180759514"
    crossorigin="anonymous"></script>
    <!-- Horizontal -->
    <ins class="adsbygoogle"
    style="display:flex;width:728px;height:90px"
    data-ad-client="ca-pub-4190910180759514"
    data-ad-slot="6812025820"></ins>
    <script>
    (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    
    <hr>
    <div id='formSection'>
        <?php
          echo "<form method='POST' action='".setComments($conn)."'>
              <input type='textarea' name='uid' placeholder='Anonymous' value=''><button type='submit' name='commentSubmit'>Post</button>
              <input type='hidden' name='date' value='".date('Y-m-d H:i:s')."'>
              <input type='hidden' name='uniqid'>
              <textarea name='message'></textarea>
          </form>";    
        ?>
    </div>
    <hr>
    <div id='commentSection'>
      <?php
      getComments($conn);
      ?>
    </div>

    <script>
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
    </script>
    <script src ='prisounebound.js'></script>
  </body>
</html>
