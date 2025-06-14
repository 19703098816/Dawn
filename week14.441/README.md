# Dawn's RTO Training Website

## Overview
This is a dynamic website for a Registered Training Organization (RTO) in the IT field. The website offers 5 IT courses for student registration and sells 10 training resource kits to other RTOs. The website is built using HTML5, CSS3, and JavaScript, with a focus on user authentication, shopping cart functionality, and order management.

## Features
1. User Authentication
   - User registration with validation
   - Login system with session management
   - Secure password storage in localStorage
   - Session management using sessionStorage

2. Course and Resource Kit Display
   - 5 IT courses with detailed information
   - 10 training resource kits with images and descriptions
   - Responsive grid layout
   - Dynamic content loading from JSON files

3. Shopping Cart System
   - Add/remove items
   - Update quantities
   - Calculate subtotals and total
   - Persistent cart data in localStorage
   - Checkout process

4. Order Management
   - Order history display
   - Download orders as JSON files
   - Clear cart and order history
   - Order confirmation system

5. Interactive Features
   - To-do list for order tasks
   - Animated transitions
   - Responsive design
   - Form validation

## Technical Details

### File Structure
```
week14.441/
├── index.html          # Main landing page
├── login.html          # Login page
├── register.html       # Registration page
├── cart.html          # Shopping cart page
├── confirmation.html   # Order confirmation page
├── order-management.html # Order management page
├── style.css          # Main stylesheet
├── app.js             # Main JavaScript file
├── data/
│   ├── courses.json   # Course data
│   └── resource-kits.json # Resource kit data
├── images/            # Image assets
└── README.md          # Documentation
```

### JavaScript Functions
All JavaScript functions are suffixed with '441' (student ID) for identification. Key functions include:

- User Management:
  - `setupLoginForm441()`: Handles user login
  - `setupRegisterForm441()`: Handles user registration
  - `validatePassword441()`: Password validation
  - `validateEmail441()`: Email validation
  - `validatePhone441()`: Phone number validation

- Cart Management:
  - `addToCart441()`: Add items to cart
  - `updateCartItemQuantity441()`: Update item quantities
  - `removeFromCart441()`: Remove items from cart
  - `saveCart441()`: Save cart to localStorage

- Order Management:
  - `checkout441()`: Process checkout
  - `loadOrderHistory441()`: Display order history
  - `downloadOrder441()`: Download order as JSON
  - `loadOrderConfirmation441()`: Show order confirmation

### Data Storage
- User data: Stored in localStorage
- Session data: Managed in sessionStorage
- Cart data: Persisted in localStorage
- Order history: Saved in localStorage

### Security Features
- Password validation with specific requirements
- Session management with timeout
- Input validation for all forms
- Secure data storage in browser

## Browser Compatibility
The website is compatible with:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)

## Responsive Design
The website is fully responsive and works on:
- Desktop computers
- Laptops
- Tablets
- Mobile phones

## Setup and Usage
1. Clone the repository
2. Open index.html in a web browser
3. Register a new account or login
4. Browse courses and resource kits
5. Add items to cart
6. Complete the checkout process

## Future Improvements
1. Add payment gateway integration
2. Implement user profile management
3. Add course enrollment system
4. Enhance security features
5. Add admin dashboard

## Author
Student ID: [Your Student ID] 