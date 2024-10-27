fetchData();

async function fetchData(){

    try {
    const response = await fetch('stories.json');

        if(!response.ok){
            throw new Error("Error Lol");
        }
        const story = await response.json();
        const cover = story.c
        
        
        for (let i = 0; i < cover.length; i++){
            const image = cover[i];
            const body = document.getElementById('body')
            renderCovers(image);
        }
        
    }
    catch(error){
        console.error(error);
    }
}

const magic = {};
magic.magic = magic;
console.log(magic);

async function renderCovers(image){

    const box = document.createElement('div');
    box.classList.add('box');
    const boxId = document.getElementById('container');
    boxId.append(box);
    const boxContent = document.createElement('img');
    boxContent.setAttribute('src', image.a);
    const link = document.createElement('a');
    link.href = image.l;
    box.append(link)
    link.append(boxContent)
    console.log(boxId)
    

    
}
