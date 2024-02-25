const cardContainer = document.querySelector(".main-container");
const id = new URLSearchParams(window.location.search).get("id");



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
    const { title, thumbnail, description, category, price, id, images, rating, discountPercentage } = product;
    cardEl.innerHTML = `
    <div class = "card-wrapper">
    <div class = "card">
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          ${images.map((image)=> {
            return ` <img src = "${image}" alt = "shoe image">`
          })}
        </div>
      </div>
      <div class = "img-select">
      ${images.map((image, index)=> {
       return `
       <div class = "img-item">
         <a href = "#" data-id = "${index+1}">
           <img src = "${image}" alt = "shoe image">
         </a>
       </div>
       `
      }).join("")}
        
      </div>
    </div>
    <!-- card right -->
    <div class = "product-content">
      <h2 class = "product-title">${title}</h2>
      <a href = "#" class = "product-link">visit nike store</a>
      <div class = "product-rating">
      <div class="star-rating">

      ${(() => {
        let starsHTML = '';
        for (let i = 1; i < rating; i++) {
            starsHTML += `<input type="radio" id="star5" name="rating" value="5"><label for="star5"></label>`;
        }
        return starsHTML;
      })()}
    </div>
        <span>${rating}</span>
      </div>

      <div class = "product-price">
        <p class = "last-price">Old Price: <span>$${price}</span></p>
        <p class = "new-price">New Price: <span>$${(price - price * Math.floor(discountPercentage)/100).toFixed()} (${Math.floor(discountPercentage)}%)</span></p>
      </div>

      <div class = "product-detail">
        <h2>about this item: </h2>
        <p>${description}</p>
        <ul>
          <li>Color: <span>Black</span></li>
          <li>Available: <span>in stock</span></li>
          <li>Category: <span>${category}</span></li>
          <li>Shipping Area: <span>All over the world</span></li>
          <li>Shipping Fee: <span>Free</span></li>
        </ul>
      </div>

      <div class = "purchase-info">
        <input type = "number" min = "0" value = "1">
        <button type = "button" class = "btn">
          Add to Cart <i class = "fas fa-shopping-cart"></i>
        </button>
        <button type = "button" class = "btn">Compare</button>
      </div>

      
    </div>
    </div>
  </div>`;
    cardContainer.appendChild(cardEl);

    
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;
    
    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });
    
    function slideImage(){
        const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
    
    window.addEventListener('resize', slideImage);
};