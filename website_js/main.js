
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





// --------phân trang sản phẩm---------
let thisPage = 1;
let limitPage = 12;
function loadItem(type) {
    attr = type ? type : "all";
    let list = document.querySelectorAll('.products .row.'+attr);
    let beginGet = limitPage * (thisPage - 1);
    let endGet = limitPage * thisPage - 1;
    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.classList.remove('hide');
            item.classList.add("active");
        } else {
            item.classList.remove('active');
            item.classList.add("hide");
        }
    });
    listPage(type);
}

function listPage(type) {
    attr = type ? type : "all";
    let list = document.querySelectorAll('.products .row.'+ attr).length;
    let count = Math.ceil(list / limitPage);
    if(list > limitPage) {
        document.querySelector('.listPage').classList.remove('hide');
        document.querySelector('.listPage').innerHTML = '';

        // if (thisPage !== 1) {
        //     let prev = document.createElement('li');
        //     prev.innerText = '<';
        //     prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ", '" + attr + "')");
        //     document.querySelector('.listPage').appendChild(prev);
        // }

        for (let i = 1; i <= count; i++) {
            let newPage = document.createElement('li');
            newPage.innerText = i;
            if (i === thisPage) {
                newPage.classList.add('active2');
            }
            newPage.setAttribute('onclick', "changePage(" + i + ", '" + attr + "')");
            document.querySelector('.listPage').appendChild(newPage);
        }

        // if (thisPage !== count) {
        //     let next = document.createElement('li');
        //     next.innerText = '>';
        //     next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ", '" + attr + "')");
        //     document.querySelector('.listPage').appendChild(next);
        // }
    }else{
        document.querySelector('.listPage').classList.add('hide');
    }
}

function changePage(i,type) {
    thisPage = i;
    loadItem(type);
}


// ------phân loại sản phâm theo type------

const categoryTitle = document.querySelectorAll('.btn-filter');
const allCategoryPosts = document.querySelectorAll('.all');

function filterPosts(item) {
    changeActivePosition(item);
    for (let i = 0; i < allCategoryPosts.length; i++) {
        if (allCategoryPosts[i].classList.contains(item.attributes.type.value)) {
            allCategoryPosts[i].classList.remove("hide");
            allCategoryPosts[i].classList.add("active");
        
        } else {
            allCategoryPosts[i].classList.remove("active");
            allCategoryPosts[i].classList.add("hide");``
          
        }
    }
    //Nếu không có sẽ bị lặp lại trang sau
    type = document.querySelector('.nav-menu .btn-filter.active-3').attributes.type.value;
    attr = type ? type : "all";
    //Đệ quy
    changePage(1, type)
}

function changeActivePosition(activeItem) {
    for (let i = 0; i < categoryTitle.length; i++) {
        categoryTitle[i].classList.remove('active-3');
    }
    activeItem.classList.add('active-3');
}

for (let i = 0; i < categoryTitle.length; i++) {
    categoryTitle[i].addEventListener('click', filterPosts.bind(this, categoryTitle[i]));
}

loadItem();
