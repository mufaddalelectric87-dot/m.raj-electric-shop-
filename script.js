
(() => {
  "use strict";

  const SERVICE_ID = "service_yw8782y";
  const TEMPLATE_ID = "template_v6b06u1";
  const PUBLIC_KEY = "_4iQ5QHLuPb6X3tc1";
  const SHOP_PHONE = "919275900352";
  const UPI_ID = "Q698380663@ybl";

  let cart = [];
  let currentStep = 1;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------------- STYLES ----------------

  const style = document.createElement("style");

  style.textContent = `
    #shop-cart-btn {
      position:fixed;
      bottom:20px;
      right:18px;
      z-index:9998;
      background:#102b46;
      color:white;
      border:0;
      padding:14px 20px;
      border-radius:30px;
      font-weight:bold;
      box-shadow:0 4px 15px #0003;
      cursor:pointer;
    }

    #shop-cart {
      display:none;
      position:fixed;
      inset:0;
      z-index:9999;
      background:#0009;
      justify-content:center;
      align-items:center;
      padding:12px;
    }

    #shop-cart.open { display:flex; }

    .cart-box {
      background:white;
      color:#172b40;
      width:100%;
      max-width:480px;
      max-height:92vh;
      overflow:auto;
      border-radius:15px;
      padding:20px;
      box-sizing:border-box;
    }

    .cart-item {
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:10px;
      padding:12px 0;
      border-bottom:1px solid #ddd;
    }

    .cart-item button {
      padding:7px 10px;
      margin:2px;
      cursor:pointer;
    }

    .checkout-input {
      width:100%;
      box-sizing:border-box;
      padding:12px;
      margin:7px 0;
      border:1px solid #ccc;
      border-radius:7px;
      font-size:15px;
      background:white;
      color:#172b40;
    }

    .cart-action {
      background:#102b46;
      color:white;
      border:0;
      padding:13px;
      border-radius:7px;
      width:100%;
      margin-top:10px;
      cursor:pointer;
      font-weight:bold;
    }

    .cart-action:disabled {
      opacity:.6;
      cursor:wait;
    }

    .add-cart-btn {
      background:#102b46;
      color:white;
      border:0;
      padding:10px 15px;
      border-radius:6px;
      margin-top:10px;
      cursor:pointer;
    }

    .checkout-step { display:none; }
    .checkout-step.active { display:block; }

    .step-label {
      color:#64748b;
      font-size:13px;
      margin:10px 0 18px;
    }

    .payment-option {
      display:block;
      border:1px solid #d5dce5;
      border-radius:9px;
      padding:13px;
      margin:10px 0;
      cursor:pointer;
    }

    .payment-option input {
      margin-right:8px;
    }

    .checkout-note {
      background:#f1f5f9;
      padding:12px;
      border-radius:8px;
      font-size:13px;
      line-height:1.6;
      margin:12px 0;
    }

    #cart-message {
      margin-top:12px;
      line-height:1.7;
      overflow-wrap:anywhere;
    }

    #cart-message a {
      color:#102b46;
      font-weight:bold;
    }

    .back-button {
      background:#e8edf3;
      color:#172b40;
      border:0;
      padding:12px;
      border-radius:7px;
      width:100%;
      margin-top:8px;
      cursor:pointer;
    }
  `;

  document.head.appendChild(style);

  // ---------------- CART HTML ----------------

  document.body.insertAdjacentHTML("beforeend", `
    <button id="shop-cart-btn" type="button">
      🛒 Cart (<span id="cart-count">0</span>)
    </button>

    <div id="shop-cart">
      <div class="cart-box">

        <div style="display:flex;justify-content:space-between;align-items:center">
          <h2 style="margin:0">Your Cart</h2>
          <button id="close-cart" type="button">✕</button>
        </div>

        <div class="step-label" id="step-label">
          Step 1 of 3 — Your Cart
        </div>

        <section class="checkout-step active" id="step-1">
          <div id="cart-items"></div>

          <h3 id="cart-total">Estimated total: ₹0</h3>

          <p class="checkout-note">
            Catalogue prices are online reference prices only.
            Final selling prices and delivery charges must be
            confirmed by M. RAJ ELECTRIC.
          </p>

          <button class="cart-action" id="to-shipping" type="button">
            Continue to Shipping
          </button>
        </section>

        <section class="checkout-step" id="step-2">
          <h3>Shipping Details</h3>

          <form id="shipping-form">

            <input class="checkout-input"
              name="customer_name"
              placeholder="Full name"
              required>

            <input class="checkout-input"
              name="customer_phone"
              type="tel"
              inputmode="numeric"
              maxlength="10"
              placeholder="10-digit mobile number"
              required>

            <input class="checkout-input"
              name="house"
              placeholder="House / Flat / Building"
              required>

            <input class="checkout-input"
              name="street"
              placeholder="Street / Area"
              required>

            <input class="checkout-input"
              name="city"
              placeholder="City: Morbi or Rajkot"
              required>

            <input class="checkout-input"
              name="state"
              value="Gujarat"
              placeholder="State"
              required>

            <input class="checkout-input"
              name="pincode"
              inputmode="numeric"
              maxlength="6"
              placeholder="6-digit PIN code"
              required>

            <input class="checkout-input"
              name="landmark"
              placeholder="Landmark / Delivery instructions">

            <button class="cart-action" type="submit">
              Continue to Payment
            </button>
          </form>

          <button class="back-button" id="back-to-cart" type="button">
            Back to Cart
          </button>
        </section>

        <section class="checkout-step" id="step-3">
          <h3>Select Payment Method</h3>

          <div id="payment-summary"></div>

          <label class="payment-option">
            <input type="radio" name="payment_method" value="UPI" checked>
            <strong>UPI — 100% Advance</strong>
            <p>Pay the full confirmed product amount through UPI.</p>
          </label>

          <label class="payment-option">
            <input type="radio" name="payment_method" value="COD">
            <strong>Cash on Delivery — 5% Advance</strong>
            <p>Pay 5% of confirmed product value through UPI.
            Pay the remaining 95% on delivery.</p>
          </label>

          <div class="checkout-note">
            <strong>Shop UPI ID:</strong>
            <div style="margin-top:6px">
              Q698380663@ybl
              <button type="button" id="copy-upi">Copy UPI ID</button>
            </div>
            <p>
              Do not pay yet. The displayed catalogue prices are
              estimates. Wait for the shop to confirm the final
              amount and payment instructions.
            </p>
          </div>

          <button class="cart-action" id="submit-order" type="button">
            Submit Order Request
          </button>

          <button class="back-button" id="back-to-shipping" type="button">
            Back to Shipping
          </button>
        </section>

        <div id="cart-message" role="status"></div>

      </div>
    </div>
  `);

  const panel = document.getElementById("shop-cart");
  const itemsArea = document.getElementById("cart-items");
  const countArea = document.getElementById("cart-count");
  const totalArea = document.getElementById("cart-total");
  const messageArea = document.getElementById("cart-message");
  const shippingForm = document.getElementById("shipping-form");

  // ---------------- HELPERS ----------------

  function money(value) {
    return "₹" + value.toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }

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

  function getPrice(card) {
    const text =
      card.querySelector(".price")?.textContent.trim() || "";

    if (/ask for latest price/i.test(text)) return null;
    if (/^from/i.test(text)) return null;

    const match = text.replace(/,/g, "").match(/₹\s*(\d+(?:\.\d{1,2})?)/);

    return match ? Number(match[1]) : null;
  }

  function getTotals() {
    let knownTotal = 0;
    let hasUnknownPrice = false;

    cart.forEach(item => {
      if (item.price === null) {
        hasUnknownPrice = true;
      } else {
        knownTotal += item.price * item.qty;
      }
    });

    return { knownTotal, hasUnknownPrice };
  }

  function showStep(step) {
    currentStep = step;

    document.querySelectorAll(".checkout-step").forEach(section => {
      section.classList.remove("active");
    });

    document.getElementById("step-" + step).classList.add("active");

    const labels = {
      1: "Step 1 of 3 — Your Cart",
      2: "Step 2 of 3 — Shipping Details",
      3: "Step 3 of 3 — Payment Method"
    };

    document.getElementById("step-label").textContent = labels[step];
    messageArea.textContent = "";
  }

  // ---------------- CART ----------------

  function renderCart() {
    itemsArea.innerHTML = "";

    let count = 0;

    cart.forEach((item, index) => {
      count += item.qty;

      const row = document.createElement("div");
      row.className = "cart-item";

      const details = document.createElement("div");

      const name = document.createElement("strong");
      name.textContent = item.name;

      const price = document.createElement("div");
      price.textContent = item.price === null
        ? "Price to be confirmed"
        : money(item.price) + " each (reference)";

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

    if (!cart.length) {
      itemsArea.textContent = "Your cart is empty.";
    }

    const totals = getTotals();

    countArea.textContent = count;

    totalArea.textContent =
      "Estimated product total: " + money(totals.knownTotal) +
      (totals.hasUnknownPrice ? " + items awaiting price confirmation" : "");
  }

  function changeQty(index, amount) {
    if (!cart[index]) return;

    cart[index].qty += amount;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }

    renderCart();
  }

  document.getElementById("shop-cart-btn").onclick = () => {
    panel.classList.add("open");
    renderCart();
    showStep(1);
  };

  document.getElementById("close-cart").onclick = () => {
    panel.classList.remove("open");
  };

  panel.addEventListener("click", event => {
    if (event.target === panel) {
      panel.classList.remove("open");
    }
  });

  // ---------------- ADD TO CART ----------------

  document.querySelectorAll(".product-card").forEach(card => {
    if (card.querySelector(".add-cart-btn")) return;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "add-cart-btn";
    button.textContent = "Add to Cart";

    button.onclick = () => {
      const name = card.querySelector("h3")?.textContent.trim();

      if (!name) return;

      const price = getPrice(card);

      const existing = cart.find(item =>
        item.name === name && item.price === price
      );

      if (existing) {
        existing.qty++;
      } else {
        cart.push({ name, price, qty: 1 });
      }

      renderCart();

      button.textContent = "Added ✓";

      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 1200);
    };

    card.appendChild(button);
  });

  // ---------------- CHECKOUT NAVIGATION ----------------

  document.getElementById("to-shipping").onclick = () => {
    if (!cart.length) {
      messageArea.textContent = "Please add products to your cart.";
      return;
    }

    showStep(2);
  };

  document.getElementById("back-to-cart").onclick = () => showStep(1);
  document.getElementById("back-to-shipping").onclick = () => showStep(2);

  shippingForm.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(shippingForm);

    const city = String(data.get("city") || "")
      .trim()
      .toLowerCase();

    if (city !== "morbi" && city !== "rajkot") {
      messageArea.textContent =
        "Sorry! Delivery is currently available only in Morbi and Rajkot.";
      return;
    }

    const phone = String(data.get("customer_phone") || "").replace(/\D/g, "");
    const pin = String(data.get("pincode") || "").replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(phone)) {
      messageArea.textContent =
        "Please enter a valid 10-digit Indian mobile number.";
      return;
    }

    if (!/^\d{6}$/.test(pin)) {
      messageArea.textContent = "Please enter a valid 6-digit PIN code.";
      return;
    }

    const totals = getTotals();

    const advance = totals.hasUnknownPrice
      ? null
      : totals.knownTotal * 0.05;

    document.getElementById("payment-summary").textContent =
      "Estimated product value: " + money(totals.knownTotal) +
      (totals.hasUnknownPrice
        ? " — some prices need confirmation."
        : " | Estimated COD 5% advance: " + money(advance));

    showStep(3);
  });

  // ---------------- COPY UPI ----------------

  document.getElementById("copy-upi").onclick = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      messageArea.textContent = "UPI ID copied.";
    } catch (error) {
      messageArea.textContent = "UPI ID: " + UPI_ID;
    }
  };

  // ---------------- EMAILJS ----------------

  const emailReady = new Promise((resolve, reject) => {
    if (window.emailjs) {
      window.emailjs.init({ publicKey: PUBLIC_KEY });
      resolve();
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";

    script.onload = () => {
      if (!window.emailjs) {
        reject(new Error("EmailJS library did not load."));
        return;
      }

      window.emailjs.init({ publicKey: PUBLIC_KEY });
      resolve();
    };

    script.onerror = () => {
      reject(new Error("Could not load EmailJS. Check internet connection."));
    };

    document.head.appendChild(script);
  });

  // ---------------- SUBMIT ORDER ----------------

  document.getElementById("submit-order").onclick = async () => {
    if (!cart.length) {
      messageArea.textContent = "Your cart is empty.";
      return;
    }

    const data = new FormData(shippingForm);

    const customerName = String(data.get("customer_name") || "").trim();
    const customerPhone = String(data.get("customer_phone") || "").replace(/\D/g, "");
    const city = String(data.get("city") || "").trim();
    const state = String(data.get("state") || "").trim();
    const pin = String(data.get("pincode") || "").trim();

    if (!shippingForm.reportValidity()) return;

    if (!["morbi", "rajkot"].includes(city.toLowerCase())) {
      messageArea.textContent =
        "Delivery is available only in Morbi and Rajkot.";
      showStep(2);
      return;
    }

    const method =
      document.querySelector('input[name="payment_method"]:checked')?.value;

    const totals = getTotals();
    const orderId = makeOrderId();

    const orderItems = cart.map(item =>
      item.name + " x " + item.qty + " — " +
      (item.price === null
        ? "Price to confirm"
        : money(item.price * item.qty) + " (reference)")
    ).join("\n");

    const address = [
      data.get("house"),
      data.get("street"),
      city,
      state,
      pin,
      data.get("landmark")
    ].filter(Boolean).join(", ");

    const estimatedTotal = totals.hasUnknownPrice
      ? money(totals.knownTotal) + " + unpriced items"
      : money(totals.knownTotal);

    const estimatedAdvance = totals.hasUnknownPrice
      ? "To be calculated after price confirmation"
      : method === "UPI"
        ? money(totals.knownTotal)
        : money(totals.knownTotal * 0.05);

    const remaining = totals.hasUnknownPrice
      ? "To be confirmed"
      : method === "UPI"
        ? money(0)
        : money(totals.knownTotal * 0.95);

    const confirmation =
      "Hello M. RAJ ELECTRIC,\n" +
      "I want to place an order.\n\n" +
      "Order ID: " + orderId + "\n" +
      "Name: " + customerName + "\n" +
      "Phone: " + customerPhone + "\n" +
      "Address: " + address + "\n\n" +
      "Items:\n" + orderItems + "\n\n" +
      "Estimated product total: " + estimatedTotal + "\n" +
      "Payment preference: " + method + "\n" +
      "Estimated advance: " + estimatedAdvance + "\n" +
      "Estimated remaining: " + remaining + "\n\n" +
      "Please confirm final prices and delivery charges.";

    const customerLink =
      "https://wa.me/" + SHOP_PHONE +
      "?text=" + encodeURIComponent(confirmation);

    const submit = document.getElementById("submit-order");

    submit.disabled = true;
    submit.textContent = "Submitting...";
    messageArea.textContent = "Please wait...";

    try {
      await emailReady;

      await window.emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          customer_name: customerName,
          customer_phone: customerPhone,
          order_items: orderItems,
          order_total: estimatedTotal,
          order_date: new Date().toLocaleString("en-IN"),
          order_id: orderId,
          customer_whatsapp_link: customerLink,
          shipping_address: address,
          payment_method: method,
          payment_advance: estimatedAdvance,
          payment_remaining: remaining,
          payment_status: "Pending shop confirmation"
        }
      );

      messageArea.innerHTML = "";

      const success = document.createElement("strong");
      success.textContent = "Order request submitted successfully!";

      const id = document.createElement("p");
      id.textContent = "Order ID: " + orderId;

      const status = document.createElement("p");
      status.textContent =
        "Status: Pending shop confirmation. No payment has been verified.";

      const note = document.createElement("p");
      note.textContent =
        "The shop will confirm your final product prices and delivery charges before payment.";

      const link = document.createElement("a");
      link.href = customerLink;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Send order details to shop on WhatsApp";

      messageArea.append(success, id, status, note, link);

      cart = [];
      renderCart();
      shippingForm.reset();

      showStep(1);

    } catch (error) {
      console.error("Order error:", error);

      messageArea.textContent =
        "EMAIL ERROR: " +
        (error?.text || error?.message || String(error)) +
        " Please try WhatsApp instead.";

      const link = document.createElement("a");
      link.href = customerLink;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Send order through WhatsApp";

      messageArea.appendChild(document.createElement("br"));
      messageArea.appendChild(link);

    } finally {
      submit.disabled = false;
      submit.textContent = "Submit Order Request";
    }
  };

  renderCart();

})();

