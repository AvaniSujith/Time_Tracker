// ui.js

import { getTasks, getTaskStats, deleteTaskById, markTaskCompleted } from './taskManager.js';

// ------------------------------
// Task Counters
// ------------------------------
export function updateTaskCounters({ total, ongoing, completed, totalHours } = getTaskStats()) {
  document.getElementById("total-count").textContent = total;
  document.getElementById("ongoing-count").textContent = ongoing;
  document.getElementById("completed-count").textContent = completed;
  document.getElementById("time-total").textContent = totalHours;
}

// ------------------------------
// Task Table Rendering
// ------------------------------
export function renderPausedTaskTable() {
  const tbody = document.getElementById("pausedTaskTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const pausedTasks = getTasks().filter(t => t.status === "paused");

  pausedTasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${task.id.slice(-4)}</td>
      <td>${task.name}</td>
      <td>${task.priority}</td>
      <td>${task.tag}</td>
      <td>${task.status}</td>
      <td>${task.startDate || "--"}</td>
      <td>${task.endDate || "--"}</td>
      <td>${task.timeTaken || "00:00:00"}</td>
      <td>${formatTimeFragments(task.timeFragments)}</td>
      <td>
        <button onclick="resumeTask('${task.id}')">Resume</button>
        <button onclick="showTaskDetails('${task.id}')">Details</button>
        <button onclick="markTaskCompleted('${task.id}')">Complete</button>
        <button onclick="deleteTaskById('${task.id}')">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ------------------------------
// Modal Creation
// ------------------------------
export function showModal(contentHTML) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      ${contentHTML}
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector(".close").onclick = () => modal.remove();
}

// ------------------------------
// Utilities
// ------------------------------
export function formatTimeFragments(fragments) {
  if (!Array.isArray(fragments)) return "--";
  const lastThree = fragments.slice(-3);
  return lastThree.map(f => `${f.date}: ${f.duration}`).join("<br>");
}

export function clearOngoingTaskDisplay() {
  ["displayTaskName", "displayTag", "displayPriority", "displayStartDate", "displayStatus", "displayTargetTime"].forEach(id => {
    document.getElementById(id).textContent = " -- ";
  });
  document.getElementById("activeTaskPanel").classList.add("hidden");
  document.getElementById("noActiveTaskPanel").classList.remove("hidden");
}
