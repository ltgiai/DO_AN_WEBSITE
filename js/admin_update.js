/*=============================================================================================================================================== */
/*====================================================== TAB CHUYỂN TRANG & SPINNER ============================================================= */
/*=============================================================================================================================================== */
//Change tab
let navtabs = document.querySelectorAll('.admin-container');
    navtabs.forEach(item => {
        item.addEventListener('click',function(event){
            if(event.target.classList.contains('nav-item')){
                let lastActive = item.querySelector('.active');
                let newActive = event.target;
                
    
                lastActive.classList.remove('active');
                newActive.classList.add('active');

                let lastContentActive = item.querySelector('.tab.active');
                let newContentActive = document.getElementById(newActive.dataset.target);
                lastContentActive.classList.remove('active');
                newContentActive.classList.add('active');
            }
        });
    }
);

//Load Spinner
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");

        loader.classList.add("loader-hidden");
        
        loader.addEventListener("transitionend", () => {
            document.body.removeChild("loader");
        })
    })

/*============================================================================================================================================== */
/*=========================================================== TAB DANH SÁCH SẢN PHẨM =========================================================== */
/*============================================================================================================================================== */
//Phương thức size
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

//Phương thức check input rỗng
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

//phương thức đọc file hình ảnh cho sản phẩm 
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

//Thêm sản phẩm vào DANH SÁCH SẢN PHẨM 
function addItem(){
    document.querySelector(".frm-input-product").style.display = 'block'
    document.querySelector(".overlay-admin-frm-inp-products").style.display = 'block' 
    // document.querySelector(".overlay-admin-frm-inp-products").style.background = 'linear-gradient(#AFF1DA,#F9EA8F)'
    document.querySelector(".overlay-admin-frm-inp-products").style.backgroundColor = 'whitesmoke'
    document.querySelector(".update-submit-btn").style.display = 'none'
    document.querySelector(".add-submit-btn").style.display = 'block'
    document.querySelector(".frm-input-product-heading").innerHTML = 
    `<span>ADD PRODUCTS</span>
    <img src="../img/icon/icon_close.png">`

    document.querySelector(".add-submit-btn").onclick = () =>{
        let products = JSON.parse(localStorage.getItem('products'))
        let item_id = document.getElementById('item-id').value
        let item_type = document.getElementById('item-type').value
        let item_name = document.getElementById('item-name').value.trim()
        let item_price = document.getElementById('item-price').value
        let item_descript = document.getElementById('item-descript').value.trim()
        let item_size = addSizeItem(document.querySelector(".init-size"))
        let isError = checkInfoEmptyError([
            {name: "ID sản phẩm", value: item_id},
            {name: "Tên sản phẩm", value: item_name},
            {name: "Loại", value: item_type},
            {name: "Size", value: item_size},
            {name: "Giá sản phẩm", value: item_price},
        ])
        
        if(isError){}
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
                display: true
            }
            let dupliID = false;
            let dupliName = false;
            let i = 0;
            while((!dupliID && !dupliName) && i<products.length) {
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
                return
            }
            if(dupliName){
                alert("Tên sản phẩm đã tồn tại !")
                return
            }

            if(!dupliID && !dupliName){
                products.push(item)
                localStorage.setItem('products',JSON.stringify(products))
                
                document.querySelector(".frm-input-product-msg").style.display = 'block'
                document.querySelector(".frm-input-product-msg").innerText = 'Product was added succesfully'
                setTimeout( 
                    function(){
                       document.querySelector(".frm-input-product-msg").style.display = 'none'
                    }, 5000)
                
                getAllProductsHtml()
                document.getElementById('item-id').value = ''
                document.getElementById('item-type').value = ''
                document.getElementById('item-name').value = ''
                document.getElementById('item-price').value = ''
                document.getElementById('item-img').value = ''
                document.getElementById('item-descript').value = ''
                document.querySelectorAll(`input[type="checkbox"]`).forEach(checkbox => {
                    checkbox.checked = false;
                });
                document.getElementById('preview-img').src = '../img/defaut_img.jpg';
            }
        }
    }
    document.querySelector(".frm-input-product-heading img").onclick = () => {
    document.querySelector(".frm-input-product").style.display = 'none'
    document.querySelector(".overlay-admin-frm-inp-products").style.display = 'none'}
}

