// auth.js

export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  }
  
  export function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('joinDate', user.joinDate);
  }
  
  export function clearCurrentUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('joinDate');
  }
  
  export function getAllUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
  }
  
  export function saveUser(user) {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  export function isEmailRegistered(email) {
    return getAllUsers().some(user => user.email === email);
  }
  
  export function findUserByEmailAndPassword(email, password) {
    return getAllUsers().find(user => user.email === email && user.password === password);
  }
  
  export function generateUserId() {
    return `user-${Date.now()}`;
  }
  
  export function updateStreak() {
    const lastLogin = localStorage.getItem('lastLogin');
    const today = new Date().toDateString();
  
    if (lastLogin === today) return;
  
    let streak = parseInt(localStorage.getItem('streak') || '0', 10);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
  
    if (lastLogin === yesterday.toDateString()) {
      streak++;
    } else {
      streak = 1;
    }
  
    localStorage.setItem('streak', streak.toString());
    localStorage.setItem('lastLogin', today);
    document.getElementById('streak-days').textContent = `Day ${streak}`;
  }
  