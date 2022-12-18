const cartArray = [];
function showProducts(productsObj) {
   const list = document.getElementById("list--wrapper");
        list.innerHTML= "";
    for (let i = 0; i < productsObj.products.length; i++) {
        const product = productsObj.products[i];
        const stringProduct = JSON.stringify(product);
        const productItems = document.createElement("li");
        productItems.classList.add("cat__image--wrapper");
        productItems.innerHTML = `
        <div class="cat__image">
        <img src="${product.thumbnail}">
        <div class="best">Best Seller</div>
        </div>
        <button data-product="${stringProduct}" class="photograph--btn cart-btn">ADD TO CART</button>
        <ul class="photo__list--wrapper">
            <li>${product.category}</li>
            <li>${product.title}</li>
            <li>$${product.price}</li>
        </ul>
    `
    list.appendChild(productItems);
    }
    addEventToCartButtons();
}
function getProducts() {
    const responsePromise = fetch('https://dummyjson.com/products')
    responsePromise.then(response => response.json()).then(products => showProducts(products));
}

/*function showNewProducts(productsObj) {
    const list = document.getElementById("list--wrapper");
    list.innerHTML = " ";
    
    for (let i = 0; i < productsObj.products.length; i++) {
        const product = productsObj.products[i];
        const productItems = document.createElement("li");
        productItems.classList.add("cat__image--wrapper");
        productItems.innerHTML = `
        <div class="cat__image">
        <img src="${product.thumbnail}">
        <div class="best">Best Seller</div>
        </div>
        <button class="photograph--btn cart-btn">ADD TO CART</button>
        <ul class="photo__list--wrapper">
            <li>${product.category}</li>
            <li>${product.title}</li>
            <li>${product.price}</li>
        </ul>
        `
        list.appendChild(productItems);
    }
}*/

function filterProductByCategory(e) {
    console.log(e.target.value)
    const categoryList = document.querySelector(".category__list");
    fetch(`https://dummyjson.com/products/category/${e.target.value}`).then(response => response.json()).then(products => showProducts(products));
}

function showCatergories(categories) {
    let category;
    const categoryList = document.querySelector(".category__list");
    for(let i = 0; i < categories.length; i++) {
        category = categories[i];
        const categoryListItem = document.createElement("li");
        categoryListItem.classList.add("catergory__list--item");
        categoryListItem.innerHTML = `
            <input type="checkbox" class="input category-input" id=${category} value=${category}>
            <label for=${category}>${category}</label>
        `
        categoryList.appendChild(categoryListItem); 
    }
    document.querySelectorAll('.category-input').forEach(item => {
        item.addEventListener('change', filterProductByCategory)
    })
}

function getCategories() {
    fetch('https://dummyjson.com/products/categories').then(response => response.json())
    .then(categories => showCatergories(categories));
} 

function productCounter() {
    document.getElementById("count-product").innerText = cartArray.length;
}
function addToCart(e) {
    const product = e.target.getAttribute("data-product");
    //console.log(product);
    cartArray.push(product);
    //console.log(cartArray);
    productCounter();
}
function addEventToCartButtons() {
    const buttons = document.querySelectorAll(".cart-btn");
    //console.log(buttons);
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.addEventListener("click", addToCart);
        console.log(button);
    }
    /*const button = buttons.forEach(item => {
        item.addEventListener("click", addToCart);
    });
    console.log(button);*/
    
}

getCategories();
getProducts();