// //Chỉnh sửa sản phẩm trong DANH SÁCH SẢN PHẨM
function editItem(){
    let prodItemCheckBox = document.getElementsByName("product-ids[]");
    let updateProductBtn = document.getElementById("updateProductBtn");

    updateProductBtn.onclick = () => {
        let checkItems = [];

        prodItemCheckBox.forEach(checkBoxElem => { 
            if (checkBoxElem.checked) { 
                checkItems.push(checkBoxElem.value);
            } 
        });

        if(!(checkItems.length == 1)){
            alert('Vui lòng chọn tối đa 1 sản phẩm để thực hiện thao tác cập nhật !')
        }
        else{
            document.querySelector(".frm-input-product").style.display = 'block'
            document.querySelector(".overlay-admin-frm-inp-products").style.display = 'block'
            document.querySelector(".overlay-admin-frm-inp-products").style.backgroundColor = 'whitesmoke'
            document.querySelector(".add-submit-btn").style.display = 'none'
            document.querySelector(".update-submit-btn").style.display = 'block'
            document.querySelector(".frm-input-product-heading").innerHTML =
            `<span>EDIT PRODUCT</span>
            <img src="../img/icon/icon_close.png">`

            let productID = parseInt(checkItems[0])
            let productsList = getLocaldata('products');
            let editedProduct = productsList.filter(product => product.id == productID);
            let editedIndex = editedProduct[0].id

            let inputProductID = document.getElementById("item-id")
            let inputProductName = document.getElementById("item-name")
            let inputProductType = document.getElementById("item-type")
            let inputProductPrice = document.getElementById("item-price")
            let inputProductImg = document.getElementById('preview-img')
            let inputProductSize = addSizeItem(document.querySelector(".init-size"))
            let isError = checkInfoEmptyError([
                {name: "ID sản phẩm", value: inputProductID},
                {name: "Tên sản phẩm", value: inputProductName},
                {name: "Loại", value: inputProductType},
                {name: "Giá sản phẩm", value: inputProductPrice},
            ])

            productsList.forEach(product => {
                if(product.id == editedIndex){
                    inputProductID.setAttribute("readonly","true")
                    inputProductID.style.color = 'black'
                    inputProductID.style.backgroundColor = "white"

                    inputProductID.value = product.id
                    inputProductName.value = product.name
                    inputProductType.value = product.type
                    inputProductPrice.value = product.price
                    inputProductImg.src = product.img
                    return
                }
            })
            
            document.querySelector(".update-submit-btn").onclick = () => {
                if(isError){}
                else{
                    productsList[editedIndex-1].name = inputProductName.value;
                    productsList[editedIndex-1].type = inputProductType.value;
                    productsList[editedIndex-1].price = inputProductPrice.value;
                    productsList[editedIndex-1].img = inputProductImg.src;

                    localStorage.setItem('products',JSON.stringify(productsList))
                    document.querySelector(".frm-input-product-msg").style.display = 'block'
                    document.querySelector(".frm-input-product-msg").innerText = 'Product was updated succesfully'
                    setTimeout( function(){document.querySelector(".frm-input-product-msg").style.display = 'none'}, 5000)
                    getAllProductsHtml()

                    inputProductID.value = ""
                    inputProductName.value = ""
                    inputProductType.value = ""
                    inputProductPrice.value = ""
                    inputProductImg.src = "../img/defaut_img.jpg"
                }
            }
            document.querySelector(".frm-input-product-heading img").onclick = () => {
            inputProductID.removeAttribute("readonly")
            document.querySelector(".frm-input-product").style.display = 'none'
            document.querySelector(".overlay-admin-frm-inp-products").style.display = 'none'}        
        }
    }
}

// //Phương thức xóa sản phẩm bất kì trong DANH SÁCH SẢN PHẨM
function deleteItem() {
    let prodItemCheckBox = document.getElementsByName("product-ids[]");
    let removeProductBtn = document.getElementById("removeProduct");

    removeProductBtn.onclick = () => {
        let productsList = getLocaldata('products');
        let checkItems = [];

        prodItemCheckBox.forEach(checkBoxElem => { if (checkBoxElem.checked) { checkItems.push(checkBoxElem.value);} });

        if(checkItems.length === 0){
            alert("Vui lòng chọn sản phẩm để thực hiện thao tác xóa !")
        }
        else{
            let confirmed = confirm('Bạn muốn xóa sản phẩm này đúng không ?');
            if (confirmed) {
                checkItems.forEach(removeItemId => { productsList = productsList.filter(product => product.id.toString() !== removeItemId)});
                localStorage.setItem('products', JSON.stringify(productsList));
                getAllProductsHtml()
            }
        }
    };
}

function getAllProductsHtml(){
    let productsList = getLocaldata('products')
    renderProductsHtml(productsList)
}

