

    const sidebar = document.querySelector('.sidebar-aside');
    const sidebarToggler = document.querySelector(".sidebar-toggler");
    const menuToggler = document.querySelector(".menu-toggler");
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const toggleButton = document.getElementById('toggleButton');
    const panelTitle = document.getElementById('panelTitle');
    const panelText = document.getElementById('panelText');
    const signInError = document.getElementById('signInError');
    const signUpError = document.getElementById('signUpError');
    const authSection = document.querySelector('.authentication');
    const mainContent = document.querySelector('main');
    const mainNav = document.querySelector('.main-nav');

    const editBtn = document.getElementById("editProfileBtn");

    const collapsedSidebarHeight = "60px";
    
    const modals = document.querySelectorAll('.modal');

    // if(toggleBtn){
    //     toggleBtn.addEventListener("click", () => {
    //         sidebar.classList.toggle("collapse");
    //     });
    // }

    editBtn.addEventListener("click", editForm);

    function editForm(){
        // console.log("btn clicked")
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
   
  
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = JSON.parse(currentUser);
        
        
        authSection.style.display = 'none';
        mainContent.style.display = 'block';
        sidebar.style.display = 'flex';
        mainNav.style.display = 'flex';
        
        if(document.getElementById('profileName')){
            document.getElementById('profileName').textContent = `${userData.firstName} ${userData.lastName}`;
        }

        if(document.getElementById('profileEmail')){
            document.getElementById('profileEmail').textContent = userData.email;
        } 

        if(document.getElementById('memberSince') && userData.joinDate){
            document.getElementById('memberSince').textContent = `Member since: ${userData.joinDate}`;
        }
        
        
        loadUserTasks(userData.email);
        
        
        if (typeof updateTaskTables === 'function') {
            updateTaskTables();
        }
    } else {
       
        authSection.style.display = 'flex';
        mainContent.style.display = 'none';
        sidebar.style.display = 'none';
        mainNav.style.display = 'none';
    }
    
   
    if(toggleButton){
        toggleButton.addEventListener('click', function() {
            signInForm.classList.toggle('active');
            signUpForm.classList.toggle('active');
            
            const isSignUp = signUpForm.classList.contains('active');
            toggleButton.textContent = isSignUp ? 'Sign In' : 'Sign Up';
            panelTitle.textContent = isSignUp ? 'Welcome Back!' : 'Hello, Striver!';
            panelText.textContent = isSignUp 
                ? 'To keep connected with us please login with your personal info'
                : 'Enter your details and begin your self-evaluation journey';
            
            signInError.textContent = '';
            signUpError.textContent = '';
            
          
            const slidingPanel = document.querySelector('.sliding-panel');
            if (slidingPanel) {
                if (isSignUp) {
                    slidingPanel.style.transform = 'translateX(-100%)';
                    slidingPanel.style.borderRadius = '0 var(--border-radius) var(--border-radius) 0';
                    slidingPanel.style.right = 'auto';
                    slidingPanel.style.left = '0';
                } else {
                    slidingPanel.style.transform = 'translateX(0)';
                    slidingPanel.style.borderRadius = 'var(--border-radius) 0 0 var(--border-radius)';
                    slidingPanel.style.right = '0';
                    slidingPanel.style.left = 'auto';
                }
            }
        });
    }
    
 
    if(signInForm){
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = signInForm.email.value;
            const password = signInForm.password.value;
            
            signInError.textContent = '';
            
        
            if (!email || !password) {
                signInError.textContent = 'Please enter both email and password.';
                return;
            }
            
            if (!validateEmail(email)) {
                signInError.textContent = 'Please enter a valid email address.';
                return;
            }
            
           
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                
                signInError.style.color = 'green';
                signInError.textContent = 'Login successful';
                
                
                setTimeout(() => {
                    authSection.style.display = 'none';
                    mainNav.style.display = 'flex';
                    sidebar.style.display = 'flex';
                    mainContent.style.display = 'block';
                    
                   
                    if (document.getElementById('profileName')) {
                        document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
                    }
                    if (document.getElementById('profileEmail')) {
                        document.getElementById('profileEmail').textContent = user.email;
                    }
                    if (document.getElementById('memberSince')) {
                        document.getElementById('memberSince').textContent = `Member since: ${user.joinDate}`;
                    }
                    
                    
                    loadUserTasks(user.email);
                    
                    
                    updateStreak();
                    
                    
                    if (typeof updateTaskTables === 'function') {
                        updateTaskTables();
                    }
                }, 1500);
            } else {
                signInError.textContent = 'Invalid email or password.';
                
               
                signInForm.classList.add('shake');
                setTimeout(() => {
                    signInForm.classList.remove('shake');
                }, 500);
            }
        });
    }
    
   
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const role = signUpForm.role ? signUpForm.role.value : 'user';
            const firstName = signUpForm.firstName.value;
            const lastName = signUpForm.lastName.value;
            const email = signUpForm.email.value;
            const password = signUpForm.password.value;
            
            signUpError.textContent = '';
            
          
            if (!firstName || !lastName || !email || !password) {
                signUpError.textContent = 'Please fill in all fields.';
                return;
            }
            
            if (!validateEmail(email)) {
                signUpError.textContent = 'Please enter a valid email address.';
                return;
            }
            
            if (password.length < 6) {
                signUpError.textContent = 'Password must be at least 6 characters long.';
                return;
            }
            
          
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.email === email)) {
                signUpError.textContent = 'Email already registered. Please sign in.';
                return;
            }
            
           
            const newUser = {
                id: generateUserId(),
                role,
                firstName,
                lastName,
                email,
                password,
                joinDate: new Date().toLocaleDateString()
            };
            
          
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
         
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            localStorage.setItem('joinDate', newUser.joinDate);
            
        
            signUpError.style.color = 'green'; 
            signUpError.textContent = 'Account created successfully! Redirecting';
            
          
            initializeUserTasks(email);
            
          
            setTimeout(() => {
                authSection.style.display = 'none';
                mainNav.style.display = 'flex';
                sidebar.style.display = 'flex';
                mainContent.style.display = 'block';
                
               
                if (document.getElementById('profileName')) {
                    document.getElementById('profileName').textContent = `${firstName} ${lastName}`;
                }
                if (document.getElementById('profileEmail')) {
                    document.getElementById('profileEmail').textContent = email;
                }
                if (document.getElementById('memberSince')) {
                    document.getElementById('memberSince').textContent = `Member since: ${newUser.joinDate}`;
                }
                
               
                localStorage.setItem('streak', '1');
                localStorage.setItem('lastLogin', new Date().toDateString());
                if (document.getElementById('streak-days')) {
                    document.getElementById('streak-days').textContent = 'Day 1';
                }
                
               
                if (typeof updateTaskTables === 'function') {
                    updateTaskTables();
                }
            }, 1500);
        });
    }

 
    const logoutBtn = document.querySelector('.nav-link[data-action="logout"]');
    if (!logoutBtn) {
        const logoutLinks = document.querySelectorAll('.nav-link');
        logoutLinks.forEach(link => {
            if (link.querySelector('.nav-label') && link.querySelector('.nav-label').textContent === 'Logout') {
                link.addEventListener('click', handleLogout);
            }
        });
    } else {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
   
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

 
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
           
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            
            const pageToShow = document.getElementById(`${targetPage}-page`);
            if (pageToShow) {
                pageToShow.classList.add('active');
            }
            
           
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            this.closest('.nav-item').classList.add('active');
        });
    });



