/*================ hamburger menu ==================*/
let hamburgerIcon = document.querySelector("#hamburger-icon");
let navLinks = document.querySelector(".nav-links");

hamburgerIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburgerIcon.innerHTML = navLinks.classList.contains("active")
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

/*============== slidre ===================*/
const track = document.querySelector(".banner");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const dotsContainer = document.querySelector(".dots");

let index = 0;
const totalSlides = slides.length;
let autoPlayInterval;

function updateCarousel() {
  // Update slide position
  track.style.transform = `translateX(${-index * 100}%)`;

  // Update dots
  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(i) {
  index = i;
  updateCarousel();
  resetAutoPlay();
}

function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 3000);
}

// Initialize dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

// Add event listeners
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  resetAutoPlay();
});

// Start autoplay
resetAutoPlay();

/*================ products ==================*/

       document.querySelector(".product-grid").innerHTML = `
    <div class="loading-spinner">
        <div class="spinner"></div>
        <p>Product loading...</p>
    </div>
`;
const api = "https://68f27698b36f9750deecb93f.mockapi.io/gift";
fetch(api)
  .then((response) => response.json())
  .then((data) => {
    // Clear loading spinner
    document.querySelector(".product-grid").innerHTML = "";

    data.forEach((product) => {
      const currentPrice = Math.ceil(product.price - (product.price * product.percentage) / 100);
      const originalPrice = Math.ceil(product.price);

      document.querySelector(".product-grid").innerHTML += `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}">
          <div class="product-info">
            <span>${product.category}</span>
            <span>☆ ${product.rating}</span>
          </div>
          <hr>
          <h3>${product.title}</h3>
          <div class="price-section">
            <p class="price">₹${currentPrice}</p>
            <div class="original-price-container">
              <span class="original-price">₹${originalPrice}</span> <span class="discount">(${product.percentage}% OFF)</span>
            </div>
          </div>
          <div class="content">
            <button onclick="viewProduct(${product.id})">
              <p>→ Details</p>
            </button>
          </div>
          <button class="add-to-cart">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      `;
    });
  });

// Function to navigate to product details page
function viewProduct(productId) {
  window.location.href = `product.html?&id=${productId}`;
}
