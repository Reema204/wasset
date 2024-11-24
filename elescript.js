document.addEventListener('DOMContentLoaded', () => {
    // Sorting functionality
    const sortDropdown = document.getElementById('sort');
    const productGrid = document.getElementById('product-grid');
    const products = Array.from(productGrid.children);

    sortDropdown.addEventListener('change', () => {
        const sortValue = sortDropdown.value;
        let sortedProducts;

        if (sortValue === 'name-asc') {
            sortedProducts = products.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        } else if (sortValue === 'name-desc') {
            sortedProducts = products.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
        } else if (sortValue === 'price-asc') {
            sortedProducts = products.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } else if (sortValue === 'price-desc') {
            sortedProducts = products.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        }

        sortedProducts.forEach(product => productGrid.appendChild(product));
    });

    // Quantity control functionality
    productGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-btn')) {
            const quantitySpan = event.target.previousElementSibling;
            let quantity = parseInt(quantitySpan.textContent, 10);
            quantitySpan.textContent = ++quantity;
        } else if (event.target.classList.contains('decrease-btn')) {
            const quantitySpan = event.target.nextElementSibling;
            let quantity = parseInt(quantitySpan.textContent, 10);
            if (quantity > 1) {
                quantitySpan.textContent = --quantity;
            }
        }
    });

    // Add to cart functionality
    const viewCartButton = document.getElementById('view-cart-button');
    viewCartButton.addEventListener('click', () => {
        const selectedProducts = [];
        const checkboxes = document.querySelectorAll('.add-to-cart-checkbox');

        checkboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                const productItem = products[index];
                const name = productItem.querySelector('h2').textContent;
                const price = productItem.querySelector('p').textContent.replace(/[^0-9.]/g, ''); // Extract numeric price
                const quantity = parseInt(productItem.querySelector('.quantity').textContent, 10);
                const image = productItem.querySelector('img').src; // Get product image

                // Check if product already exists in the cart
                const existingProductIndex = selectedProducts.findIndex(item => item.name === name);
                if (existingProductIndex > -1) {
                    selectedProducts[existingProductIndex].quantity += quantity; // Update quantity
                } else {
                    selectedProducts.push({ name, price, quantity, image }); // Add new product
                }
            }
        });

        if (selectedProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(selectedProducts));
            alert('Products added to cart!');
            window.location.href = 'Cart.html'; // Redirect to Cart page
        } else {
            alert('Please select at least one product to add to the cart.');
        }
    });
});

