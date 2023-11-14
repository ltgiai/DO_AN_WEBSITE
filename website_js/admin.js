//=============================================TAB CHUYỂN TRANG====================================================
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
//========================================== DANH SÁCH SẢN PHẨM ===================================================
//Thêm sản phẩm vào DANH SÁCH SẢN PHẨM
function addItem(){
    let product = JSON.parse(localStorage.getItem('productsList'))
    console.log(product)
    var item_id = document.getElementById('item-id').value
    var item_type = document.getElementById('item-type').value
    var item_name = document.getElementById('item-name').value
    var item_price = document.getElementById('item-price').value
    var item_img = document.getElementById('item-img').value
    var item ={
        ID : item_id,
        img: item_img,
        name: item_name,
        type: item_type,
        price: item_price,
        size: ['M','L'],
    }

    if(item.ID == ''){
        alert("Vui long nhap ID")
    }
    else{
        for(let i=0; i<product.length; i++){
            if(item.ID == product[i].ID){
                alert("ID bi trung lap")
                break
            }
            else{
                product.unshift(item)
                localStorage.setItem('productsList',JSON.stringify(product))
                break
            }
        }
        show()
    }
}

//Xóa sản phẩm trong DANH SÁCH SẢN PHẨM
function deleteItem(x) {
    let text = confirm("Bạn muốn xóa sản phẩm này đúng không ?");
    let product = JSON.parse(localStorage.getItem('productsList'));

    if (text) {
        product.splice(x, 1); // Use splice to remove the element at index x
        localStorage.setItem('productsList', JSON.stringify(product));
        show();
    }
}

//Xuất ra DANH SÁCH SẢN PHẨM 
function show(){
    let product = JSON.parse(localStorage.getItem('productsList'))
    table = '<div class="heading-name">ID</div>' +
    '<div class="heading-name">Hình ảnh</div>' +
    '<div class="heading-name">Tên</div>' +
    '<div class="heading-name">Thể loại</div>' +    
    '<div class="heading-name">Đơn giá</div>' +
    '<div class="heading-name">Chức năng</div>'
    
    for(let i=0; i<product.length; i++){
        table += '<div class="table-content"><span>' + product[i].ID + '</span></div>'
         + '<div class="table-content table-img"><img src="' + product[i].img + '"></div>'
         + '<div class="table-content"><span>' + product[i].name + '</span></div>'
         + '<div class="table-content"><span>' + product[i].type + '</span></div>'
         + '<div class="table-content"><span>' + product[i].price + '</span></div>'
         + '<div class="table-content table-btn">' +
                    '<button class="btn" onclick="editItem(' + i + ')">Edit</button>' +
                    '<button class="btn" onclick="deleteItem(' + i + ')">Delete</button>' +
                '</div>'
    }
    document.getElementById('render').innerHTML = table;
}

//Tìm kiếm sản phẩm trong DANH SÁCH SẢN PHẨM

function findItem(x){
    let product = JSON.parse(localStorage.getItem('productsList'))
    table = '<div class="heading-name">ID</div>' +
    '<div class="heading-name">Hình ảnh</div>' +
    '<div class="heading-name">Tên</div>' +
    '<div class="heading-name">Thể loại</div>' +
    '<div class="heading-name">Đơn giá</div>' +
    '<div class="heading-name">Chức năng</div>'
    var findID = prompt("Tim ID")
    for(let i=0; i<product.length; i++){
        if(product[i].ID == findID){
            table += '<div class="table-content"><span>' + product[i].ID + '</span></div>'
         + '<div class="table-content table-img"><img src="' + product[i].img + '"></div>'
         + '<div class="table-content"><span>' + product[i].name + '</span></div>'
         + '<div class="table-content"><span>' + product[i].type + '</span></div>'
         + '<div class="table-content"><span>' + product[i].price + '</span></div>'
         + '<div class="table-content table-btn">' +
                    '<button class="btn" onclick="editItem(' + i + ')">Edit</button>' +
                    '<button class="btn" onclick="deleteItem(' + i + ')">Delete</button>' +
                '</div>'
        }
    }
    document.getElementById('render').innerHTML = table;
}

//Chỉnh sửa sản phẩm trong DANH SÁCH SẢN PHẨM
function editItem(x){
    let updatebutton = document.getElementById('Update-button')
    let addbutton = document.getElementById('Add-button')
    updatebutton.style.display = 'block'
    addbutton.style.display = 'none'

    let product = JSON.parse(localStorage.getItem('productsList'))

    document.getElementById('item-id').value = product[x].ID
    document.getElementById('item-type').value = product[x].type
    document.getElementById('item-name').value = product[x].name
    document.getElementById('item-price').value = product[x].price
    document.getElementById('item-img').value = product[x].img
    document.querySelector(".input-box").scrollIntoView({})
        
    updatebutton.onclick = function(){
        product[x].ID = document.getElementById('item-id').value
        product[x].type = document.getElementById('item-type').value
        product[x].name = document.getElementById('item-name').value
        product[x].price = document.getElementById('item-price').value
        product[x].img = document.getElementById('item-img').value
        localStorage.setItem('productsList', JSON.stringify(product))
        document.getElementById('item-id').value = ''
        document.getElementById('item-type').value = ''
        document.getElementById('item-name').value = ''
        document.getElementById('item-price').value = ''
        document.getElementById('item-img').value = ''
        updatebutton.style.display = 'none'
        addbutton.style.display = 'block'
        show()
    }
}

//Đăng xuất
function main_redirect(){
    window.location = "http://127.0.0.1:5502/website_html/main.html";
}

//========================================== DANH SÁCH ĐƠN HÀNG ===================================================
function showOrderCustomer(){
    let order = JSON.parse(localStorage.getItem('order'))
    console.log(order.length)
    orderTable = '<div class="order-heading">ID</div>' +
                '<div class="order-heading">Tên khách hàng</div>' +
                '<div class="order-heading">Đơn hàng</div>' +
                '<div class="order-heading">Số điện thoại</div>' +
                '<div class="order-heading">Địa chỉ</div>' +
                //'<div class="order-heading">Tổng tiền</div>' +
                '<div class="order-heading">Tình trạng</div>'
    let id = 1;
    for(let i=0; i<order.length; i++){
        orderTable += '<div class="order-heading">' + (id++) + '</div>' +
        '<div class="order-heading">' + order[i].name + '</div>' +
        '<div class="order-heading">' + order[i].name + '</div>' +
        '<div class="order-heading">' + order[i].phone + '</div>' +
        '<div class="order-heading">' + order[i].address + '</div>' +
        '<div class="order-heading">' + order[i].address + '</div>'
    }
    console.log(orderTable)
    document.getElementById('render-order').innerHTML = orderTable
}
























