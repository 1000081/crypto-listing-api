const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const coinController = require('../controller/coin-controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */

route.get('/show-user', services.show_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)


route.get('/coin/show-coin', services.show_coin)
route.get('/coin/add-coin', services.add_coin)
// route.get('/coin/vote-coin', services.vote_coin)

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

route.post('/api/coins', coinController.create);
route.get('/api/coins', coinController.find);
route.put('/api/coins/:id', coinController.update);
route.delete('/api/coins/:id', coinController.delete);
route.delete('/api/coins/:id', coinController.vote);

module.exports = route