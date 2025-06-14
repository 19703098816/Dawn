// Dawn
// RTO E-commerce Website JavaScript
// Database simulation
let users = JSON.parse(localStorage.getItem('users')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let courses = [];
let resourceKits = [];

// Function to get the latest currentUser from localStorage
function DawnGetLatestCurrentUser756() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
}

// Global currentUser variable, will be refreshed at DOMContentLoaded
let currentUser = DawnGetLatestCurrentUser756();
console.log('app.js initial currentUser:', currentUser); // Debug log

// Load data from JSON files
async function DawnLoadData756() {
    try {
        // Check if we're on the registration or login page
        const path = window.location.pathname.split('/').pop();
        if (path === 'register.html' || path === 'login.html') {
            return;
        }

        // Load courses
        const coursesResponse = await fetch('./data/DawnCourses.json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!coursesResponse.ok) {
            throw new Error(`Failed to load courses: ${coursesResponse.status} ${coursesResponse.statusText}`);
        }

        const coursesData = await coursesResponse.json();
        if (!coursesData || !coursesData.courses) {
            throw new Error('Invalid courses data format');
        }
        courses = coursesData.courses;

        // Load resource kits
        const kitsResponse = await fetch('./data/DawnResourceKits.json', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!kitsResponse.ok) {
            throw new Error(`Failed to load resource kits: ${kitsResponse.status} ${kitsResponse.statusText}`);
        }

        const kitsData = await kitsResponse.json();
        if (!kitsData || !kitsData.resourceKits) {
            throw new Error('Invalid resource kits data format');
        }
        resourceKits = kitsData.resourceKits;

        console.log('Data loaded successfully:', { courses, resourceKits });
    } catch (error) {
        console.error('Error loading data:', error);
        const path = window.location.pathname.split('/').pop();
        if (path !== 'register.html' && path !== 'login.html') {
            DawnShowNotification756('Error loading data. Please try again later.', 'error');
        }
        courses = [];
        resourceKits = [];
    }
}

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', async function() {
    currentUser = DawnGetLatestCurrentUser756();
    console.log('DOMContentLoaded currentUser:', currentUser);

    const path = window.location.pathname.split('/').pop();

    if (path !== 'register.html' && path !== 'login.html') {
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }

        await DawnLoadData756();

        if (DawnCheckSession756()) {
            DawnUpdateSessionActivity756();
        }

        DawnInitNavigation756();
        DawnUpdateUserUI756();
        DawnUpdateCartCount756();

        if (path === 'index.html' || path === '') {
            DawnLoadCoursesAndKits756();
        } else if (path === 'cart.html') {
            DawnLoadCartItems756();
        } else if (path === 'order-management.html') {
            DawnLoadOrderHistory756();
        } else if (path === 'confirmation.html') {
            DawnLoadOrderConfirmation756();
        }
    } else if (path === 'login.html') {
        DawnSetupLoginForm756();
    } else if (path === 'register.html') {
        DawnSetupRegisterForm756();
    }
});

// Navigation function
function DawnInitNavigation756() {
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }
    
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    
    if (currentUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
    }
    
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            DawnLogout756();
        });
    }
}

// User functions
function DawnUpdateUserUI756() {
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = currentUser ? currentUser.name : 'Guest';
    }
    
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    
    if (currentUser) {
        if (loginLink) loginLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
    }
}

// Load courses and resource kits
function DawnLoadCoursesAndKits756() {
    const coursesContainer = document.getElementById('courses-container');
    const kitsContainer = document.getElementById('resource-kits-container');
    
    if (!currentUser) {
        const loginMessage = `
            <div class="auth-message">
                <h2>Please Login to View Courses and Resources</h2>
                <p>You need to be logged in to view our courses and resource kits.</p>
                <div class="auth-buttons">
                    <a href="login.html" class="btn btn-primary">Login</a>
                    <a href="register.html" class="btn btn-outline">Register</a>
                </div>
            </div>
        `;
        
        if (coursesContainer) coursesContainer.innerHTML = loginMessage;
        if (kitsContainer) kitsContainer.innerHTML = loginMessage;
        return;
    }
    
    if (coursesContainer) {
        coursesContainer.innerHTML = courses.map(course => DawnCreateCourseCard756(course)).join('');
    }
    
    if (kitsContainer) {
        kitsContainer.innerHTML = resourceKits.map(kit => DawnCreateResourceKitCard756(kit)).join('');
    }
}

