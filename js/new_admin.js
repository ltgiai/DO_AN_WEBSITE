/*============================================================================== */
/*========================== TAB CHUYỂN TRANG ================================= */
/*============================================================================== */
let navtabs = document.querySelectorAll('.sliderTab');
    navtabs.forEach(item => {
        item.addEventListener('click',function(event){
            if(event.target.classList.contains('nav-item')){
                let lastActive = item.querySelector('.active');
                let newActive = event.target;
                
    
                lastActive.classList.remove('active');
                newActive.classList.add('active');
                
    
                let lastContentActive = item.querySelector('.tab,.active');
                let newContentActive = document.getElementById(newActive.dataset.target);
                lastContentActive.classList.remove('active');
                newContentActive.classList.add('active');
        }
    });
});

//Đăng xuất khỏi Admin
function main_redirect(){
    window.location.href = "../html/main.html";
}
/*============================================================================== */
/*========================== PAGE DANH SÁCH SẢN PHẨM ================================= */
/*============================================================================== */

//===================================Thêm sản phẩm vào DANH SÁCH SẢN PHẨM==========================================
function addSizeItem(parent) {
    var size = [];
    let checkboxs = parent.querySelectorAll(`input[type="checkbox"]`);
    checkboxs.forEach(checkbox =>{
            if (checkbox.checked) {
                size.push(checkbox.value);
            }
    });
    return size;
}

