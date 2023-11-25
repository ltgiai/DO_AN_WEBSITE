//Thao tác đóng mở các trang (section)
let sections = document.querySelectorAll('section');
function openSection(section) {
    section.style.display = 'block';
    sections.forEach(sec => {
        if (sec !== section) {
            sec.style.display = 'none';
        }
    });
}
openSection(document.getElementById("order-page"));

//Chức năng: Lọc product + Vẽ lại product trên page
let categories = document.querySelectorAll(".category");

//Ẩn hiện list-product
function useCategory(category) {
    let btn_name = category.querySelector(".category-name");
    btn_name.onclick = function () {
        category.classList.toggle("hidden");
    }
}

//Định dạng tiền
function priceFormat(price){
    let priceStr = price.toLocaleString() + "đ";
    return priceStr;
}

//Từ định dạng chuyển về kiểu Int
function toPrice(priceFormat){
    if (priceFormat == "") {
        return 0;
    }
    let price = parseInt(priceFormat.slice(2,priceFormat.length - 1).replace(/,/g, ""));
    return price;
}

//Lọc product 
function checkType(item) {
    let typeProduct = item.type;
    if (typeProduct === "Milktea") {
        return 0;
    } else if (typeProduct === "Tea"){
        return 1;
    } else if (typeProduct === "Fruittea") {
        return 2;
    }
}

//Vẽ lại list-product
function render(products) {
    var productMilktea_HTML = ``;
    var productTea_HTML = ``;
    var productFruittea_HTML = ``;
    var item_HTML;

    //Tạo từng HTML cho từng type
    products.forEach(item => {
        item_HTML = `
        <div class="product" product-id="${item.id}">
                <img src="${item.img}" alt="">
                <div class="product-name">${item.name}</div>
                <div class="product-buyer">
                    <div class="product-price">
                        <p class="product-origin-price">${priceFormat(item.price)}</p>
                    </div>
                    <div class="btn-increase">+</div>
                </div>
        </div>
        `;
        switch(checkType(item))
        {
            case 0:{
                productMilktea_HTML += item_HTML;
                break
            }
            case 1:{
                productTea_HTML += item_HTML;
                break
            }
            case 2:{
                productFruittea_HTML += item_HTML;
                break
            }
        }
    });

    //Lấy đúng vị trí catelory để chèn HTML cho từng type 
    categories.forEach(category => {
        
        if (category.getAttribute("catslug") == "milktea") {
            let contentCategory = category.querySelector(".list-product");
            contentCategory.innerHTML = productMilktea_HTML;
        }
        if (category.getAttribute("catslug") == "tea") {
            let contentCategory = category.querySelector(".list-product");
            contentCategory.innerHTML = productTea_HTML;
        }
        if (category.getAttribute("catslug") == "fruittea") {
            let contentCategory = category.querySelector(".list-product");
            contentCategory.innerHTML = productFruittea_HTML;
        }
        useCategory(category);
    });

}

function setCatslug(products) {
    var catslugs = [
        {
            name: "Milktea",
            count: 0,
        },
        {
            name: "Tea",
            count: 0,
        },
        {
            name: "Fruittea",
            count: 0,
        },
    ];
    products.forEach(item => {
        switch(checkType(item))
        {
            case 0:{
                catslugs[0].count++;
                break
            }
            case 1:{
                catslugs[1].count++;
                break
            }
            case 2:{
                catslugs[2].count++;
                break
            }
        }
    });

    let listcat = document.querySelector(".list-cat");
    var listcat_HTML = ``;
    var catitem_HTML;
    catslugs.forEach(catitem => {
        catitem_HTML = `
        <div class="cat-item" catslug="${catitem.name.toLowerCase()}">
              <div class="cat-name">${catitem.name}</div>
              <div class="cat-count">${catitem.count}</div>
        </div>
        `;
        listcat_HTML += catitem_HTML;
    });
    listcat.innerHTML = listcat_HTML;
}

setCatslug(products);
render(products);

/*------------------------*/


//Chức năng: Click catitem sẽ scroll đển vị trí category tương ứng
let catitems = document.querySelectorAll(".cat-item");

catitems.forEach(catitem => {
    catitem.addEventListener("click",() => {
        let catslug = catitem.getAttribute("catslug");
        categories.forEach(category => {
            //Chọn category tương ứng
            if (category.getAttribute("catslug") === catslug) {
                //Nếu đang hidden thì bỏ thuộc tính hidden
                if (category.getAttribute("class") === "category hidden") 
                {
                    category.setAttribute("class","category");
                }

                //Scroll đến vị trí category
                category.scrollIntoView(
                {
                    behavior: "smooth",
                }
                );
            }
        });   
        });
});
    
/*------------------------*/

//Chức năng: Hiện Add Product Form theo từng Card Product
let orderPage = document.querySelector("#order-page");
let popupForm = orderPage.querySelector(".wrap-popup");
let productCards = document.querySelectorAll(".product");
let countFormChild = 0;

function getProductById(product_id) {
    var infoProduct;
    products.forEach(product => {
        if (product.id == product_id) {
            infoProduct = product;
        }
    });
    return infoProduct;
}


