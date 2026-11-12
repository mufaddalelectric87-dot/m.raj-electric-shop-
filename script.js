-
(() => {
  "use strict";

  const SERVICE_ID = "service_yw8782y";
  const TEMPLATE_ID = "template_v6b06u1";
  const PUBLIC_KEY = "s9eyXoUbiYU_TyH4";

  let cart = [];

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const style = document.createElement("style");
  style.textContent = `
    #shop-cart-btn {
      position:fixed; bottom:20px; right:18px; z-index:9998;
      background:#102b46; color:white; border:0;
      padding:14px 20px; border-radius:30px;
      font-weight:bold; box-shadow:0 4px 15px #0003;
      cursor:pointer;
    }
    #shop-cart {
      display:none; position:fixed; inset:0; z-index:9999;
      background:#0009; justify-content:center; align-items:center;
      padding:15px;
    }
    #shop-cart.open { display:flex; }
    .cart-box {
      background:white; color:#172b40; width:100%;
      max-width:440px; max-height:85vh; overflow:auto;
      border-radius:15px; padding:20px;
    }
    .cart-item {
      display:flex; justify-content:space-between;
      align-items:center; gap:10px;
      padding:12px 0; border-bottom:1px solid #ddd;
    }
    .cart-item button { padding:6px 10px; margin:2px; }
    .cart-box input {
      width:100%; box-sizing:border-box; padding:12px;
      margin:7px 0; border:1px solid #ccc; border-radius:7px;
    }
    .cart-action {
      background:#102b46; color:white; border:0;
      padding:13px; border-radius:7px; width:100%;
      margin-top:10px; cursor:pointer;
    }
    .cart-action:disabled { opacity:.65; cursor:wait; }
    .add-cart-btn {
      background:#102b46; color:white; border:0;
      padding:10px 15px; border-radius:6px;
      margin-top:10px; cursor:pointer;
    }
    #cart-message { margin-top:12px; line-height:1.7; overflow-wrap:anywhere; }
    #cart-message a { color:#102b46; font-weight:bold; }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML("beforeend", `
    <button id="shop-cart-btn" type="button">
      🛒 Cart (<span id="cart-count">0</span>)
    </button>
    <div id="shop-cart">
      <div class="cart-box">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <h2>Your Cart</h2>
          <button id="close-cart" type="button">✕</button>
        </div>
        <div id="cart-items"></div>
        <h3 id="cart-total">Estimated total: ₹0</h3>
        <p style="font-size:12px">Final prices will be confirmed by the shop.</p>
        <form id="checkout-form">
          <input name="customer_name" placeholder="Your name" required>
          <input name="customer_phone" type="tel"
            placeholder="Your WhatsApp number" required>
          <button class="cart-action" id="place-order" type="submit">
            Place Order
          </button>
        </form>
        <div id="cart-message" role="status"></div>
      </div>
    </div>
  `);

  const panel = document.getElementById("shop-cart");
  const itemsArea = document.getElementById("cart-items");
  const countArea = document.getElementById("cart-count");
  const totalArea = document.getElementById("cart-total");
  const messageArea = document.getElementById("cart-message");

  document.getElementById("shop-cart-btn").onclick = () => {
    panel.classList.add("open");
    renderCart();
  };

  document.getElementById("close-cart").onclick = () => {
    panel.classList.remove("open");
  };

  panel.addEventListener("click", event => {
    if (event.target === panel) panel.classList.remove("open");
  });
  function getPrice(card) {
    const text = card.querySelector(".price")?.textContent || "";
    const match = text.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : null;
  }

  function renderCart() {
    itemsArea.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      count += item.qty;
      if (item.price !== null) total += item.price * item.qty;

      const row = document.createElement("div");
      row.className = "cart-item";

      const details = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = item.name;

      const price = document.createElement("div");
      price.textContent = item.price === null
        ? "Price to confirm"
        : "₹" + item.price.toLocaleString("en-IN");

      details.append(name, price);

      const controls = document.createElement("div");

      function addControl(label, action) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = label;
        button.onclick = action;
        controls.appendChild(button);
      }

      addControl("−", () => changeQty(index, -1));

      const quantity = document.createElement("span");
      quantity.textContent = " " + item.qty + " ";
      controls.appendChild(quantity);

      addControl("+", () => changeQty(index, 1));
      addControl("✕", () => {
        cart.splice(index, 1);
        renderCart();
      });

      row.append(details, controls);
      itemsArea.appendChild(row);
    });

    if (!cart.length) itemsArea.textContent = "Your cart is empty.";

    countArea.textContent = count;
    totalArea.textContent =
      "Estimated total: ₹" + total.toLocaleString("en-IN");
  }

  function changeQty(index, amount) {
    if (!cart[index]) return;
    cart[index].qty += amount;
    if (cart[index].qty <= 0) cart.splice(index, 1);
    renderCart();
  }

  document.querySelectorAll(".product-card").forEach(card => {
    if (card.querySelector(".add-cart-btn")) return;

    const button = document.createElement("button");
    button.type = "button";
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
      setTimeout(() => button.textContent = "Add to Cart", 1200);
    };

    card.appendChild(button);
  });
  // Load EmailJS
  const emailReady = new Promise((resolve, reject) => {
    if (window.emailjs) {
      window.emailjs.init({ publicKey: PUBLIC_KEY });
      resolve();
      return;
    }

    const emailScript = document.createElement("script");
    emailScript.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

    emailScript.onload = () => {
      if (!window.emailjs) {
        reject(new Error("EmailJS library did not load."));
        return;
      }

      window.emailjs.init({ publicKey: PUBLIC_KEY });
      resolve();
    };

    emailScript.onerror = () =>
      reject(new Error("Could not load EmailJS. Check your internet connection."));

    document.head.appendChild(emailScript);
  });

  function makeOrderId() {
    const d = new Date();
    const date = [
      d.getFullYear(),
      String(d.getMonth() + 1).padStart(2, "0"),
      String(d.getDate()).padStart(2, "0")
    ].join("");

    return "MRAJ-" + date + "-" +
      Math.floor(1000 + Math.random() * 9000);
  }

  document.getElementById("checkout-form").onsubmit =
    async function(event) {
      event.preventDefault();

      if (!cart.length) {
        messageArea.textContent = "Your cart is empty.";
        return;
      }

      const form = new FormData(event.currentTarget);
      const customerName =
        String(form.get("customer_name") || "").trim();

      const rawPhone =
        String(form.get("customer_phone") || "").replace(/\D/g, "");

      let phone = rawPhone;
      if (phone.length === 10) phone = "91" + phone;

      if (!customerName || !/^91[6-9]\d{9}$/.test(phone)) {
        messageArea.textContent =
          "Please enter your name and a valid Indian WhatsApp number.";
        return;
      }

      const submit = document.getElementById("place-order");
      submit.disabled = true;
      submit.textContent = "Sending order...";
      messageArea.textContent = "Please wait...";

      const orderId = makeOrderId();

      const orderItems = cart.map(item =>
        item.name + " x " + item.qty + " - " +
        (item.price === null
          ? "Price to confirm"
          : "₹" + (item.price * item.qty).toLocaleString("en-IN"))
      ).join("\n");

      const total = cart.reduce((sum, item) =>
        sum + (item.price || 0) * item.qty, 0);
      const confirmation =
        "Hello " + customerName +
        "! Your order at M. RAJ ELECTRIC has been received.\n\n" +
        "Order ID: " + orderId + "\n\n" +
        "Items:\n" + orderItems + "\n\n" +
        "Estimated Total: ₹" + total.toLocaleString("en-IN") +
        "\nThank you!";

      const customerLink =
        "https://wa.me/" + phone +
        "?text=" + encodeURIComponent(confirmation);

      try {
        await emailReady;

        await window.emailjs.send(SERVICE_ID, TEMPLATE_ID, {
          customer_name: customerName,
          customer_phone: phone,
          order_items: orderItems,
          order_total: "Estimated ₹" + total.toLocaleString("en-IN"),
          order_date: new Date().toLocaleString("en-IN"),
          order_id: orderId,
          customer_whatsapp_link: customerLink
        });

        messageArea.innerHTML = "";

        const success = document.createElement("strong");
        success.textContent = "Order received successfully!";

        const id = document.createElement("p");
        id.textContent = "Confirmation ID: " + orderId;

        const link = document.createElement("a");
        link.href = customerLink;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = "Open WhatsApp confirmation";

        messageArea.append(success, id, link);

        cart = [];
        renderCart();
        event.currentTarget.reset();

      } catch (error) {
        console.error("Order error:", error);

        messageArea.textContent =
          "EMAIL ERROR: " +
          (error?.text || error?.message || String(error));
      }

      submit.disabled = false;
      submit.textContent = "Place Order";
    };

  renderCart();
})();
