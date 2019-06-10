import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('reports', function () {
    this.route('new', { path: '/new/:email_id' });
  });
  this.route('signin');
  this.route('signup');
});

export default Router;
