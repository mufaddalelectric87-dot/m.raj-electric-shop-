document.getElementById('year').textContent = new Date().getFullYear();

const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('#product-grid .product-card');
const catalogueTitle = document.getElementById('catalogue-title');
const catalogueCount = document.getElementById('catalogue-count');

const categoryNames = {
  all: 'All Items',
  lights: 'Lights',
  fans: 'Fans',
  wires: 'Wires & Cables',
  accessories: 'Accessories',
  appliances: 'Appliances',
  electrical: 'Electrical Items'
};

function filterProducts(category) {
  let visibleCount = 0;

  productCards.forEach((card) => {
    const show = category === 'all' || card.dataset.category === category;
    card.hidden = !show;
    if (show) visibleCount += 1;
  });

  catalogueTitle.textContent = categoryNames[category] || categoryNames.all;
  catalogueCount.textContent = `${visibleCount} items`;

  filterButtons.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => filterProducts(button.dataset.filter));
});

filterProducts('all');
