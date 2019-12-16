'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class FindUser {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request, params, response }, next) {
		const User = use('App/Models/User');

		const { id } = params;
		const user = await User.find(id);
		if (!user) {
			return response.status(404).json({
				msg: 'User not found',
				id
			});
		}

		if (request.hasBody()) {
			request.body.user = user;
		} else {
			request.body = { user };
		}

		// call next to advance the request
		await next();
	}
}

module.exports = FindUser;
