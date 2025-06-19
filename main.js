// Select login form inputs
var loginEmail = document.getElementById("signinEmail");
var loginPassword = document.getElementById("signinPassword");
var loginBtn = document.getElementById("loginBtn");
var incorrectMsg = document.getElementById("incorrect");

// Select signup form inputs
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signupBtn = document.getElementById("signupBtn");
var signupMessage = document.getElementById("signupMessage");

// Get users from localStorage 
var users = JSON.parse(localStorage.getItem("users")) || [];

// =============== SIGN UP ===============
if (signupBtn) {
    signupBtn.addEventListener("click", function () {
        var name = signupName.value.trim();
        var email = signupEmail.value.trim();
        var password = signupPassword.value;

        // Validation
        if (name === "" || email === "" || password === "") {
            signupMessage.textContent = "All fields are required!";
            signupMessage.style.color = "red";
            return;
        }

        // Check if email already exists
        var isEmailExist = users.some(function (user) {
            return user.email === email;
        });

        if (isEmailExist) {
            signupMessage.textContent = "Email already exists!";
            signupMessage.style.color = "red";
            return;
        }

        // Create new user
        var newUser = {
            name: name,
            email: email,
            password: password
        };

        // Save new user to localStorage
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Success message
        signupMessage.textContent = "Account created successfully!";
        signupMessage.style.color = "green";

        // Redirect to login page after delay
        setTimeout(function () {
            window.location.href = "index.html";
        }, 2000);
    });
}

// ============ LOGIN ============ 
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        var email = loginEmail.value.trim();
        var password = loginPassword.value;

        if (email === "" || password === "") {
            incorrectMsg.textContent = "All fields are required!";
            incorrectMsg.style.color = "red";
            return;
        }

        var currentUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (currentUser) {
            localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
            window.location.href = "home.html";
        } else {
            incorrectMsg.textContent = "Incorrect email or password!";
            incorrectMsg.style.color = "red";
        }
    });
}

// ============ HOME PAGE ============ 
function checkLogin() {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {
        window.location.href = "index.html";
    } else {
        const usernameElement = document.getElementById("username");
        if (usernameElement) {
            usernameElement.textContent = `Welcome ${user.name}`;
        }
    }
}

// Call checkLogin only on home page
document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes("home")) {
        checkLogin();
    }
});
