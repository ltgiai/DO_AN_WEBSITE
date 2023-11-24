
let users = [
    {
        email: "admin@gmail.com",
        name: "admin",
        password: "Admin12345678",
        typeUser: "admin",
    }
];

let products = [
    {
        id: 1,
        name: "Hồng Trà Sữa",
        type: "Milktea",
        size: ["M","L"],
        img: "/img/hong-tra-sua.jpg",
        price: 30000,
        descript:"",
    },
    {
        id: 2,
        name: "Trà Sữa Lài",
        type: "Milktea",
        size: ["M","L"],
        img: "/img/tra-sua-lai.jpg",
        price: 35000,
        descript:"",
    },
    {
        id: 3,
        name: "Hồng Trà",
        type: "Tea",
        size: ["M","L"],
        img: "/img/hong-tra.jpg",
        price: 40000,
        descript:"",
    },
    {
        id: 4,
        name: "Trà Olong",
        type: "Tea",
        size: ["M","L"],
        img: "/img/tra-olong.jpg",
        price: 25000,
        descript:"",
    },
    {
        id: 5,
        name: "Trà Dâu Tằm",
        type: "Fruittea",
        size: ["L"],
        img: "/img/tra-dau-tam.jpg",
        price: 45000,
        descript:"",
    },
    {
        id: 6,
        name: "Trà Bưởi Mật Ong",
        type: "Fruittea",
        size: ["M","L"],
        img: "/img/tra-buoi-mat-ong.jpg",
        price: 35000,
        descript:"",
    },
    {
        id: 7,
        name: "Trà Đào Bưởi Hồng",
        type: "Fruittea",
        size: ["L"],
        img: "/img/tra-dao-buoi-hong.jpg",
        price: 35000,
        descript:"",
    },
]

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
let signinUser = {
    email:"duonghuynh2209@gmail.com",
    name:"HaiDun",
    password:"Hd12345678",
    typeUser:"member",
};

function updateLocalStorage(listdata) {
    listdata.forEach(data => {
        localStorage.setItem(data.key,JSON.stringify(data.value));
    });
}

function initLocalStorage(listdata) {
    listdata.forEach(data => {
        if (localStorage.getItem(data.key) == undefined) {
            localStorage.setItem(data.key,JSON.stringify(data.value));
        }
    });
}

function getLocaldata(key) {
    return JSON.parse(localStorage.getItem(key));
}

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
        value: [],
    },
    {
        key: "signinUser",
        value: signinUser,
    },
    {
        key: "orders",
        value: [],
    },
]);

updateLocalStorage([
    {
        key: "signinUser",
        value: signinUser,
    },
])