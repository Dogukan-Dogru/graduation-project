const routes = require('next-routes')();

routes.add('/transactions/add_new_charity','/transactions/add_new_charity').add('/transactions/:address','/transactions/donate_to_charity');

module.exports = routes;



