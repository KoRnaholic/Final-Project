const cardContainer = document.querySelector(".main-container");
const id = new URLSearchParams(window.location.search).get("id");

const API_URL = "https://dummyjson.com/products";

const fetchProducts = async () => {
  try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
          throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      console.log(data);
      createProductCard(data);
  } catch (error) {
      console.error(error);
  }
};

fetchProducts();

const createProductCard = (product) => {
    const cardEl = document.createElement("div");
    cardEl.classList.add("row");
    const { title,  description, category, price, images, rating, discountPercentage, stock, brand } = product;
    cardEl.innerHTML = `
    <div class = "card-wrapper">
    <div class = "card">
    <div class = "product-imgs">
      <div class = "img-display">
        <div class = "img-showcase">
          ${images.map((image)=> {
            return ` <img src = "${image}" alt = "shoe image">`
          }).join("")}
        </div>
      </div>
      <div class = "img-select">
      ${images.map((image, index)=> {
       return `
       <div class = "img-item">
         <a href = "#" data-id = "${index+1}">
           <img src = "${image}" alt = "image">
         </a>
       </div>
       `
      }).join("")}
        
      </div>
    </div>
    <!-- card right -->
    <div class = "product-content">
      <h2 class = "product-title">${title}</h2>
      <a href = "#" class = "product-link">Brand: ${brand}</a>
      <div class = "product-rating">
      
    <div class="Stars" style="--rating: ${rating};"></div>
    <span>${rating.toFixed(1)}</span>
      </div>

      <div class = "product-price">
        <p class = "last-price">Old Price: <span>$${price}</span></p>
        <p class = "new-price">New Price: <span>$${(price - price * Math.floor(discountPercentage)/100).toFixed()} (${Math.floor(discountPercentage)}%)</span></p>
      </div>

      <div class = "product-detail">
        <h2>about this item: </h2>
        <p>${description}</p>
        <ul>
          <li>✅ Available: <span>in stock (${stock})</span></li>
          <li>✅ Category: <span>${category}</span></li>
          <li>✅ Shipping Area: <span>All over the world</span></li>
          <li>✅ Shipping Fee: <span>Free</span></li>
        </ul>
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