//Xuất ra DANH SÁCH SẢN PHẨM 
function renderProductsHtml(tempProductArray){
    let product_container = document.querySelector('.product-dtb-container');
    product_container.innerHTML = `
    <div class="dtb-heading">
        <div class="heading-item"> 
            <input type="checkbox" name="" id="product-chkbox-all">
            <label for="product-chkbox-all"></label>
        </div>
        <div class="heading-item"> 
            <span>Item ID</span> 
            <img src="../img/icon/up-down.png" onclick="sortProducts()" id="sortProdID"> 
        </div>
        <div class="heading-item"> 
            <span>Item Name</span> 
            <img src="../img/icon/up-down.png" onclick="sortProducts()" id="sortProdName"> 
        </div>
        <div class="heading-item"> 
            <span>Item Image</span> 
        </div>
        <div class="heading-item"> 
            <span>Item Type</span> 
            <img src="../img/icon/up-down.png" onclick="sortProducts()" id="sortProdType"> 
        </div>
        <div class="heading-item"> 
            <span>Item Price</span> 
            <img src="../img/icon/up-down.png" onclick="sortProducts()" id="sortProdPrice"> 
        </div>
        <div class="heading-item">Status</div>
    </div>`
    
    tempProductArray.forEach(obj => {
        let product_dtb_record = document.createElement('div')
        product_dtb_record.setAttribute("class","dtb-record")
        product_container.appendChild(product_dtb_record)
    
        let product_chkbox = document.createElement('div')
        product_chkbox.setAttribute("class","record-item")
        product_chkbox.innerHTML = `
        <input type="checkbox" name="product-ids[]" class="product-chkbox-item" value="${obj.id}">`
        product_dtb_record.appendChild(product_chkbox)
    
        let product_id = document.createElement('div')
        product_id.setAttribute("class", "record-item")
        product_id.innerText = obj.id
        product_dtb_record.appendChild(product_id)
    
        let product_name = document.createElement('div')
        product_name.setAttribute("class", "record-item")
        product_name.innerText = obj.name
        product_dtb_record.appendChild(product_name)
    
        let product_img = document.createElement('div')
        let item_img = document.createElement('img')
        product_img.setAttribute("class", "record-item")
        item_img.setAttribute("class", "item-img")
        item_img.setAttribute("src", obj.img) 
        product_img.appendChild(item_img)
        product_dtb_record.appendChild(product_img)        
    
        let product_type = document.createElement('div')
        product_type.setAttribute("class", "record-item")
        product_type.innerText = obj.type
        product_dtb_record.appendChild(product_type)

        let product_price = document.createElement('div')
        product_price.setAttribute("class", "record-item")
        product_price.innerText = obj.price
        product_dtb_record.appendChild(product_price)
    
        let product_status = document.createElement('div')
        product_status.setAttribute("class", "record-status-display")
        if(obj.display){
            product_status.innerHTML = `
            <div class="status-display">Displayed</div>`
            product_dtb_record.appendChild(product_status) 
        }
        else{
            product_status.innerHTML = `
            <div class="status-undisplay">Undisplayed</div>`
            product_dtb_record.appendChild(product_status)
        }
    });  
    handleProductStatus()
    handleProductCheckBox()  
}

function handleProductStatus(){
    let prodItemCheckBox = document.getElementsByName("product-ids[]");
    let setProductStatus = document.getElementById("set-status-product");
    // let setDisplay = document.querySelector('.record-status-display')

    setProductStatus.onchange = function() {
        let productsList = getLocaldata('products')
        let checkItems = []
    
        prodItemCheckBox.forEach(checkBoxElem => {
            if (checkBoxElem.checked) { 
                checkItems.push(checkBoxElem.value);
            }
        })

        productsList.forEach(product => {
            if(checkItems.includes(product.id.toString())){
                if(setProductStatus.value === 'displayed'){
                    product.display = true
                }
                else{
                    product.display = false
                }
            }
        })
        
        let check_msg = document.querySelector(".product-search-right-msg")
        check_msg.style.display = 'block'
        check_msg.innerText = `${checkItems.length} items display status were set up. Please check for confirming !`
        setTimeout(function(){
            check_msg.style.display = 'none'
        },5000)
        setProductStatus.value = 'Product Status'
        localStorage.setItem('products', JSON.stringify(productsList));
        getAllProductsHtml()
    }
}