function getDescript(product) {
    let innerText = "";
    if(product.descript == ""){
        innerText = "Chưa có thông tin";
    } else {
        innerText = product.descript;
    }
    return innerText;
}

function createCustomizeSections(parent,listsection) {
    //Init Cus_Sections
    let custom_sections = [];

    let custom_size = document.createElement('div');
    custom_size.setAttribute("class","customize-section size");
    custom_sections.push(custom_size);
    let custom_ice = document.createElement('div');
    custom_ice.setAttribute("class","customize-section ice");
    custom_sections.push(custom_ice);
    let custom_sugar = document.createElement('div');
    custom_sugar.setAttribute("class","customize-section sugar");
    custom_sections.push(custom_sugar);
    let custom_topping = document.createElement('div');
    custom_topping.setAttribute("class","customize-section topping");
    custom_sections.push(custom_topping);

    //Creat each Cus-Sec tilte in Cus-Sec
    for (let i = 0; i < custom_sections.length; i++) {
        let custom_item = custom_sections[i];
        let custom_item_title = document.createElement('div');
        custom_item_title.setAttribute("class","customize-title");
        custom_item_title.innerHTML = `
        <div class="left">Chọn ${listsection[i].title}</div>
        <div class="right">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
        </div>
        `;
        custom_item.appendChild(custom_item_title);
    }

    //Creat each Cus-Sec content in Cus-Sec
    for (let i = 0; i < custom_sections.length; i++) {
        let custom_item = custom_sections[i];
        let custom_item_content = document.createElement('div');
        custom_item_content.setAttribute("class","customize-content");
        custom_item_content.innerHTML = ``;

    switch(i){
    //Size
    case 0:{
        for (let index = 0; index < listsection[i].data.length; index++) {
            let item = listsection[i].data[index];

            item_HTML = `
            <div class="have-price-wrap">
                <label class="container-radio">
                    <span>Size ${item}</span>
                    <input type="radio" name="${listsection[i].name}" checked="" value="${listsection[i].name +"-"+ index.toString()}"}">
                    <span class="checkmark-radio"></span>
                </label>
                <span class="cus-price">+${priceFormat(getPrice(listsection[i].name +"-"+ index.toString()))}</span>
            </div>
            `;
            
            custom_item_content.innerHTML += item_HTML;
        }

        break
    }

    //Topping
    case 3:{
        for (let index = 0; index < listsection[i].data.length; index++) {
            let item = listsection[i].data[index];
            let item_HTML = `
            <div class="have-price-wrap">
		        <label class="container-checkbox">
			        <span>${item.name}</span>
			        <input type="checkbox" name="${listsection[i].name}" value="${listsection[i].name +"-"+ index.toString()}">
			        <span class="checkmark"></span>
		        </label>
		        <span class="cus-price">+ ${priceFormat(item.price)}</span>
		    </div>
            `;
            custom_item_content.innerHTML += item_HTML;
        }

        break
    }

    //Ice, Sugar
    default:{
        for (let index = 0; index < listsection[i].data.length; index++) {
            let item = listsection[i].data[index];
            let item_HTML = `
            <div class="no-price-wrap">
                <label class="container-radio">
                    <span>${item}</span>
                    <input type="radio" checked="" name="${listsection[i].name}" value="${listsection[i].name +"-"+ index.toString()}">
                    <span class="checkmark-radio"></span>
                </label>
            </div>
            `;
            custom_item_content.innerHTML += item_HTML;
        }

        break
    }
    }

        custom_item.appendChild(custom_item_content);
    }

    //Push each Cus-Sec into thisParent
    custom_sections.forEach(custom_item => {
        parent.appendChild(custom_item);
    });
}

function createChooseProduct(parent,info,listsection) {
    //Init Choose Product Form
    let popup_choose_product = document.createElement('form');
    popup_choose_product.setAttribute("class","popup-choose-product");

    //Creat Product_Info in Choose Product Form
    let product_info = document.createElement('div');
    product_info.setAttribute("class","ss-1 product-infomation");
    product_info.innerHTML = `
    <div class="ss-1-left">
		  <img id="pp-product-img" src="${info.img}" alt="">
		</div>
		<div class="ss-1-right">
		  <div id="pp-product-name" class="product-name">${info.name}</div>
		  <div class="product-price">
			<div id="pp-product-price" class="price">${priceFormat(info.price)}</div>
			<div id="pp-product-regular-price" class="regular-price"></div>
		  </div>
		  <div class="product-info">${getDescript(info)}</div>
		  <div class="wrap-quantity">
			<div class="change-quantity-wrap">
			  <div class="change-quantity decrease"> - </div>
			  <div class="amount">1</div>
			  <div class="change-quantity increase"> + </div>
			</div>
			<div class="btn-price-product">+ ${priceFormat(info.price)}</div>
		  </div>
		</div>
	</div>
    `;
    popup_choose_product.appendChild(product_info);

    //Creat Product_Customize in Choose Product Form
    let product_custom = document.createElement('div');
    product_custom.setAttribute("class","ss-2 product-customize");
    popup_choose_product.appendChild(product_custom);

    //Creat Customize Sections in Product_Customize
    createCustomizeSections(product_custom,listsection);

    //Push Product Form into thisParent
    parent.appendChild(popup_choose_product);
}

