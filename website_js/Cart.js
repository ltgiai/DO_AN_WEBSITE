document.getElementById("showCart").style.display="none";

var cart = new Array();

function addtoCart(x) {
    const productDiv = x.closest('.row');
    const image = productDiv.querySelector('img').src;
    const name = productDiv.querySelector('.name-product').innerText;
    const price = productDiv.querySelector('.price').innerText;
    const quantity = parseInt(productDiv.querySelector('.quantity-input').value);
    const iceInput = productDiv.querySelector('.ice-input');
    const sugarInput = productDiv.querySelector('.sugar-input');
    const ice = parseInt(iceInput.value);
    const sugar = parseInt(sugarInput.value);
    var kt = false;
    const product = {
        image: image,
        name: name,
        price: price,
        quantity: quantity,
        ice: ice,
        sugar : sugar,
    };
    for(let i = 0; i < cart.length; i++){
        if(cart[i].name === name){
            kt = true;
            cart[i].quantity += parseInt(quantity);
            break;
        }
    }
    if(!kt){
        cart.push(product);
    }

    // cart.push(product);
    console.log(cart);
    localStorage.setItem('cart',JSON.stringify(cart));
}

function showMycart() {
    let infoCart = '';
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const totalPrice = parseFloat(product.price) * product.quantity;
        total += totalPrice;

        infoCart += `
            <tr>
                <td><img src="${product.image}" alt="${product.name}"></td>
                <td>${product.name} <br> Đá:  ${product.ice} <br> Đường: ${product.sugar}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td>
                    <div>${totalPrice}.000Đ</div>
                </td>
                <td>
                    <button style="width:100%; background-color:black; margin:0;" onclick="deleteProduct(${i})">Xóa</button>
                </td>
            </tr>`;
    }

    infoCart += `
        <tr>
            <th colspan="4">Tổng đơn hàng</th>
            <th>
                <div>${total}.000Đ</div>
            </th>
        </tr>`;

    document.getElementById("myCart").innerHTML = infoCart;
}

function deleteProduct(index){
    if(index >= 0 && index < cart.length){
        cart.splice(index,1);
        showMycart();
        localStorage.setItem('cart',JSON.stringify(cart));
    }
}

function deleteAll() {
    cart = [];
    showMycart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart(){
    var x = document.getElementById("showCart")
    if(x.style.display=="block"){
        x.style.display="none";
    }
    else{
        x.style.display="block";
    }
    showMycart();
}
document.addEventListener('DOMContentLoaded', function () {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        let infoCart = '';
        let total = 0;

        for (let i = 0; i < cart.length; i++) {
            const product = cart[i];
            const totalPrice = parseFloat(product.price) * product.quantity;
            total += totalPrice;
            infoCart += `
                <tr>
                    <td><img src="${product.image}" alt="${product.name}"></td>
                    <td>${product.name} <br> Đá:  ${product.ice} <br> Đường: ${product.sugar}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price}</td>
                    <td>
                        <div>${totalPrice}.000Đ</div>
                    </td>
                </tr>`;
        }

        infoCart += `
            <tr>
                <th colspan="4">Tổng đơn hàng</th>
                <th>
                    <div>${total}.000Đ</div>
                </th>
            </tr>`;
        document.getElementById("myCart").innerHTML = infoCart;
    }
});
