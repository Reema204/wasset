document.addEventListener('DOMContentLoaded', () => {
    const offersContainer = document.getElementById('offersContainer');
    const noProductsMessage = document.getElementById('noProductsMessage');

    // Retrieve products from local storage
    const products = JSON.parse(localStorage.getItem('sellerProducts')) || [];

    // Function to create a product card
    function createProductCard(product) {
        const productCard = document.createElement('div');
        productCard.classList.add('offer');

        productCard.innerHTML = `
            <img src="${product.photo}" alt="${product.name}" class="offer-img">
            <h3>${product.name}</h3>
            <p><strong>$${product.salePrice || product.regularPrice}</strong></p>
            <button>Edit</button>
        `;

        return productCard;
    }

    // Check if there are products to display
    if (products.length > 0) {
        noProductsMessage.style.display = 'none'; // Hide the "No products" message

        // Display each product
        products.forEach(product => {
            const productCard = createProductCard(product);
            offersContainer.appendChild(productCard);
        });
    } else {
        // Display "No products" message
        noProductsMessage.style.display = 'block';
    }
});

// زر لتنظيف localStorage
const clearButton = document.getElementById('clearLocalStorage'); // تأكد من أن لديك زر بـ ID "clearLocalStorage"

// وظيفة لتنظيف localStorage
clearButton.addEventListener('click', () => {
    localStorage.clear(); // تنظيف localStorage
    location.reload(); // إعادة تحميل الصفحة لتحديث العرض
});