// Create course card
function DawnCreateCourseCard756(course) {
    return `
        <div class="course-card">
            <h3>${course.name}</h3>
            <p class="course-id">Course ID: ${course.id}</p>
            <p class="course-description">${course.description}</p>
            <p class="course-duration">Duration: ${course.duration}</p>
            <div class="course-units">
                <h4>Units:</h4>
                <ul>
                    ${course.units.map(unit => `<li>${unit}</li>`).join('')}
                </ul>
            </div>
            <div class="course-assessment">
                <h4>Assessment:</h4>
                <p>${course.assessment}</p>
            </div>
            <div class="course-project">
                <h4>Sample Project:</h4>
                <p>${course.sampleProject}</p>
            </div>
        </div>
    `;
}

// Create resource kit card
function DawnCreateResourceKitCard756(kit) {
    return `
        <div class="resource-kit-card">
            <img src="images/${kit.image}" alt="${kit.name}" class="kit-image">
            <h3>${kit.name}</h3>
            <p class="kit-unit">Unit Code: ${kit.unitCode}</p>
            <p class="kit-description">${kit.description}</p>
            <p class="kit-price">$${kit.price.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart" onclick="DawnAddToCart756('${kit.id}')">Add to Cart</button>
        </div>
    `;
}

// Add to cart function
function DawnAddToCart756(kitId, quantity = 1) {
    if (!currentUser) {
        DawnShowNotification756('Please login to add items to cart', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    const kit = resourceKits.find(k => k.id === kitId);
    if (!kit) return;
    
    const existingItem = cart.find(item => item.id === kitId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: kit.id,
            name: kit.name,
            price: kit.price,
            image: kit.image,
            quantity: quantity
        });
    }
    
    DawnSaveCart756();
    DawnUpdateCartCount756();
    DawnShowNotification756('Item added to cart', 'success');
}

