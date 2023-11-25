/* Data gốc dùng trên LocalStorage (Data có sự thay đổi cần được cập nhật) */
let users = [
    {
        email: "admin@gmail.com",
        name: "admin",
        password: "Admin12345678",
        typeUser: "admin",
    },
];

let products = [
    {
        id: 1,
        name: "Hồng Trà Sữa",
        type: "Milktea",
        size: ["M","L"],
        img: "../img/hong-tra-sua.jpg",
        price: 30000,
        descript:"",
    },
    {
        id: 2,
        name: "Trà Sữa Lài",
        type: "Milktea",
        size: ["M","L"],
        img: "../img/tra-sua-lai.jpg",
        price: 35000,
        descript:"",
    },
    {
        id: 3,
        name: "Hồng Trà",
        type: "Tea",
        size: ["M","L"],
        img: "../img/hong-tra.jpg",
        price: 40000,
        descript:"",
    },
    {
        id: 4,
        name: "Trà Olong",
        type: "Tea",
        size: ["M","L"],
        img: "../img/tra-olong.jpg",
        price: 25000,
        descript:"",
    },
    {
        id: 5,
        name: "Trà Dâu Tằm",
        type: "Fruittea",
        size: ["L"],
        img: "../img/tra-dau-tam.jpg",
        price: 45000,
        descript:"",
    },
    {
        id: 6,
        name: "Trà Bưởi Mật Ong",
        type: "Fruittea",
        size: ["M","L"],
        img: "../img/tra-buoi-mat-ong.jpg",
        price: 35000,
        descript:"",
    },
    {
        id: 7,
        name: "Trà Đào Bưởi Hồng",
        type: "Fruittea",
        size: ["L"],
        img: "../img/tra-dao-buoi-hong.jpg",
        price: 35000,
        descript:"",
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
        key: "loginUser",
        value: {},
    },
    {
        key: "orders",
        value: [],
    },
]);