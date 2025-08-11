// Simple Cart Logic using LocalStorage
let cart = JSON.parse(localStorage.getItem("jk_cart")) || [];

function addToCart(item, price) {
  cart.push({ item, price });
  localStorage.setItem("jk_cart", JSON.stringify(cart));
  alert(`${item} added to cart!`);
}

function renderCart() {
  const list = document.getElementById("cart-list");
  const total = document.getElementById("cart-total");
  if (!list || !total) return;

  list.innerHTML = "";
  let sum = 0;
  cart.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = `${c.item} - $${c.price.toFixed(2)}`;
    list.appendChild(li);
    sum += c.price;
  });
  total.textContent = sum.toFixed(2);
}

function clearCart() {
  cart = [];
  localStorage.removeItem("jk_cart");
  renderCart();
  alert("Cart cleared!");
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const note = document.getElementById("note").value;

  if (!name || !phone) {
    alert("Please fill in your name and phone number.");
    return;
  }

  console.log("Order Submitted:", {
    customer: name,
    phone,
    note,
    order: cart
  });

  alert("Order submitted! Thank you, " + name + " ☕");
  clearCart();
  document.querySelector("form").reset();
}

// Render cart if on cart.html
window.addEventListener("load", renderCart);
