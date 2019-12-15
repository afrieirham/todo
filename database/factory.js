'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');

Factory.blueprint('App/Models/Todo', async (faker) => {
	return {
		title: faker.sentence({ words: 5 }),
		user_id: faker.integer({ min: 1, max: 3 }),
		is_complete: faker.bool()
	};
});

Factory.blueprint('App/Models/User', async (faker) => {
	return {
		username: faker.username(),
		email: faker.email(),
		password: await Hash.make('test1234')
	};
});