// Save cart to localStorage
function DawnSaveCart756() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count
function DawnUpdateCartCount756() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Load cart items
function DawnLoadCartItems756() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    let total = 0;
    cartContainer.innerHTML = cart.map(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        return `
            <div class="cart-item">
                <img src="images/${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <p class="cart-item-subtotal">Subtotal: $${subtotal.toFixed(2)}</p>
                </div>
                <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
    }).join('');
    
    cartContainer.innerHTML += `
        <div class="cart-total">
            <h3>Total: $${total.toFixed(2)}</h3>
            <button class="btn btn-primary checkout-btn">Proceed to Checkout</button>
        </div>
    `;
    
    // Add event listeners
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            let quantity = parseInt(input.value);
            
            if (this.classList.contains('minus')) {
                quantity = Math.max(1, quantity - 1);
            } else {
                quantity += 1;
            }
            
            input.value = quantity;
            DawnUpdateCartItemQuantity756(id, quantity);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            DawnRemoveFromCart756(this.dataset.id);
        });
    });
    
    document.querySelector('.checkout-btn').addEventListener('click', DawnCheckout756);
}

// Update cart item quantity
function DawnUpdateCartItemQuantity756(kitId, newQuantity) {
    const item = cart.find(item => item.id === kitId);
    if (item) {
        item.quantity = newQuantity;
        DawnSaveCart756();
        DawnLoadCartItems756();
    }
}

// Remove from cart
function DawnRemoveFromCart756(kitId) {
    cart = cart.filter(item => item.id !== kitId);
    DawnSaveCart756();
    DawnLoadCartItems756();
    DawnUpdateCartCount756();
}

// Checkout function
function DawnCheckout756() {
    if (!currentUser) {
        DawnShowNotification756('Please login to checkout', 'error');
        window.location.href = 'login.html';
        return;
    }
    
    if (cart.length === 0) {
        DawnShowNotification756('Your cart is empty', 'error');
        return;
    }
    
    const order = {
        id: Date.now().toString(),
        username: currentUser.username,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        date: new Date().toISOString()
    };
    
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    DawnSaveCart756();
    DawnUpdateCartCount756();
    
    // Redirect to order confirmation
    window.location.href = `confirmation.html?orderId=${order.id}`;
}

// Load order history
function DawnLoadOrderHistory756() {
    const orderHistoryContainer = document.getElementById('order-history');
    if (!orderHistoryContainer) return;
    
    const userOrders = orders.filter(order => order.username === currentUser.username);
    
    if (userOrders.length === 0) {
        orderHistoryContainer.innerHTML = '<p class="no-orders">No orders found</p>';
        return;
    }
    
    orderHistoryContainer.innerHTML = userOrders.map(order => `
        <div class="order-card">
            <h3>Order #${order.id}</h3>
            <p class="order-date">Date: ${new Date(order.date).toLocaleDateString()}</p>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <img src="images/${item.image}" alt="${item.name}" class="order-item-image">
                        <div class="order-item-details">
                            <h4>${item.name}</h4>
                            <p>Quantity: ${item.quantity}</p>
                            <p>Price: $${item.price.toFixed(2)}</p>
                            <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <p class="order-total">Total: $${order.total.toFixed(2)}</p>
            <button class="btn btn-primary download-order" data-order-id="${order.id}">Download Order</button>
        </div>
    `).join('');
    
    // Add event listeners for download buttons
    document.querySelectorAll('.download-order').forEach(btn => {
        btn.addEventListener('click', function() {
            DawnDownloadOrder756(this.dataset.orderId);
        });
    });
}

// Download order as JSON
function DawnDownloadOrder756(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const orderJson = JSON.stringify(order, null, 2);
    const blob = new Blob([orderJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-${orderId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Show notification
function DawnShowNotification756(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Session management
function DawnGenerateSessionId756() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function DawnUpdateSessionActivity756() {
    const sessionId = sessionStorage.getItem('sessionId');
    if (sessionId) {
        sessionStorage.setItem('lastActivity', Date.now().toString());
    }
}

function DawnCheckSession756() {
    const sessionId = sessionStorage.getItem('sessionId');
    const lastActivity = sessionStorage.getItem('lastActivity');
    
    if (!sessionId || !lastActivity) {
        return false;
    }
    
    const inactiveTime = Date.now() - parseInt(lastActivity);
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    
    if (inactiveTime > sessionTimeout) {
        DawnLogout756();
        return false;
    }
    
    return true;
}

// Logout function
function DawnLogout756() {
    // Clear all storage data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('sessionId');
    sessionStorage.removeItem('lastActivity');
    
    // Clear global variables
    currentUser = null;
    cart = [];
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Form validation
function DawnValidatePassword756(password) {
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

function DawnValidateEmail756(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function DawnValidatePhone756(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

// Setup login form
function DawnSetupLoginForm756() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            sessionStorage.setItem('sessionId', DawnGenerateSessionId756());
            sessionStorage.setItem('lastActivity', Date.now().toString());
            currentUser = user;
            DawnShowNotification756('Login successful!', 'success');
            window.location.href = 'cart.html';
        } else {
            DawnShowNotification756('Invalid username or password', 'error');
        }
    });
}

// Setup register form
function DawnSetupRegisterForm756() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        
        if (password !== confirmPassword) {
            DawnShowNotification756('Passwords do not match', 'error');
            return;
        }
        
        if (!DawnValidatePassword756(password)) {
            DawnShowNotification756('Password must be at least 8 characters long and contain uppercase, lowercase, and numbers', 'error');
            return;
        }
        
        if (!DawnValidateEmail756(email)) {
            DawnShowNotification756('Please enter a valid email address', 'error');
            return;
        }
        
        if (!DawnValidatePhone756(phone)) {
            DawnShowNotification756('Please enter a valid phone number', 'error');
            return;
        }
        
        if (users.some(u => u.username === username)) {
            DawnShowNotification756('Username already exists', 'error');
            return;
        }
        
        const newUser = {
            username,
            password,
            email,
            phone,
            name: username
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        DawnShowNotification756('Registration successful! Please login.', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Load order confirmation details
function DawnLoadOrderConfirmation756() {
    const orderDetails = document.getElementById('order-details');
    if (!orderDetails) return;

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');

    if (!orderId) {
        orderDetails.innerHTML = '<p class="error-message">No order found</p>';
        return;
    }

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        orderDetails.innerHTML = '<p class="error-message">Order not found</p>';
        return;
    }

    orderDetails.innerHTML = `
        <div class="order-info">
            <h3>Order Information</h3>
            <p>Order Number: ${order.id}</p>
            <p>Order Date: ${new Date(order.date).toLocaleDateString()}</p>
            <p>Customer: ${order.username}</p>
        </div>
        <div class="order-items">
            <h3>Ordered Items</h3>
            ${order.items.map(item => `
                <div class="order-item">
                    <img src="images/${item.image}" alt="${item.name}" class="order-item-image">
                    <div class="order-item-details">
                        <h4>${item.name}</h4>
                        <p>Quantity: ${item.quantity}</p>
                        <p>Price: $${item.price.toFixed(2)}</p>
                        <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="order-total">
            Total: $${order.total.toFixed(2)}
        </div>
    `;

    document.getElementById('download-order').addEventListener('click', () => DawnDownloadOrder756(orderId));
    document.getElementById('edit-order').addEventListener('click', () => window.location.href = 'cart.html');
    document.getElementById('confirm-order').addEventListener('click', () => {
        DawnShowNotification756('Order confirmed successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'order-management.html';
        }, 2000);
    });
}