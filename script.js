document.getElementById('year').textContent = new Date().getFullYear();

const cart = [];
const phone = '919275900352';

document.querySelectorAll('.product-card').forEach(card => {
  const btn = document.createElement('button');
  btn.textContent = 'Add to Cart';
  btn.onclick = () => {
    cart.push(card.querySelector('h3').textContent);
    alert('Added to cart!');
  };
  card.appendChild(btn);
});

const order = document.createElement('button');
order.textContent = 'Order on WhatsApp';
order.onclick = () => {
  if (!cart.length) return alert('Your cart is empty!');
  const message = 'Hello M. RAJ ELECTRIC! I want to order:\n' + cart.join('\n');
  window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(message));
};
document.body.appendChild(order);
