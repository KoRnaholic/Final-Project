
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

const createProductCard = (product) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("row");

    const topRated = product.sort((a, b)=> b.rating - a.rating)

    cardEl.innerHTML = `
        ${topRated.map((product) => {
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
                                    <a href="">Buy Now</a>
                                </div>
                                <a href="" class="cart">Add to Cart</a>
                            </div>
                        </div>
                        
                        </div>`;
        }).join("")}
    `;

    cardContainer.appendChild(cardEl);
};

function showDetails(id) {
    window.location.href = `details.html?id=${id}`;
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
