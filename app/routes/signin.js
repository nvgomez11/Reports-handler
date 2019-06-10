import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    router: service(),
    actions: {
        signinUser() {
            var email = this.get('controller').get('email');
            var password = this.get('controller').get('password');

            if (email != "" && email != undefined) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    if (password != "" && password != undefined) {

                        var personalInfo = JSON.parse(localStorage.getItem(email));
                        //if user exist, comapres the password
                        if (personalInfo != null && personalInfo != undefined) {
                            if (password == personalInfo.password) {

                                //Authentication token setup
                                var currentUserObj = {
                                    name: personalInfo.name,
                                    email: personalInfo.email
                                };

                                localStorage.removeItem('currentUser');
                                localStorage.setItem('currentUser', JSON.stringify(currentUserObj));
                                console.log("personal info", personalInfo);
                                console.log("current Object", JSON.stringify(currentUserObj));
                                this.get('router').transitionTo("reports");

                            } else {
                                alert("Password incorrect!");
                            }
                        } else {
                            alert("The account does not exist. Please Sign up.")
                        }
                    } else {
                        alert("Password can't be empty!");
                    }
                } else {
                    alert("Invalid email");
                }
            } else {
                alert("Email can't be empty!");
            }

        }
    },

    model() {

    }
});
