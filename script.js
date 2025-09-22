let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const cartCount = document.getElementById('cart-count');
  const totalEl = document.getElementById('total');

  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity} — ${item.price * item.quantity} ₽`;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Удалить';
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      saveCart();
    };
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  cartCount.textContent = cart.length;
  totalEl.textContent = `Итого: ${total} ₽`;
}

function addToCart(name, price) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

function showOrderForm() {
  document.getElementById('order-form').style.display = 'block';
}

function submitOrder(event) {
  event.preventDefault();
  alert('Заказ создан! Спасибо за покупку.');
  cart = [];
  saveCart();
  document.getElementById('order-form').style.display = 'none';
}

updateCart();