function AddProductForm(product) {
    //Init Form
    let popup_add_product_form = document.createElement('div');
    popup_add_product_form.setAttribute("class","popup popup-add-product");
    popup_add_product_form.innerHTML = `
	<div class="close-btn"><i class="fas fa-times" aria-hidden="true"></i></div>
    `;

    //Init title + Push into Form
    let popup_title = document.createElement('div');
    popup_title.setAttribute("class","popup-title");
    popup_add_product_form.appendChild(popup_title);

    //Init content + Push into Form
    let popup_content = document.createElement('div');
    popup_content.setAttribute("class","popup-content");
    popup_add_product_form.appendChild(popup_content);
        
    //Creat Choose Product in content
    createChooseProduct(popup_content,product,[
        {
            title:"Size",
            name: "size",
            data: product.size,
        },
        {
            title:"Đá",
            name: "ice",
            data: ices,
        },
        {
            title:"Đường",
            name: "sugar",
            data: sugars,
        },
        {
            title:"Topping",
            name: "topping",
            data: toppings,
        },
    ]);



    return popup_add_product_form;
}

productCards.forEach(card => {
    card.addEventListener("click",() => {
        //Get Product By ID
        var infoProduct = getProductById(parseInt(card.getAttribute("product-id")));

        //Creat Add Product Form with Gotten Product + Push into Popup-Form
        let addProductForm = AddProductForm(infoProduct);
        popupForm.appendChild(addProductForm);
        popupForm.querySelector(".overlay").style.display = "block";
        useAddProductForm(addProductForm,initProductInCustomize(infoProduct));
        ;
    });
});

/*------------------------*/

//Tạo ra 1 ProductInCustomize on LocalStorage
function initProductInCustomize(infoProduct) {
    let productInCus = {
        id: 0,
        product_id: 0,
        img: "",
        name: "",
        size: "",
        ice: "",
        sugar: "",
        topping: [],
        price: 0,
        amount: 1,
    }

    productInCus.id = ++countFormChild;
    productInCus.product_id = infoProduct.id;
    productInCus.img = infoProduct.img;
    productInCus.name = infoProduct.name;
    productInCus.price = infoProduct.price;
    

    return productInCus;
}

function initAddProductForm(form,productInCus) {
    let custom_size = form.querySelector(".customize-section.size");
    let custom_ice = form.querySelector(".customize-section.ice");
    let custom_sugar = form.querySelector(".customize-section.sugar");
    let custom_topping = form.querySelector(".customize-section.topping");

    if (productInCus.size == "") {
        let first_input_size = custom_size.querySelector("input");
        first_input_size.checked = true;
        productInCus.size = first_input_size.value;
    }
    else{
        let inputs_size = custom_size.querySelectorAll("input");
        inputs_size.forEach(input => {
            if (input.getAttribute("value") == productInCus.size) {
                input.checked = true;
            }
        });
    }

    if (productInCus.ice == "") {
        let first_input_ice = custom_ice.querySelector("input");
        first_input_ice.checked = true;
        productInCus.ice = first_input_ice.value;
    }
    else{
        let inputs_ice = custom_ice.querySelectorAll("input");
        inputs_ice.forEach(input => {
            if (input.getAttribute("value") == productInCus.ice) {
                input.checked = true;
            }
        });
    }

    if (productInCus.sugar == "") {
        let first_input_sugar = custom_sugar.querySelector("input");
        first_input_sugar.checked = true;
        productInCus.sugar = first_input_sugar.value;
    }
    else
    {
        let inputs_sugar = custom_sugar.querySelectorAll("input");
        inputs_sugar.forEach(input => {
            if (input.getAttribute("value") == productInCus.sugar) {
                input.checked = true;
            }
        });
    }

    if (productInCus.topping.length != 0) {
        let toppings = productInCus.topping;
        let inputs_topping = custom_topping.querySelectorAll("input");
        toppings.forEach(topping => {
            inputs_topping.forEach(input => {
                if (input.getAttribute("value") == topping) {
                    input.checked = true;
                }
            })
        })
    }
} 

function renderAddProduct(form,productInCus) {
    let amount = form.querySelector(".amount");
    amount.innerText = `${productInCus.amount}`;
    let price = form.querySelector(".btn-price-product");
    price.innerText = `+ ${priceFormat(productInCus.price)}`;


}

function addtoCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    var isUpdate = false;
    var isDupli = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart.length == 0) {
            break;
        }

        if (cart[i].id == product.id) {
            cart[i] = product;
            isUpdate = true;
            break;
        }

        if (cart[i].product_id == product.product_id
        &&  cart[i].ice == product.ice
        &&  cart[i].sugar == product.sugar
        &&  cart[i].size == product.size
        &&  JSON.stringify(cart[i].topping) == JSON.stringify(product.topping) ) 
        {
            cart[i].amount += product.amount;
            cart[i].price += product.price;
            isDupli = true;
            break
        }
    }
    if (!isUpdate && !isDupli) {
        cart.push(product);
    }
    updateLocalStorage([{
        key: 'cart',
        value: cart,
    }])
    renderCart(cart);
}

