const cardContainer = document.querySelector(".main-container");
const API_URL = 'https://dummyjson.com/products'



const fetchProducts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const { products } = data;
        console.log(products);
        createProductCard(products);
    } catch (error) {
        console.error(error);
    }
};

fetchProducts();

let cartProducts=[];

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
                        </div>
                        </div>`;
        }).join("") 
    }
    `;
    cardContainer.appendChild(cardEl);  
};


function showDetails(id) {
    window.location.href = `details.html?id=${id}`;
}