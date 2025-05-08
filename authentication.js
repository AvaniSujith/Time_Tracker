

    const sidebar = document.querySelector('.sidebar-aside');
    const sidebarToggler = document.querySelector(".sidebar-toggler");
    const menuToggler = document.querySelector(".menu-toggler");
    const signInError = document.getElementById('signInError'); 
    const signUpError = document.getElementById('signUpError'); 
    const authSection = document.querySelector('.authentication'); 
    const mainContent = document.querySelector('main');
    const mainNav = document.querySelector('.main-nav');
    const loginPage = document.querySelector("#login-page")

    
    if (mainNav) mainNav.style.display = 'none';
    if (sidebar) sidebar.style.display = 'none';
    if (mainContent) mainContent.style.display = 'none';

    const editBtn = document.getElementById("editProfileBtn");

    const collapsedSidebarHeight = "60px";
    
    const modals = document.querySelectorAll('.modal');

    // if(toggleBtn){
    //     toggleBtn.addEventListener("click", () => {
    //         sidebar.classList.toggle("collapse");
    //     });
    // }

    // Initial setup is now handled by checkLoginState()
    // if(mainNav && sidebar && loginPage) {
    //     mainNav.style.display = "none";
    //     sidebar.style.display = "none";
    // }

    if (editBtn) {
        editBtn.addEventListener("click", editForm);
    }

    function editForm(){
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
                        <label for="firstName">First name</label>
                        <input type="text">
                    </div>

                    <div class="profile-last-name details">
                        <label for="lastName">Last name</label>
                        <input type="text">
                    </div>

                    <div class="profile-designation details">
                        <label for="designation">Designation</label>
                        <input type="text">
                    </div>

                    <div class="profile-email details">
                        <label for="profileEmail">Email</label>
                        <input type="email">
                    </div>

                    <div class="profile-dob details">
                        <label for="dateOfBirth">Date of Birth</label>
                        <input type="date">
                    </div>

                    <div class="profile-phone details">
                        <label for="profilePhone">Phone</label>
                        <input type="phone">
                    </div>

                    <div class="details-about details">
                        <label for="about">About</label>
                        <textarea id="about-me"></textarea>
                    </div>
                </div>
               
                <div class="account-details">
                    <div class="acc-details">
                        <label for="github">
                            <i class="fab fa-github"></i>
                        </label>
                        <input type="url" id="githubProfile">
                    </div>

                    <div class="acc-details">
                        <label for="linkedIn">
                            <i class="fa-brands fa-linkedin"></i>
                        </label>
                        <input type="url" id="linkedInProfile">
                    </div>

                    <div class="acc-details">
                        <label for="leetcode">
                            <i class="fab fa-hackerrank"></i>
                        </label>
                        <input type="url" id="fa-hackerRankProfile">
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
  
    // const currentUser = localStorage.getItem('currentUser');
    // if (currentUser) {
    //     const userData = JSON.parse(currentUser);
        
        
    //     authSection.style.display = 'none';
    //     mainContent.style.display = 'block';
    //     sidebar.style.display = 'flex';
    //     mainNav.style.display = 'flex';
        
    // This block is now integrated into checkLoginState and login/signup success
    /*
    // const currentUser = localStorage.getItem('currentUser');
    // if (currentUser) {
    //     const userData = JSON.parse(currentUser);
        
        
    //     authSection.style.display = 'none';
    //     mainContent.style.display = 'block';
    //     sidebar.style.display = 'flex';
    //     mainNav.style.display = 'flex';
        
    //     if(document.getElementById('username')){ // Was profileName
    //         document.getElementById('username').textContent = userData.username; // Was firstName lastName
    //     }

    //     if(document.getElementById('email')){ // Was profileEmail
    //         document.getElementById('email').textContent = userData.email;
    //     } 
    //     if(document.getElementById('designation')){ 
    //         document.getElementById('designation').textContent = userData.designationAssigned;
    //     }

    //     if(document.getElementById('memberSinceContent') && userData.joinDate){ // Was memberSince
    //         document.getElementById('memberSinceContent').textContent = userData.joinDate;
    //     }
        
        
    //     if (typeof loadUserTasks === 'function') loadUserTasks(userData.email);
        
        
    //     if (typeof updateTaskTables === 'function') {
    //         updateTaskTables();
    //     }
    // } else {
       
    //     if(loginPage) loginPage.style.display = 'flex'; // Was authSection
    //     if(mainContent) mainContent.style.display = 'none';
    //     if(sidebar) sidebar.style.display = 'none';
    //     if(mainNav) mainNav.style.display = 'none';
    // }
    */
   
    // The toggleButton logic seems to be from a different HTML structure.
    // The current HTML uses authPage.js to toggle between sign-in and sign-up forms.
    // So, we can remove or comment out this block.
    /*
    if(toggleButton){
        // ... old toggleButton logic
    }
    */

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
                
                // UI updates moved out of setTimeout for immediate effect
                if (loginPage) loginPage.style.display = 'none'; // Hide login page
                if (mainNav) mainNav.style.display = 'flex';
                if (sidebar) sidebar.style.display = 'flex';
                if (mainContent) mainContent.style.display = 'block';
                
               
                if (document.getElementById('username')) { // Changed from profileName to username
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

// Event listener for page navigation using sidebar links
document.querySelectorAll('.sidebar-nav .nav-link[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPageId = this.getAttribute('data-page') + "-page"; // e.g., "dashboard-page"
        
        // Hide all pages
        document.querySelectorAll('main > .page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show the target page
        const pageToShow = document.getElementById(targetPageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
        }
        
        // Update active state for nav items
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
            item.classList.remove('active');
        });
        this.closest('.nav-item').classList.add('active');

        // Close menu on mobile if it's active after clicking a link
        if (sidebar.classList.contains("menu-active")) {
            toggleMenu(sidebar.classList.toggle("menu-active"));
        }
    });
});


