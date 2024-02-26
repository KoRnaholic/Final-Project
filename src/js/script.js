
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

    cardEl.innerHTML = `
        ${product.map((product) => {
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
    // Example: You can redirect to a details page with the product ID in the query string
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
    cardContainer.innerHTML = ''
    
    const response = await fetch(`https://dummyjson.com/products/search?q=${input.value}`);
    const data = await response.json();
    const { products } = data;
    createProductCard(products);
    input.value= ""
    buttonContainer.innerHTML = ''
})

