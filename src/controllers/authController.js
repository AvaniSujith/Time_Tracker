import * as authService from '../services/authService.js';
import * as authView from '../views/authView.js';

export function initAuth(){
    const user = authService.getCurrentUser();

    if(!user){
        authView.initAuthUI({
            onLogin : ({ email, password }) => {
                const loggedInUser = authService.login(email, password);
                if(loggedInUser){
                    location.reload();
                }else{
                    authView.showError("Invalid email or Password");
                }
            },
            onSignup: ( userData ) => {
                const newUser =  authService.signup(userData);
                if (newUser){
                    location.reload();
                }else{
                    authView.showError('signup', "User with this email already exists");
                }
            }
        });
    }else{
        authView.showLogoutButton(() => {
            authService.logout();
            location.reload();
        });
    }
}
