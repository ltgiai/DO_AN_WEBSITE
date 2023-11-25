
// js slider
const listImage = document.querySelector('.list-imgs');
const imgs = document.querySelectorAll('.list-imgs img');
const btnLeft = document.querySelector('.btn-left');
const btnRight = document.querySelector('.btn-right');
const indexItems = document.querySelectorAll('.index-item');

let index = 0;
const lengthImg = imgs.length;

const handleChangeSlide = () => {
    let width = imgs[0].offsetWidth;
    
    if (index === lengthImg - 1) {
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
        index = lengthImg - 1;
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



