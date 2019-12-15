'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User');
/**
 * Resourceful controller for interacting with users
 */
class UserController {
	/**
	 * Show a list of all users.
	 * GET users
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const user = await User.all();
		const count = user.rows.length;
		response.json({
			msg: 'All user list',
			count,
			data: user
		});
	}

	/**
	 * Create/save a new user.
	 * POST users
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async signup({ request, response, auth }) {
		// get user data from signup form
		const userData = request.only(['username', 'email', 'password']);
		try {
			// save user to database
			const newUser = await User.create(userData);
			// generate JWT token for user
			const token = await auth.generate(newUser);

			// Object.assign(user, token);

			return response.json({
				msg: 'success',
				user: newUser,
				data: token
			});
		} catch (error) {
			return response.status(400).json({
				msg: 'error',
				message: 'There was a problem creating the user, please try again later.'
			});
		}
	}

	/**
	 * Handles user authentication
	 *
	 * @method login
	 *
	 * @param  {Object} request
	 * @param  {Object} auth
	 * @param  {Object} response
	 *
	 * @return {String|JSON}
	 */
	async login({ request, response, auth }) {
		const { username, email, password } = request.post();
		// try {
		// validate the user credentials and generate a JWT token
		const token = await auth.attempt(email, password).catch((error) => sendError(error));

		response.json({
			msg: 'success',
			data: token
		});

		const sendError = (error) => {
			response.status(400).json({
				msg: 'error',
				message: 'Invalid email/password'
			});
		};
		// }
	}

	/**
	 * Display a single user.
	 * GET users/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const { user } = request;
		response.json({
			msg: 'User found',
			data: user
		});
	}

	/**
	 * Update user details.
	 * PUT or PATCH users/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {}

	/**
	 * Delete a user with id.
	 * DELETE users/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
		const { user } = request;
		await user.delete();

		response.json({
			msg: 'User succesfully deleted',
			data: user
		});
	}
}

module.exports = UserController;
