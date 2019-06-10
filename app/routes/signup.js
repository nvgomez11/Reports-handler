import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    router: service(),
    actions: {
        signupUser() {
            var name = this.get('controller').get('name');
            var email = this.get('controller').get('email');
            var password = this.get('controller').get('password');

            var personalInforamtion = {
                name: name,
                email: email,
                password: password,
                reports: []
            }

            console.log(personalInforamtion);

            if (password != "" && password != undefined) {
                localStorage.setItem(email, JSON.stringify(personalInforamtion));
                alert("Account successfully created!");
                this.get('router').transitionTo("signin");
            } else {
                alert("Password can't be empty");
            }

            /*if (name != "" && name != undefined) {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    if (password != "" && password != undefined) {
                        if (passwordConfirmation != "" && passwordConfirmation != undefined) {
                            if (password == passwordConfirmation) {
                                alert("Everything is fine");
                            } else {
                                alert("Password and password confirmation are not the same!");
                            }
                        } else {
                            alert("Password confirmation can't be empty");
                        }
                    } else {
                        alert("Password can't be empty");
                    }
                } else {
                    alert("Email can't be empty");
                }
            } else {
                alert("Name can't be empty");
            }*/
        }
    }

});
