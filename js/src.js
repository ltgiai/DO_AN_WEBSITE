/* Data gốc dùng trên LocalStorage (Data có sự thay đổi cần được cập nhật) */
let users = [
    {
        email: "admin@gmail.com",
        username: "admin",
        password: "Admin12345678",
        typeUser: "admin",
    },
    {
        email: "duong22@gmail.com",
        username: "HaiDun",
        password: "Hd12345678",
        typeUser: "user",
    },
    {
        email: "tuangiai55@gmail.com",
        username: "Tuan Giai",
        password: "Tg12345678",
        typeUser: "user",
    },
    {
        email: "doanhdai14@gmail.com",
        username: "Anh Dao",
        password: "Ad12345678",
        typeUser: "user",
    },
];

let products = [
    {
        id: 1,
        name: "Sữa tươi trân châu đường đen khổng lồ",
        type: "Milktea",
        size: ["L"],
        img: "../img/ts1.jpg",
        price: 40000,
        descript:"",
        display: true
    },
    {
        id: 2,
        name: "Kem Dâu Tây",
        type: "Cream",
        size: ["M","L"],
        img: "../img/ts2.jpg",
        price: 35000,
        descript:"",
        display: false
    },
    {
        id: 3,
        name: "Hibicus khổng lồ",
        type: "Tea",
        size: ["L"],
        img: "../img/ts3.jpg",
        price: 40000,
        descript:"Trà Atiso đỏ thơm ngon được upsize lên khổng lồ",
        display: true
    },
    {
        id: 4,
        name: "Trà sữa xanh lài khổng lồ",
        type: "Milkea",
        size: ["L"],
        img: "../img/ts4.jpg",
        price: 40000,
        descript:"",
        display: false
    },
    {
        id: 5,
        name: "Kem Socola",
        type: "Cream",
        size: ["M","L"],
        img: "../img/ts5.jpg",
        price: 25000,
        descript:"",
        display: true
    },
    {
        id: 6,
        name: "Kem Trân Châu Đường Đen",
        type: "Cream",
        size: ["M","L"],
        img: "../img/ts6.jpg",
        price: 25000,
        descript:"",
        display: true
    },
    {
        id: 7,
        name: "Trà Xoài Nhiệt Đới",
        type: "Fruittea",
        size: ["M","L"],
        img: "../img/ts7.jpg",
        price: 25000,
        descript:"",
        display: true
    },
    {
        id: 8,
        name: "Trà Olong Kem Phô Mai",
        type: "Tea",
        size: ["M","L"],
        img: "../img/ts7.jpg",
        price: 25000,
        descript:"",
        display: false
    },
]

let cart = [
    /* Mô tả dữ liệu cần lưu trong cart 
    {
        id: 0,
        product_id: 0,
        name: "",
        img: "",
        type: "",
        amount: 0,
        price: 0,
        size: "",
        sugar: "",
        topping : [""], 
    }
    */
]

let orders = [
    /* Mô tả dữ liệu cần lưu trong orders 
    {
        email: "",
        name: "",
        id: 0,
        phone: "",
        address: "",
        time: "",
        isDelivery: false (bool),
        isDelivery: false (bool),
        products: [] (cart),
        quantity: 0,
        total: 0,
    }
    */
]

let loginUser = {
    /* Mô tả dữ liệu cần lưu trong loginUser
    {
        email: "",
        name: "",
        password: "",
        typeUser: "User",
    }
    */
    
}
/* --------------------------------------------------------------------- */


/* Data cố định không cần để trên LocalStorage (Data không thay đổi) */
let toppings = [
    {
        name: "Trân Châu Đen",
        price: 5000,
    },
    {
        name: "Trân Châu Trắng",
        price: 5000,
    },
    {
        name: "Phô Mai Viên",
        price: 10000,
    },
    {
        name: "Pudding Trứng",
        price: 7000,
    },
    {
        name: "Kem Machiyato",
        price: 10000,
    },
    {
        name: "Kem Trứng",
        price: 10000,
    },
];

let sugars = ["100% đường","70% đường","50% đường","30% đường","Không đường"];
let ices = ["Đá bình thường","Ít đá","Không đá"];

/* --------------------------------------------------------------------- */


/* Các hàm thao tác trên LocalStorage */

//Cập nhật data trên Local với data.value mới theo data.key 
function updateLocalStorage(listdata) {
    listdata.forEach(data => {
        localStorage.setItem(data.key,JSON.stringify(data.value));
    });
}

//Dùng cho những thiết bị mới hoặc chưa có data (undefined) được tạo trên Local (chưa có chứ không phải là rỗng)
//nếu data.key chưa tồn tại hoặc chưa có data.value trên Local, thì tạo data.key và tải các data.value bản gốc (từ src.js) 
//nếu data.key đã tồn tại và data.value đã qua cập nhật, thì data trên Local vẫn được giữ nguyên
function initLocalStorage(listdata) {
    listdata.forEach(data => {
        if (localStorage.getItem(data.key) == undefined) {
            localStorage.setItem(data.key,JSON.stringify(data.value));
        }
    });
}

//Lấy data.value từ Local theo data.key
function getLocaldata(key) {
    return JSON.parse(localStorage.getItem(key));
}

/* --------------------------------------------------------------------- */
//Khởi tạo localstorage mặc định 
initLocalStorage([
    {
        key: "users",
        value: users,
    },
    {
        key: "products",
        value: products,
    },
    {
        key: "cart",
        value: cart,
    },
    {
        key: "orders",
        value: [],
    },
]);

//Định dạng tiền
function priceFormat(price){
    let priceStr = price.toLocaleString() + "đ";
    return priceStr;
}
