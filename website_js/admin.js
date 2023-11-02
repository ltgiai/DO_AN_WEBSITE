var data = []

function addItem(){
    var item_id = document.getElementById('item-id').value
    var item_type = document.getElementById('item-type').value
    var item_name = document.getElementById('item-name').value
    var item_price = document.getElementById('item-price').value
    var item ={
        ID : item_id,
        type: item_type,
        name: item_name,
        price: item_price
    }

    if(item.ID == ''){
        alert("Vui long nhap ID")
    }
    else{
        for(let i=0; i<products.length; i++){
            if(item.ID == products[i].ID){
                alert("ID bi trung lap")
                break
            }
            else{
                products.unshift(item)
                break
            }
        }
        show()
    }
}

function deleteItem(x){
    let text = confirm("Bạn muốn xóa sản phẩm này đúng không ?")
    for(let i=0; i<products.length; i++){
        if(products[i].ID == x){
            products.splice(i,1);
        }
    }
    show()
}

function show(){
    table = '<div class="heading-name">ID</div>' +
    '<div class="heading-name">Hình ảnh</div>' +
    '<div class="heading-name">Tên</div>' +
    '<div class="heading-name">Thể loại</div>' +
    '<div class="heading-name">Đơn giá</div>' +
    '<div class="heading-name">Chức năng</div>'
    
    for(let i=0; i<products.length; i++){
        table += '<div class="table-content"><span>' + products[i].ID + '</span></div>'
         + '<div class="table-content table-img"><img src="' + products[i].img + '"></div>'
         + '<div class="table-content"><span>' + products[i].name + '</span></div>'
         + '<div class="table-content"><span>' + products[i].type + '</span></div>'
         + '<div class="table-content"><span>' + products[i].price + '</span></div>'
         + '<div class="table-content table-btn">' +
                    '<button class="btn" onclick="editItem()">Edit</button>' +
                    '<button class="btn" onclick="deleteItem(' + products[i].ID + ')">Delete</button>' +
                '</div>'
    }
    document.getElementById('render').innerHTML = table;
}

function findItem(){
    table = '<div class="heading-name">ID</div>' +
    '<div class="heading-name">Hình ảnh</div>' +
    '<div class="heading-name">Tên</div>' +
    '<div class="heading-name">Thể loại</div>' +
    '<div class="heading-name">Đơn giá</div>' +
    '<div class="heading-name">Chức năng</div>'
    var findID = prompt("Tim ID")
    for(let i=0; i<products.length; i++){
        if(products[i].ID == findID){
            table += '<div class="table-content"><span>' + products[i].ID + '</span></div>'
         + '<div class="table-content table-img"><img src="' + products[i].img + '"></div>'
         + '<div class="table-content"><span>' + products[i].name + '</span></div>'
         + '<div class="table-content"><span>' + products[i].type + '</span></div>'
         + '<div class="table-content"><span>' + products[i].price + '</span></div>'
         + '<div class="table-content table-btn">' +
                    '<button class="btn">Edit</button>' +
                    '<button class="btn" onclick="deleteItem(' + products[i].ID + ')">Delete</button>' +
                '</div>'
        }
    }
    document.getElementById('render').innerHTML = table;
}

function resetForm(){
    document.getElementById('item-id').value=''
    document.getElementById('item-type').value=''
    document.getElementById('item-name').value=''
    document.getElementById('item-price').value=''
}

function editItem(){
    alert("Chinh sua san pham")
    var item_name = prompt("Nhap ten") 
    var item_type = prompt("Nhap the loai") 
    var item_price = prompt("Nhap price") 
}


function sortItem(){
    products.ID.sort
}



