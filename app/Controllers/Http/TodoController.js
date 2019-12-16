'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use('App/Models/Todo');
/**
 * Resourceful controller for interacting with todos
 */
class TodoController {
	/**
	 * Show a list of all todos.
	 * GET todos
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		const todo = await Todo.all();
		const count = todo.rows.length;
		response.json({
			msg: 'All todo list',
			count,
			data: todo
		});
	}

	/**
	 * Create/save a new todo.
	 * POST todos
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
		const { title } = request.post();
		const todo = new Todo();

		todo.title = title;
		await todo.save();

		response.json({
			msg: 'Successfully added new todo',
			data: todo
		});
	}

	/**
	 * Display a single todo.
	 * GET todos/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async show({ params, request, response, view }) {
		const { todo } = request.post();
		response.json({
			msg: 'Todo found',
			data: todo
		});
	}

	/**
	 * Update todo details.
	 * PUT or PATCH todos/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async update({ params, request, response }) {
		const { todo, title } = request.post();
		todo.title = title;
		todo.save();

		response.json({
			msg: 'Successfully update todo',
			data: todo
		});
	}

	/**
	 * Delete a todo with id.
	 * DELETE todos/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
		const { todo } = request.post();
		await todo.delete();

		response.json({
			msg: 'Todo succesfully deleted',
			data: todo
		});
	}
}

module.exports = TodoController;
