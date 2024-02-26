// Assuming cardContainer is already defined as the container where you want to append the product cards
const cardContainer = document.querySelector(".main-container");

// Example API_URL
const API_URL = "https://dummyjson.com/products";

const fetchProducts = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    const { products } = data;
    console.log(products);
    createProductCard(products);
};
fetchProducts();

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


