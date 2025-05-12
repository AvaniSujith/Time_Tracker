export function initWeeklyTimeGrid(containerId, maxHours = 15){

    const container = document.getElementById('weeklyGrid');
    if(!container) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
} 