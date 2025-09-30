let cart = JSON.parse(localStorage.getItem("cart")) || [];


// Обновление счетчика корзины в шапке

function updateCartCount() {
  let count = cart.reduce((sum, item) => sum + item.quantity, 0);
  let cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = count;
  }
}


// Добавление товара в корзину

function addToCart(name, price) {
  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


// Показ корзины на странице

function showCart() {
  let cartItems = document.getElementById("cartItems");
  let total = document.getElementById("total");

  if (!cartItems || !total) return;

  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item, index) => {
    sum += item.price * item.quantity;

    let div = document.createElement("div");
    div.innerHTML = `
      <p>${item.name} - ${item.price} ₽ x 
      <input type="number" min="1" value="${item.quantity}" 
             onchange="changeQuantity(${index}, this.value)">
      <button onclick="removeItem(${index})">Удалить</button></p>
    `;
    cartItems.appendChild(div);
  });

  total.textContent = "Итого: " + sum + " ₽";
}


// Изменение количества товара

function changeQuantity(index, value) {
  cart[index].quantity = parseInt(value);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
  updateCartCount();
}


// Удаление товара из корзины

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
  updateCartCount();
}


// Сохранение введенных данных формы

function saveFormData() {
  let formData = {
    name: document.getElementById("name").value,
    surname: document.getElementById("surname").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value
  };
  localStorage.setItem("formData", JSON.stringify(formData));
}



function loadFormData() {
  let formData = JSON.parse(localStorage.getItem("formData"));
  if (formData) {
    document.getElementById("name").value = formData.name || "";
    document.getElementById("surname").value = formData.surname || "";
    document.getElementById("phone").value = formData.phone || "";
    document.getElementById("address").value = formData.address || "";
  }
}


// Проверка корректности телефона 

function validatePhone(phone) {
  let regex = /^(\+7|8)\d{10}$/;
  return regex.test(phone);
}


// Создание заказа

function createOrder() {
  let message = document.getElementById("orderMessage");
  message.textContent = "";

  if (cart.length === 0) {
    message.style.color = "red";
    message.textContent = "Корзина пуста!";
    return;
  }

  let name = document.getElementById("name").value.trim();
  let surname = document.getElementById("surname").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let address = document.getElementById("address").value.trim();

  if (!validatePhone(phone)) {
    message.style.color = "red";
    message.textContent = "Некорректный номер телефона!";
    return;
  }

  if (name === "" || surname === "" || phone === "" || address === "") {
    message.style.color = "red";
    message.textContent = "Заполните все поля!";
    return;
  }

  // очищаем корзину
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  // очищаем форму
  document.getElementById("orderForm").reset();
  localStorage.removeItem("formData");

  showCart();
  updateCartCount();

  message.style.color = "green";
  message.textContent = "Заказ создан!";
}




window.onload = function() {
  updateCartCount();
  showCart();

  let form = document.getElementById("orderForm");
  if (form) {
    loadFormData();
    form.addEventListener("input", saveFormData);
  }
};
