document.getElementById("year").textContent = new Date().getFullYear();

const SERVICE_ID = "service_yw8782y";
const TEMPLATE_ID = "template_v6b06u1";
const PUBLIC_KEY = "WajVmpw9S7DfXMoUA";
const PHONE = "919275900352";

let cart = [];

const style = document.createElement("style");
style.textContent = `
#shop-cart-btn{position:fixed;bottom:20px;right:18px;z-index:9999;background:#102b46;color:white;border:0;padding:14px 20px;border-radius:30px;font-weight:bold;box-shadow:0 4px 15px #0003}
#shop-cart{position:fixed;inset:0;background:#0008;z-index:10000;display:none;justify-content:center;align-items:center;padding:15px}
#shop-cart.open{display:flex}
.cart-box{background:white;color:#172b40;width:100%;max-width:430px;max-height:85vh;overflow:auto;border-radius:15px;padding:20px}
.cart-box button{cursor:pointer}
.cart-item{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid #ddd}
.cart-item button{padding:5px 10px}
.cart-box input{width:100%;box-sizing:border-box;padding:12px;margin:7px 0;border:1px solid #ccc;border-radius:7px}
.cart-action{background:#102b46;color:white;border:0;padding:12px;border-radius:7px;width:100%;margin-top:10px}
.add-cart-btn{background:#102b46;color:white;border:0;padding:10px 15px;border-radius:6px;margin-top:10px}
#cart-message{font-size:14px;margin-top:10px}
`;
document.head.appendChild(style);

document.body.insertAdjacentHTML("beforeend", `
<button id="shop-cart-btn">🛒 Cart (<span id="cart-count">0</span>)</button>
<div id="shop-cart">
  <div class="cart-box">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h2>Your Cart</h2>
      <button id="close-cart">✕</button>
    </div>
    <div id="cart-items"></div>
    <h3 id="cart-total">Estimated total: ₹0</h3>
    <p style="font-size:12px">Final prices will be confirmed by the shop.</p>
    <form id="checkout-form">
      <input name="customer_name" placeholder="Your name" required>
      <input name="customer_phone" placeholder="Your phone number" type="tel" required>
      <button class="cart-action" type="submit" id="place-order">Place Order</button>
    </form>
    <p id="cart-message"></p>
  </div>
</div>
`);

const cartPanel = document.getElementById("shop-cart");

document.getElementById("shop-cart-btn").onclick = () => {
  cartPanel.classList.add("open");
  renderCart();
};

document.getElementById("close-cart").onclick = () => {
  cartPanel.classList.remove("open");
};

function getPrice(card) {
  const text = card.querySelector(".price")?.textContent || "";
  const number = text.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return number ? Number(number[0]) : null;
}

function renderCart() {
  const area = document.getElementById("cart-items");
  area.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    count += item.qty;
    if (item.price !== null) total += item.price * item.qty;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div><strong>${item.name}</strong><br>
      ${item.price === null ? "Price to confirm" : "₹" + item.price.toLocaleString("en-IN")}
      </div>
      <div>
        <button data-minus="${index}">−</button>
        ${item.qty}
        <button data-plus="${index}">+</button>
        <button data-remove="${index}">✕</button>
      </div>`;
    area.appendChild(row);
  });

  if (!cart.length) area.textContent = "Your cart is empty.";

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-total").textContent =
    "Estimated total: ₹" + total.toLocaleString("en-IN");
}

document.querySelectorAll(".product-card").forEach(card => {
  const button = document.createElement("button");
  button.className = "add-cart-btn";
  button.textContent = "Add to Cart";
  button.onclick = () => {
    const name = card.querySelector("h3")?.textContent.trim();
    if (!name) return;

    const existing = cart.find(item => item.name === name);
    if (existing) existing.qty++;
    else cart.push({ name, price: getPrice(card), qty: 1 });

    renderCart();
    button.textContent = "Added ✓";
    setTimeout(() => button.textContent = "Add to Cart", 1000);
  };
  card.appendChild(button);
});

document.getElementById("cart-items").onclick = event => {
  const i = Number(event.target.dataset.plus ?? event.target.dataset.minus ?? event.target.dataset.remove);
  if (!Number.isInteger(i) || !cart[i]) return;

  if (event.target.dataset.plus !== undefined) cart[i].qty++;
  if (event.target.dataset.minus !== undefined) cart[i].qty--;
  if (event.target.dataset.remove !== undefined || cart[i].qty <= 0) cart.splice(i, 1);

  renderCart();
};

let emailReady = false;
const emailScript = document.createElement("script");
emailScript.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
emailScript.onload = () => {
  emailjs.init({ publicKey: PUBLIC_KEY });
  emailReady = true;
};
document.head.appendChild(emailScript);

document.getElementById("checkout-form").onsubmit = async event => {
  event.preventDefault();

  const message = document.getElementById("cart-message");
  const submit = document.getElementById("place-order");

  if (!cart.length) {
    message.textContent = "Your cart is empty.";
    return;
  }

  if (!emailReady) {
    message.textContent = "Please wait a moment and try again.";
    return;
  }

  submit.disabled = true;
  submit.textContent = "Sending order...";

  const form = new FormData(event.target);
  const total = cart.reduce((sum, item) =>
    sum + (item.price || 0) * item.qty, 0);

  const items = cart.map(item =>
    `${item.name} × ${item.qty} — ${item.price === null ? "Price to confirm" : "₹" + (item.price * item.qty).toLocaleString("en-IN")}`
  ).join("\n");

  const details = {
    customer_name: form.get("customer_name"),
    customer_phone: form.get("customer_phone"),
    order_items: items,
    order_total: "Estimated ₹" + total.toLocaleString("en-IN"),
    order_date: new Date().toLocaleString("en-IN")
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, details);
    message.textContent = "Order sent! M. RAJ ELECTRIC has been notified by email.";
    cart = [];
    renderCart();
    event.target.reset();
  } catch (error) {
    message.textContent = "Email could not be sent. Please contact us on WhatsApp.";
    console.error(error);
  }

  submit.disabled = false;
  submit.textContent = "Place Order";
};
