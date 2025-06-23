const cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);

    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.textContent = `${item.name} - $${item.price.toLocaleString()}`;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = total.toLocaleString();
}

function toggleCart() {
  const cartBox = document.getElementById('cart');
  cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  let message = '🛍️ Pedido mesa #1\n\n';
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} - $${item.price.toLocaleString()}\n`;
    total += item.price;
  });

  message += `\n🧾 *Total:* $${total.toLocaleString()}`;
  const encodedMessage = encodeURIComponent(message);

  const phoneNumber = '+573234121761'; // Reemplaza con tu número, ej: 573001234567
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(url, '_blank');
}
