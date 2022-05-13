import express from 'express';
import userCtrl from '../controllers/user.controller';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

router.route('/api/users').get(userCtrl.list).post(userCtrl.create);

// When the Express app gets a POST request at '/api/users, it calls the create function defined in the userController.js
// router.route('/api/users');

// Fetch all the users
router.route('/api/users').get(userCtrl.list);

// Get a specific user by userId
router.route('/api/users/:userId').get(authCtrl.requireSignin, userCtrl.read);

// Update
router
  .route('/api/users/:userId')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update);

router
  .route('/api/users/:userId')
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// Whenever the express app receives a req to a route that matches a path with the :userId param, the app will execute the userById controller function, which fetches and loads the user into the express req obj. before propagating it to the "next" function
router.param('userId', userCtrl.userById);

export default router;
