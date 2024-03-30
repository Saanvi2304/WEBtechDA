

const menu = [
  { id: 1, name: 'ChickenW', description: 'Spicy and flavourful chicken wings', price: 673 },
  { id: 2, name: 'Nachos', description: 'Loaded nachos with cheese and salsa', price: 526 },
  { id: 3, name: 'Pizza', description: 'Delicious pizza with various toppings', price: 973 },
  { id: 4, name: 'Burger', description: 'Classic beef burger with fries, come and enjoy', price: 817},
  { id: 5, name: 'Salad', description: 'Fresh garden salad with dressing', price: 626 },
  { id: 6, name: 'Pasta', description: 'Homemade pasta with marinara sauce', price: 817 },
  { id: 7, name: 'Sushi', description: 'Assorted sushi rolls with wasabi and soy sauce', price: 1246 },
  { id: 8, name: 'Steak', description: 'Juicy steak cooked to perfection', price: 1452 },
  { id: 9, name: 'Fish & C', description: 'Crispy fish served with fresh fries', price: 973 },
  { id: 10, name: 'Tacos', description: 'Tasty tacos with choice of meat and toppings', price: 673 },
  { id: 11, name: 'Soup', description: 'Warm soup with delicious breadsticks', price: 448 },
  { id: 12, name: 'Sandwich', description: 'Deluxe sandwich with assorted fillings', price: 626 },
  { id: 13, name: 'Ribs', description: 'Tender BBQ ribs with fresh crispy coleslaw', price: 973 },
  { id: 14, name: 'Curry', description: 'Spicy curry with white steamed rice', price: 817},
  { id: 15, name: 'Burrito', description: 'Satisfying burrito with rice and beans', price: 673 },
  { id: 16, name: 'F_Chicken', description: 'Crispy fried chicken with mashed potatoes', price: 817 }
];

  const cart = [];

  function displayMenu() {
    const menuElement = document.getElementById('menu');
    menu.forEach(item => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: ₹${item.price}</p>
        <div class="quantity">
          <button class="decrease-btn" onclick="decreaseQuantity(${item.id})">-</button>
          <span id="quantity-${item.id}">0</span>
          <button class="increase-btn" onclick="increaseQuantity(${item.id})">+</button>
        </div>
        <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      menuElement.appendChild(foodItem);
    });
  }
  
  function addToCart(itemId) {
    const item = menu.find(item => item.id === itemId);
    if (item) {
      const cartItem = cart.find(item => item.id === itemId);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      displayCart();
    }
  }
  
  function displayCart() {
    const cartElement = document.querySelector('.cart ul');
    cartElement.innerHTML = '';
    let totalAmount = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`;
      cartElement.appendChild(li);
      totalAmount += item.price * item.quantity;
    });
    const checkoutTotal = document.querySelector('.checkout-total');
    if (checkoutTotal) {
      checkoutTotal.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
    }
  }
  
  function checkout() {
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    // Create a modal or form for user input
    const userInputModal = document.createElement('div');
    userInputModal.innerHTML = `
        <div id="userInputModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center;">
            <div style="background-color: white; padding: 20px; border-radius: 5px;">
                <h2>Enter Your Information</h2>
                <form id="userInputForm">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required><br><br>
                    <label for="phone">Phone Number:</label>
                    <input type="text" id="phone" name="phone" required><br><br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(userInputModal);

    // Handle form submission
    const userInputForm = document.getElementById('userInputForm');
    userInputForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        
        if (name && phone) {
            const itemsBought = cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }));
            const userData = {
                name,
                phone,
                totalAmount,
                itemsBought
            };
  
            // Create a data URI for the JSON data
            const jsonData = JSON.stringify(userData);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData);
  
            // Create a download link and simulate a click to prompt download
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', dataUri);
            downloadLink.setAttribute('download', 'order_'+name+'.json');
            document.body.appendChild(downloadLink);
            downloadLink.click();
  
            alert('User data saved successfully.');
            
            // Remove the modal after submission
            userInputModal.remove();
            clearCart(); // Clear the cart after checkout
            
            // Redirect to payment.html
            window.location.href = 'payment.html';
        } else {
            alert('Name or phone number not provided.');
        }
    });
}


  
  
  
  function increaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    if (quantityElement) {
      const currentQuantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = currentQuantity + 1;
      displayCart();
    }
  }
  
  function decreaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    if (quantityElement) {
      const currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 0) {
        quantityElement.textContent = currentQuantity - 1;
        displayCart();
      }
    }
  }
  
  window.onload = function() {
    displayMenu();
  };
  function clearCart() {
    cart.length = 0; // Empty the cart array
    displayCart(); // Update the display of the cart
}