function handleLogout(e) {
    e.preventDefault();
    
    localStorage.removeItem('currentUser');
    
    // const authSection = document.querySelector('.authentication'); // Not used
    const loginPageElement = document.getElementById('login-page'); // Use ID
    const mainNavElement = document.querySelector('.main-nav');
    const sidebarElement = document.querySelector('.sidebar-aside');
    const mainContentElement = document.querySelector('main');
    
    if (loginPageElement) loginPageElement.style.display = 'flex'; // Show login page
    if (mainNavElement) mainNavElement.style.display = 'none';
    if (sidebarElement) sidebarElement.style.display = 'none';
    if (mainContentElement) mainContentElement.style.display = 'none'; // Hide main content area
    
    const currentSignInForm = document.getElementById('signInForm');
    const currentSignUpForm = document.getElementById('signUpForm');
    const currentSignInError = document.getElementById('signInError');
    const currentSignUpError = document.getElementById('signUpError');
    // const toggleButton = document.getElementById('toggleButton'); // Not used
    // const panelTitle = document.getElementById('panelTitle'); // Not used
    // const panelText = document.getElementById('panelText'); // Not used
    
    if (currentSignInForm) currentSignInForm.reset();
    if (currentSignUpForm) currentSignUpForm.reset();
    if (currentSignInError) currentSignInError.textContent = '';
    if (currentSignUpError) currentSignUpError.textContent = '';
    
    // Reset to show Sign In form by default via authPage.js logic
    // authPage.js should handle making signInForm active by default on load.
    // We can call showLogin() from authPage.js if it's globally accessible,
    // or rely on its DOMContentLoaded listener.
    // Forcing it here might be redundant if authPage.js handles it.
    // Let's assume authPage.js handles the default view.

    // The sliding panel logic is not in the current HTML structure.
    /*
    const slidingPanel = document.querySelector('.sliding-panel');
    if (slidingPanel) {
        // ... old sliding panel logic
    }
    */
 
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

// function formatDate(date) {
//     const options = { month: 'short', day: 'numeric', year: 'numeric' };
//     return date.toLocaleDateString('en-US', options);
// }

function checkLoginState() {
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
        const user = JSON.parse(currentUserData);

        if (loginPage) loginPage.style.display = 'none';
        if (mainNav) mainNav.style.display = 'flex';
        if (sidebar) sidebar.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'block';

        // Populate profile information
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
        // Add other profile fields if necessary, e.g., phone, about, birthDate from localStorage if stored
        if (document.getElementById('birthDate') && user.birthDate) {
             document.getElementById('birthDate').textContent = user.birthDate;
        }
         if (document.getElementById('aboutContent') && user.aboutMe) {
             document.getElementById('aboutContent').textContent = user.aboutMe;
        }


        if (typeof loadUserTasks === 'function') loadUserTasks(user.email);
        if (typeof updateStreak === 'function') updateStreak();
        if (typeof updateTaskTables === 'function') updateTaskTables();
         // By default, show the dashboard page if a user is logged in
        const dashboardPage = document.getElementById('dashboard-page');
        if (dashboardPage) {
            // Hide all other pages first
            document.querySelectorAll('main > .page').forEach(p => p.classList.remove('active'));
            dashboardPage.classList.add('active');
        }
        // Set dashboard nav item to active
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

// Call checkLoginState when the script is loaded
document.addEventListener('DOMContentLoaded', checkLoginState);
