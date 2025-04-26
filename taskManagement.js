

// const sidebar = document.querySelector('.sidebar-aside');
// const toggleBtn = document.querySelector(".toggler");

// toggleBtn.addEventListener("click", () => {
//     sidebar.classList.toggle("collapse")
// });


document.addEventListener('DOMContentLoaded', function() {  //runs the funciton only after entire HTML page is loaded
    //    modal.style.display = 'none';
    
    
        const sidebar = document.querySelector('.sidebar-aside');
        const toggleBtn = document.querySelector(".toggler");
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
        
        const modals = document.querySelectorAll('.modal');

        if(toggleBtn){
            toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapse")
        });
    }
    
        modals.forEach(modal => {
            modal.style.display ='none';
        });
       
    
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
    
          const userData = JSON.parse(currentUser);
    
          // User found gettng redirected into dashboard
    
          authSection.style.display = 'none';
          mainContent.style.display = 'block';
          sidebar.style.display = 'flex';
          mainNav.style.display = 'flex';
        //   document.querySelector('nav').style.display = 'flex';
        //   document.querySelector('aside').style.display = 'block';
        //   document.querySelector('main').style.display = 'block';
          
        

        if(document.getElementById('profileName')){
          document.getElementById('profileName').textContent = `${userData.firstName} ${userData.lastName}`;
        }

        if(document.getElementById('profileEmail')){
          document.getElementById('profileEmail').textContent = userData.email;
        } 

        if(document.getElementById('memberSince') && userData.joinDate){
            document.getElementById('memberSince').textContent = `MemberSince: ${userData.joinDate}`;
        }

        //   const joinDate = localStorage.getItem('joinDate') || new Date().toLocaleDateString();
        //   document.getElementById('memberSince').textContent = `Member since: ${joinDate}`;
          
    
          loadUserTasks(userData.email);
        } else {
            
          authSection.style.display = 'flex';
          mainContent.style.display = 'none';
          sidebar.style.display = 'none';
          mainNav.style.display = 'none';
        //   document.querySelector('nav').style.display = 'none';
        //   document.querySelector('aside').style.display = 'none';
        //   document.querySelector('main').style.display = 'none';
    
        //   document.querySelectorAll('.modal').forEach(modal => {
        //     modal.style.display = 'none';
        //   })
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
              signInError.textContent = 'Login successful! Redirecting...';
              
             
              setTimeout(() => {
            
                authSection.style.display = 'none';
                document.querySelector('nav').style.display = 'flex';
                document.querySelector('aside').style.display = 'block';
                document.querySelector('main').style.display = 'block';
                
              
                document.getElementById('profileName').textContent = `${user.firstName} ${user.lastName}`;
                document.getElementById('profileEmail').textContent = user.email;
                
              
                loadUserTasks(user.email);
                
               
                updateStreak();
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
            signUpError.textContent = 'Account created successfully! Redirecting...';
            
         
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
    
    function handleLogout(e) {
        e.preventDefault();
        

        localStorage.removeItem('currentUser');
        
        
        authSection.style.display = 'flex';
        mainNav.style.display = 'none';
        sidebar.style.display = 'none';
        mainContent.style.display = 'none';
        
        
        if (signInForm) signInForm.reset();
        if (signUpForm) signUpForm.reset();
        if (signInError) signInError.textContent = '';
        if (signUpError) signUpError.textContent = '';
        
        // Show sign in form
        if (signInForm) signInForm.classList.add('active');
        if (signUpForm) signUpForm.classList.remove('active');
        if (toggleButton) toggleButton.textContent = 'Sign Up';
        if (panelTitle) panelTitle.textContent = 'Hello, Striver!';
        if (panelText) panelText.textContent = 'Enter your details and begin your self-evaluation journey';
        
        // Reset panel position
        const slidingPanel = document.querySelector('.sliding-panel');
        if (slidingPanel) {
            slidingPanel.style.transform = 'translateX(0)';
            slidingPanel.style.right = '0';
            slidingPanel.style.left = 'auto';
        }
    }
    
    // Modal close functionality
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Modal open functionality
    document.querySelectorAll('[data-open-modal]').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetId = this.getAttribute('data-open-modal');
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function generateUserId() {
        return 'u' + Math.random().toString(36).substr(2, 9);
    }
    
    function updateStreak() {
        // Get current streak and last login date
        let streak = parseInt(localStorage.getItem('streak') || '0');
        const lastLogin = localStorage.getItem('lastLogin');
        const today = new Date().toDateString();
        
        // If first login or login on a different day than last login
        if (!lastLogin) {
            streak = 1;
        } else if (lastLogin !== today) {
            // Check if it's consecutive day (yesterday)
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastLogin === yesterday.toDateString()) {
                // Consecutive login - increase streak
                streak += 1;
            } else {
                // Non-consecutive login - reset streak
                streak = 1;
            }
        }
        
        // Update streak in localStorage
        localStorage.setItem('streak', streak.toString());
        localStorage.setItem('lastLogin', today);
        
        // Update UI
        const streakElement = document.getElementById('streak-days');
        if (streakElement) {
            streakElement.textContent = `Day ${streak}`;
        }
        
        // Animate streak if it increased
        const streakContainer = document.querySelector('.streak-container');
        if (streakContainer && lastLogin !== today) {
            streakContainer.classList.add('pulse');
            setTimeout(() => {
                streakContainer.classList.remove('pulse');
            }, 1500);
        }
    }
    
    // Function to initialize user task data
    function initializeUserTasks(email) {
        // Default task categories and initial tasks
        const defaultTasks = {
            'daily': [
                { id: generateTaskId(), title: 'Complete daily reflection', completed: false, date: new Date().toISOString() }
            ],
            'goals': [
                { id: generateTaskId(), title: 'Set your first personal goal', completed: false, date: new Date().toISOString() }
            ],
            'growth': [
                { id: generateTaskId(), title: 'Complete your self-assessment', completed: false, date: new Date().toISOString() }
            ]
        };
        
        // Create user task storage
        const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
        userTasks[email] = defaultTasks;
        
        // Save to localStorage
        localStorage.setItem('userTasks', JSON.stringify(userTasks));
    }
    
    // Function to load user tasks
    function loadUserTasks(email) {
        const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
        const tasks = userTasks[email] || {};
        
        // Render tasks for each category
        Object.keys(tasks).forEach(category => {
            const taskList = document.getElementById(`${category}-tasks`);
            if (taskList) {
                renderTaskList(taskList, tasks[category], category);
            }
        });
        
        // Update task counts
        updateTaskCounts(tasks);
    }
    
    // Function to render task list
    function renderTaskList(container, tasks, category) {
        // Clear existing tasks
        container.innerHTML = '';
        
        // Sort tasks by date (newest first) and completion status
        tasks.sort((a, b) => {
            // First by completion status (incomplete first)
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            // Then by date (newest first)
            return new Date(b.date) - new Date(a.date);
        });
        
        // Add tasks to container
        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.id = task.id;
            taskItem.dataset.category = category;
            
            taskItem.innerHTML = `
                <div class="task-checkbox">
                    <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
                    <label for="task-${task.id}"></label>
                </div>
                <div class="task-content">
                    <p class="task-title">${task.title}</p>
                    <p class="task-date">${formatDate(new Date(task.date))}</p>
                </div>
                <div class="task-actions">
                    <button class="edit-task"><i class="fas fa-edit"></i></button>
                    <button class="delete-task"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            container.appendChild(taskItem);
            
            // Add event listeners for task actions
            setupTaskEventListeners(taskItem);
        });
    }
    
    // Function to set up task event listeners
    function setupTaskEventListeners(taskItem) {
        // Checkbox toggle
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                const taskId = taskItem.dataset.id;
                const category = taskItem.dataset.category;
                toggleTaskCompletion(taskId, category, this.checked);
                taskItem.classList.toggle('completed', this.checked);
            });
        }
        
        // Edit button
        const editBtn = taskItem.querySelector('.edit-task');
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                const taskId = taskItem.dataset.id;
                const category = taskItem.dataset.category;
                openEditTaskModal(taskId, category);
            });
        }
        
        // Delete button
        const deleteBtn = taskItem.querySelector('.delete-task');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                const taskId = taskItem.dataset.id;
                const category = taskItem.dataset.category;
                deleteTask(taskId, category);
            });
        }
    }
    
    // Function to toggle task completion
    function toggleTaskCompletion(taskId, category, isCompleted) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
            const tasks = userTasks[currentUser.email] || {};
            
            if (tasks[category]) {
                const taskIndex = tasks[category].findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    tasks[category][taskIndex].completed = isCompleted;
                    userTasks[currentUser.email] = tasks;
                    localStorage.setItem('userTasks', JSON.stringify(userTasks));
                    
                    // Update task counts
                    updateTaskCounts(tasks);
                }
            }
        }
    }
    
    // Function to delete task
    function deleteTask(taskId, category) {
        if (confirm('Are you sure you want to delete this task?')) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
                const tasks = userTasks[currentUser.email] || {};
                
                if (tasks[category]) {
                    tasks[category] = tasks[category].filter(t => t.id !== taskId);
                    userTasks[currentUser.email] = tasks;
                    localStorage.setItem('userTasks', JSON.stringify(userTasks));
                    
                    // Re-render task list
                    const taskList = document.getElementById(`${category}-tasks`);
                    if (taskList) {
                        renderTaskList(taskList, tasks[category], category);
                    }
                    
                    // Update task counts
                    updateTaskCounts(tasks);
                }
            }
        }
    }
    
    // Function to open edit task modal
    function openEditTaskModal(taskId, category) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
            const tasks = userTasks[currentUser.email] || {};
            
            if (tasks[category]) {
                const task = tasks[category].find(t => t.id === taskId);
                if (task) {
                    // Populate and show edit modal
                    const editModal = document.getElementById('editTaskModal');
                    const editTaskForm = document.getElementById('editTaskForm');
                    
                    if (editTaskForm && editModal) {
                        editTaskForm.taskTitle.value = task.title;
                        editTaskForm.dataset.taskId = task.id;
                        editTaskForm.dataset.category = category;
                        
                        editModal.style.display = 'flex';
                    }
                }
            }
        }
    }
    
    // Handle edit task form submission
    const editTaskForm = document.getElementById('editTaskForm');
    if (editTaskForm) {
        editTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const taskId = this.dataset.taskId;
            const category = this.dataset.category;
            const newTitle = this.taskTitle.value.trim();
            
            if (newTitle) {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
                    const tasks = userTasks[currentUser.email] || {};
                    
                    if (tasks[category]) {
                        const taskIndex = tasks[category].findIndex(t => t.id === taskId);
                        if (taskIndex !== -1) {
                            tasks[category][taskIndex].title = newTitle;
                            userTasks[currentUser.email] = tasks;
                            localStorage.setItem('userTasks', JSON.stringify(userTasks));
                            
                            // Re-render task list
                            const taskList = document.getElementById(`${category}-tasks`);
                            if (taskList) {
                                renderTaskList(taskList, tasks[category], category);
                            }
                            
                            // Close modal
                            const editModal = document.getElementById('editTaskModal');
                            if (editModal) {
                                editModal.style.display = 'none';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Close modal on cancel button click
    const cancelEditBtn = document.querySelector('#editTaskModal .cancel-btn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            const editModal = document.getElementById('editTaskModal');
            if (editModal) {
                editModal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const editModal = document.getElementById('editTaskModal');
        if (editModal && e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
    
    // Add new task functionality
    const addTaskForms = document.querySelectorAll('.add-task-form');
    addTaskForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const category = this.dataset.category;
            const taskInput = this.querySelector('.task-input');
            if (taskInput) {
                const taskTitle = taskInput.value.trim();
                
                if (taskTitle) {
                    addNewTask(taskTitle, category);
                    taskInput.value = '';
                }
            }
        });
    });
    
    // Function to add new task
    function addNewTask(title, category) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            const userTasks = JSON.parse(localStorage.getItem('userTasks')) || {};
            const tasks = userTasks[currentUser.email] || {};
            
            // Initialize category if it doesn't exist
            if (!tasks[category]) {
                tasks[category] = [];
            }
            
            // Create new task
            const newTask = {
                id: generateTaskId(),
                title: title,
                completed: false,
                date: new Date().toISOString()
            };
            
            // Add task to list
            tasks[category].push(newTask);
            userTasks[currentUser.email] = tasks;
            localStorage.setItem('userTasks', JSON.stringify(userTasks));
            
            // Re-render task list
            const taskList = document.getElementById(`${category}-tasks`);
            if (taskList) {
                renderTaskList(taskList, tasks[category], category);
            }
            
            // Update task counts
            updateTaskCounts(tasks);
        }
    }
    
    // Function to update task counts
    function updateTaskCounts(tasks) {
        Object.keys(tasks).forEach(category => {
            const totalTasks = tasks[category].length;
            const completedTasks = tasks[category].filter(t => t.completed).length;
            
            // Update count display
            const countElement = document.querySelector(`.${category}-count`);
            if (countElement) {
                countElement.textContent = `${completedTasks}/${totalTasks}`;
            }
            
            // Update progress bar
            const progressBar = document.querySelector(`.${category}-progress .progress-bar`);
            if (progressBar) {
                const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
                progressBar.style.width = `${progressPercentage}%`;
            }
        });
        
        // Update overall stats
        updateOverallStats(tasks);
    }
    
    // Function to update overall stats
    function updateOverallStats(tasks) {
        let totalTasks = 0;
        let completedTasks = 0;
        
        Object.values(tasks).forEach(categoryTasks => {
            totalTasks += categoryTasks.length;
            completedTasks += categoryTasks.filter(t => t.completed).length;
        });
        
        // Update overall task count
        const overallCount = document.getElementById('overall-count');
        if (overallCount) {
            overallCount.textContent = `${completedTasks}/${totalTasks}`;
        }
        
        // Update overall progress bar
        const overallProgress = document.querySelector('.overall-progress .progress-bar');
        if (overallProgress) {
            const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
            overallProgress.style.width = `${progressPercentage}%`;
        }
        
        // Update completion percentage
        const completionPercentage = document.getElementById('completion-percentage');
        if (completionPercentage) {
            const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
            completionPercentage.textContent = `${percentage}%`;
        }
    }
    
    // Function to generate task ID
    function generateTaskId() {
        return 't' + Math.random().toString(36).substr(2, 9);
    }
    
    // Function to format date
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
});