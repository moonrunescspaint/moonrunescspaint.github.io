<?php
    date_default_timezone_set('America/New_York');
    include 'comments.inc.php';
    include 'dba.inc.php';
?>

<!DOCTYPE html>
<html>

  <head>
    <title>PRISOUNEBOUND</title>
    
    <!-- Header Links -->
    <link rel="stylesheet" href="prisounebound.css">
    <link rel="icon" href="https://file.garden/ZXENUjtcLzaPWMyp/penta.png" type="image/x-icon">
    <link rel="preconnect" href="https://challenges.cloudflare.com">
    
    <!-- Header Scripts -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4190910180759514"crossorigin="anonymous"></script>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js"asyncdefer></script>
    <script>
      if ( window.history.replaceState ) {
          window.history.replaceState( null, null, window.location.href );
      }
    </script>
    <script src ='prisounebound.js'></script>

    <!-- Meta Properties  -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://cspaintadventures.com/story/prisounebound.html?p=1">
    <meta property="og:title" content="Prisounebound">
    <meta property="og:description" content="Two lonely trolls finally have a break of their prolonged imprisonment to enjoy a harmless game of Sgrub. A Fan Adventure with a focus on the older feel of the original Homestuck.">
    <meta property="og:image" content="https://file.garden/ZXENUjtcLzaPWMyp/logo.gif">

  </head>

  <body>
    <!-- Main Comic  -->
    <div class="main">
      <div class="titlecard"><img src="https://file.garden/ZXENUjtcLzaPWMyp/PRISON.png"></div>
      <div class="header"><a href="/index.html">HOME</a> || MERCH || <a href="https://mspfa.com/?s=54371&p=1">MSPFA</a> || <a href='/credits.html'>CREDITS</a> || <a href='https://www.patreon.com/c/PRISOUNEBOUND'>DONATE</a></div>
      <div id="container">
        <div id="slide">
          <div id="command"></div>
          <div id="content"></div>
          <div class="foot">
            <div class="links"></div>
            <br>
            <br>
            <div class='gamelinks'><a href="javascript:void(0)" id="goBack" onclick="goBack()" href="javascript:void(0);">Go Back</a> | <a href="javascript:void(0)" id="savegame" onclick="save()" href="javascript:void(0);">Save Game</a> | <a href="javascript:void(0)" id="loadgame" onclick="load()" href="javascript:void(0);">Load Game</a> | <a href="javascript:void(0)" id="deletegame" onclick="del()" href="javascript:void(0);">Delete Game</a> | <a href="javascript:void(0)" id="storyLog" onclick="storyLog()" href="javascript:void(0);">Story Log</a> </div>       
        </div>
      </div>
    </div>
    
    <!-- Google Adsense  -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4190910180759514"
    crossorigin="anonymous"></script>
    <ins class="adsbygoogle"
    style="display:flex;width:728px;height:90px"
    data-ad-client="ca-pub-4190910180759514"
    data-ad-slot="6812025820"></ins>
    <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>
    
    <hr>

    <!-- Comment Section -->
    <div id='commentHead'>
      <span id='commentHeader'>/psb/ - Prisounebound</span>
    
      <!-- Form Submission || Set Comments to Database -->
      <div id='formSection'>
        
        <?php
          echo "<form method='POST' action='".setComments($conn)."'>
              <input type='textarea' name='uid' placeholder='Anonymous' value=''> <br>
              <input type='textarea' name='colorCode' placeholder='Color Hex Code (Optional)' value=''> <button type='submit' id='commentSubmit' name='commentSubmit'>Post</button>
              <input type='hidden' name='date' value='".date('Y-m-d(D)H:i:s')."'>
              <input type='hidden' name='uniqid'>
              <textarea id='formArea' name='message'></textarea>
              <div class=`cf-turnstile` data-sitekey=`0x4AAAAAACCUZuarE0Z0TbdX`>
              </div>
              </form>";
        ?>
  
      </div>
      <div class='commentCommandsHeader'>
      <hr>
      <span class='commentCommands'>[<a class='footerCommands' href="javascript: document.body.scrollIntoView(false);">Bottom</a>] [<button class='update' onclick="location.reload();">Update</button>]</span>
      <hr>
    </div>
    <button id='info'>Click for Information</button>
    </div>
    
    <!-- Comment Section || getComments  -->
    <div id='commentSection'>
      <?php
      getComments($conn);
      ?>
    </div>

    <div class='commentFooter'>
      <hr>
      <span class='commentCommands'>[<a class='footerCommands' href='#commentHead'>Top</a>] [<button class='update' onclick="location.reload();">Update</button>]</span>
      <span class='bottomReply'>[<a class='footerCommands' href='#formArea'>Post a Reply</a>]</span>
      <hr>
      <span class='commentCommands'>Style: <select id='styleSelect'>
        <option value='Neorxleas'>Neorxleas</option>
        <option value='Neorxleas B'>Neorxleas B</option>
        <option value='Classic'>Classic</option>
        <option value='CRuS'>CRuS</option>
      </select></span>
    </div>
    
  <script>
    
        const infoButton = document.getElementById('info')
        console.log(infoButton)
        infoButton.addEventListener('click', () => {
            window.alert(`Welcome to the alpha version of CSPA's comment system!\n\n\ 
            This comment system is made entirely from scratch and is still a work in progress, and will be improved upon overtime.\n\n\ 
            List of planned features:\n\n\ 
            -Working reply system\n\ 
            -Floating comment form\n\n\
            Rules of Commenting:\n\n\
            1. You will not upload, post, discuss, request, or link to anything that violates local or United States law.\n\
            2. You will not post or request personal information ("dox") or calls to invasion ("raids")\n\
            `)
        });
  </script>    
  </body>
</html>