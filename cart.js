document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        let totalCost = 0;

        cart.forEach((item, index) => {
            totalCost += parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-content">
                    <img src="${item.image || 'default-image.png'}" alt="${item.name}" class="cart-item-image">
                    <div>
                        <h2>${item.name}</h2>
                        <p>Price: ${item.price}</p>
                        <p>Quantity: 
                            <button class="decrease-btn" data-index="${index}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-btn" data-index="${index}">+</button>
                        </p>
                        <button class="delete-btn" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        const totalCostElement = document.createElement('p');
        totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
        cartItemsContainer.appendChild(totalCostElement);

        const clearCartButton = document.createElement('button');
        clearCartButton.textContent = 'Clear Cart';
        clearCartButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear the cart?')) {
                clearCart();
            }
        });
        cartItemsContainer.appendChild(clearCartButton);

        const checkoutButton = document.createElement('button');
        checkoutButton.textContent = 'Check Out';
        checkoutButton.addEventListener('click', checkout);
        cartItemsContainer.appendChild(checkoutButton);
    }

    // Function to update quantity
    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase-btn')) {
            const index = event.target.dataset.index;
            cart[index].quantity++;
        } else if (event.target.classList.contains('decrease-btn')) {
            const index = event.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        } else if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            if (confirm('Are you sure you want to remove this item?')) {
                cart.splice(index, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    });

    // Function to clear the cart
    function clearCart() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Function to handle checkout
    function checkout() {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        let totalCost = cart.reduce((sum, item) => sum + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity, 0);
        alert(`Thank you for your purchase! Your total cost is $${totalCost.toFixed(2)}`);
        localStorage.removeItem('cart');
        window.location.href = 'Product evaluation.html'; // Redirect to evaluation page
    }

    // Initial render
    renderCart();
});