//Phương thức xử lí logic checkbox
function handleProductCheckBox(){
    let productCheckAll = document.getElementById("product-chkbox-all");
    let productCheckList = document.getElementsByName("product-ids[]");
    
    productCheckAll.onchange = () => {
        let isCheckedAll = productCheckAll.checked;
        productCheckList.forEach(checkBoxItem => {
            checkBoxItem.checked = isCheckedAll;
        });
    };

    // Thêm sự kiện onchange cho mỗi hộp kiểm con để cập nhật trạng thái của "check all"
    productCheckList.forEach(checkBoxElem => {
        checkBoxElem.onchange = () => {
            let isCheckedAll = true;
            // Kiểm tra xem tất cả các hộp kiểm con có được chọn không
            for (let i = 0; i < productCheckList.length; i++) {
                if (!productCheckList[i].checked) {
                    isCheckedAll = false;
                    break;
                }
            }
            productCheckAll.checked = isCheckedAll;
        };
    });
}

//Tìm kiếm sản phẩm trong DANH SÁCH SẢN PHẨM
function handleProductSearchData(){
    let searchBtn = document.getElementById("product-srch-btn")
    let searchInp = document.getElementById("product-srch-input")

    searchBtn.onclick = function(){
        let productsList = getLocaldata('products')
        let usersList = getLocaldata('users')
        let searchData = []
        
        if(searchInp.value === ""){
            getAllProductsHtml()
        }
        else{
            productsList.forEach(product => {
                handleSearchData(product, product.name, searchInp, searchData)
                handleSearchData(product, product.id, searchInp, searchData)
                handleSearchData(product, product.type, searchInp, searchData)
                handleSearchData(product, product.price, searchInp, searchData)
                handleSearchData(product, product.display, searchInp, searchData)
            })
            usersList.forEach(user => {
                handleSearchData(user, user.username, searchInp, searchData)
                handleSearchData(user, user.email, searchInp, searchData)
                handleSearchData(user, user.typeUser, searchInp, searchData)
            })
            renderProductsHtml(searchData)
            renderUsersHtml(searchData)
        }    
    }
}
handleProductSearchData()

function handleSearchData(item, attribute, searchInp, searchData){       
    let searchValue = searchInp.value.toString().toUpperCase()
    if(attribute.toString().toUpperCase().includes(searchValue)){
        searchData.push(item)
    }
}

let sortOrderID = 'asc'; // Mặc định là tăng dần
let sortOrderName = 'asc';
let sortOrderType = 'asc';              
let sortOrderPrice = 'asc';

function sortProducts() {
    let sortProdId = document.getElementById("sortProdID")
    let sortProdName = document.getElementById("sortProdName")
    let sortProdType = document.getElementById("sortProdType")
    let sortProdPrice = document.getElementById("sortProdPrice")
    let productsList = getLocaldata('products');

    // Đảo ngược thứ tự sắp xếp khi người dùng nhấn nút
    sortOrderID = sortOrderID === 'asc' ? 'desc' : 'asc';
    sortOrderName = sortOrderName === 'asc' ? 'desc' : 'asc';
    sortOrderType = sortOrderType === 'asc' ? 'desc' : 'asc';
    sortOrderPrice = sortOrderPrice === 'asc' ? 'desc' : 'asc';

    sortProdId.onclick = function(){
        if (sortOrderID === 'asc') {
            productsList.sort((a, b) => a.id - b.id); // Tăng dần theo ID
        } else {
            productsList.sort((a, b) => b.id - a.id); // Giảm dần theo ID
        }
        renderProductsHtml(productsList); // Render lại danh sách sản phẩm đã được sắp xếp
    }

    sortProdName.onclick = function(){
        if (sortOrderName === 'asc') {
            productsList.sort((a, b) => a.name.localeCompare(b.name))
        } else {
            productsList.sort((a, b) => b.name.localeCompare(a.name))
        }
        renderProductsHtml(productsList);
    }

    sortProdType.onclick = function(){
        if (sortOrderType === 'asc') {
            productsList.sort((a, b) => a.type.localeCompare(b.type))
        } else {
            productsList.sort((a, b) => b.type.localeCompare(a.type))
        }
        renderProductsHtml(productsList);
    }

    sortProdPrice.onclick = function(){
        if(sortOrderPrice === 'asc'){
            productsList.sort((a,b) => a.price - b.price)
        } else {
            productsList.sort((a,b) => b.price - a.price)
        }
        renderProductsHtml(productsList);   
    }

}

