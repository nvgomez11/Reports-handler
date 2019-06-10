import Route from "@ember/routing/route";


export default Route.extend({
  model() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var infoUser = JSON.parse(localStorage.getItem(currentUser.email));
    console.log(infoUser.reports);
    return infoUser;
  },

  actions: {
    /* Its run when you access to a child route, and updates the parent model */
    willTransition() {
      this.refresh();
      console.log("WILL TANSITION");
    },
  }
});
