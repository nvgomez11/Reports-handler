import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    router: service(),
    model(params) {
        console.log(params.email_id);

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params.email_id)) {

            var emailName = params.email_id.split('@')[0];
            if (emailName.includes('.')) {
                emailName = emailName.split('.')[0];
            }
            var componentID = '#' + emailName;

            console.log("email name", emailName);
            console.log(componentID);

            console.log("MODELO")
            console.log(this.modelFor('reports'));

            return fetch(
                "https://cors-anywhere.herokuapp.com/https://www.beenverified.com/hk/dd/teaser/email?email=" + params.email_id
            )
                .then(response => response.json())
                .then(function (data) {
                    return {
                        emailTyped: params.email_id,

                        emailName: emailName,
                        componentID: componentID,

                        newReportInfo: data
                    }
                })
                .catch(console.log)

        } else {
            alert("Invalid email");
            this.get('router').transitionTo("reports");
        }
    },

    actions: {
        saveReport(newReport) {
            //get current user
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            //get the info of user
            var personalInformation = JSON.parse(localStorage.getItem(currentUser.email));
            //checks in the reports array if that emailtyped already exist
            let objectExist = personalInformation.reports.find(x => x.emailTyped == newReport.emailTyped);
            //if its undefined then add it, otherwise doesnt add it
            if (objectExist != undefined) {
                alert("The report already exist");
                //this.get('router').transitionTo("reports");
            } else {
                alert("Report saved successfully");
                personalInformation.reports.unshift(newReport);
                localStorage.setItem(currentUser.email, JSON.stringify(personalInformation));

            }
            this.modelFor('reports');
            this.get('router').transitionTo("reports");
        }
    }

});

