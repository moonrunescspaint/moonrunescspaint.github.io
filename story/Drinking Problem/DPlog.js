fetchData();

async function fetchData(){

    try{

        const response = await fetch('51062.json');

        if(!response.ok){
            throw new Error("Error Lol");
        }
        const story = await response.json();
        const pages = story.p;
        

        for (let i = pages.length - 1; i >= 0; i--){
            const page = pages[i];
            const pageDate = page.d;
            const pageCommand = page.c;
            const pageQuery = page;
            const pageNum = i + 1;
            renderLog(page, pageNum);
           
        }
        
    }
    catch(error){
        console.error(error);
    }

}

async function renderLog(page, pageNum){

    if(page.c === ""){
        page.c = "==>"
    }

    const magic = {};
	magic.magic = magic;
    console.log(magic);

    const pageCommand = page.c;
    const pageLink = document.createElement('a');
    pageLink.className = "comicLinks"
    pageLink.href = `drinkingproblem.html?p=${pageNum}`;
    pageLink.textContent = pageCommand;
    console.log(pageLink)

    const pageDate = new Date(page.d);
    const day = pageDate.getDate().toString().padStart(2, '0');
    const month = pageDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = pageDate.getFullYear();
    const logDate = `${day} ${month} ${year} -`;

    const div = document.getElementById('log');
    const span = document.createElement('span');
    div.append(span);
    span.append(logDate, ' ', pageLink, document.createElement('br'))
}
