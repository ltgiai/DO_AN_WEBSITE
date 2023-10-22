const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let products = [
    {
        ID: 10,
        img: '/imge/ts1.jpg',
        name: 'TRÀ SỮA TRÂN CHÂU',
        type: 'trasua',
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
        name: 'TRÀ ĐÀO',
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
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    }, 
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
    {
        ID: 70,
        img: '/imge/ts7.jpg',
        name: 'tra sua tran chau',
        type: 'kemsua',
        price: '35.000',

    },
];

// lấy sản phẩm vào trang chủ

let lists =document.querySelector('.products')

let listCarts = [];

function addCart() {
    products.forEach((value, key) =>{
        let newDiv =document.createElement('div')
        newDiv.classList.add('row');
        newDiv.innerHTML=`
        <img src="${value.img}" alt=" ">
            <div class="product-text">
                <h5>sale</h5>
            </div>
            <div class="product-card-content">
                <div class="name-product"> ${value.name} </div>
                <div class="price"> ${value.price}Đ </div>
                <div class="buy-btn-container">mua ngay</div>
            </div>`;
        lists.appendChild(newDiv);
    })
}
addCart();

