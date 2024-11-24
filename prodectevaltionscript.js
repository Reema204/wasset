document.addEventListener('DOMContentLoaded', () => {
    const orderDropdown = document.getElementById('order-dropdown');
    const submitButton = document.querySelector('.button-container button[type="button"]');
    const feedbackTextarea = document.querySelector('.feedback');

    submitButton.addEventListener('click', () => {
        const selectedOrder = orderDropdown.value;
        const userRating = getSelectedRating();

        if (!selectedOrder) {
            alert('Please select an order from the dropdown list.');
            return;
        }

        if (!userRating) {
            alert('Please select a rating score.');
            return;
        }

        alert(`Thank you for your feedback!\nYour rating for product ${selectedOrder} is ${userRating} stars.`);

        window.location.href = 'Home Page.html';
    });

    function getSelectedRating() {
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        for (let input of ratingInputs) {
            if (input.checked) {
                return input.value;
            }
        }
        return null; // No rating selected
    }
});
