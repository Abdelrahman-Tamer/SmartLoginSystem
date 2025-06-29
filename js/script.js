var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');


var signUpArray = [];

// Load data from Local Storage on startup
if (localStorage.getItem('users') == null) {
    signUpArray = [];
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'));
}

// Display username on home page
var username = localStorage.getItem('sessionUsername');
if (username) {
    var usernameElement = document.getElementById('username');
    if (usernameElement) {
        usernameElement.innerHTML = "Welcome " + username;
    }
}

// Check if all signup fields are filled
function isEmpty() {
    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false;
    } else {
        return true;
    }
}

// Validate email format
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if email already exists
function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false;
        }
    }
    return true;
}

// Sign up function
function signUp() {
    // Check if all fields are filled
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger">All inputs are required</span>';
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(signupEmail.value)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger">Invalid email format</span>';
        return false;
    }
    
    // Check password length
    if (signupPassword.value.length < 6) {
        document.getElementById('exist').innerHTML = '<span class="text-danger">Password must be at least 6 characters</span>';
        return false;
    }
    
    // Create new user object
    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };
    
    // If this is the first registration
    if (signUpArray.length == 0) {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success">Success! Redirecting to login...</span>';
        
        // Auto redirect to login page after 2 seconds
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 2000);
        
        return true;
    }
    
    // Check if email exists
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger">Email already exists</span>';
    } else {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success">Success! Redirecting to login...</span>';
        
        // Auto redirect to login page after 2 seconds
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 2000);
    }
}

// Check if login fields are filled
function isLoginEmpty() {
    if (signinPassword.value == "" || signinEmail.value == "") {
        return false;
    } else {
        return true;
    }
}

// Login function
function login() {
    // Check if all fields are filled
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger">All inputs are required</span>';
        return false;
    }
    
    var password = signinPassword.value;
    var email = signinEmail.value;
    var userFound = false;
    
    // Search for user in database
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password == password) {
            // Save username in session
            localStorage.setItem('sessionUsername', signUpArray[i].name);
            
            // Show success message
            document.getElementById('incorrect').innerHTML = '<span class="text-success">Login successful! Redirecting...</span>';
            
            // Redirect to home page after 1 second
            setTimeout(function() {
                window.location.href = 'html/home.html';
            }, 1000);
            
            userFound = true;
            break;
        }
    }
    
    // If user not found
    if (!userFound) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger">Incorrect email or password</span>';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('sessionUsername');
    window.location.href = '../index.html';
}

// Check login status (for home page)
function checkLogin() {
    var username = localStorage.getItem('sessionUsername');
    if (!username) {
        // If user is not logged in, redirect to login page
        window.location.href = '../index.html';
    } else {
        // Display username
        var usernameElement = document.getElementById('username');
        if (usernameElement) {
            usernameElement.innerHTML = "Welcome " + username;
        }
    }
}

// Prevent access to home page without login
if (window.location.pathname.includes('home.html')) {
    var username = localStorage.getItem('sessionUsername');
    if (!username) {
        window.location.href = '../index.html';
    }
}

// Add event listeners for forms
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
        
        // Login with Enter key
        var signinEmailInput = document.getElementById('signinEmail');
        var signinPasswordInput = document.getElementById('signinPassword');
        
        if (signinEmailInput) {
            signinEmailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    login();
                }
            });
        }
        
        if (signinPasswordInput) {
            signinPasswordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    login();
                }
            });
        }
    }
    
    // Signup form
    var signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            signUp();
        });
        
        // Signup with Enter key
        var signupNameInput = document.getElementById('signupName');
        var signupEmailInput = document.getElementById('signupEmail');
        var signupPasswordInput = document.getElementById('signupPassword');
        
        if (signupNameInput) {
            signupNameInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    signUp();
                }
            });
        }
        
        if (signupEmailInput) {
            signupEmailInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    signUp();
                }
            });
        }
        
        if (signupPasswordInput) {
            signupPasswordInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    signUp();
                }
            });
        }
    }
});