function increaseAmount(product) {
    let tempAmount = product.amount;
    let tempPrice = product.price;
    let originPrice = tempPrice / tempAmount;
    product.amount++;
    product.price = originPrice * product.amount;
}

function decreaseAmount(product) {
    if(product.amount > 1) {
        let tempAmount = product.amount;
        let tempPrice = product.price;
        let originPrice = tempPrice / tempAmount;
        product.amount--;
        product.price = originPrice * product.amount;
    }
}


//Chức năng: Thao tác trên Add Product Form
function useAddProductForm(form,productInCus) {
    initAddProductForm(form,productInCus);
    console.log(productInCus);

    renderAddProduct(form,productInCus);
    
    let cusNoPrice = form.querySelectorAll(".no-price-wrap");
    cusNoPrice.forEach(item => {
        //Cập nhật các thông số mặc định

        item.onchange = function () {
            let inputItem = item.querySelector("input");
            if (inputItem.checked) {
                productInCus[inputItem.name] = inputItem.value;
            }
            renderAddProduct(form,productInCus)
        }
    });
    
    let cusHavePrice = form.querySelectorAll(".have-price-wrap");
    cusHavePrice.forEach(item => {
        
        item.onchange = function () {
            let inputItem = item.querySelector("input");
            
            switch(inputItem.name)
            {
                case "size":{
                    if (inputItem.checked) {
                        productInCus.size = inputItem.value;
                        if (inputItem.value == "size-1") {
                            productInCus.price += 5000 * productInCus.amount;
                        } else {
                            productInCus.price -= 5000 * productInCus.amount;
                        }
                    }
                    break
                }
                case "topping":{ 
                    let priceItem = getPrice(inputItem.value);
                    if (inputItem.checked) {
                        productInCus.topping.push(inputItem.value);
                        productInCus.price += priceItem * productInCus.amount;
                    }
                    else {
                        productInCus.topping.forEach(element => {
                            if (element == inputItem.value) {
                                productInCus.topping = productInCus.topping.filter(function(x){
                                    return x !== inputItem.value;
                                });
                            }
                        });
                    productInCus.price -= priceItem * productInCus.amount;
                }
                break
            }
        }
        renderAddProduct(form,productInCus)
        }
    });
    
    let btn_increase = form.querySelector(".change-quantity.increase");
    let btn_decrease = form.querySelector(".change-quantity.decrease");
    btn_increase.onclick = function () {
        increaseAmount(productInCus);
        renderAddProduct(form,productInCus)
    }
    
    btn_decrease.onclick = function () {
        decreaseAmount(productInCus);
        renderAddProduct(form,productInCus);
    }

    let btn_price_product = form.querySelector(".btn-price-product");
    btn_price_product.onclick = function () {
        addtoCart(productInCus);
        popupForm.querySelector(".overlay").style.display = "none";
        form.remove();
    }

    let btn_close = form.querySelector(".close-btn");
    btn_close.onclick = function () {
        popupForm.querySelector(".overlay").style.display = "none";
        form.remove();
    }
}


/*------------------------*/

function renderCheckout() {
    btn_checkout.classList.add("active");
    let btn_return_checkout = document.querySelector(".btn-checkout.active");
    btn_return_checkout.innerText = `Tiếp Tục Đặt Hàng`;
    btn_return_checkout.onclick = function () {
        openSection(document.getElementById('checkout'));
        renderOrder(checkout_form,getLocaldata('cart'));
    }
}

function getProductInCartByID(cart_id) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    var infoProduct;
    cart.forEach(product => {
        if (product.id == cart_id) {
            infoProduct = product;
        }
    });
    return infoProduct;
}

function getValue(product_id,code) {
    let sizes = getProductById(product_id).size;
    let cut = code.indexOf("-");
    let data = code.substring(0,cut);
    let index = parseInt(code.substring(cut+1));
    let value;
    switch(data) {
        case "ice":{
            value = ices[index];
            break
        }
        case "sugar":{
            value = sugars[index];
            break
        }
        case "topping":{
            value = toppings[index].name;
            break
        }
        case "size": {
            value = sizes[index];
            break
        }
    }
    return value;
}

function getPrice(code) {
    let cut = code.indexOf("-");
    let data = code.substring(0,cut);
    let index = parseInt(code.substring(cut+1));
    let price = 0;
    switch (data) {
        case "size":{
            price = 5000*index;
            break;
        }
        case "topping":{
            price = toppings[index].price; 
            break;
        }
    }
    return price;
}

