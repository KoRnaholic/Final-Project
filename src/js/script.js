
const cardContainer = document.querySelector(".main-container");
 const category_api = "https://dummyjson.com/products/category/"
 const buttonContainer = document.querySelector(".button-container")
const API_URL = "https://dummyjson.com/products?skip=1&limit=9";
let page = 0;
const fetchProducts = async (page) => {
    const response = await fetch(`https://dummyjson.com/products?skip=${page}&limit=9`);
    const data = await response.json();
    const { products } = data;
    console.log(products);
    createProductCard(products);
};
fetchProducts(page);


let cartProducts=[];




const createProductCard = (product) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("row");

    const topRated = product.sort((a, b)=> b.rating - a.rating)

    cardEl.innerHTML = `
    ${topRated.map((product) => {
            // let productObject = {id:product.id, thumbnail:product.thumbnail, price:product.price}
            // console.log(productObject)
            const { title, thumbnail, description, price, id,rating, discountPercentage
            } = product;
            return `<div class="card">
                        <img src="${thumbnail}" alt="" />
                        <span class="flag-discount">${discountPercentage.toFixed()}% Off</span>
                        <div class="card-body">
                            <div class="info">
                                <div class="card-title">
                                    <h4>${title}</h4>
                                    <h3 class="price">$${price}</h3>
                                </div>
                                <div class="view-btn">
                                    <a href="#" onClick="showDetails(${id})">View Details</a>
                                    <div class="Stars" style="--rating: ${rating};"></div>
                                    <span>${rating.toFixed(1)}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <p>${description}</p>
                            <div class="btn-group">
                                <div class="btn">
                                    <a href="#" onClick="goToCheckout(${id})">Buy Now</a>
                                </div>
                                <a href="#" onClick="event.preventDefault();addToCart('${title}','${id}','${thumbnail}','${price}');showToast()" class="add-cart">Add to Cart</a>
                            </div>
                        </div>
                        
                        </div>`;
        }).join("")


    
    }
    `;

    cardContainer.appendChild(cardEl);
    
};

function showToast() {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = '✅ Successfully added to the Cart!';
    toastContainer.appendChild(toast);

    toast.style.display = 'block';


    setTimeout(() => {
        toast.remove();
    }, 3000);
}


function addToCart(title, id, thumbnail, price, ) {
    let item = { title, id, thumbnail, price };
    cartProducts.push(item);
    updateCartDisplay();

cartQuantity = document.querySelector(".cart-quantity");
cartQuantity.innerHTML= `${cartProducts.length}`
}

function removeFromCart(id) {
    cartProducts = cartProducts.filter(item => item.id !== id);
    updateCartDisplay();
    cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerHTML= `${cartProducts.length}`
}

function updateCartDisplay() {
    let cartHtmlContent = "";
    let totalPrice = 0;
    for (const item of cartProducts) {
        cartHtmlContent += `
            <div class="cart-item">
                <span class="remove-item" onclick="removeFromCart('${item.id}')">&times;</span>
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
            </div>
            
        `;
        totalPrice += parseInt(item.price);
    }

    const cartHtml = document.querySelector(".cart-items");
    cartHtml.innerHTML = cartHtmlContent;

    const totalHtml = document.querySelector(".cart-total");
    console.log(totalHtml)
    totalHtml.innerHTML = `Total: $${totalPrice}`;
}










function showDetails(id) {
    window.location.href = `details.html?id=${id}`;
}
function goToCheckout(id) {
    window.location.href = `checkout.html?id=${id}`;
}


const button = document.querySelector(".next-button");
button.addEventListener("click", (e)=> {
 e.preventDefault();
 page +=6;

 fetchProducts(page)
})

const category = document.getElementById("category");

category.addEventListener("change", async(e)=> {
    e.preventDefault();

    cardContainer.innerHTML = ''
    const response = await fetch(`${category_api}${category.value}`);
    const data = await response.json();
    const { products } = data;
    console.log(products);
    createProductCard(products);
    buttonContainer.innerHTML = ''
})


searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async ()=> {
    let input = document.querySelector(".search-input")
    if(input.value === ""){
       return
    }
    cardContainer.innerHTML = ''
    
    const response = await fetch(`https://dummyjson.com/products/search?q=${input.value}`);
    const data = await response.json();
    const { products } = data;
    if(products.length<1){
        cardContainer.innerHTML="<div class='not-found'>❌ No Products found!</div>"
    }

    createProductCard(products);
    input.value= ""
    buttonContainer.innerHTML = ''
})

const nav = document.querySelector(".nav-box")
const btnOpen= document.querySelector(".btn-open-nav");
btnOpen.addEventListener("click", ()=> {
    nav.style.display="block"
})

const btnCloseEl = document.querySelector('.btn-close-nav')
btnCloseEl.addEventListener('click', function () {
    nav.style.display="none"
})

function handleDisplayBasedOnWidth() {
    if (window.innerWidth >= 1000) {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
}

// Initial call to set display based on window width
handleDisplayBasedOnWidth();

// Listen for window resize events
window.addEventListener("resize", handleDisplayBasedOnWidth);


document.addEventListener("DOMContentLoaded", function () {
    // Start the loop
    startImageLoop();


    // Add event listeners to dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(imageLoopInterval);
            hideAllGroups();
            currentGroupIndex = index;
            showGroup(groups[currentGroupIndex]);
            updateDotColors();
            startImageLoop();
        });
    });
});

var currentGroupIndex = 0;
var groups;
var dots;
var imageLoopInterval;

function moveToNextGroup() {
    hideAllGroups();
    currentGroupIndex = (currentGroupIndex + 1) % groups.length;
    showGroup(groups[currentGroupIndex]);
    updateDotColors();
}

function moveToPreviousGroup() {
    hideAllGroups();
    currentGroupIndex = (currentGroupIndex - 1 + groups.length) % groups.length;
    showGroup(groups[currentGroupIndex]);
    updateDotColors();
}

function startImageLoop() {
    // Get all groups
    groups = document.querySelectorAll(".custom-group");

    // Get all dots
    dots = document.querySelectorAll('.dot');

    // Show the initial group
    showGroup(groups[currentGroupIndex]);
    updateDotColors();

    // Repeat the loop after showing all groups
    imageLoopInterval = setInterval(moveToNextGroup, 3000); // Automatically move to the next group every 3 seconds
}

function hideAllGroups() {
    groups.forEach(function (group) {
        hideGroup(group);
    });
}

function hideGroup(group) {
    var images = group.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        images[i].style.opacity = "0";
    }
}

function showGroup(group) {
    var images = group.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        images[i].style.opacity = "1";
    }
}

function updateDotColors() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentGroupIndex);
    });
}


const cart = document.getElementById('cart');

function toggleCart() {
    cart.classList.toggle('open');
}

function checkout() {
    // Add your checkout logic here
   let newproducts = JSON.stringify(cartProducts)
   if(cartProducts.length <1 ){
    return
   }
    window.location.href = `checkout.html?id=${newproducts}`;
    
}
