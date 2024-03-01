const productList = document.querySelector(".product-list");
const id = new URLSearchParams(window.location.search).get("id");
const parsedId = JSON.parse(id)

if(Array.isArray(parsedId)){
    console.log(parsedId)
    let totalPrice = 0;
    parsedId.map((product) => {
            const cardEl = document.createElement("div");
            cardEl.classList.add("row");
            const { title, thumbnail,  price, id } = product;
            cardEl.innerHTML = `
                    <li class="product-item">
                        <img src="${thumbnail}" alt="Product 1">
                        <div class="product-info">
                            <h3>${title}</h3>
                            </div>
                            <p>$${price}</p>
                    </li>
                    `;
        productList.appendChild(cardEl);
        totalPrice += parseInt(price);
           
        });
        document.querySelector(".total-price").innerHTML=`$ ${totalPrice}`
    } else{

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
            const { title, thumbnail, price, id } = product;
            cardEl.innerHTML = `
            <li class="product-item">
            <img src="${thumbnail}" alt="Product 1">
            <div class="product-info">
                <h3>${title}</h3>
                </div>
                <p>$${price}</p>
        </li>`;
        productList.appendChild(cardEl);
        document.querySelector(".total-price").innerHTML=`$ ${price}`
           
        };
}

function showToast() {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerText = '✅ Your order has been successfully placed!';
    toastContainer.appendChild(toast);

    toast.style.display = 'block';


    setTimeout(() => {
        toast.remove();
    }, 3000);
}