function handleLogout(e) {
    e.preventDefault();
    
    localStorage.removeItem('currentUser');
    
    const authSection = document.querySelector('.authentication');
    const mainNav = document.querySelector('.main-nav');
    const sidebar = document.querySelector('.sidebar-aside');
    const mainContent = document.querySelector('main');
    
    authSection.style.display = 'flex';
    mainNav.style.display = 'none';
    sidebar.style.display = 'none';
    mainContent.style.display = 'none';
    
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const signInError = document.getElementById('signInError');
    const signUpError = document.getElementById('signUpError');
    const toggleButton = document.getElementById('toggleButton');
    const panelTitle = document.getElementById('panelTitle');
    const panelText = document.getElementById('panelText');
    
    if (signInForm) signInForm.reset();
    if (signUpForm) signUpForm.reset();
    if (signInError) signInError.textContent = '';
    if (signUpError) signUpError.textContent = '';
    

    if (signInForm) signInForm.classList.add('active');
    if (signUpForm) signUpForm.classList.remove('active');
    if (toggleButton) toggleButton.textContent = 'Sign Up';
    if (panelTitle) panelTitle.textContent = 'Hello, Striver!';
    if (panelText) panelText.textContent = 'Enter your details and begin your self-evaluation journey';
    
   
    const slidingPanel = document.querySelector('.sliding-panel');
    if (slidingPanel) {
        slidingPanel.style.transform = 'translateX(0)';
        slidingPanel.style.borderRadius = 'var(--border-radius) 0 0 var(--border-radius)';
        slidingPanel.style.right = '0';
        slidingPanel.style.left = 'auto';
    }
    
 
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

function formatDate(date) {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}