//Chức năng: Lọc product in Cart + Vẽ lại trên Cart
function renderCart(cart) {
    let cart_container = document.querySelector(".cart-ss1");
    let cart_value = document.querySelector(".cart-ss2");
    if (cart.length == 0) {
        cart_container.innerText = `Chưa có sản phẩm nào`;
        cart_value.innerHTML = ``;
        return;
    }

    cart_container.innerText = ``;
    clearCart();

    var count = 0;
    var total = 0;
    for (let i = 0; i < cart.length; i++) {
    //Lấy Info từ cart
        let itemProduct = cart[i];
        count += itemProduct.amount;
        total += itemProduct.price;
        
    //Tạo Item trong Cart
        let item = document.createElement('div');
        item.setAttribute("class","cart-ss1-item");
        item.setAttribute("cart-id",itemProduct["id"].toString());
    
    //Tạo Nút Xóa
        let item_delete = document.createElement('div');
        item_delete.setAttribute("class","delete-btn");
        item_delete.innerHTML = `<i class="fas fa-times" aria-hidden="true"></i>`;
        item.appendChild(item_delete);

    //Tạo ItemLeft
        let item_left = document.createElement('div');
        item_left.setAttribute("class","cart-ss1-left");

        let item_name = document.createElement('div');
        item_name.setAttribute("class","name");
        item_name.innerText = `${itemProduct.name} (${getValue(itemProduct.product_id,itemProduct.size)})`;
        console.log(item_name);
        item_left.appendChild(item_name);
        
        let item_total = document.createElement('div');
        item_total.setAttribute("class","total");
        item_total.innerText = `${priceFormat(itemProduct.price / itemProduct.amount)} x ${itemProduct.amount} = ${priceFormat(itemProduct.price)}`;
        console.log(item_total);
        item_left.appendChild(item_total);
        
        let item_custom = document.createElement('div');
        item_custom.setAttribute("class","customize");
        item_custom.innerText = ``;
        if (itemProduct.sugar != "sugar-0") {
            item_custom.innerText += `${getValue(itemProduct.product_id,itemProduct.sugar)}, `;
        }
        if (itemProduct.ice != "ice-0") {
            item_custom.innerText += `${getValue(itemProduct.product_id,itemProduct.ice)}, `;
        }
        if (itemProduct.topping.length != 0) {
            itemProduct.topping.forEach(value => {
                item_custom.innerText += `${getValue(itemProduct.product_id,value)}, `;
            });
        }
        console.log(item_custom);
        item_left.appendChild(item_custom);

    //Tạo ItemRight
        let item_right = document.createElement('div');
        item_right.setAttribute("class","cart-ss1-right");
        item_right.innerHTML = `
        <div class="change-quantity decrease"> - </div>
        <div class="amount">${itemProduct.amount}</div>
        <div class="change-quantity increase"> + </div>
        `;

    //Append Left, Right into Item
        item.appendChild(item_left);
        item.appendChild(item_right);

    //Append Item vào Cart-Container
        cart_container.appendChild(item);
        useItemCart(item);
    }
    
    
    if (count != 0 && total != 0) 
    {
        cart_value.innerHTML = `
        <div> Số lượng: 
            <span class="cart-ss2-count"> ${count} </span>
        </div>
        
        <div> Tổng Tiền:
            <span class="cart-ss2-total"> ${priceFormat(total)} </span>
        </div>
        `;
    }

}

renderCart(JSON.parse(localStorage.getItem('cart')));

function removeFromCart(item) {
    item.remove();
}

function clearCart() {
    let items = document.querySelectorAll('.cart-ss1-item');
    items.forEach(item => {
        removeFromCart(item);
    });
}

let btn_clear_cart = document.getElementById("clear-cart");
btn_clear_cart.onclick = function() {
    clearCart();
    countFormChild = 0;
    updateLocalStorage([
        {
            key: 'cart',
            value: [],
        },
    ]);
    renderCart(JSON.parse(localStorage.getItem('cart')));
}

function useItemCart(item) {
    let btn_edit = item.querySelector(".cart-ss1-left");
    let btn_delete = item.querySelector(".delete-btn");
    let btn_increase = item.querySelector(".change-quantity.increase");
    let btn_decrease = item.querySelector(".change-quantity.decrease");

    var cart_id = parseInt(item.getAttribute("cart-id"));
    var cart_product = getProductInCartByID(cart_id);
    var product_id = cart_product["product_id"];
    var infoProduct = getProductById(product_id);

    btn_edit.onclick = function() {
        let addProductForm = AddProductForm(infoProduct);
        popupForm.appendChild(addProductForm);
        popupForm.querySelector(".overlay").style.display = "block";
        useAddProductForm(addProductForm,cart_product);
    }

    btn_increase.onclick = function () {
        increaseAmount(cart_product);
        addtoCart(cart_product);
    }

    btn_decrease.onclick = function () {
        decreaseAmount(cart_product);
        addtoCart(cart_product);
    }

    btn_delete.onclick = function () {
        let cart = getLocaldata("cart");
        cart_product = getProductInCartByID(cart_id);
        cart = cart.filter(function(x){
            return JSON.stringify(x) !== JSON.stringify(cart_product);
        });
        updateLocalStorage([
            {
                key: "cart",
                value: cart,
            }
        ]);
        renderCart(cart);
    }
}
let btn_checkout = document.querySelector(".btn-checkout");
btn_checkout.onclick = function () {
    clearCart();
    let order_details = JSON.parse(localStorage.getItem('cart'));
    
    if (order_details.length == 0) {
        alert("Vui lòng mua hàng để có thể thanh toán!");
    } else {
        openSection(document.getElementById("checkout"));
        useCheckoutForm();
    }
}


