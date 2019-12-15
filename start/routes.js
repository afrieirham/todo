'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { exec } = require('child_process');

// Route.on('/').render('welcome');
Route.get('/', () => {
	return { greeting: 'Hello world in JSON' };
});

Route.get('/todos', 'TodoController.index');
Route.post('/todos', 'TodoController.store');
Route.get('/todos/:id', 'TodoController.show').middleware(['findTodo']);
Route.put('/todos/:id', 'TodoController.update').middleware(['findTodo']);
Route.delete('/todos/:id', 'TodoController.destroy').middleware(['findTodo']);

Route.get('/users', 'UserController.index');
Route.get('/users/:id', 'UserController.show').middleware(['findUser']);
Route.post('/users/login', 'UserController.login');
Route.post('/users/signup', 'UserController.signup');
