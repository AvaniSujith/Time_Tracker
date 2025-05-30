const loginBtn = document.getElementById("signin");
const signupBtn = document.getElementById("signup");

const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const formContainer = document.querySelector(".form-container");
// console.log("authPage.js script loaded");


function heightChange(){
    const screenWidth = window.innerWidth;

    if(screenWidth <= 685){
        if(loginForm.classList.contains("active")){
            formContainer.classList.add("fit-height");
            formContainer.classList.remove("fixed-height");
        }else{
            formContainer.classList.add("fixed-height");
            formContainer.classList.remove("fit-height");
        }
    }else{
        formContainer.classList.remove("fit-height")
        formContainer.classList.remove("fixed-height")
    }
}

function showLogin() {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
    loginBtn.classList.add("active-btn");
    signupBtn.classList.remove("active-btn");

    heightChange();
}

function showSignup() {
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
    signupBtn.classList.add("active-btn");
    loginBtn.classList.remove("active-btn");

    heightChange();
}

loginBtn.addEventListener("click", () => {
    // console.log("Sign In button clicked");
    showLogin();
});

signupBtn.addEventListener("click", () => {
    // console.log("Signup btn clicked");
    showSignup();
});


window.addEventListener("DOMContentLoaded", () => {
    showLogin();
});