/* =======================CHECKOUT======================== */
//Chức năng: Vẽ lại your order từ cart
function renderOrder(parent,cart) {
    let container_order_items = parent.querySelector(".order-details");
    container_order_items.innerHTML = `
    <div class="btn-edit-order">
    <i class="fa-regular fa-pen-to-square"></i>
    </div>`;
    cart.forEach(obj => {
        let product_info = getProductById(obj.product_id);

        let order_item = document.createElement('div');
        order_item.setAttribute("class","order-item");
        order_item.setAttribute("cart-id",obj.id.toString());

        let item_img = document.createElement('img');
        item_img.setAttribute("src",obj.img);

        let item_product = document.createElement('div');
        item_product.setAttribute("class","order-item-product");
        
        let item_info = document.createElement('div');
        item_info.setAttribute("class","order-item-info");
        item_info.innerHTML = `
        <div class="order-item-name">${obj.name}</div>
        <div class="order-item-unitprice">${obj.amount} x ${priceFormat(obj.price/obj.amount)}</div>
        `;

        let item_customize = document.createElement('div');
        item_customize.setAttribute("class","order-item-customize");

        let item_size = document.createElement('div');
        item_size.setAttribute("class","order-item-size");
        item_size.innerHTML = `
        <li>Size ${getValue(obj.product_id,obj.size)}</li>
        <li>${priceFormat(product_info.price + getPrice(obj.size))}</li>
        `;
        item_customize.appendChild(item_size);
        
        let item_sugar = document.createElement('div');
        item_sugar.setAttribute("class","order-item-sugar");
        item_sugar.innerHTML = `
        <li>${getValue(obj.product_id,obj.sugar)}</li>
        <li>0đ</li>
        `;
        item_customize.appendChild(item_sugar);
        
        let item_ice = document.createElement('div');
        item_ice.setAttribute("class","order-item-ice");
        item_ice.innerHTML = `
        <li>${getValue(obj.product_id,obj.ice)}</li>
        <li>0đ</li>
        `;
        item_customize.appendChild(item_ice);

        let item_topping = document.createElement('div');
        item_topping.setAttribute("class","order-item-topping");
        item_topping.innerHTML = ``;
        obj.topping.forEach(value => {
            let valueToppingHTML = `
            <div class="topping-type">
                <li>${getValue(obj.product_id,value)}</li>
                <li>${priceFormat(getPrice(value))}</li>
            </div>
            `; 
            item_topping.innerHTML += valueToppingHTML;
        });
        item_customize.appendChild(item_topping);

        let item_total = document.createElement('div');
        item_total.setAttribute("class","order-item-total");
        item_total.innerText = `${priceFormat(obj.price)}`;

        item_product.appendChild(item_info);
        item_product.appendChild(item_customize);

        order_item.appendChild(item_img);
        order_item.appendChild(item_product);
        order_item.appendChild(item_total);
        
        container_order_items.appendChild(order_item);
    });

    let total_items = document.querySelectorAll(".checkout-total-item");
    total_items.forEach(item => {
        let payfor = item.getAttribute("payfor");
        switch (payfor) {
            case "shopping":{
                item.querySelector('div').innerText = `${priceFormat(getTotal(cart))}`;
                break;
            }
            case "shipping":{
                item.querySelector('div').innerText = `${priceFormat(10000)}`;
                break;
            }
            case "final-total":{
                item.querySelector('div').innerText = `${priceFormat(getTotal(cart)+10000)}`;
                break;
            }   
        }
    });

    let btn_edit_order = document.querySelector(".btn-edit-order");
    btn_edit_order.onclick = function () {
        openSection(document.getElementById("order-page"));
        renderCart(JSON.parse(localStorage.getItem('cart')));
        renderCheckout();
    }
}

let inputs = document.querySelectorAll("#checkout .input-field");

//Hieu ung nhap Input
inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });

    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});


//THONG BAO LOI
function showError(input,message) {
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.remove("success");
    input.classList.remove("success");
    parent.classList.add("error");
    input.classList.add("error");
    small.innerText = message;
  };
  
  //THONG BAO THANH CONG
  function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector("small");
    parent.classList.remove("error");
    input.classList.remove("error");
    small.innerText = ``;
    input.classList.add("success");
  };


function getTotal(cart) {
    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });
    return total;
}

function getQuantity(cart) {
    let quantity = 0;
    cart.forEach(item => {
        quantity += item.amount;
    });
    return quantity;
}

function checkEmptyError(listinput) {
    let isEmptyError = false;
    listinput.forEach(input => {
        if (input.value == '') {
            isEmptyError = true;
            showError(input,"Không được để trống");
        } else {
            showSuccess(input);
        }
    });
    return isEmptyError;
}
let checkout_form = document.querySelector(".checkout-content");


