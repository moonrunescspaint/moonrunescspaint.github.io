fetchData();

const BBC = [
    [/  /g, '&nbsp;&nbsp;'],
    [/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;'],
    [/\r?\n/g, '<br>'],
    [/\[b\]((?:(?!\[b\]).)*?)\[\/b\]/gi, '<span style="font-weight: bolder;">$1</span>'],
    [/\[i\]((?:(?!\[i\]).)*?)\[\/i\]/gi, '<span style="font-style: italic;">$1</span>'],
    [/\[u\]((?:(?!\[u\]).)*?)\[\/u\]/gi, '<span style="text-decoration: underline;">$1</span>'],
    [/\[s\]((?:(?!\[s\]).)*?)\[\/s\]/gi, '<span style="text-decoration: line-through;">$1</span>'],
    [/\[size=(\d*?)\]((?:(?!\[size=(?:\d*?)\]).)*?)\[\/size\]/gi, '<span style="font-size: $1px;">$2</span>'],
    [/\[color=("?)#?([a-f0-9]{3}(?:[a-f0-9]{3})?)\1\]((?:(?!\[color(?:=[^;]*?)\]).)*?)\[\/color\]/gi, '<span style="color: #$2;">$3</span>'],
    [/\[color=("?)([^";]+?)\1\]((?:(?!\[color(?:=[^;]*?)\]).)*?)\[\/color\]/gi, '<span style="color: $2;">$3</span>'],
    [/\[background=("?)#?([a-f0-9]{3}(?:[a-f0-9]{3})?)\1\]((?:(?!\[background(?:=[^;]*?)\]).)*?)\[\/background\]/gi, '<span style="background-color: #$2;">$3</span>'],
    [/\[background=("?)([^";]+?)\1\]((?:(?!\[background(?:=[^;]*?)\]).)*?)\[\/background\]/gi, '<span style="background-color: $2;">$3</span>'],
    [/\[font=("?)([^";]*?)\1\]((?:(?!\[size(?:=[^;]*?)\]).)*?)\[\/font\]/gi, '<span style="font-family: $2;">$3</span>'],
    [/\[(center|left|right|justify)\]((?:(?!\[\1\]).)*?)\[\/\1\]/gi, '<div style="text-align: $1;">$2</div>'],
    [/\[url\]([^"]*?)\[\/url\]/gi, '<a href="$1">$1</a>'],
    [/\[url=("?)([^"]*?)\1\]((?:(?!\[url(?:=.*?)\]).)*?)\[\/url\]/gi, '<a href="$2">$3</a>'],
    [/\[alt=("?)([^"]*?)\1\]((?:(?!\[alt(?:=.*?)\]).)*?)\[\/alt\]/gi, '<span title="$2">$3</span>'],
    [/\[img\]([^"]*?)\[\/img\]/gi, '<img src="$1">'],
    [/\[img=(\d*?)x(\d*?)\]([^"]*?)\[\/img\]/gi, '<img src="$3" width="$1" height="$2">'],
    [/\[spoiler\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, '<div class="spoiler closed"><div style="text-align: center;"><input type="button" value="Show" data-close="Hide" data-open="Show"></div><div>$1</div></div>'],
    [/\[spoiler open=("?)([^"]*?)\1 close=("?)([^"]*?)\3\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, '<div class="spoiler closed"><div style="text-align: center;"><input type="button" value="$2" data-open="$2" data-close="$4"></div><div>$5</div></div>'],
    [/\[spoiler close=("?)([^"]*?)\1 open=("?)([^"]*?)\3\]((?:(?!\[spoiler(?: .*?)?\]).)*?)\[\/spoiler\]/gi, '<div class="spoiler closed"><div style="text-align: center;"><input type="button" value="$4" data-open="$4" data-close="$2"></div><div>$5</div></div>'],
    [/\[flash=(\d*?)x(\d*?)\](.*?)\[\/flash\]/gi, '<object type="application/x-shockwave-flash" data="$3" width="$1" height="$2"></object>'],
    [/\[user\](.+?)\[\/user\]/gi, '<a class="usertag" href="/user/?u=$1" data-userid="$1">@...</a>']
];

function toggleSpoiler() {
    if (this.parentNode.parentNode.classList.contains("closed")) {
        this.value = this.getAttribute("data-close");
        this.parentNode.parentNode.classList.remove("closed");
        this.parentNode.parentNode.classList.add("open");
    } else if (this.parentNode.parentNode.classList.contains("open")) {
        this.value = this.getAttribute("data-open");
        this.parentNode.parentNode.classList.remove("open");
        this.parentNode.parentNode.classList.add("closed");
    }
}

function parseBBCode(code) {
    code = code.split(/\<(textarea|style)(?:(?: |\n)(?:.|\n)*?)?\>(?:.|\n)*?\<\/\2\>/gi);
    for (let i = 2; i < code.length; i += 2) {
        code.splice(i, 1);
    }
    for (let i = 0; i < code.length; i += 2) {
        let prevCode;
        while (prevCode != code[i]) {
            prevCode = code[i];
            for (let j = 0; j < BBC.length; j++) {
                code[i] = code[i].replace(BBC[j][0], BBC[j][1]);
            }
        }
    }
    code = code.join("");
    const e = document.createElement("span");
    e.innerHTML = code;
    const es = e.querySelectorAll("*");
    for (let i = es.length - 1; i >= 0; i--) {
        if (es[i].tagName == "SCRIPT" || (es[i].tagName === "IFRAME" && es[i].getAttribute('srcdoc'))) {
            es[i].parentNode.removeChild(es[i]);
        } else if (es[i].tagName == "PARAM") {
            if (es[i].name.trim() == "allowScriptAccess") {
                es[i].parentNode.removeChild(es[i]);
            }
        } else {
            // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
               for (let j = 0; j < es[i].attributes.length; j++) {
                if (es[i].attributes[j].name.toLowerCase().indexOf("on") == 0 || (typeof es[i][es[i].attributes[j].name.toLowerCase()] == "string" && /^(?:javascript|data):/.test(es[i][es[i].attributes[j].name.toLowerCase()])) || /^(?:javascript|data):/.test(es[i].attributes[j].value) || es[i].attributes[j].name.toLowerCase() == "allowscriptaccess") {
                    es[i].removeAttribute(es[i].attributes[j].name);
                }
            }
        }
    }
    try {
        let sins = e.querySelectorAll(".spoiler > div:first-child > input");
        for (var i = 0; i < sins.length; i++) {
            sins[i].addEventListener("click", toggleSpoiler);
        }
        let sdivs = e.querySelectorAll(".spoiler > div:last-child");
        for (let i = 0; i < sdivs.length; i++) {
            let rembrc = true;
            while (rembrc) {
                rembrc = false;
                let rembr = sdivs[i];
                while (rembr = rembr.firstChild) {
                    if (rembr.tagName == "BR") {
                        rembr.parentNode.removeChild(rembr);
                        rembrc = true;
                        break;
                    }
                }
                rembr = sdivs[i];
                while (rembr = rembr.lastChild) {
                    if (rembr.tagName == "BR") {
                        rembr.parentNode.removeChild(rembr);
                        rembrc = true;
                        break;
                    }
                }
             }
        }
    } catch (err) { }
    return e;
}




async function fetchData() {

    try {

        const response = await fetch("https://mspfa.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ do: "story", s: 54371 }),
        });

        if (!response.ok) {
            throw new Error("Error Lol");
        }
        const searchParams = new URLSearchParams(window.location.search);
        const pageNum = searchParams.get('p');
        const story = await response.json();
        const pages = story.p
        renderPage(pages);

    }
    catch (error) {
        console.error(error);
    }

}

async function renderPage(pages, commentBoxes, commands) {

    console.log(`This website was made possible by the helping hand of Grant Gryczan, SeymourSchlong, and other helpful contributors!\n\nThank you to the inspiration of MSPFA to make all of this become reality.\n\nAnd thank you, dear readers, for getting us to where we are now!`)

    const fishMagic = {};
    fishMagic.fishMagic = fishMagic;
    console.log(fishMagic);

    const searchParams = new URLSearchParams(window.location.search);
    const pageNum = Number(searchParams.get('p'));
    const page = pages[pageNum - 1];
    const nextPage = pages[pageNum];

    if (page === 1) {
        nextPage.c = "==>"
    }

    if (nextPage?.c === "") {
        nextPage.c = "==>"
    } else if (nextPage?.c ==="Junice: Dream of angels.") {
        nextPage.c = ""
    }

    if (pageNum == 261428) {
        console.log('https://file.garden/ZXENUjtcLzaPWMyp/junicedream.png')
        console.log("\n\nI hang suspended in the middle of paradox space.\n\nIm cold to the touch and my mind races with the screams of thousands who died due to my inability to save.\n\nJust as the dream demon warned me — The moons were doomed from the very start, and the breath of life has been stripped from its very core.\n\nI must guide the session anew and ensure their safety.\n\nThe Angels who keep the incipisphere turning look after me as I complete my mission... They prevent stagnation within this space that would bring about a rot to our new world.\n\nI bathe in the glorious light of Sheol, he will watch over us all and bring about judgement to those who wrong us.\n\nAlthough harm may come our way by hands of the unrighteous, he will smite them in his divinity and compensate us gloriously.\n\nOur suffering will not be in vain.\n\nI trust in you Sheol, though I fear for my life with you near.")
    }

    if (page.c === "") {
        page.c = "==>"
    }

    let pageBody = page.b
    const commandSpan = document.createElement('span');
    const commandId = document.getElementById("command");
    commandId.appendChild(commandSpan);
    commandSpan.textContent = page.c;

    /* Replacements */
    if (!pageBody.includes("ʚʘ͜͡))❨")) {
        console.log("No ʚʘ͜͡))❨, Sorry Junicefan");
    } else {
        console.log("ʚʘ͜͡))❨ FISH");
        pageBody = page.b.replaceAll("ʚʘ͜͡))❨", `<span class="fish">ʚʘ͜͡))❨</span>`)
    }


    const content = document.createElement('span');
    const contentId = document.getElementById("content");
    contentId.appendChild(content);
    content.append(parseBBCode(pageBody));

    if(nextPage !== undefined) {
        const div = document.querySelector('.links');
        div.className = "links";
        div.append('> ');
        const link = document.createElement('a')
        link.href = `prisounebound.html?p=${pageNum + 1}`
        link.textContent = nextPage.c;
        div.append(link);
    }
    
    const footLinks = document.querySelector('.footlinks');
    footLinks.className = "footlinks";
    const logLink = document.createElement('a')
    logLink.href = `PBLog.html`
    logLink.textContent = `Story Log`;
    const goBack = document.createElement('a');
    goBack.href = `prisounebound.html?p=${pageNum - 1}`;
    goBack.textContent = 'Go back';
    footLinks.append(logLink);
    if (pageNum === 1) {
        goBack.textContent = "";
        footLinks.append('');
    } else {
        footLinks.append(' | ');
    }
    footLinks.append(goBack);

    const fishSpans = document.querySelectorAll("span.fish");
    const fishSound = new Audio('https://file.garden/ZXENUjtcLzaPWMyp/Music/Fish%20Sound%20Effect.mp3')

    for (let i = 0; i < fishSpans.length; i++) {
        fishSpans[i].addEventListener('mouseover', function() {
            fishSound.play();
        })
    }
    comments(commentBoxes)

}

function comments(commentBoxes) {
    
    const comments = document.querySelectorAll('.commentBox')
    const postNums = [...document.querySelectorAll('span.postNum')].map(span => span.textContent);
    

    for (let i = 0; i < comments.length; i++) {
        const commentBox = comments[i];
        const commentContent = commentBox.querySelector('blockquote.postMessage');
        const lines = commentContent.innerText.split("\n");
        commentContent.textContent = ''

        for (let j = 0; j < lines.length; j++) {

            const line = lines[j];
            const replyId = line.slice(2).trim()

            if (j != 0) {
                commentContent.append(document.createElement('br'))
            }

            if (line.startsWith('>>') && postNums.includes(replyId)) {
                const replyLink = document.createElement('a');
                replyLink.className = 'quoteReply';
                replyLink.href = `#p${replyId}`;
                replyLink.append(line);
                commentContent.append(replyLink);

            } else if (line.startsWith('>')) {
                const quoteText = document.createElement('span')
                quoteText.className = 'greentext'
                quoteText.textContent = line
                quoteText.style.color = '#789922'
                commentContent.append(quoteText)
            } else {
                commentContent.append(line)
            }

            const form = document.querySelector('textarea')
            
        }

    }
}