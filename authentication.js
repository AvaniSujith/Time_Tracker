

    const sidebar = document.querySelector('.sidebar-aside');
    const sidebarToggler = document.querySelector(".sidebar-toggler");
    const menuToggler = document.querySelector(".menu-toggler");
    const signInError = document.getElementById('signInError'); 
    const signUpError = document.getElementById('signUpError'); 
    const authSection = document.querySelector('.authentication'); 
    const mainContent = document.querySelector('main');
    const mainNav = document.querySelector('.main-nav');
    const loginPage = document.querySelector("#login-page");
    const submitBtn = document.querySelector('#submission');

    
    if (mainNav) mainNav.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';

    const editBtn = document.getElementById("editProfileBtn");

    const collapsedSidebarHeight = "60px";
    
    const modals = document.querySelectorAll('.modal');

    editBtn.addEventListener("click", editForm);
    
    // submitBtn.addEventListener("click", updateDetail)

    function updateDetail(){

        const userName = document.getElementById("username");
        const designation = document.getElementById("designation");
        const email = document.getElementById("email");
        const dateOfBirth = document.getElementById("birthDate");
        const about = document.getElementById("aboutContent");

        const linkedIn = document.getElementById("linkedIn-id");
        const github = document.getElementById("github-id");
        const hackerRank = document.getElementById("hackerRank-id");

        const userNameInput = document.getElementById("userName");
        const designationInput = document.getElementById("designationValue");
        const emailInput = document.getElementById("emailValue");
        const dateOfBirthInput = document.getElementById("dateOfBirthValue");
        const aboutInput = document.getElementById("about-me");
        const githubInput = document.getElementById("githubProfile");
        const linkedInInput = document.getElementById("linkedInProfile");
        const hackerRankInput = document.getElementById("hackerRankProfile");
    

        // if(!userName || userName.value !== userNameInput.value){
        //     userName.value = userNameInput.value;
        // }

        if(userName && userNameInput){
            userName.textContent = userNameInput.value;
        }

        // if(!designation || designation.value !== designationInput.value){
        //     designation.value = designationInput.value;
        // }

        if(designation && designationInput){
            designation.textContent = designationInput.value;
        }

        // if(!email || email.value !== emailInput.value){
        //     userName.value = userNameInput.value;
        // }

        if(email && emailInput){
            email.textContent = emailInput.value;
        }

        // if(!dateOfBirth || dateOfBirth.value !== dateOfBirthInput.value){
        //     dateOfBirth.value = dateOfBirthInput.value;
        // }

        if(dateOfBirth && dateOfBirthInput){
            dateOfBirth.textContent = dateOfBirthInput.value;
        }

        // if(!about || about.value !== aboutInput.value){
        //     about.value = aboutInput.value;
        // }

        if(about && aboutInput){
            about.textContent = aboutInput.value;
        }

        // if(!linkedIn || linkedIn.value !== linkedInInput.value){
        //     linkedIn.value = linkedInInput.value;
        // }

        if(linkedIn && linkedInInput){
            linkedIn.textContent = linkedInInput.value
        }

        // if(!github || github.value !== githubInput.value){
        //     userName.value = userNameInput.value;
        // }

        if(github && githubInput){
            github.textContent = userNameInput.value;
        }

        // if(!hackerRank || hackerRank.value !== hackerRankInput.value){
        //     hackerRank.value = hackerRankInput.value;
        // }

        if(hackerRank && hackerRankInput){
            hackerRank.textContent = hackerRankInput.value;
        }

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

        if (userNameInput) currentUser.username = userNameInput.value;
        if (designationInput) currentUser.designationAssigned = designationInput.value;
        if (emailInput) currentUser.email = emailInput.value;
        if (dateOfBirthInput) currentUser.birthDate = dateOfBirthInput.value;
        if (aboutInput) currentUser.aboutMe = aboutInput.value;
        if (linkedInInput) currentUser.linkedIn = linkedInInput.value;
        if (githubInput) currentUser.github = githubInput.value;
        if (hackerRankInput) currentUser.hackerRank = hackerRankInput.value;

        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        const editingModal = document.getElementById("editingModal");

        if(editingModal){
            editingModal.style.display = "none";
        }

    }

    function editForm(){

        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {}

        let editingModal = document.createElement("div");
        editingModal.id = "editingModal"
        editingModal.classList.add("modal");

        editingModal.innerHTML =`

        <div class="modal-content">  

            <span class="close">&times;</span>
            
            <div class="editing-modal-box">
                <h2 class="edit-page-header">Edit Profile</h2>
                <div class="personal-detail">

                    <div class="profile-first-name details">
                        <label for="UserName">Username</label>
                        <input type="text" id="userName" value="${currentUser.username || ''}">
                    </div>

                    <div class="profile-designation details">
                        <label for="designation">Designation</label>
                        <input type="text" id="designationValue" value="${currentUser.designationAssigned || ''}">
                    </div>

                    <div class="profile-email details">
                        <label for="profileEmail">Email</label>
                        <input type="email" id="emailValue" value="${currentUser.email || ''}">
                    </div>

                    <div class="profile-dob details">
                        <label for="dateOfBirth">Date of Birth</label>
                        <input type="date" id="dateOfBirthValue" value="${currentUser.birthDate || ''}">
                    </div>

                    <div class="details-about details">
                        <label for="about">About</label>
                        <textarea id="about-me">${currentUser.aboutMe || ''}</textarea>
                    </div> 

                </div>
               
                <div class="account-details">
                    <div class="acc-details">
                        <label for="github">
                            <i class="fab fa-github"></i>
                        </label>
                        <input type="url" id="githubProfile" value="${currentUser.github || ''}">
                    </div>

                    <div class="acc-details">
                        <label for="linkedIn">
                            <i class="fa-brands fa-linkedin"></i>
                        </label>
                        <input type="url" id="linkedInProfile" value="${currentUser.linkedIn || ''}">
                    </div>

                    <div class="acc-details">
                        <label for="leetcode">
                            <i class="fab fa-hackerrank"></i>
                        </label>
                        <input type="url" id="hackerRankProfile" value="${currentUser.hackerRank || ''}">
                    </div>
                </div> 

                <div class="submit-btn">
                    <button id="submission">Submit</button>
                </div>
            </div>
        </div>
        `;

        document.body.appendChild(editingModal);

        editingModal.querySelector(".close").addEventListener("click", () => {
            editingModal.style.display = "none";
        });

        const submitBtn = editingModal.querySelector('#submission');

        if(submitBtn){
            submitBtn.addEventListener("click", updateDetail);
        }

        editingModal.style.display = "flex";
    }

    sidebarToggler.classList.add("collapse");


    sidebarToggler.addEventListener("click", () => {
        sidebar.classList.toggle("collapse");
    });

    const toggleMenu = (isMenuActive) => {
        sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : collapsedSidebarHeight;
        menuToggler.querySelector("span").innerText = isMenuActive ? "close" : "menu";
    }

    menuToggler.addEventListener("click", () => {
        toggleMenu(sidebar.classList.toggle("menu-active"));
    }); 

    modals.forEach(modal => {
        modal.style.display ='none';
    });
  
    const signInFormElement = document.getElementById('signInForm');
    if(signInFormElement){
        signInFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = signInFormElement.email.value;
            const password = signInFormElement.password.value;
            
            if (signInError) signInError.textContent = '';
            
        
            if (!email || !password) {
                if (signInError) signInError.textContent = 'Please enter both email and password.';
                return;
            }
            
            if (!validateEmail(email)) {
                if (signInError) signInError.textContent = 'Please enter a valid email address.';
                return;
            }
            
           
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                if (signInError) {
                    signInError.style.color = 'green';
                    signInError.textContent = 'Login successful';
                }
                
                if (loginPage) loginPage.style.display = 'none'; 
                if (mainNav) mainNav.style.display = 'flex';
                if (sidebar) sidebar.style.display = 'flex';
                if (mainContent) mainContent.style.display = 'block';
                
               
                if (document.getElementById('username')) { 
                    document.getElementById('username').textContent = user.username; // Display username
                }
                if (document.getElementById('email')) { // Assuming an element with id 'email' in profile
                    document.getElementById('email').textContent = user.email;
                }
                 if (document.getElementById('designation')) { 
                    document.getElementById('designation').textContent = user.designationAssigned;
                }
                if (document.getElementById('memberSinceContent')) { // Changed from memberSince
                    document.getElementById('memberSinceContent').textContent = user.joinDate;
                }
                
                // Ensure loadUserTasks and updateStreak are defined or handled
                if (typeof loadUserTasks === 'function') loadUserTasks(user.email);
                if (typeof updateStreak === 'function') updateStreak();
                if (typeof updateTaskTables === 'function') updateTaskTables();

                // Explicitly activate dashboard page
                const dashboardPage = document.getElementById('dashboard-page');
                if (dashboardPage) {
                    document.querySelectorAll('main > .page').forEach(p => p.classList.remove('active'));
                    dashboardPage.classList.add('active');
                }
                const dashboardLink = document.querySelector('.nav-link[data-page="dashboard"]');
                if (dashboardLink) {
                    document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => item.classList.remove('active'));
                    dashboardLink.closest('.nav-item').classList.add('active');
                }

            } else {
                if (signInError) signInError.textContent = 'Invalid email or password.';
                
               
                signInFormElement.classList.add('shake');
                setTimeout(() => {
                    signInFormElement.classList.remove('shake');
                }, 500);
            }
        });
    }
    
    const signUpFormElement = document.getElementById('signUpForm');
    if (signUpFormElement) {
        signUpFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
               
            const username = signUpFormElement.username.value; // Changed from firstName, lastName
            const designationAssigned = signUpFormElement.designation.value;
            const email = signUpFormElement.email.value;
            const phoneNumber = signUpFormElement.phoneNumber.value; // Corrected from signUpForm.value
            // const aboutMe = signUpForm.value; // aboutMe is not in the form per user's decision
            const password = signUpFormElement.password.value;
            
            if (signUpError) signUpError.textContent = '';
            
          
            if (!username || !email || !password || !phoneNumber || !designationAssigned) { // Adjusted validation
                if (signUpError) signUpError.textContent = 'Please fill in all fields.';
                return;
            }
            
            if (!validateEmail(email)) {
                if (signUpError) signUpError.textContent = 'Please enter a valid email address.';
                return;
            }
            
            if (password.length < 6) {
                if (signUpError) signUpError.textContent = 'Password must be at least 6 characters long.';
                return;
            }
            
          
            const users = JSON.parse(localStorage.getItem('users')) || [];
             
            if (users.some(user => user.email === email)) {
                if (signUpError) signUpError.textContent = 'Email already registered. Please sign in.';
                return;
            }
            
           
            const newUser = {
                // id: generateUserId(),
                username, // Storing username
                designationAssigned,
                email,
                phoneNumber,
                // aboutMe: '', // Set to empty or remove if not used
                password,
                joinDate: new Date().toLocaleDateString()
            };
            
          
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
         
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            // localStorage.setItem('joinDate', newUser.joinDate); // joinDate is part of newUser object
            
            if (signUpError) {
                signUpError.style.color = 'green'; 
                signUpError.textContent = 'Account created successfully! Redirecting';
            }
          
            // Ensure initializeUserTasks is defined or handled
            if (typeof initializeUserTasks === 'function') initializeUserTasks(email);
            
          
            // UI updates moved out of setTimeout for immediate effect
            if (loginPage) loginPage.style.display = 'none'; // Hide login page
            if (mainNav) mainNav.style.display = 'flex';
            if (sidebar) sidebar.style.display = 'flex';
            if (mainContent) mainContent.style.display = 'block';
            
           
            if (document.getElementById('username')) { // Changed from profileName
                document.getElementById('username').textContent = username;
            }
            if (document.getElementById('email')) { // Assuming an element with id 'email' in profile
                document.getElementById('email').textContent = email;
            }
             if (document.getElementById('designation')) { 
                document.getElementById('designation').textContent = designationAssigned;
            }
            if (document.getElementById('memberSinceContent')) { // Changed from memberSince
                document.getElementById('memberSinceContent').textContent = newUser.joinDate;
            }
            
           
            localStorage.setItem('streak', '1');
            localStorage.setItem('lastLogin', new Date().toDateString());
            if (document.getElementById('streak-days')) {
                document.getElementById('streak-days').textContent = 'Day 1';
            }
            
           
            if (typeof updateTaskTables === 'function') updateTaskTables();

            // Explicitly activate dashboard page
            const dashboardPage = document.getElementById('dashboard-page');
            if (dashboardPage) {
                document.querySelectorAll('main > .page').forEach(p => p.classList.remove('active'));
                dashboardPage.classList.add('active');
            }
            const dashboardLink = document.querySelector('.nav-link[data-page="dashboard"]');
            if (dashboardLink) {
                document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => item.classList.remove('active'));
                dashboardLink.closest('.nav-item').classList.add('active');
            }
            
        });
    }

    // Simplified logout button selection
    const logoutLinks = document.querySelectorAll('.nav-link .nav-label');
    logoutLinks.forEach(label => {
        if (label.textContent === 'Logout') {
            const link = label.closest('.nav-link');
            if (link) {
                link.addEventListener('click', handleLogout);
            }
        }
    });
    
   
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
   
    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetId = this.getAttribute('data-open-modal');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