function useCheckoutForm() {
    let loginUser = JSON.parse(localStorage.getItem('loginUser'));
    
    let order_item = {
        id: 0,
        username: loginUser.name,
        email: loginUser.email,
        phone: "",
        address: "",
        products: 0,
        time: "",
        total: 0,
        quantity: 0,
        isDelivery: true,
        isReceived: false,
    };


    let info_email = document.querySelector(".personal-info-item.email div")
    info_email.innerHTML = `${loginUser.email}`;
    
    let info_name = document.querySelector(".personal-info-item.name div")
    info_name.innerHTML = `${loginUser.name}`;

    renderOrder(checkout_form, getLocaldata('cart'));

    let btn_buy = document.querySelector(".btn-buy");

    let date = new Date();
    let dd = date.getDate().toString().padStart(2,"0");
    let mm = (date.getMonth()+1).toString().padStart(2,"0");
    let yyyy = date.getFullYear().toString();
    let hour = date.getHours().toString().padStart(2,"0")
    let min = date.getMinutes().toString().padStart(2,"0")
    let strTime = dd + '-' + mm + '-' + yyyy + " | " + hour + ":" + min;

    let input_phone = document.getElementById("phone");
    let input_street = document.getElementById("address-street");
    let input_city = document.getElementById("address-city");
    let input_district = document.getElementById("address-district");
    let input_ward = document.getElementById("address-ward");

    btn_buy.addEventListener("click",function (e) {
        let isTrueValue = !checkEmptyError([input_phone,input_street,input_city,input_district,input_ward]);

        if (isTrueValue) {
            let orders = JSON.parse(localStorage.getItem('orders'));
            let cart = getLocaldata('cart');

            let phone = input_phone.value.trim();
            let street = input_street.value.trim();
            let city = input_city.value.trim();
            let district = "Q." + input_district.value.trim();
            let ward = "P." + input_ward.value.trim();
            let address = street + ', ' + ward + ', ' + district+ ', ' + city;

            order_item.id = orders.length+1;
            order_item.time = strTime;
            order_item.phone = phone;
            order_item.address = address;
            order_item.products = cart;
            order_item.total = getTotal(cart);
            order_item.quantity = getQuantity(cart);

            orders.push(order_item);
            updateLocalStorage([
                {
                    key: "cart",
                    value: [],
                },
                {
                    key: "orders",
                    value: orders,
                },
            ]);

            btn_buy.style.display = "none";
            
            let thanks = document.querySelector(".thanks");
            let thankTo = thanks.querySelector(".thank-to");
            let thankOnDate = thanks.querySelector(".thank-on-date");
            thankTo.innerText = `Cảm ơn ${loginUser.name}`;
            thankOnDate.innerText = `Đơn hàng của bạn đã được đặt vào ngày ${strTime}`;
            thanks.style.display = "block";

            let btn_edit_order = document.querySelector(".btn-edit-order")
            btn_edit_order.style.display = "none";
            setTimeout(function() {
                btn_buy.style.display = "block";
                thanks.style.display = "none";
                btn_return_checkout.classList.remove("active");
                btn_checkout.innerText = `Đặt Hàng`;
                openSection(document.getElementById("order-page"));
                renderCart(JSON.parse(localStorage.getItem("cart")));
            },5000);

        }
    });
}

let btn_orders_list = document.querySelector(".btn-orders-list");
btn_orders_list.onclick = function () {
    openSection(document.getElementById("orders-list"));
    renderOrderList(getLocaldata('orders'),getLocaldata('loginUser'));
}

let btn_order_page = document.querySelector(".btn-order-page");
btn_order_page.onclick = function () {
    openSection(document.getElementById("order-page"));
    renderCart(getLocaldata('cart'));
}

/* ==================ORDERS-LIST===================== */
function setStatusType(order,status_type){
    if (!order.isDelivery && !order.isReceived) {
        status_type.setAttribute("class","status processing")
        status_type.innerText = `Processing`;
    }
    if (order.isDelivery && !order.isReceived) {
        status_type.setAttribute("class","status shipping")
        status_type.innerText = `Shipping`;
    }
    if (order.isDelivery && order.isReceived) {
        status_type.setAttribute("class","status received")
        status_type.innerText = `Received`;
    }
}

function useInputCheck(order,input_check) {
    if (!order.isDelivery && !order.isReceived) {
        input_check.setAttribute("disabled","true");
    }

    if (order.isDelivery && !order.isReceived) {
        input_check.onchange = function () {
            if (input_check.checked) {
                order.isReceived = true;

                //Update 
                let orders = getLocaldata('orders');
                for (let i = 0; i < orders.length; i++) {
                    if (orders[i].id == order.id) {
                        orders[i] = order;
                        break;
                    }
                }
                updateLocalStorage([{
                    key: "orders",
                    value: orders,
                }]);
                renderOrderList(getLocaldata('orders'),getLocaldata('loginUser'));
            }
        }
    }

    if (order.isDelivery && order.isReceived) {
        input_check.setAttribute("checked","true");
        input_check.setAttribute("disabled","true");
    }

}

