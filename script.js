document.getElementById("checkout-form").onsubmit = async event => {
  event.preventDefault();

  const message = document.getElementById("cart-message");
  const submit = document.getElementById("place-order");

  if (!cart.length) {
    message.textContent = "Your cart is empty.";
    return;
  }

  if (!emailReady) {
    message.textContent = "Please wait and try again.";
    return;
  }

  submit.disabled = true;
  submit.textContent = "Sending order...";

  const form = new FormData(event.target);
  const customerName = form.get("customer_name");
  const customerPhone = String(form.get("customer_phone")).replace(/\D/g, "");

  let whatsappNumber = customerPhone;
  if (whatsappNumber.length === 10) whatsappNumber = "91" + whatsappNumber;

  if (whatsappNumber.length !== 12 || !whatsappNumber.startsWith("91")) {
    message.textContent = "Please enter a valid Indian WhatsApp number.";
    submit.disabled = false;
    submit.textContent = "Place Order";
    return;
  }

  const orderId = "MRAJ-" + Date.now().toString().slice(-8);

  const total = cart.reduce((sum, item) =>
    sum + (item.price || 0) * item.qty, 0);

  const items = cart.map(item =>
    `${item.name} × ${item.qty} — ${
      item.price === null ? "Price to confirm" :
      "₹" + (item.price * item.qty).toLocaleString("en-IN")
    }`
  ).join("\n");

  const confirmationMessage =
    `Hello ${customerName}! Your order at M. RAJ ELECTRIC has been received.\n\n` +
    `Order Confirmation ID: ${orderId}\n\n` +
    `Items:\n${items}\n\n` +
    `Estimated Total: ₹${total.toLocaleString("en-IN")}\n\n` +
    `Thank you!`;

  const customerWhatsappLink =
    "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(confirmationMessage);

  const details = {
    customer_name: customerName,
    customer_phone: customerPhone,
    order_items: items,
    order_total: "Estimated ₹" + total.toLocaleString("en-IN"),
    order_date: new Date().toLocaleString("en-IN"),
    order_id: orderId,
    customer_whatsapp_link: customerWhatsappLink
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, details);

    message.innerHTML =
      `Order received!<br><strong>Confirmation ID: ${orderId}</strong><br>` +
      `<a href="${customerWhatsappLink}" target="_blank">Send confirmation to customer on WhatsApp</a>`;

    cart = [];
    renderCart();
    event.target.reset();

  } catch (error) {
    message.textContent = "Order email failed. Please try again.";
    console.error(error);
  }

  submit.disabled = false;
  submit.textContent = "Place Order";
};
