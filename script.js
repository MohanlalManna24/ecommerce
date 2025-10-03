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
Promise.all([
  fetch("https://fakestoreapi.com/products").then((res) => res.json()),
  fetch("https://dummyjson.com/products").then((res) => res.json()),
]).then(([fakeData, dummyData]) => {
  // console.log(fakeData);
  // console.log(dummyData);
  let fullData = "";

  // 🔹 FakeStore Products
  fakeData.forEach((element) => {
    const currentPrice = Math.ceil(element.price * 88.86);
    const originalPrice = Math.ceil(element.price * 88.86 * 1.5);

    fullData += `
       <div class="product-card">
                <img src="${element.image}" alt="${element.title}">
                <div class="product-info">
                    <span>${element.category}</span>
                    <span>☆ ${element.rating.rate}</span>
                </div>
                <hr>
                <h3>${element.title}</h3>
                <div class="price-section">
                    <p class="price">₹${currentPrice}</p>
                    <span class="original-price">₹${originalPrice}</span>
                </div>
                <div class="content">
                    <button onclick="viewProduct('fake', ${element.id})">
                        <p>→ Details</p>
                    </button>
                </div>
                <button class="add-to-cart">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
  });

  // 🔹 DummyJSON Products
  dummyData.products.forEach((element) => {
    const currentPrice = Math.ceil(element.price * 88.86);
    const originalPrice = Math.ceil(element.price * 1.3) * 88.86;
    
    fullData += `
         <div class="product-card">
                <img src="${element.images[0]}" alt="${element.title}">
                <div class="product-info">
                    <span>${element.category}</span>
                    <span>☆ ${element.rating}</span>
                </div>
                <hr>
                <h3>${element.title}</h3>
                <div class="price-section">
                    <p class="price">₹${currentPrice}</p>
                    <span class="original-price">₹${originalPrice}</span>
                </div>
                <div class="content">
                    <button onclick="viewProduct('dummy', ${element.id})">
                        <p>→ Details</p>
                    </button>
                </div>
                <button class="add-to-cart">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
  });
  // Display all products in the product-grid
  document.querySelector(".product-grid").innerHTML = fullData;
});

// Function to navigate to product details page
function viewProduct(source, productId) {
  // Redirect to product.html with URL parameters
  window.location.href = `product.html?source=${source}&id=${productId}`;
}
