export default {
    ifAdmin() {
        let getLoggedUser = JSON.parse(localStorage.getItem("role"));
         return getLoggedUser === 'admin';
    }
};