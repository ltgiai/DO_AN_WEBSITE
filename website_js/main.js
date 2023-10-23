
// js slider
const listImage = document.querySelector('.list-imgs');
const imgs = document.querySelectorAll('.list-imgs img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const indexItems = document.querySelectorAll('.index-item');

let index = 0;
const length = imgs.length;

const handleChangeSlide = () => {
    let width = imgs[0].offsetWidth;
    
    if (index === length - 1) {
        index = 0;
    } else {
        index++;
    }
    
    listImage.style.transform = `translateX(${width * -index}px)`;
    updateActiveIndex();
};

const handlePreviousSlide = () => {
    let width = imgs[0].offsetWidth;
    if (index === 0) {
        index = length - 1;
    } else {
        index--;
    }
    
    listImage.style.transform = `translateX(${width * -index}px)`;
    updateActiveIndex();
};

const updateActiveIndex = () => {
    for (let i = 0; i < indexItems.length; i++) {
        indexItems[i].classList.remove('active-1');
    }
    indexItems[index].classList.add('active-1');
};

let timer = setInterval(handleChangeSlide, 5000);

btnRight.addEventListener('click', () => {
    clearInterval(timer);
    handleChangeSlide();
    timer = setInterval(handleChangeSlide, 5000);
});

btnLeft.addEventListener('click', () => {
    clearInterval(timer);
    handlePreviousSlide();
    timer = setInterval(handleChangeSlide, 5000);
});


// ---------phân trang home---------
let thisPage = 1;
let limit = 12;
let list = document.querySelectorAll('.products .row');

function loadItem(){
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;
    list.forEach((item, key)=>{
        if(key >= beginGet && key <= endGet){
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
    listPage();
}
loadItem();


function listPage(){
    let count = Math.ceil(list.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if(thisPage != 1){
        let prev = document.createElement('li');
        prev.innerText = '<';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }

    for(i = 1; i <= count; i++){
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage){
            newPage.classList.add('active2');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }

    if(thisPage != count){
        let next = document.createElement('li');
        next.innerText = '>';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}
function changePage(i){
    thisPage = i;
    loadItem();
}

// ------hết phân trang------
