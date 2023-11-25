const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let products = [
    {
        ID: 10,
        img: '/imge/ts1.jpg',
        name: 'TRA SỮA TRÂN CHÂU',
        type: "trasua",
        price: '25.000',

    },
    {
        ID: 20,
        img: '/imge/ts2.jpg',
        name: 'KEM TƯƠI',
        type: 'kemsua',
        price: '30.000',


    },
    {
        ID : 30,
        img: '/imge/ts3.jpg',
        name: 'KEM TƯƠI',
        type: 'tratraicay',
        price: '35.000',

    },
    {
        ID: 40,
        img: '/imge/ts4.jpg',
        name: 'TRA ĐÀO',
        type: 'tratuoi',
        price: '35.000',

    },
    {
        ID: 50,
        img: '/imge/ts5.jpg',
        name: 'tra sua tran chau',
        type: 'trasua',
        price: '35.000',

    },
    {
        ID: 60,
        img: '/imge/ts6.jpg',
        name: 'tra sua tran chau',
        type: 'trasua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'kem dâu tây',
        type: 'kemsua',
        price: '35.000',

    }, 
    {
        ID: 80,
        img: '/imge/ts8.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 90,
        img: '/imge/ts9.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 100,
        img: '/imge/ts10.png',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 101,
        img: '/imge/ts11.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 102,
        img: '/imge/ts12.png',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 103,
        img: '/imge/ts12.png',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 104,
        img: '/imge/ts1.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 105,
        img: '/imge/ts2.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
];

// -------lấy sản phẩm vào trang chủ------

let lists =document.querySelector('.products')
function addProduct(products) {
    products.forEach((value) =>{
        let newDiv =document.createElement('div')
        newDiv.classList.add('row', 'all' , value.type);
        newDiv.setAttribute('data-id', value.ID);
        newDiv.innerHTML=`
        <img src="${value.img}" alt=" ">
            <div class="product-text">
                <h5>sale</h5>
            </div>
            <div class="product-card-content">
                <div class="name-product">${value.name}</div>
                <div class="price">${value.price}Đ</div>
                <button  class="buy-btn">Mua ngay</button>
            </div>`;
            lists.appendChild(newDiv);
        return newDiv;
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('buy-btn')) {
            if(requireLogin()){
                window.location.href = "/website_html/order.html";
            }
        }
    });
    document.querySelector('.order-cart-icon').addEventListener('click', function (event) {
        event.preventDefault();

        if (requireLogin()) {
            window.location.href = "/website_html/order.html";
        }
    });
    
    
}
addProduct(products);


// --------phân trang sản phẩm---------

let thisPage = 1;
let limitPage = 12;
function loadItem(type) {
    attr = type ? type : "all";
    let list = document.querySelectorAll('.products .row.' + attr);
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
            allCategoryPosts[i].classList.add("hide");
          
        }
    }
    type = document.querySelector('.nav-menu .btn-filter.active-3').attributes.type.value;
    attr = type ? type : "all";
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



// -----------TIM KIEM THEO TEN----------
let search = document.querySelector(".search"); 
let clearText = document.querySelector(".clearText");
let ctn = document.querySelector(".container");

let isWhite = false;
//mở thanh search
search.onclick = function () {
    ctn.classList.add('active-4');
    if (!isWhite) {
        ctn.style.background = "white";
        isWhite = true;
    }
};
clearText.onclick = function () {
    ctn.classList.remove('active-4');
    if (isWhite) {
        ctn.style.background = "";
        isWhite = false;
      }
}
//timg kiếm theo tên
const notFoundProduct = document.getElementById("notFoundProduct");
const nameProduct = document.querySelectorAll(".name-product");
const value_search =document.getElementById("value_search");
const cards = document.querySelectorAll(".row");
//hàm tìm kiếm
function performSearch() {
    let searchValue = value_search.value.toLowerCase();
    let found = false;

    nameProduct.forEach((element, index) => {
    if (element.innerText.toLowerCase().includes(searchValue)) {
      cards[index].classList.remove("hide");
      found = true;
    } else {
      cards[index].classList.add("hide");
    }
  });
//hàm in ra câus nếu ko tìm thấy sản phẩm nào
    if (!found) {
        notFoundProduct.style.display = "block";
    } else {
        notFoundProduct.style.display = "none";
    }
}
//CLICK để search
search.addEventListener("click", function () {
    performSearch();
    value_search.value = "";   
});

//enter để search
value_search.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
       
        performSearch();
        value_search.value = "";
    }
});




// -------ẩn hiện filter-------
document.addEventListener("DOMContentLoaded", function() {
    const filterButton = document.getElementById("filterButton");
    const filter = document.querySelector(".filter");
  
    filterButton.addEventListener("click", function () {
      if (filter.style.display == "none" || filter.style.display === "") {
          filter.style.display = "block";
      } else {
          filter.style.display = "none";
      }
    });
  });
  


// ---------lọc nâng cao-----------
let filterForm = document.getElementById('filterForm');

filterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let valueFilter = e.target.elements;

    products.forEach(function (item) {
        let productElement = document.querySelector(`.products .row[data-id="${item.ID}"]`);
        if (productElement) {
            let shouldShow = true;

            if (valueFilter.name.value !== '' && !item.name.toLowerCase().includes(valueFilter.name.value)) 
                shouldShow = false;
            if (valueFilter.type.value !== 'all' && item.type !== valueFilter.type.value) 
                shouldShow = false;
            if (valueFilter.minPrice.value !== '' && item.price < parseFloat(valueFilter.minPrice.value)) 
                shouldShow = false;
            if (valueFilter.maxPrice.value !== '' && item.price > parseFloat(valueFilter.maxPrice.value)) 
                shouldShow = false;
            
            if (shouldShow) {
                productElement.classList.remove('hide');
            } else {
                productElement.classList.add('hide');
            }
        }
    });
    valueFilter.name.value = '';
    valueFilter.type.value = 'all';
    valueFilter.minPrice.value = '';
    valueFilter.maxPrice.value = '';
});











