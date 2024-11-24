document.addEventListener('DOMContentLoaded', () => {
    // Sort products
    const sortBySelect = document.getElementById('sort-by');
    const productGrid = document.getElementById('product-grid');

    sortBySelect.addEventListener('change', () => {
        const sortValue = sortBySelect.value;
        const products = Array.from(productGrid.querySelectorAll('.product-item'));

        products.sort((a, b) => {
            if (sortValue === 'name-asc') {
                return a.dataset.name.localeCompare(b.dataset.name);
            } else if (sortValue === 'name-desc') {
                return b.dataset.name.localeCompare(a.dataset.name);
            } else if (sortValue === 'price-asc') {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            } else if (sortValue === 'price-desc') {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            }
        });

        products.forEach(product => productGrid.appendChild(product));
    });

    // Manage quantity
    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-btn')) {
            const quantitySpan = e.target.previousElementSibling;
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
        } else if (e.target.classList.contains('decrease-btn')) {
            const quantitySpan = e.target.nextElementSibling;
            if (parseInt(quantitySpan.textContent) > 1) {
                quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
            }
        }
    });

    // Add to cart functionality
    const viewCartButton = document.getElementById('view-cart-button');
    viewCartButton.addEventListener('click', () => {
        const selectedProducts = [];
        const checkboxes = productGrid.querySelectorAll('.add-to-cart-checkbox');

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const productItem = checkbox.closest('.product-item');
                const productName = productItem.querySelector('h2').textContent;
                const productPrice = productItem.querySelector('p').textContent;
                const quantity = productItem.querySelector('.quantity').textContent;
                const productImage = productItem.querySelector('img').src; 

                selectedProducts.push({
                    name: productName,
                    price: productPrice,
                    quantity: parseInt(quantity),
                    image: productImage 
                });
            }
        });

        if (selectedProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(selectedProducts));
            alert('Products added to cart!');
            window.location.href = 'Cart.html'; // Redirect to cart page
        } else {
            alert('Please select at least one product to add to the cart.');
        }
    });
});
