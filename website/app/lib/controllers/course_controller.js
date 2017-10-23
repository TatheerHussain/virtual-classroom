CourseController = RouteController.extend({

	// A place to put your subscriptions
	// this.subscribe('items');
	// // add the subscription to the waitlist
	// this.subscribe('item', this.params._id).wait();

	subscriptions: function() {
		this.subscribe('Courses').wait()
		this.subscribe('Lectures').wait()
		this.subscribe('userData').wait()
	},

	// Subscriptions or other things we want to "wait" on. This also
	// automatically uses the loading hook. That's the only difference between
	// this option and the subscriptions option above.
	// return Meteor.subscribe('post', this.params._id);

	waitOn: function () {
	},

	// A data function that can be used to automatically set the data context for
	// our layout. This function can also be used by hooks and plugins. For
	// example, the "dataNotFound" plugin calls this function to see if it
	// returns a null value, and if so, renders the not found template.
	// return Posts.findOne({_id: this.params._id});

	data: function () {
	},

	// You can provide any of the hook options

	onRun: function () {
		this.next();
	},
	onRerun: function () {
		this.next();
	},
	onBeforeAction: function () {
		this.next();
	},

	// The same thing as providing a function as the second parameter. You can
	// also provide a string action name here which will be looked up on a Controller
	// when the route runs. More on Controllers later. Note, the action function
	// is optional. By default a route will render its template, layout and
	// regions automatically.
	// Example:
	//  action: 'myActionFunction'

	action: function () {
		this.render();
	},
	onAfterAction: function () {
		// The SEO object is only available on the client.
		// Return if you define your routes on the server, too.
		if (!Meteor.isClient) {
			return;
		}
		var course_code = Router.current().params.code.toUpperCase()
		var course = Courses.findOne({'code':course_code})
		if (course) {
			// get instructor info, course title and course description
			var title = course.title
			var description = course.description
			SEO.set({
				title: course_code + " " + title + " | PlzStopMe",
				meta: {
					"description": description
				}
			});
		}
	},
	onStop: function () {
	}
});
