// import { renderCompletedTable, renderPausedTable } from "./views/taskView.js";
import { createGraph } from "./analytics/analytics.js";
import { populateProfileDetails, initProfileEdit } from "./views/authView.js";
import { renderTables } from "./controllers/taskController.js";

export function handlingNavLinks(){
    // console.log("handlingNavLinks function called");
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    // console.log("Found nav links:", navLinks);

    navLinks.forEach(link => {
        console.log("Adding click listener to nav link:", link);
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = link.getAttribute('data-page');
            // console.log("Nav link clicked, target page:", targetPage);

            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            link.parentElement.classList.add('active');

            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            const targetPageElement = document.getElementById(`${targetPage}-page`);
            if(targetPageElement){
                targetPageElement.classList.add('active');
            }

        
            if (window.innerWidth <= 768) {
                const mainSidebar = document.querySelector('.sidebar-aside');
                const sidebarNav = document.querySelector('.sidebar-nav');
                if (mainSidebar) mainSidebar.classList.remove('show-menu');
                if (sidebarNav) sidebarNav.classList.remove('show-menu');
            }

            if(targetPage === 'works-done'){
                renderTables();
            } else if(targetPage === 'analytics'){
                setTimeout(createGraph, 100);
            } else if(targetPage === 'dashboard') {
                renderTables();
            } else if (targetPage === 'profile') {
                populateProfileDetails();
                initProfileEdit();
            }
        });
    });
}

export function openModal(modalId){
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.add("show");
}

export function closeModal(modalId){
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.remove("show");
}


export function sideBarToggler(){
    const mainSidebar = document.querySelector('.sidebar-aside');
    const sidebarToggleBtn = document.querySelector(".sidebar-toggler");

    if(sidebarToggleBtn && mainSidebar){
        sidebarToggleBtn.addEventListener("click", () => {
            mainSidebar.classList.toggle("collapse");
            console.log("Sidebar toggled")
        });
    }else{
        console.warn("sidebar toggler btn not found");
    }
}

export function menuToggler(){
    const menuBtn = document.querySelector('.menu-toggler');
    const sidebarNav = document.querySelector('.sidebar-nav');
    const mainSidebar = document.querySelector('.sidebar-aside');

    if(menuBtn && sidebarNav && mainSidebar){
        menuBtn.addEventListener('click', () => {
            
            if (window.innerWidth <= 768) {
                sidebarNav.classList.toggle('show-menu');
                mainSidebar.classList.toggle('show-menu');
                mainSidebar.classList.remove('collapse');
                console.log("Menu toggled on small screen");
            }        
        });
    } else {
        console.warn("Menu toggler/sidebar nav/main sidebar not found");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    menuToggler();

    if (window.innerWidth <= 768) {
        const mainSidebar = document.querySelector('.sidebar-aside');
        const sidebarNav = document.querySelector('.sidebar-nav');
        if (mainSidebar) mainSidebar.classList.remove('show-menu');
        if (sidebarNav) sidebarNav.classList.remove('show-menu');
    }
});