//======================================== DANH SÁCH NGƯỜI DÙNG ==================================================
function handleUserCheckBox(){
    let userCheckAll = document.getElementById("user-chkbox-all");
    let userCheckList = document.getElementsByName("user-ids[]");

    userCheckAll.onchange = () => {
        let isCheckedAll = userCheckAll.checked;
        userCheckList.forEach(checkBoxItem => {
            checkBoxItem.checked = isCheckedAll;
        });
    };

    // Thêm sự kiện onchange cho mỗi hộp kiểm con để cập nhật trạng thái của "check all"
    userCheckList.forEach(checkBoxElem => {
        checkBoxElem.onchange = () => {
            let isCheckedAll = true;
            // Kiểm tra xem tất cả các hộp kiểm con có được chọn không
            for (let i = 0; i < userCheckList.length; i++) {
                if (!userCheckList[i].checked) {
                    isCheckedAll = false;
                    break;
                }
            }
            userCheckAll.checked = isCheckedAll;
        };
    });
}

function getUsersHtml(){
    let usersList = getLocaldata('users')
    renderUsersHtml(usersList)
}

function renderUsersHtml(usrArray){
    let user_container = document.querySelector('.user-dtb-container');
    let userID = 1;
    user_container.innerHTML = `
    <div class="dtb-heading">
    <div class="heading-item">
    <input type="checkbox" name="" id="user-chkbox-all">
    </div>
    <div class="heading-item">ID</div>
    <div class="heading-item">User Name</div>
    <div class="heading-item">User Email</div>
    <div class="heading-item">User Password </div>
    <div class="heading-item">User Type </div>
    <div class="heading-item">User Orders</div>
    </div>`;

    usrArray.forEach(obj => {
        let user_dtb_record = document.createElement('div')
        user_dtb_record.setAttribute("class","dtb-record")
        user_container.appendChild(user_dtb_record)

        let user_chkbox = document.createElement('div')
        user_chkbox.setAttribute("class","record-item")
        user_chkbox.innerHTML = `
        <input type="checkbox" name="user-ids[]" 
        class="user-chkbox-item" value="${userID}">`
        user_dtb_record.appendChild(user_chkbox)

        let user_id = document.createElement('div')
        user_id.setAttribute("class", "record-item")
        user_id.innerText = userID++
        user_dtb_record.appendChild(user_id)

        let user_name = document.createElement('div')
        user_name.setAttribute("class", "record-item")
        user_name.innerText = obj.username
        user_dtb_record.appendChild(user_name)

        let user_email = document.createElement('div')
        user_email.setAttribute("class", "record-item")
        user_email.innerText = obj.email
        user_dtb_record.appendChild(user_email)        

        let user_password = document.createElement('div')
        user_password.setAttribute("class", "record-item")
        user_password.innerText = obj.password
        user_dtb_record.appendChild(user_password)

        let user_type = document.createElement('div')
        user_type.setAttribute("class", "record-item")
        user_type.innerText = obj.typeUser
        user_dtb_record.appendChild(user_type)

        let user_order = document.createElement('div')
        user_order.setAttribute("class", "record-item")
        user_order.innerText = 50
        user_dtb_record.appendChild(user_order)        
    });
    handleUserCheckBox()
}

function deleteUser() {
    let userItemCheckBox = document.getElementsByName("user-ids[]");
    let removeUserBtn = document.getElementById("removeUser");

    removeUserBtn.onclick = () => {
        let usersList = getLocaldata('users');
        let checkItems = [];

        userItemCheckBox.forEach(checkBoxElem => { if (checkBoxElem.checked) { checkItems.push(checkBoxElem.value);} });

        console.log(checkItems)
        if(checkItems.length === 0){
            alert("Vui lòng chọn tài khoản để thực hiện thao tác xóa !")
        }
        else{
            let confirmed = confirm('Bạn muốn xóa người dùng này đúng không ?');
            if (confirmed) {
                checkItems.forEach(removeItemId => { usersList = usersList.filter(user => user.id.toString() !== removeItemId)});
                localStorage.setItem('users', JSON.stringify(usersList));
                renderUsersHtml();
            }
        }
    };
}

//========================================== DANH SÁCH ĐƠN HÀNG ==================================================
function editSizeItem(size){
    let checkboxs = document.querySelectorAll(`.init-size-item input[type="checkbox"]`)
    size.forEach(value => {
        checkboxs.forEach(checkbox => {
            if (value == checkbox.value) {
                checkbox.checked = true;
            }
        })
    })
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
                if((startDate === "" || orderDate >= new Date(startDate)) 
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

    document.getElementById('start-date').value = "";
    document.getElementById('end-date').value = "";
}

updateTotalRevenue();

document.getElementById("syn-submit-btn").addEventListener("click", function() {
    updateTotalRevenue();
})

