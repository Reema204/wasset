document.addEventListener('DOMContentLoaded', () => {
    // Display the current week's date
    function displayWeekStartDate() {
        const today = new Date();
        const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = firstDayOfWeek.toLocaleDateString('en-US', options);
        document.getElementById('week-date').textContent = `Week starts on: ${formattedDate}`;
    }

    // Load more offers functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    let offersLoaded = false;

    loadMoreBtn.addEventListener('click', () => {
        const offersContainer = document.getElementById('offers-container');
        if (!offersLoaded) {
            const additionalOffers = `
            <!-- Offer 6: Designer Lamp -->
            <div class="offer">
                <img src="home8.webp" alt="Designer Lamp" class="offer-img">
                <h3>Designer Lamp</h3>
                <p>Modern lamp with a sleek and artistic design. Perfect for adding light and style to your home.</p>
                <p><del>200 $</del> <strong>180 $</strong></p>
                <p><span style="color: red;">Discount: 10% off</span></p>
                <button>View Details</button>
            </div>
        
            <!-- Offer 7: Modern Armchair -->
            <div class="offer">
                <img src="home1.webp" alt="Modern Armchair" class="offer-img">
                <h3>Modern Armchair</h3>
                <p>Elegant armchair with a contemporary design. A perfect addition to any living space.</p>
                <p><del>600 $</del> <strong>520 $</strong></p>
                <p><span style="color: red;">Discount: 15% off</span></p>
                <button>View Details</button>
            </div>
        
            <!-- Offer 8: Smart Speaker -->
            <div class="offer">
                <img src="ele8.webp" alt="Smart Speaker" class="offer-img">
                <h3>Smart Speaker</h3>
                <p>Immerse yourself in high-quality sound with this modern smart speaker. Perfect for your home entertainment needs.</p>
                <p><del>500 $</del> <strong>450 $</strong></p>
                <p><span style="color: red;">Discount: 10% off</span></p>
                <button>View Details</button>
            </div>
        
            <!-- Offer 9: Hydrating Lipstick -->
            <div class="offer">
                <img src="beauty3.png.webp" alt="Hydrating Lipstick" class="offer-img">
                <h3>Hydrating Lipstick</h3>
                <p>Moisturizing lipstick that keeps your lips hydrated and smooth all day long. Available in a variety of shades.</p>
                <p><del>20 $</del> <strong>15 $</strong></p>
                <p><span style="color: red;">Discount: 25% off</span></p>
                <button>View Details</button>
            </div>
        `;
        
        
            offersContainer.insertAdjacentHTML('beforeend', additionalOffers);
            offersLoaded = true;
            loadMoreBtn.style.display = 'none'; // Hide the button after loading offers
        }
    });

    // Show review details on hover
    const productNames = [
        'Decorative Pillow',
        'Sleek Smartphone',
        'Ultra HD Smart TV',
        'Elegant Perfume',
        'Hydrating Lipstick',
        'Designer Lamp',
        'Modern Armchair',
        'Smart Speaker'
    ];

    const reviews = document.querySelectorAll('.review');
    reviews.forEach((review, index) => {
        review.addEventListener('mouseover', () => {
            const randomProduct = productNames[Math.floor(Math.random() * productNames.length)];
            const reviewDetails = document.createElement('div');
            reviewDetails.style.position = 'absolute';
            reviewDetails.style.backgroundColor = '#fff';
            reviewDetails.style.padding = '10px';
            reviewDetails.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
            reviewDetails.style.borderRadius = '5px';
            reviewDetails.innerHTML = `
                <p><strong>Customer:</strong> ${review.querySelector('h3').textContent}</p>
                <p><strong>Product:</strong> ${randomProduct}</p>
                <p><strong>Rating:</strong> ${review.querySelector('.rating').textContent.trim()}</p>
                <p><strong>Feedback:</strong> ${review.querySelector('p').textContent}</p>
            `;
            review.appendChild(reviewDetails);
            review.addEventListener('mouseleave', () => {
                review.removeChild(reviewDetails);
            });
        });
    });

    displayWeekStartDate();
});
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const headersAndFooters = document.querySelectorAll('header, footer');
        headersAndFooters.forEach(el => el.classList.toggle('dark-theme'));

        themeToggleBtn.textContent = body.classList.contains('dark-theme') ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    });
});

