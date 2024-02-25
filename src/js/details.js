const cardContainer = document.querySelector(".main-container");
const id = new URLSearchParams(window.location.search).get("id");
console.log(id)

// Example API_URL
const API_URL = "https://dummyjson.com/products";

const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    // const { products } = data;
    console.log(data);
    createProductCard(data);
};
fetchProducts();

const createProductCard = (product) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("row");
    const { title, thumbnail, description, price, id } = product;
    cardEl.innerHTML = 
           `<div class="card">
                        <img src="${thumbnail}" alt="" />
                        <div class="card-body">
                            <div class="info">
                                <div class="card-title">
                                    <h4>${title}</h4>
                                    <h3>$${price}</h3>
                                </div>
                                <div class="view-btn">
                                    <a href="#" ">View Details</a>
                                </div>
                            </div>
                            <hr />
                            <p>${description}</p>
                            <div class="btn-group">
                                <div class="btn">
                                    <a href="">Buy Now</a>
                                </div>
                                <a href="">Add to Cart</a>
                            </div>
                        </div>
                    </div>`;
    ;

    cardContainer.appendChild(cardEl);

    
};