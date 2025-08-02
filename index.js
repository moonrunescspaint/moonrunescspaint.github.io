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

async function fetchData(){

    try {
    const response = await fetch('index.json');

        if(!response.ok){
            throw new Error("Error Lol");
        }
        const story = await response.json();
        const cover = story.c
        const news = story.n
        
        
        for (let i = 0; i < cover.length; i++){
            const contents = cover[i];
            renderCovers(contents);
        }

        for (let j = 0; j < news.length; j++){
            const newsContents = news[j];
            if (j === news.length - 1) {
                const newsDiv = document.createElement('div');
                newsDiv.classList = 'newsDiv';

                const newsBox = document.getElementById('newsBox');
                newsBox.append(newsDiv);

                const newsTitle = document.createElement('span');
                newsTitle.className = 'newsTitle';
                newsTitle.textContent = newsContents.t;
                newsDiv.append(newsTitle);
                
                const newsText = document.createElement('p');
                newsText.className = 'newsText';
                newsText.append(parseBBCode(newsContents.c));
                newsDiv.append(newsText)

                newsImg = document.createElement('img')
                newsImg.className = 'newsImg'
                newsImg.src = newsContents.i;
                newsDiv.append(newsImg)
                
                const more = document.createElement('a');
                more.className = 'more'
                more.href = "/news.html";
                more.textContent = "Read more..."
                newsDiv.append(more)
                
            } else {
                
            }
        }
        
    }
    catch(error){
        console.error(error);
    }
}

const magic = {};
magic.magic = magic;
console.log(magic);

async function renderCovers(contents){

    const box = document.createElement('div');
    box.classList.add('box');
    const boxId = document.getElementById('storiesBox');
    boxId.append(box);
    const boxContent = document.createElement('img');
    boxContent.className = 'coverImage'
    boxContent.setAttribute('src', contents.a);
    const link = document.createElement('a');
    link.href = contents.l;
    box.append(link);
    link.append(boxContent);
}