let orders_list = document.querySelector("#orders-list");
let popupDetail = orders_list.querySelector(".wrap-popup");

function getOrderByID(order_id) {
    let orders = getLocaldata('orders');
    var info_order;
    orders.forEach(order => {
        if (order.id == order_id) {
            info_order = order;
        }
    })
    return info_order;
}

function renderDetails(order_detail_id) {
    let info_order = getOrderByID(order_detail_id);
    let order_detail = popupDetail.querySelector(".popup.popup-order-detail");
    
    let order_title_id = order_detail.querySelector(".order-detail-id");
    order_title_id.innerText = `Order #${info_order.id.toString().padStart(6,"0")}`;
    order_title_id.scrollIntoView();
    
    let order_title_time = order_detail.querySelector(".order-detail-time");
    order_title_time.innerText = `${info_order.time}`;

    let order_info_email = order_detail.querySelector(".personal-info-item.email h4")
    order_info_email.innerText = `${info_order.email}`;
    let order_info_name = order_detail.querySelector(".personal-info-item.name h4")
    order_info_name.innerText = `${info_order.username}`;
    
    let order_info_phone = order_detail.querySelector(".shipping-info-item.phone h4")
    order_info_phone.innerText = `${info_order.phone}`;
    let order_info_address = order_detail.querySelector(".shipping-info-item.address h4")
    order_info_address.innerText = `${info_order.address}`;

    renderOrder(order_detail,info_order.products);

    let btn_edit_order = order_detail.querySelector(".btn-edit-order");
    btn_edit_order.style.display = "none";
    let order_total = order_detail.querySelectorAll(".detail-total-item");
    order_total.forEach(item => {
        switch (item.getAttribute("payfor")) {
            case "shopping":{
                let order_item_pay_content = item.querySelector(".detail-total-item div");
                order_item_pay_content.innerText = `${priceFormat(getTotal(info_order.products))}`;
                break
            }
            case "shipping":{
                let order_item_pay_content = item.querySelector(".detail-total-item div");
                order_item_pay_content.innerText = `${priceFormat(10000)}`;
                break
            }
            case "final-total":{
                let order_item_pay_content = item.querySelector(".detail-total-item div");
                order_item_pay_content.innerText = `${priceFormat(getTotal(info_order.products)+10000)}`;
                break
            }
        }
    });
    let overlay = popupDetail.querySelector(".overlay")
    order_detail.style.display = "flex";
    overlay.style.display = "block";

    let btn_close = order_detail.querySelector(".close-btn");
    btn_close.onclick = function () {
        order_detail.style.display = "none";
        overlay.style.display = "none";
    }
}

function useOrderDetail(order_row){
    let order_detail_id = parseInt(order_row.getAttribute("order-detail-id"));
    let btn_open_detail = order_row.querySelector(".order-cell.order-id");
    btn_open_detail.onclick = function () {
        renderDetails(order_detail_id);
    }
}

function renderOrderList(orders,loginUser) {
    let user_orders = [];
    orders.forEach(order => {
        if (order.email == loginUser.email) {
            user_orders.push(order);
        }
    });

    let orders_table = document.querySelector(".orders-list-area-content");
    orders_table.innerHTML = ``;
    user_orders.forEach(order => {
        let order_row = document.createElement('div');
        order_row.setAttribute("class","orders-row");
        order_row.setAttribute("order-detail-id",order.id.toString());

        let order_id = document.createElement('div');
        order_id.setAttribute("class","order-cell order-id");
        order_id.innerText =`#${order.id.toString().padStart(6,"0")}`;
        order_row.appendChild(order_id);

        let order_time = document.createElement('div');
        order_time.setAttribute("class","order-cell order-time");
        order_time.innerText =`${order.time}`;
        order_row.appendChild(order_time);
        
        let order_status = document.createElement('div');
        order_status.setAttribute("class","order-cell status-cell");
        let status_type = document.createElement('label');
        setStatusType(order,status_type);
        order_status.appendChild(status_type);
        order_row.appendChild(order_status);
        
        let order_quantity = document.createElement('div');
        order_quantity.setAttribute("class","order-cell order-quantity");
        order_quantity.innerText =`${order.quantity}`;
        order_row.appendChild(order_quantity);
        
        let order_total = document.createElement('div');
        order_total.setAttribute("class","order-cell order-total");
        order_total.innerText =`${priceFormat(order.total)}`;
        order_row.appendChild(order_total);
        
        let order_checkUser = document.createElement('div');
        order_checkUser.setAttribute("class","order-cell order-checkUser");
        let input_check = document.createElement('input');
        input_check.setAttribute("type","checkbox")
        input_check.setAttribute("name","user-received");
        useInputCheck(order,input_check);
        order_checkUser.appendChild(input_check);
        order_row.appendChild(order_checkUser);

        useOrderDetail(order_row);
        orders_table.appendChild(order_row);

    });
}

