document.addEventListener('DOMContentLoaded', () => {
    const sortDropdown = document.getElementById('sort');
    const productGrid = document.getElementById('product-grid');
    const cartButton = document.getElementById('view-cart-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Handle sorting
    sortDropdown.addEventListener('change', () => {
        const selectedOption = sortDropdown.value;
        let products = Array.from(productGrid.children);

        if (selectedOption === 'name-asc') {
            products.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        } else if (selectedOption === 'name-desc') {
            products.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        } else if (selectedOption === 'price-asc') {
            products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } else if (selectedOption === 'price-desc') {
            products.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        }

        // Re-arrange products in the grid
        products.forEach(product => productGrid.appendChild(product));
    });

    // Handle quantity changes
    productGrid.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('decrease-btn')) {
            const quantitySpan = target.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity--;
                quantitySpan.textContent = quantity;
            }
        } else if (target.classList.contains('increase-btn')) {
            const quantitySpan = target.previousElementSibling;
            let quantity = parseInt(quantitySpan.textContent);
            quantity++;
            quantitySpan.textContent = quantity;
        }
    });

    // Handle adding to cart
    productGrid.addEventListener('change', (event) => {
        if (event.target.classList.contains('add-to-cart-checkbox')) {
            const productItem = event.target.closest('.product-item');
            const productName = productItem.querySelector('h2').textContent;
            const productPrice = productItem.querySelector('p').textContent;
            const productImage = productItem.querySelector('img').src; // Get the product image
            const quantity = parseInt(productItem.querySelector('.quantity').textContent);

            if (event.target.checked) {
                // Check if the product already exists in the cart
                const existingProductIndex = cart.findIndex(item => item.name === productName);
                if (existingProductIndex > -1) {
                    cart[existingProductIndex].quantity += quantity; // Update quantity
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        image: productImage, // Add image to the cart data
                        quantity: quantity
                    });
                }
            } else {
                const index = cart.findIndex(item => item.name === productName);
                if (index > -1) {
                    cart.splice(index, 1);
                }
            }
        }
    });

    // Handle viewing the cart
    cartButton.addEventListener('click', () => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Products successfully added to the cart!');
            window.location.href = 'Cart.html'; // Redirect to the cart page
        } else {
            alert('Please select at least one product to add to the cart.');
        }
    });
});