document.querySelectorAll('.sidebar-nav .nav-link[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPageId = this.getAttribute('data-page') + "-page";
        
        document.querySelectorAll('main > .page').forEach(page => {
            page.classList.remove('active');
        });
        
        const pageToShow = document.getElementById(targetPageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
        }
        
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.closest('.nav-item').classList.add('active');

        if (sidebar.classList.contains("menu-active")) {
            toggleMenu(sidebar.classList.toggle("menu-active"));
        }
    });
});


function handleLogout(e) {
    e.preventDefault();
    
    localStorage.removeItem('currentUser');
    
    const loginPageElement = document.getElementById('login-page'); 
    const mainNavElement = document.querySelector('.main-nav');
    const sidebarElement = document.querySelector('.sidebar-aside');
    const mainContentElement = document.querySelector('main');
    
    if (loginPageElement) loginPageElement.style.display = 'flex'; 
    if (mainNavElement) mainNavElement.style.display = 'none';
    if (sidebarElement) sidebarElement.style.display = 'none';
    if (mainContentElement) mainContentElement.style.display = 'none'; 
    
    const currentSignInForm = document.getElementById('signInForm');
    const currentSignUpForm = document.getElementById('signUpForm');
    const currentSignInError = document.getElementById('signInError');
    const currentSignUpError = document.getElementById('signUpError');
    
    if (currentSignInForm) currentSignInForm.reset();
    if (currentSignUpForm) currentSignUpForm.reset();
    if (currentSignInError) currentSignInError.textContent = '';
    if (currentSignUpError) currentSignUpError.textContent = '';
   
    if (typeof pauseTimer === 'function') {
        pauseTimer();
        currentTaskId = null;
    }
}