function checkInfoEmptyError(listvalue) {
    for (let i = 0; i < listvalue.length; i++) {
        if (listvalue[i].value == '' || listvalue[i].value.length == 0) {
            let warning = "Vui lòng nhập " + listvalue[i].name;
            alert(warning);
            return true;
        }
    }
    return false;
}
function normalizePrice(inputStr) {
    // Xóa dấu phẩy và dấu chấm từ chuỗi
    const cleanedStr = inputStr.replace(/[,.]/g, '');
    
    // Chuyển đổi chuỗi thành số và trả về
    return parseInt(cleanedStr, 10);
}
function addItem(){
    var item_id = document.getElementById('item-id').value
    var item_type = document.getElementById('item-type').value
    var item_name = document.getElementById('item-name').value.trim()
    var item_price = normalizePrice(document.getElementById('item-price').value);
    // var item_img = document.getElementById('item-img').value
    var item_descript = document.getElementById('item-descript').value.trim()
    var item_size = addSizeItem(document.querySelector(".init-size"));
    var Money = document.getElementById('item-price').value.trim();
    let isError = checkInfoEmptyError([
        {
            name: "ID sản phẩm",
            value: item_id,
        },
        {
            name: "Tên sản phẩm",
            value: item_name,
        },
        {
            name: "Loại",
            value: item_type,
        },
        {
            name: "Size",
            value: item_size,
        },
        {
            name: "Giá sản phẩm",
            value: item_price.toString(),
        },
    ])
    let products = JSON.parse(localStorage.getItem('products'))
    if(isError){
        
    }
    else
    {
        var item ={
            id : parseInt(item_id),
            name: item_name,
            img: document.getElementById('preview-img').src,
            size: item_size,
            type: item_type,
            price: parseInt(item_price),
            descript: item_descript,
        }
        let dupliID = false;
        let dupliName = false;
        let i = 0;
        while((!dupliID && !dupliName)&& i<products.length) {
            if (item.id == products[i].id){
                dupliID = true;
            }
            if(item.name == products[i].name) {
                dupliName = true;
            }
            i++;
        }
        if(dupliID){
            alert("ID đã tồn tại !")
            return;
        }
        if(dupliName){
            alert("Tên sản phẩm đã tồn tại !")
            return;
        }
        if(Money == '' || /[a-z]/.test(Money) || /[A-Z]/.test(Money) || /[!@#$%^&*()_+=-]/.test(Money)){
            alert("Giá tiền không hợp lệ");
        }

        if(!dupliID && !dupliName){
            products.push(item)
            localStorage.setItem('products',JSON.stringify(products))
            show()
            document.getElementById('item-id').value = ''
            document.getElementById('item-type').value = ''
            document.getElementById('item-name').value = ''
            document.getElementById('item-price').value = ''
            document.getElementById('item-img').value = ''
            document.getElementById('item-descript').value = ''
            document.querySelectorAll(`input[type="checkbox"]`).forEach(checkbox => {
                checkbox.checked = false;
            });
            document.getElementById('preview-img').src = '';
        }
    }
}
document.getElementById('item-img').addEventListener('change', function(event) {
    const input = event.target;
    const imgPreview = document.getElementById('preview-img');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imgPreview.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
});
function updateItem(x){
    var item_id = document.getElementById('item-id').value
    var item_type = document.getElementById('item-type').value
    var item_name = document.getElementById('item-name').value.trim()
    var item_price = document.getElementById('item-price').value
    // var item_img = document.getElementById('item-img').value
    var item_descript = document.getElementById('item-descript').value.trim()
    var item_size = addSizeItem(document.querySelector(".init-size"));
    var Money = document.getElementById('item-price').value.trim();
    let isError = checkInfoEmptyError([
        {
            name: "ID sản phẩm",
            value: item_id,
        },
        {
            name: "Tên sản phẩm",
            value: item_name,
        },
        {
            name: "Loại",
            value: item_type,
        },
        {
            name: "Size",
            value: item_size,
        },
        {
            name: "Giá sản phẩm",
            value: item_price,
        },
    ])
    let products = JSON.parse(localStorage.getItem('products'))
    if(isError){
        
    }
    else
    {
        
        var item ={
            id : parseInt(item_id),
            name: item_name,
            img: document.getElementById('preview-img').src,
            size: item_size,
            type: item_type,
            price: parseInt(item_price),
            descript: item_descript,
        }
        let dupliName = false;
        let i = 0;
        while(!dupliName&& i<products.length) {
            if(item.name == products[i].name && i!=x) {
                dupliName = true;
            }
            i++;
        }
        if(dupliName){
            alert("Tên sản phẩm đã tồn tại !")
            return
        }
        if(Money == '' || /[a-z]/.test(Money) || /[A-Z]/.test(Money) || /[!@#$%^&*()_+=-]/.test(Money)){
            alert("Giá tiền không hợp lệ");
        }
        
        
        else{
            products[x] = item;
            localStorage.setItem('products',JSON.stringify(products))
            show()
            document.getElementById('item-id').value = ''
            document.getElementById('item-id').removeAttribute("readonly")
            document.getElementById('item-type').value = ''
            document.getElementById('item-name').value = ''
            document.getElementById('item-price').value = ''
            document.getElementById('item-img').value = ''
            document.getElementById('item-descript').value = ''
            document.querySelectorAll(`input[type="checkbox"]`).forEach(checkbox => {
                checkbox.checked = false;
            });
            document.getElementById('preview-img').src = '';
        }
    }
}

//======================================= Xóa sản phẩm trong DANH SÁCH SẢN PHẨM ===================================
function deleteItem(x) {
    let text = confirm("Bạn muốn xóa sản phẩm này đúng không ?");
    let products = JSON.parse(localStorage.getItem('products'));

    if (text) {
        products.splice(x, 1); // Use splice to remove the element at index x
        localStorage.setItem('products', JSON.stringify(products));
        show();
    }
}

//Xuất ra DANH SÁCH SẢN PHẨM 
function show(){
    let products = JSON.parse(localStorage.getItem('products'))
    productsHTML = '<div class="products-heading">ID</div>' +
    '<div class="products-heading">Hình ảnh</div>' +
    '<div class="products-heading">Tên sản phẩm</div>' +
    '<div class="products-heading">Thể loại</div>' +    
    '<div class="products-heading">Đơn giá</div>' +
    '<div class="products-heading">Chức năng</div>'
    
    for(let i=0; i<products.length; i++){
        productsHTML += '<div class="products-content"><span>' + products[i].id + '</span></div>'
         + '<div class="products-content products-img"><img src="' + products[i].img + '"></div>'
         + '<div class="products-content"><span>' + products[i].name + '</span></div>'
         + '<div class="products-content"><span>' + products[i].type + '</span></div>'
         + '<div class="products-content"><span>' + priceFormat(products[i].price) + '</span></div>'
         + '<div class="products-content">' +
                    '<button class="products-btn" onclick="editItem(' + i + ')">Edit</button>' +
                    '<button class="products-btn" onclick="deleteItem(' + i + ')">Delete</button>' +
                '</div>'
    }
    document.getElementById('render').innerHTML = productsHTML;
}
window.onload = show();

//Tìm kiếm sản phẩm trong DANH SÁCH SẢN PHẨM
function findItem(){
    let products = JSON.parse(localStorage.getItem('products'))
    var findID = prompt("Tim ID")
    productsHTML = '<div class="products-heading">ID</div>' +
    '<div class="products-heading">Hình ảnh</div>' +
    '<div class="products-heading">Tên sản phẩm</div>' +
    '<div class="products-heading">Thể loại</div>' +    
    '<div class="products-heading">Đơn giá</div>' +
    '<div class="products-heading">Chức năng</div>'
    
    for(let i=0; i<products.length; i++){
        if(products[i].id == findID){
            products += '<div class="products-content"><span>' + products[i].id + '</span></div>'
            + '<div class="products-content products-img"><img src="' + products[i].img + '"></div>'
            + '<div class="products-content"><span>' + products[i].name + '</span></div>'
            + '<div class="products-content"><span>' + products[i].type + '</span></div>'
            + '<div class="products-content"><span>' + priceFormat(products[i].price) + '</span></div>'
            + '<div class="products-content">' +
                    '<button class="products-btn" onclick="editItem(' + i + ')">Edit</button>' +
                    '<button class="products-btn" onclick="deleteItem(' + i + ')">Delete</button>' +
                '</div>'
        }
    }
    document.getElementById('render').innerHTML = productsHTML;
}
function editSizeItem(size){
    let checkboxs = document.querySelectorAll(`.init-size-item input[type="checkbox"]`)
    console.log(checkboxs);
    size.forEach(value => {
        checkboxs.forEach(checkbox => {
            if (value == checkbox.value) {
                checkbox.checked = true;
            }
        })
    })
}

//Chỉnh sửa sản phẩm trong DANH SÁCH SẢN PHẨM
function editItem(x){
    let updatebutton = document.getElementById('Update-button')
    let addbutton = document.getElementById('Add-button')
    updatebutton.style.display = 'block'
    addbutton.style.display = 'none'

    let products = JSON.parse(localStorage.getItem('products'))
    document.getElementById('item-id').value = products[x].id
    document.getElementById('item-id').setAttribute("readonly","true");
    
    document.getElementById('item-type').value = products[x].type
    document.getElementById('item-name').value = products[x].name
    document.getElementById('item-price').value = products[x].price
    // document.getElementById('item-img').value = products[x].img
    let NowImage = products[x].img;
    document.getElementById('preview-img').src = NowImage;
    document.getElementById('item-descript').value = products[x].descript;
    editSizeItem(products[x].size)

    document.querySelector(".input-box").scrollIntoView({behavior:"smooth"})
    
    updatebutton.onclick = function(){
        updateItem(x);
        addbutton.style.display = 'block';
    }
}

//========================================== DANH SÁCH ĐƠN HÀNG ===================================================
function showOrderCustomer(){
    let orders = JSON.parse(localStorage.getItem('orders'))
    console.log(orders)
    orderTable = '<div class="order-heading">ID</div>' +
                '<div class="order-heading">Date</div>' +
                '<div class="order-heading">Name</div>' +
                '<div class="order-heading">Status</div>' +
                '<div class="order-heading">Quantity</div>' +
                '<div class="order-heading">Total</div>' +
                '<div class="order-heading">Check</div>' 
    for(let i=0; i<orders.length; i++){
        orderTable += '<div class="order-content" onclick="showOrderCheck(' + i + ')" style="cursor:pointer">#000' + orders[i].id + '</div>' +
        '<div class="order-content">' + orders[i].date + '</div>' +
        '<div class="order-content">' + orders[i].username + '</div>' +
        '<div class="order-content">' + 
            '<label for="chkShipped">Nhãn 01</label>'  + 
        '</div>' +
        '<div class="order-content">' + orders[i].quantity + '</div>' +
        '<div class="order-content">' + orders[i].total + 'Đ</div>' +
        '<div class="order-content">' +
            '<input type="checkbox" value="on" id="chkOrder">' +
        '</div>' 
    }
    document.getElementById('render-order').innerHTML = orderTable
}

function showOrderCheck(index){
    let orderCheck = document.querySelector('.order-check-container'); 
    let orders = JSON.parse(localStorage.getItem('orders'))
    orderCheck.style.display = 'block';

    let bodyHTML = document.querySelector('.content-tab')
    bodyHTML.style.opacity = '1';
    orderCheck.style.opacity = '1'

    let cart_detail = orders[index].products;
    console.log(cart_detail[0])

    let ordersHTML = '<div class="order-check-title">' +
    '<span>Order #000' + (index+1) + '</span>' +
    '<img src="/imge/icon_clo.jpg" onclick="hideOrderCheck()"></div>' 
    for(let i=0; i<cart_detail.length; i++){
        ordersHTML += 
        '<div class="order-check-table">' +
        '<div class="order-check-content2">' +
        '<div class="order-check-img2">' +
        '<img src="' + cart_detail[i].img + '" alt="">' +
        '</div>' +
        '<div class="order-check-msg">' +
        '<div class="check-msg-content check-msg-title">' +
        '<span class="left">' + cart_detail[i].name + '</span>' +
        '</div>' +
        '<div class="check-msg-detail">' +
        '<span class="left">' + cart_detail[i].size + '</span>' +
        '<span class="right">0</span>' +
        '</div>' +
        '<div class="check-msg-detail">' +
        '<span class="left">' +  cart_detail[i].ice + '</span>' +
        '<span class="right">0</span>' +
        '</div>' +
        '<div class="check-msg-detail">' +
        '<span class="left">' +  cart_detail[i].sugar + '</span>' +
        '<span class="right">0</span>' +
        '</div>' +
        '<div class="check-msg-detail">' +
        '<span class="left">' + cart_detail[i].topping + '</span>' +
        '<span class="right">0</span>' +
        '</div>' +    
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' 
    }
    ordersHTML += '<div class="order-check-total">' +
            '<div class="order-check-total-content">' +
                '<div class="left">Tổng sản phẩm</div>' +
    '           <div class="right">' + orders[index].quantity + '</div>' +
            '</div>' +
            '<div class="order-check-total-content">' +
                '<div class="left">Phí vận chuyển</div>' +
                '<div class="right">10000Đ</div>' +
            '</div>' +
            '<div class="order-check-total-content">' +
                '<div class="left last-total">Tổng thanh toán</div>' +
                '<div class="right last-total">' + orders[index].total + 'Đ</div>' +
            '</div>'
    document.querySelector('.order-check-container').innerHTML = ordersHTML
}

function hideOrderCheck(){
    let hideOrderCheck = document.querySelector('.order-check-container')
    hideOrderCheck.style.display = 'none'
    let opacityHTML = document.querySelector('body')
    opacityHTML.style.opacity = '1'
}

//======================================== DANH SÁCH NGƯỜI DÙNG ==================================================
function showUsers(){
    let users = JSON.parse(localStorage.getItem('users'))
    console.log(users)
    let usersID = 1;
    usersHTML = '<div class="users-heading">ID</div>' +
    '<div class="users-heading">Tên người dùng</div>' +
    '<div class="users-heading">Email</div>' +
    '<div class="users-heading">Mật khẩu</div>' +
    '<div class="users-heading">Thao tác</div>'
    
    for(let i=0; i<users.length; i++){
        usersHTML += '<div class="users-content">' + (usersID++) + '</div>' +
        '<div class="users-content">' + users[i].username + '</div>' +
        '<div class="users-content">' + users[i].email + '</div>' +
        '<div class="users-content">' + users[i].password + '</div>' +
        '<div class="users-content">' +
            '<button class="users-action" onclick="deleteUser(' + i + ')">Xóa</button>' +
        '</div>';
    }
    document.querySelector('.users-container').innerHTML = usersHTML
}
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users'));
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    showUsers();
}

function getProductById(product_id) {
    var infoProduct;
    getLocaldata('products').forEach(product => {
        if (product.id == product_id) {
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



function renderOrder(parent,cart) {
    let container_order_items = parent.querySelector(".order-details");
    container_order_items.innerHTML = `
    `;
    cart.forEach(obj => {
        let product_info = getProductById(obj.product_id);

        let order_item = document.createElement('div');
        order_item.setAttribute("class","order-item");

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
                item.querySelector('div').innerText = `${priceFormat(0)}`;
                break;
            }
            case "final-total":{
                item.querySelector('div').innerText = `${priceFormat(getTotal(cart)+0)}`;
                break;
            }   
        }
    });
}

function setStatusTypeAdmin(order,status_type){
    if (!order.isDelivery) {
        status_type.setAttribute("class","status processing")
        status_type.innerText = `Processing`;
    }
    if (order.isDelivery) {
        status_type.setAttribute("class","status shipping")
        status_type.innerText = `Shipping`;
    }
    if (order.isReceived) {
        status_type.setAttribute("class","status received")
        status_type.innerText = `Received`;
    }
    if (order.isCancel) {
        status_type.setAttribute("class","status cancel")
        status_type.innerText = `Cancelled`;
    }
    
}

function useInputCheckAdmin(order,input_check) {
    if (!order.isDelivery && !order.isReceived && !order.isCancel) {
        input_check.classList.add("checkshipping");
        input_check.innerHTML = `
			<span>Giao Đơn Hàng</span>
			<input type="checkbox" name="admin-shipping">
			<span class="order-checkmark"></span>
        `;
        input_check.onclick = function () {
            input_check.querySelector('input').checked = true;
        }
        input_check.onchange = function () {
            if (input_check.querySelector('input').checked) {
                order.isDelivery = true;

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
                showOrderList()
            }
        }
    }
    else
    {
        input_check.style.display = "none";
    }


}

let popupDetail = document.querySelector("#tab2 .wrap-popup");

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
    
    let order_title_date = order_detail.querySelector(".order-detail-time");
    order_title_date.innerText = `${info_order.time}`;

    let order_info_email = order_detail.querySelector(".personal-info-item.email h4")
    order_info_email.innerText = `${info_order.email}`;
    let order_info_name = order_detail.querySelector(".personal-info-item.username h4")
    order_info_name.innerText = `${info_order.username}`;
    
    let order_info_phone = order_detail.querySelector(".shipping-info-item.phone h4")
    order_info_phone.innerText = `${info_order.phone}`;
    let order_info_address = order_detail.querySelector(".shipping-info-item.address h4")
    order_info_address.innerText = `${info_order.address}`;

    renderOrder(order_detail,info_order.products);

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
                order_item_pay_content.innerText = `${priceFormat(0)}`;
                break
            }
            case "final-total":{
                let order_item_pay_content = item.querySelector(".detail-total-item div");
                order_item_pay_content.innerText = `${priceFormat(getTotal(info_order.products)+0)}`;
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

//Định dạng tiền
function priceFormat(price){
    let priceStr = price.toLocaleString() + "đ";
    return priceStr;
}

function showOrderList() {
    let orders = getLocaldata('orders');
    let orders_table = document.querySelector(".orders-list-area-content");
    orders_table.innerHTML = ``;
    orders.forEach(order => {
        let order_row = document.createElement('div');
        order_row.setAttribute("class","orders-row");
        order_row.setAttribute("order-detail-id",order.id.toString());

        let order_id = document.createElement('div');
        order_id.setAttribute("class","order-cell order-id");
        order_id.innerText =`#${order.id.toString().padStart(6,"0")}`;
        order_row.appendChild(order_id);

        let order_date = document.createElement('div');
        order_date.setAttribute("class","order-cell order-date");
        order_date.innerText =`${order.time}`;
        order_row.appendChild(order_date);
        
        let order_username = document.createElement('div');
        order_username.setAttribute("class","order-cell username");
        order_username.innerText =`${order.username}`;
        order_row.appendChild(order_username);
        
        let order_status = document.createElement('div');
        order_status.setAttribute("class","order-cell status-cell");
        let status_type = document.createElement('label');
        setStatusTypeAdmin(order,status_type);
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
        
        let order_checkAdmin = document.createElement('div');
        order_checkAdmin.setAttribute("class","order-cell order-checkAdmin");
        let order_checkbox = document.createElement('label')
        order_checkbox.setAttribute("class","order-checkbox");
        /* order_checkbox.innerHTML = `
			<span></span>
			<input type="checkbox" name="">
			<span class="order-checkmark"></span>
        `; */
        useInputCheckAdmin(order,order_checkbox);
        order_checkAdmin.appendChild(order_checkbox);
        order_row.appendChild(order_checkAdmin);

        console.log(order_row);
        useOrderDetail(order_row);
        orders_table.appendChild(order_row);

    });
}

// lấy type dựa vào id của sản phẩm
function getTypeById(productId, products) {
    for (const product of products) {
        if (productId == product.id  ) {
            return product.type;
        }
    }
    return null;
}

function getTotalRevenue(orders, startDate, endDate, topic) {
    let totalRevenue = 0;
    let totalQuantity = 0;
    let detailOrders = [];

    for (const order of orders) {
        // xét điều kiện đã giao và đã nhận
        if (order.isDelivery && order.isReceived) {
            // lấy ngày từ khi đăt
            let orderDate = new Date(order.time.split(" | ")[0]);
            let detailProducts = []
            order.products.forEach(product => {
                // console.log(orderDate)
                if ((startDate === "" || orderDate >= new Date(startDate)) 
                && (endDate === "" || orderDate <= new Date(endDate)) 
                && (topic === "all" || getTypeById(product.product_id, getLocaldata('products')) === topic)
                ) {
                    detailProducts.push(product);
                    totalRevenue += product.price;
                    totalQuantity += product.amount;
                }
            });

            if (detailProducts.length != 0) {
                order.products = detailProducts;
                detailOrders.push(order);
            }
        }
        
    }
    return {
         totalRevenue, totalQuantity, detailOrders
        };
}

function renderResult(detailOrders,topic) {
    let topicValue = "";
    switch(topic){
        case "Milktea": {
            topicValue = "Trà Sữa";
            break
        }
        case "Tea": {
            topicValue = "Trà Tươi";
            break
        }
        case "Fruittea": {
            topicValue = "Trà Trái Cây";
            break
        }
        case "Cream": {
            topicValue = "Kem Sữa";
            break
        }
        case "all": {
            topicValue = "Tất Cả";
            break
        }
    }

    let container_syn_order_items = document.querySelector(".syn-detail-orders");
    container_syn_order_items.innerHTML = ``;
    detailOrders.forEach(detail => {
        let syn_order_item = document.createElement('div')
        syn_order_item.setAttribute("class","syn-order-item")

        let info_details = document.createElement('div')
        info_details.setAttribute("class","info-details");
        info_details.innerHTML = `
        <h2>Order #${detail.id.toString().padStart(6,"0")} </h2>
        <small>${detail.time}</small>
        <div class="total-info">
            <p>Phân Loại: ${topicValue}</p>
            <p>Số lượng: ${getQuantity(detail.products)} ly</p>
            <p>Thành tiền: ${priceFormat(getTotal(detail.products))}</p>
        </div>
        <div class="icon-show-details">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
        </div>
        `;
        syn_order_item.appendChild(info_details);

        let order_details = document.createElement('div')
        order_details.setAttribute("class","order-details");
        syn_order_item.appendChild(order_details);

        renderOrder(syn_order_item,detail.products);

        syn_order_item.onclick = function () {
            syn_order_item.classList.toggle("active");
        }

        container_syn_order_items.appendChild(syn_order_item);
    });
}

function updateTotalRevenue() {
    const startDate = document.getElementById("start-date").value;
    console.log(startDate)
    const endDate = document.getElementById("end-date").value;
    const topic = document.getElementById("syn-category-filter").value;
        console.log(topic)
        // trả về tổng giá và số lượng
    const { totalRevenue, totalQuantity, detailOrders } = getTotalRevenue(getLocaldata('orders'), startDate, endDate, topic);

    document.getElementById("total-revenue").innerText = `${priceFormat(totalRevenue)}`;

    document.getElementById("total-quantity").innerText = `${totalQuantity} ly`;
    renderResult(detailOrders,topic);
}

updateTotalRevenue();

document.getElementById("syn-submit-btn").addEventListener("click", function() {
    updateTotalRevenue();
});

