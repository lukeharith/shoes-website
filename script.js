document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

    // Function to update the cart count in the header
    function updateCartCount() {
        const cartCount = document.getElementById("cart-count");
        cartCount.textContent = cart.length;
    }

    // Function to update the cart modal with items
    function updateCartModal() {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");
        cartItems.innerHTML = "";

        let total = 0;
        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item d-flex justify-content-between align-items-center";
            listItem.textContent = item.name + " - RM" + item.price.toFixed(2);

            const removeButton = document.createElement("button");
            removeButton.className = "btn btn-danger btn-sm";
            removeButton.textContent = "Remove";
            removeButton.addEventListener("click", () => {
                cart.splice(index, 1);
                updateCartCount();
                updateCartModal();
            });

            listItem.appendChild(removeButton);
            cartItems.appendChild(listItem);

            total += item.price;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Function to handle adding items to the cart
    function addToCart(name, price) {
        cart.push({ name, price });
        updateCartCount();
        updateCartModal();
        showNotification("Item added to cart");
    }

    // Function to show the notification
    function showNotification(message) {
        const notification = document.getElementById("notification");
        const notificationMessage = document.getElementById("notification-message");
        notificationMessage.textContent = message;
        notification.style.display = "block";
        setTimeout(() => {
            notification.classList.add("show");
        }, 100);
        setTimeout(() => {
            hideNotification();
        }, 3000);
    }

    // Function to hide the notification
    function hideNotification() {
        const notification = document.getElementById("notification");
        notification.classList.remove("show");
        setTimeout(() => {
            notification.style.display = "none";
        }, 500);
    }

    // Function to handle view details button click
    function viewDetails(event) {
        const button = event.target;
        const name = button.getAttribute("data-name");
        const price = button.getAttribute("data-price");
        const description = button.getAttribute("data-description");
        const rating = button.getAttribute("data-rating");
        const size = button.getAttribute("data-size");
        const color = button.getAttribute("data-color");

        document.getElementById("shoe-name").textContent = name;
        document.getElementById("shoe-price").textContent = price;
        document.getElementById("shoe-description").textContent = description;
        document.getElementById("shoe-rating").textContent = rating;
        document.getElementById("shoe-size").textContent = size;
        document.getElementById("shoe-color").textContent = color;

        $('#shoe-details-modal').modal('show');
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            const name = card.querySelect
