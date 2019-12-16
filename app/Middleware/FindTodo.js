'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
class FindTodo {
	/**
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Function} next
	 */
	async handle({ request, response, params }, next) {
		const Todo = use('App/Models/Todo');

		const { id } = params;
		const todo = await Todo.find(id);
		if (!todo) {
			return response.status(404).json({
				msg: 'Todo not found',
				id
			});
		}
		if (request.hasBody()) {
			request.body.todo = todo;
		} else {
			request.body = { todo };
		}

		// call next to advance the request
		await next();
	}
}

module.exports = FindTodo;
