(() => {
  "use strict";

  const SERVICE_ID = "service_yw8782y";
  const TEMPLATE_ID = "template_v6b06u1";
  const PUBLIC_KEY = "_4iQ5QHLuPb6X3tc1";
  const SHOP_PHONE = "919275900352";
  const UPI_ID = "Q698380663@ybl";

  // Product image URLs can be added to each product's images array after exact models are confirmed.
  const products = [
    {id:"bajaj-ivora-25w",name:"Bajaj LED Batten Ivora 25W",brand:"Bajaj",department:"Lighting",type:"LED Battens",price:699,description:"25W LED batten for everyday indoor lighting.",specs:["Brand: Bajaj","Power: 25W","Type: LED batten"],symbol:"▰"},
    {id:"bajaj-led-bulb",name:"Bajaj LED Bulb",brand:"Bajaj",department:"Lighting",type:"LED Bulbs",price:null,description:"LED bulb range. Ask the shop for wattage and current price.",specs:["Brand: Bajaj","Wattage: Confirm with shop"],symbol:"◉"},
    {id:"panel-down-lights",name:"Panel & Down Lights",brand:"Multiple brands",department:"Lighting",type:"Panel & Downlights",price:null,description:"Panel lights and recessed downlights in different sizes.",specs:["Type: Panel / downlight","Sizes and wattages: Confirm with shop"],symbol:"◎"},
    {id:"decorative-strip-lights",name:"Decorative & Strip Lights",brand:"Multiple brands",department:"Lighting",type:"Decorative Lights",price:null,description:"Decorative lighting and LED strip options.",specs:["Type: Decorative / strip lighting","Colour and length: Confirm with shop"],symbol:"✧"},
    {id:"shapy-150-35m",name:"SHAPY 150-Lamp LED Series · 35m",brand:"SHAPY",department:"Lighting",type:"LED Series",price:360,description:"150-lamp decorative LED series, 35 metres.",specs:["Brand: SHAPY","Lamps: 150","Length: 35m"],symbol:"✦"},
    {id:"shapy-250-48m",name:"SHAPY 250-Lamp LED Series · 48m",brand:"SHAPY",department:"Lighting",type:"LED Series",price:440,description:"250-lamp decorative LED series, 48 metres.",specs:["Brand: SHAPY","Lamps: 250","Length: 48m"],symbol:"✦"},
    {id:"shapy-66-18m",name:"SHAPY 66-Bulb LED Series · 18m",brand:"SHAPY",department:"Lighting",type:"LED Series",price:120,description:"66-bulb decorative LED series, 18 metres.",specs:["Brand: SHAPY","Bulbs: 66","Length: 18m"],symbol:"✦"},
    {id:"ht-150-led",name:"HT 150-Lamp LED Chain",brand:"HT",department:"Lighting",type:"LED Series",price:330,description:"150-lamp LED decorative chain.",specs:["Brand: HT","Lamps: 150"],symbol:"✧"},
    {id:"small-jumar",name:"Small Jumar",brand:"Decorative Lighting",department:"Lighting",type:"Jumar & Chandeliers",price:120,description:"Small decorative hanging light. Confirm design and availability with the shop.",specs:["Type: Small jumar","Design: Confirm with shop"],symbol:"♢"},
    {id:"big-jumar",name:"Big Jumar",brand:"Decorative Lighting",department:"Lighting",type:"Jumar & Chandeliers",price:250,description:"Large decorative hanging light. Confirm design and availability with the shop.",specs:["Type: Big jumar","Design: Confirm with shop"],symbol:"♢"},
    {id:"bajaj-bahar-fan",name:"Bajaj Bahar 1400mm Ceiling Fan",brand:"Bajaj",department:"Fans",type:"Ceiling Fans",price:3400,description:"1400mm ceiling fan. Confirm colour and stock with the shop.",specs:["Brand: Bajaj","Sweep: 1400mm","Type: Ceiling fan"],symbol:"✺"},
    {id:"bajaj-maxima-fan",name:"Bajaj Maxima Ceiling Fan",brand:"Bajaj",department:"Fans",type:"Ceiling Fans",price:2250,description:"Bajaj Maxima ceiling fan.",specs:["Brand: Bajaj","Type: Ceiling fan"],symbol:"✺"},
    {id:"table-wall-fans",name:"Table & Wall Fans",brand:"Multiple brands",department:"Fans",type:"Table & Wall Fans",price:null,description:"Table fans and wall-mounted fans. Ask for available models.",specs:["Type: Table / wall fan","Models: Confirm with shop"],symbol:"✺"},
    {id:"fan-regulators",name:"Fan Regulators & Fittings",brand:"Multiple brands",department:"Fans",type:"Fan Accessories",price:null,description:"Fan regulators, fittings and related accessories.",specs:["Type: Fan accessories","Compatibility: Confirm with shop"],symbol:"◉"},
    {id:"polycab-green-wire",name:"Polycab Green Wire 1 sq mm",brand:"Polycab",department:"Wires & Cables",type:"House Wires",price:3880,description:"Polycab green house wire, 1 sq mm. Price is a reference and requires confirmation.",specs:["Brand: Polycab","Colour: Green","Size: 1 sq mm"],symbol:"〰"},
    {id:"polycab-suprema",name:"Polycab Suprema House Wire",brand:"Polycab",department:"Wires & Cables",type:"House Wires",price:null,description:"Polycab Suprema house wire range. Ask for size and coil price.",specs:["Brand: Polycab","Series: Suprema","Size: Confirm with shop"],symbol:"〰"},
    {id:"flexible-cables",name:"Flexible Cables",brand:"Multiple brands",department:"Wires & Cables",type:"Flexible Cables",price:null,description:"Flexible electrical cable options. Ask for size and length.",specs:["Type: Flexible cable","Size and length: Confirm with shop"],symbol:"〰"},
    {id:"extension-boards",name:"Extension Boards & Cords",brand:"Multiple brands",department:"Wires & Cables",type:"Extension Boards",price:null,description:"Extension boards and power cords in different configurations.",specs:["Type: Extension board / cord","Socket count: Confirm with shop"],symbol:"▤"},
    {id:"anchor-roma-switch",name:"Anchor Roma Switch",brand:"Anchor",department:"Switches & Sockets",type:"Switches",price:73,priceLabel:"From ₹73*",description:"Anchor Roma switch range. Price varies by switch type.",specs:["Brand: Anchor","Range: Roma","Starting reference price: ₹73"],symbol:"▣"},
    {id:"anchor-6a-socket",name:"Anchor 6A 3-Pin Socket",brand:"Anchor",department:"Switches & Sockets",type:"Sockets",price:39.88,description:"Anchor 6A three-pin socket.",specs:["Brand: Anchor","Rating: 6A","Type: 3-pin socket"],symbol:"▣"},
    {id:"plugs-adaptors",name:"Plugs & Adaptors",brand:"Multiple brands",department:"Switches & Sockets",type:"Plugs & Adaptors",price:null,description:"Electrical plugs and adaptors. Ask for available types.",specs:["Type: Plugs / adaptors","Rating: Confirm with shop"],symbol:"⌁"},
    {id:"holders-connectors",name:"Holders, Connectors & Clips",brand:"Multiple brands",department:"Switches & Sockets",type:"Electrical Accessories",price:null,description:"Lamp holders, connectors, clips and small electrical fittings.",specs:["Type: Electrical accessories","Variants: Confirm with shop"],symbol:"⌁"},
    {id:"bajaj-dx6",name:"Bajaj DX 6 Dry Iron 1000W",brand:"Bajaj",department:"Appliances",type:"Irons",price:1540,description:"Bajaj DX 6 dry iron, 1000W.",specs:["Brand: Bajaj","Model: DX 6","Power: 1000W","Type: Dry iron"],symbol:"▱"},
    {id:"bajaj-dx2",name:"Bajaj DX 2 Dry Iron 600W",brand:"Bajaj",department:"Appliances",type:"Irons",price:1030,description:"Bajaj DX 2 dry iron, 600W.",specs:["Brand: Bajaj","Model: DX 2","Power: 600W","Type: Dry iron"],symbol:"▱"},
    {id:"bajaj-majesty-dx11",name:"Bajaj Majesty DX 11 Dry Iron",brand:"Bajaj",department:"Appliances",type:"Irons",price:1210,description:"Bajaj Majesty DX 11 dry iron.",specs:["Brand: Bajaj","Model: Majesty DX 11","Type: Dry iron"],symbol:"▱"},
    {id:"bajaj-popular-plus",name:"Bajaj Popular Plus Dry Iron",brand:"Bajaj",department:"Appliances",type:"Irons",price:1090,description:"Bajaj Popular Plus dry iron.",specs:["Brand: Bajaj","Model: Popular Plus","Type: Dry iron"],symbol:"▱"},
    {id:"bajaj-flashy-heater",name:"Bajaj Flashy Room Heater",brand:"Bajaj",department:"Appliances",type:"Room Heaters",price:880,description:"Bajaj Flashy room heater. Confirm current stock and specifications.",specs:["Brand: Bajaj","Model: Flashy","Type: Room heater"],symbol:"♨"},
    {id:"bajaj-icx160ts",name:"Bajaj ICX 160TS Neo Induction Cooktop",brand:"Bajaj",department:"Appliances",type:"Induction Cooktops",price:2789,description:"Bajaj ICX 160TS Neo induction cooktop.",specs:["Brand: Bajaj","Model: ICX 160TS Neo","Type: Induction cooktop"],symbol:"◉"},
    {id:"torches-emergency",name:"Torches & Emergency Lights",brand:"Multiple brands",department:"Electrical Essentials",type:"Torches & Emergency Lights",price:null,description:"Portable torches and emergency lighting options.",specs:["Type: Torch / emergency light","Models: Confirm with shop"],symbol:"⌁"},
    {id:"electrical-tools",name:"Electrical Tools",brand:"Multiple brands",department:"Electrical Essentials",type:"Tools",price:null,description:"Everyday electrical tools. Ask for available models.",specs:["Type: Electrical tools","Models: Confirm with shop"],symbol:"⚒"},
    {id:"decoration-items",name:"Decoration Items",brand:"Multiple brands",department:"Electrical Essentials",type:"Decoration Items",price:null,description:"Decorative electrical items and seasonal lighting. Ask for current range.",specs:["Type: Decoration items","Range: Confirm with shop"],symbol:"✧"}
  ];

  const departments = [
    {name:"All",icon:"▦",subtitle:"Full catalogue"},
    {name:"Appliances",icon:"⌂",subtitle:"Irons, heaters"},
    {name:"Lighting",icon:"✦",subtitle:"Bulbs, battens"},
    {name:"Fans",icon:"✺",subtitle:"Ceiling, wall"},
    {name:"Wires & Cables",icon:"〰",subtitle:"Wires, cords"},
    {name:"Switches & Sockets",icon:"▣",subtitle:"Switches, plugs"},
    {name:"Electrical Essentials",icon:"⌁",subtitle:"Tools, torches"}
  ];

  let cart = [];
  let currentDepartment = "All";
  let currentType = "All";
  let searchTerm = "";
  let selectedProduct = null;
  let modalQty = 1;
  let currentStep = 1;

  const $ = id => document.getElementById(id);
  const money = value => "₹" + Number(value).toLocaleString("en-IN", {maximumFractionDigits:2});
  const year = $("year"); if (year) year.textContent = new Date().getFullYear();

  function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char])); }
  function productPrice(product) { return product.price === null ? '<span class="ask-price">Ask for price</span>' : `<span class="product-price">${escapeHTML(product.priceLabel || money(product.price))}</span>`; }
  function getTypes() {
    const list = products.filter(p => currentDepartment === "All" || p.department === currentDepartment).map(p => p.type);
    return ["All", ...new Set(list)];
  }
  function filteredProducts() {
    let list = products.filter(p => (currentDepartment === "All" || p.department === currentDepartment) && (currentType === "All" || p.type === currentType));
    if (searchTerm) list = list.filter(p => [p.name,p.brand,p.department,p.type,p.description].join(" ").toLowerCase().includes(searchTerm));
    const sort = $("sort-select")?.value || "featured";
    if (sort === "price-low") list.sort((a,b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-high") list.sort((a,b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    if (sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }
  function renderDepartments() {
    $("department-grid").innerHTML = departments.map(d => `<button class="department-card ${currentDepartment === d.name ? "active" : ""}" type="button" data-department="${escapeHTML(d.name)}"><span class="department-icon">${d.icon}</span><b>${escapeHTML(d.name === "All" ? "All products" : d.name)}</b><small>${escapeHTML(d.subtitle)}</small></button>`).join("");
  }
  function renderTypes() {
    const types = getTypes();
    if (!types.includes(currentType)) currentType = "All";
    $("type-chips").innerHTML = types.map(type => `<button class="type-chip ${currentType === type ? "active" : ""}" type="button" data-type="${escapeHTML(type)}">${escapeHTML(type === "All" ? "All product types" : type)}</button>`).join("");
  }
  function renderProducts() {
    const list = filteredProducts();
    $("catalogue-count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    $("catalogue-title").textContent = currentType !== "All" ? currentType : currentDepartment === "All" ? "All products" : currentDepartment;
    $("catalogue-subtitle").textContent = searchTerm ? `Search results for “${searchTerm}”` : "Select a product to view details and available options";
    $("product-grid").innerHTML = list.map(p => `<article class="product-card"><div class="product-visual" role="button" tabindex="0" data-open-product="${p.id}" aria-label="View ${escapeHTML(p.name)}"><span class="visual-symbol">${p.symbol}</span><span class="visual-caption">PRODUCT IMAGE</span></div><div class="product-content"><div class="product-brand">${escapeHTML(p.brand)}</div><h4>${escapeHTML(p.name)}</h4><p class="product-description">${escapeHTML(p.description)}</p><div class="product-bottom">${productPrice(p)}<button class="product-open" type="button" data-open-product="${p.id}">Details ↗</button></div><button class="add-cart-btn" type="button" data-add-product="${p.id}">Add to Cart</button></div></article>`).join("");
    $("empty-state").hidden = list.length > 0;
  }
  function renderCatalogue() { renderDepartments(); renderTypes(); renderProducts(); }

  function openProduct(id) {
    selectedProduct = products.find(p => p.id === id); if (!selectedProduct) return;
    modalQty = 1;
    $("modal-brand").textContent = selectedProduct.brand + " · " + selectedProduct.type;
    $("modal-title").textContent = selectedProduct.name;
    $("modal-description").textContent = selectedProduct.description;
    $("modal-price").textContent = selectedProduct.price === null ? "Price to be confirmed" : (selectedProduct.priceLabel || money(selectedProduct.price));
    $("modal-specs").innerHTML = selectedProduct.specs.map(s => `<div>• ${escapeHTML(s)}</div>`).join("");
    $("modal-image").innerHTML = `<span class="visual-symbol">${selectedProduct.symbol}</span><span class="image-note">Exact product photos can be added after model confirmation</span>`;
    $("modal-thumbs").innerHTML = `<button class="modal-thumb" type="button" aria-label="Product image 1">${selectedProduct.symbol}</button>`;
    $("modal-qty").textContent = modalQty;
    $("product-modal").classList.add("open");
    $("product-modal").setAttribute("aria-hidden","false");
  }
  function closeProduct() { $("product-modal").classList.remove("open"); $("product-modal").setAttribute("aria-hidden","true"); }
  function addToCart(product, qty=1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) existing.qty += qty; else cart.push({id:product.id,name:product.name,price:product.price,qty});
    renderCart();
  }
  function renderCart() {
    const count = cart.reduce((sum,item) => sum + item.qty,0);
    $("cart-count").textContent = count; $("header-cart-count").textContent = count;
    if (!cart.length) $("cart-items").innerHTML = '<p class="empty-state">Your cart is empty. Browse products and add items to begin.</p>';
    else $("cart-items").innerHTML = cart.map(item => `<div class="cart-item"><div><b>${escapeHTML(item.name)}</b><small>${item.price === null ? "Price to be confirmed" : `${money(item.price)} each · reference price`}</small></div><div class="cart-item-actions"><button type="button" data-cart-change="-1" data-cart-id="${item.id}" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button type="button" data-cart-change="1" data-cart-id="${item.id}" aria-label="Increase quantity">+</button><button type="button" data-cart-remove="${item.id}" aria-label="Remove item">×</button></div></div>`).join("");
    const totals = getTotals();
    $("cart-total").textContent = money(totals.knownTotal) + (totals.hasUnknownPrice ? " + unpriced items" : "");
  }
  function getTotals() {
    let knownTotal = 0, hasUnknownPrice = false;
    cart.forEach(item => { if (item.price === null) hasUnknownPrice = true; else knownTotal += item.price * item.qty; });
    return {knownTotal,hasUnknownPrice};
  }
  function showStep(step) {
    currentStep = step;
    document.querySelectorAll(".checkout-step").forEach(section => section.classList.remove("active"));
    $("step-" + step).classList.add("active");
    $("step-label").textContent = `STEP ${step} OF 3 · ${["CART","DELIVERY DETAILS","PAYMENT PREFERENCE"][step-1]}`;
    $("cart-message").innerHTML = "";
  }
  function openCart() { $("shop-cart").classList.add("open"); $("shop-cart").setAttribute("aria-hidden","false"); renderCart(); showStep(1); }
  function closeCart() { $("shop-cart").classList.remove("open"); $("shop-cart").setAttribute("aria-hidden","true"); }

  document.addEventListener("click", event => {
    const department = event.target.closest("[data-department]");
    if (department) { currentDepartment = department.dataset.department; currentType = "All"; renderCatalogue(); $("catalogue-title").scrollIntoView({behavior:"smooth",block:"center"}); return; }
    const type = event.target.closest("[data-type]");
    if (type) { currentType = type.dataset.type; renderTypes(); renderProducts(); return; }
    const open = event.target.closest("[data-open-product]");
    if (open) { openProduct(open.dataset.openProduct); return; }
    const add = event.target.closest("[data-add-product]");
    if (add) { const p = products.find(item => item.id === add.dataset.addProduct); if (p) { addToCart(p); add.textContent = "Added ✓"; setTimeout(() => { if (add.isConnected) add.textContent = "Add to Cart"; },900); } return; }
    const change = event.target.closest("[data-cart-change]");
    if (change) { const item = cart.find(p => p.id === change.dataset.cartId); if (item) { item.qty += Number(change.dataset.cartChange); if (item.qty < 1) cart = cart.filter(p => p.id !== item.id); renderCart(); } return; }
    const remove = event.target.closest("[data-cart-remove]");
    if (remove) { cart = cart.filter(p => p.id !== remove.dataset.cartRemove); renderCart(); }
  });
  $("product-grid").addEventListener("keydown", event => { if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-open-product]")) { event.preventDefault(); openProduct(event.target.dataset.openProduct); } });
  $("search-form").addEventListener("submit", event => { event.preventDefault(); searchTerm = $("search-input").value.trim().toLowerCase(); currentDepartment = "All"; currentType = "All"; renderCatalogue(); $("catalogue-title").scrollIntoView({behavior:"smooth",block:"center"}); });
  $("search-input").addEventListener("input", () => { if (!$("search-input").value.trim()) { searchTerm = ""; renderCatalogue(); } });
  $("sort-select").addEventListener("change", renderProducts);
  $("close-product").addEventListener("click", closeProduct);
  $("product-modal").addEventListener("click", event => { if (event.target === $("product-modal")) closeProduct(); });
  $("modal-minus").addEventListener("click", () => { modalQty = Math.max(1,modalQty-1); $("modal-qty").textContent = modalQty; });
  $("modal-plus").addEventListener("click", () => { modalQty = Math.min(99,modalQty+1); $("modal-qty").textContent = modalQty; });
  $("modal-add").addEventListener("click", () => { if (selectedProduct) { addToCart(selectedProduct,modalQty); closeProduct(); openCart(); } });
  $("shop-cart-btn").addEventListener("click",openCart); $("header-cart").addEventListener("click",openCart); $("close-cart").addEventListener("click",closeCart);
  $("shop-cart").addEventListener("click",event => { if (event.target === $("shop-cart")) closeCart(); });
  $("to-shipping").addEventListener("click", () => { if (!cart.length) { $("cart-message").textContent = "Please add products to your cart first."; return; } showStep(2); });
  $("back-to-cart").addEventListener("click",() => showStep(1)); $("back-to-shipping").addEventListener("click",() => showStep(2));

  $("shipping-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const city = String(data.get("city") || "").trim().toLowerCase();
    const phone = String(data.get("customer_phone") || "").replace(/\D/g,"");
    const pin = String(data.get("pincode") || "").replace(/\D/g,"");
    if (!event.currentTarget.reportValidity()) return;
    if (!/^[6-9]\d{9}$/.test(phone)) { $("cart-message").textContent = "Enter a valid 10-digit Indian mobile number."; return; }
    if (!/^\d{6}$/.test(pin)) { $("cart-message").textContent = "Enter a valid 6-digit PIN code."; return; }
    if (city !== "morbi" && city !== "rajkot") { $("cart-message").textContent = "Delivery enquiries are currently accepted only for Morbi and Rajkot."; return; }
    const totals = getTotals();
    $("payment-summary").textContent = `Estimated known product value: ${money(totals.knownTotal)}${totals.hasUnknownPrice ? " + products awaiting price confirmation" : ` · Estimated 5% COD advance: ${money(totals.knownTotal * 0.05)}`}. Final amount will be confirmed by the shop.`;
    showStep(3);
  });
  $("copy-upi").addEventListener("click",async () => { try { await navigator.clipboard.writeText(UPI_ID); $("cart-message").textContent = "UPI ID copied."; } catch { $("cart-message").textContent = "Shop UPI ID: " + UPI_ID; } });

  function makeOrderId() { const d = new Date(); const date = [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join(""); return "MRAJ-" + date + "-" + Math.floor(1000 + Math.random()*9000); }
  const emailReady = new Promise((resolve,reject) => {
    if (window.emailjs) { window.emailjs.init({publicKey:PUBLIC_KEY}); resolve(); return; }
    const script = document.createElement("script"); script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => { if (!window.emailjs) { reject(new Error("EmailJS library did not load.")); return; } window.emailjs.init({publicKey:PUBLIC_KEY}); resolve(); };
    script.onerror = () => reject(new Error("Could not load EmailJS. Check your internet connection.")); document.head.appendChild(script);
  });

  $("submit-order").addEventListener("click",async () => {
    if (!cart.length) { $("cart-message").textContent = "Your cart is empty."; showStep(1); return; }
    const form = $("shipping-form"); if (!form.reportValidity()) { showStep(2); return; }
    const data = new FormData(form);
    const customerName = String(data.get("customer_name") || "").trim();
    const customerPhone = String(data.get("customer_phone") || "").replace(/\D/g,"");
    const city = String(data.get("city") || "").trim();
    const state = String(data.get("state") || "").trim();
    const pin = String(data.get("pincode") || "").trim();
    if (!/^[6-9]\d{9}$/.test(customerPhone) || !/^\d{6}$/.test(pin) || !["morbi","rajkot"].includes(city.toLowerCase())) { showStep(2); $("cart-message").textContent = "Please recheck your mobile number, PIN code and delivery city."; return; }
    const method = document.querySelector('input[name="payment_method"]:checked')?.value || "UPI";
    const totals = getTotals(); const orderId = makeOrderId();
    const orderItems = cart.map(item => `${item.name} x ${item.qty} — ${item.price === null ? "Price to confirm" : money(item.price*item.qty) + " (reference)"}`).join("\n");
    const address = [data.get("house"),data.get("street"),city,state,pin,data.get("landmark")].filter(Boolean).join(", ");
    const estimatedTotal = totals.hasUnknownPrice ? money(totals.knownTotal) + " + unpriced items" : money(totals.knownTotal);
    const estimatedAdvance = totals.hasUnknownPrice ? "To be calculated after price confirmation" : method === "UPI" ? money(totals.knownTotal) : money(totals.knownTotal*0.05);
    const remaining = totals.hasUnknownPrice ? "To be confirmed" : method === "UPI" ? money(0) : money(totals.knownTotal*0.95);
    const confirmation = `Hello M. RAJ ELECTRIC,\nI want to place an order.\n\nOrder ID: ${orderId}\nName: ${customerName}\nPhone: ${customerPhone}\nAddress: ${address}\n\nItems:\n${orderItems}\n\nEstimated product total: ${estimatedTotal}\nPayment preference: ${method}\nEstimated advance: ${estimatedAdvance}\nEstimated remaining: ${remaining}\n\nPlease confirm final prices and delivery charges before payment.`;
    const customerLink = "https://wa.me/" + SHOP_PHONE + "?text=" + encodeURIComponent(confirmation);
    const submit = $("submit-order"); submit.disabled = true; submit.textContent = "Submitting request..."; $("cart-message").textContent = "Sending your order request...";
    try {
      await emailReady;
      await window.emailjs.send(SERVICE_ID,TEMPLATE_ID,{
        customer_name:customerName,customer_phone:customerPhone,order_items:orderItems,order_total:estimatedTotal,
        order_date:new Date().toLocaleString("en-IN"),order_id:orderId,customer_whatsapp_link:customerLink,
        shipping_address:address,payment_method:method,payment_advance:estimatedAdvance,payment_remaining:remaining,
        payment_status:"Pending shop confirmation — no payment verified"
      });
      $("cart-message").innerHTML = `<div class="cart-message"><b>Order request submitted successfully.</b><p>Order ID: <strong>${escapeHTML(orderId)}</strong></p><p>Status: Pending shop confirmation. No payment has been verified.</p><p>The shop will confirm final prices and delivery charges before payment.</p><a href="${customerLink}" target="_blank" rel="noopener">Send order details to shop on WhatsApp ↗</a></div>`;
      cart = []; renderCart(); form.reset(); showStep(1);
      // Keep the success message visible after returning to the cart step.
      $("cart-message").innerHTML = `<div class="cart-message"><b>Order request submitted successfully.</b><p>Order ID: <strong>${escapeHTML(orderId)}</strong></p><p>Status: Pending shop confirmation. No payment has been verified.</p><p>The shop will confirm final prices and delivery charges before payment.</p><a href="${customerLink}" target="_blank" rel="noopener">Send order details to shop on WhatsApp ↗</a></div>`;
    } catch (error) {
      console.error("Order error:",error);
      $("cart-message").innerHTML = `Could not email the order: ${escapeHTML(error?.text || error?.message || String(error))}. You can send it through WhatsApp instead.<br><a href="${customerLink}" target="_blank" rel="noopener">Send order through WhatsApp ↗</a>`;
    } finally { submit.disabled = false; submit.textContent = "Submit order request"; }
  });

  renderCatalogue(); renderCart();
})();