function updateStreak() {
   
    let streak = parseInt(localStorage.getItem('streak') || '0');

    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
    
    
    if (!lastLogin) {
        streak = 1;
    } else if (lastLogin !== today) {
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastLogin === yesterday.toDateString()) {
            
            streak += 1;
        } else {
           
            streak = 1;
        }
    }
    
   
    localStorage.setItem('streak', streak.toString());
    localStorage.setItem('lastLogin', today);
    
   
    const streakElement = document.getElementById('streak-days');
    if (streakElement) {
        streakElement.textContent = `Day ${streak}`;
    }
    
   
    const streakContainer = document.querySelector('.streak-container');
    if (streakContainer && lastLogin !== today) {
        streakContainer.classList.add('pulse');
        setTimeout(() => {
            streakContainer.classList.remove('pulse');
        }, 1500);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function generateUserId() {
    return 'u' + Math.random().toString(36).substring(2, 11);
}

function checkLoginState() {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
        const user = JSON.parse(currentUserData);

        if (loginPage) loginPage.style.display = 'none';
        if (mainNav) mainNav.style.display = 'flex';
        if (sidebar) sidebar.style.display = 'block';
        if (mainContent) mainContent.style.display = 'block';

        
        if (document.getElementById('username')) {
            document.getElementById('username').textContent = user.username || '';
        }
        if (document.getElementById('email')) {
            document.getElementById('email').textContent = user.email || '';
        }
        if (document.getElementById('designation')) {
            document.getElementById('designation').textContent = user.designationAssigned || '';
        }
        if (document.getElementById('memberSinceContent')) {
            document.getElementById('memberSinceContent').textContent = user.joinDate || '';
        }
        
        if (document.getElementById('birthDate') && user.birthDate) {
             document.getElementById('birthDate').textContent = user.birthDate;
        }
         if (document.getElementById('aboutContent') && user.aboutMe) {
             document.getElementById('aboutContent').textContent = user.aboutMe;
        }


        if (typeof loadUserTasks === 'function') loadUserTasks(user.email);
        if (typeof updateStreak === 'function') updateStreak();
        if (typeof updateTaskTables === 'function') updateTaskTables();
        
        const dashboardPage = document.getElementById('dashboard-page');
        if (dashboardPage) {
           
            document.querySelectorAll('main > .page').forEach(p => p.classList.remove('active'));
            dashboardPage.classList.add('active');
        }
        
        const dashboardLink = document.querySelector('.nav-link[data-page="dashboard"]');
        if (dashboardLink) {
            document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => item.classList.remove('active'));
            dashboardLink.closest('.nav-item').classList.add('active');
        }


    } else {
        if (loginPage) loginPage.style.display = 'flex';
        if (mainNav) mainNav.style.display = 'none';
        if (sidebar) sidebar.style.display = 'none';
        if (mainContent) mainContent.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', checkLoginState);