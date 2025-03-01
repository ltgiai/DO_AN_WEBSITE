//Đài
//---mở menu---
let navtabs = document.querySelector(".nav-toggle");
navtabs.addEventListener('click', function() {
    let navMenu = document.querySelector(".nav-menu");

    // Kiểm tra giá trị tính toán của thuộc tính display
    let computedStyle = window.getComputedStyle(navMenu);
    let displayValue = computedStyle.getPropertyValue('display');

    if (displayValue === 'none') {
        navMenu.style.display = 'block';
    } else {
        navMenu.style.display = 'none';
    }
});

let lists = document.querySelector('.products');
let currentPage = 1;
let activePage = 1;
const maxProductOnPage = 12;
let currentType = 'all';
let arrProducts = [];
let totalPagesByType = 0;

function addProductToPage(products) {
    arrProducts = products;
    renderProductsOnPage(currentPage);
    renderPagination();
    filterProductsByType(currentType);
    document.addEventListener('click', function(event){
        if(event.target.classList.contains('buy-btn')){
            if(requireLogin()){
                let product_id = event.target.getAttribute("product-id");
                updateLocalStorage([{
                    key: "product-choose-id",
                    value: product_id,
                }]);
                window.location.href= "../html/order.html";
                
            }
        }
    })
    document.querySelector('.order-cart-icon').addEventListener('click', function(event){
        event.preventDefault();
        if(requireLogin()){
            window.location.href= "../html/order.html";
        }
    })
}

addProductToPage(getLocaldata("products"));

function renderProductsOnPage(page) {
    const startPage = (page - 1) * maxProductOnPage;
    const endPage = startPage + maxProductOnPage;
    const productsOnPage = arrProducts.slice(startPage, endPage);
    lists.innerHTML = '';

    productsOnPage.forEach((value) => {
        if(!value.display){}
        else{
            let newProduct = document.createElement('div');
            newProduct.classList.add('row', 'all');
            newProduct.setAttribute('data-id', value.id);
            newProduct.setAttribute('type', value.type);
            newProduct.innerHTML = `
                <img src="${value.img}" alt=" ">
                <div class="product-text">
                    <h5>NEW</h5>
                </div>
                <div class="product-card-content">
                    <div class="name-product">${value.name}</div>
                    <div class="price">${priceFormat(value.price)}</div>
                    <button class="buy-btn" product-id=${value.id}>Mua ngay</button>
                </div>`;
            lists.appendChild(newProduct);
        }
    });
}

function renderPagination() {
    totalPagesByType = Math.ceil(arrProducts.length / maxProductOnPage);

    const pagination = document.querySelector('.listPage');
    pagination.innerHTML = '';

    if (totalPagesByType > 1) {
        for (let i = 1; i <= totalPagesByType; i++) {
            let pageButton = document.createElement('li');
            pageButton.innerText = i;

            // Thêm class active2 nếu là trang hiện tại
            if (i === currentPage) {
                pageButton.classList.add('active2');
            }

            pageButton.addEventListener('click', function () {
                currentPage = i;
                renderProductsOnPage(currentPage);
                renderPagination(); //dòng này để cập nhật active2 khi click
                scrollToProducts()
            });
            pagination.appendChild(pageButton);
        }
    }
}

// -------lọc sản phẩm theo loại-------
function getProductType(type) {
    return type.toLowerCase();
}
function filterProductsByType(type) {
    currentType = type;
    arrProducts = getLocaldata('products').filter((product) => {
        return type === 'all' || getProductType(product.type) === getProductType(type);
    });
    currentPage = 1;
    // console.log( arrProducts); 
    renderProductsOnPage(currentPage);
    renderPagination();
}

const filterButtons = document.querySelectorAll('.btn-filter');
filterButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
        const type = button.getAttribute('type');
        
        changeActivePosition(event.currentTarget);
        filterProductsByType(type);
        scrollToProducts();
    });
});


function changeActivePosition(activeItem) {
    filterButtons.forEach((button) => {
        button.classList.remove('active-3');
    });
    activeItem.classList.add('active-3');
}


// if (localStorage.getItem('products') == null) {
//     localStorage.setItem('products',JSON.stringify(products));
// }
let buy_btns = document.querySelectorAll(".buy-btn");
buy_btns.forEach(btn => {
    btn.onclick = function () {
        let product_id = parseInt(btn.getAttribute('product_id'));
        console.log(product_id);
        updateLocalStorage([{
            key: "product-choose-id",
            value: product_id,
        }]);
        
    }
});



// -----------TIM KIEM THEO TEN----------
let search = document.querySelector(".search");
let clearText = document.querySelector(".clearText");
let ctn = document.querySelector(".container");

let isWhite = false;

// mở thanh search
search.onclick = function () {
    if (ctn) {
        ctn.classList.add('active-4');
        if (!isWhite) {
            ctn.style.background = "white";
            isWhite = true;
        }
    }
};

clearText.onclick = function () {
    if (ctn) {
        ctn.classList.remove('active-4');
        if (isWhite) {
            ctn.style.background = "";
            isWhite = false;
        }
    }
}

function removeValue(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

//-----tim kiếm theo tên----
const notFoundProduct = document.getElementById("notFoundProduct");
const nameProduct = document.querySelectorAll(".name-product");
const value_search =document.getElementById("value_search");

function performSearch() {
    let searchValue = removeValue(value_search.value.toLowerCase());
    let found = false;
    let productSearch = [];

    lists.innerHTML = '';
    getLocaldata('products').forEach((product) => {
        if (removeValue(product.name.toLowerCase()).includes(searchValue)) {
            productSearch.push(product);
            found = true;

        }
    });
    console.log(productSearch)
    arrProducts = productSearch;
    currentPage = 1;
   
    renderProductsOnPage(currentPage);
    renderPagination();
    notFoundProduct.style.display = found ? "none" : "block";
    value_search.value = "";
}

search.addEventListener("click", function() {
    performSearch();
    scrollToProducts();
});

// ko phải nút submit nên phải viết hàm submit
// value_search.addEventListener("keyup", (event) => event.key === "Enter" && performSearch());
value_search.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        performSearch();
        scrollToProducts()
    }
});
function scrollToProducts() {
    const products = document.getElementById('product');
    if (products) {
        const offsetTop = products.offsetTop - 300;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
}


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
  
  let filterForm = document.getElementById('filterForm');
  filterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valueFilter = e.target.elements;
  
      let productFilter = getLocaldata('products').filter(item => (
          (valueFilter.name.value == '' || removeValue(item.name.toLowerCase()).includes(removeValue(valueFilter.name.value))) &&
          (valueFilter.type.value == 'all' || item.type == valueFilter.type.value) &&
          (valueFilter.minPrice.value == '' || item.price >= parseFloat(valueFilter.minPrice.value)) &&
          (valueFilter.maxPrice.value == '' || item.price <= parseFloat(valueFilter.maxPrice.value))
      ));
  
      // tạo mảng sản phẩm mới để render
      let found = productFilter.length > 0;
  
      notFoundProduct.style.display = found ? "none" : "block";
  
      // render và phân trang lại
      currentPage = 1;
         arrProducts =productFilter 
      renderProductsOnPage(currentPage);
      renderPagination();
  
      // Reset form values
      valueFilter.name.value = '';
      valueFilter.type.value = 'all';
      valueFilter.minPrice.value = '';
      valueFilter.maxPrice.value = '';
});
