const { User, Image } = require("../database/models");

const seedDatabase = async () => {
	try {
		await Promise.all([
			User.create({
				first: "Elijah",
				last: "Cano",
				email: "elijahcano@gmail.com",
			}),
			User.create({
				first: "Jordan",
				last: "Yaqoob",
				email: "jordan@gmail.com",
			}),
			Image.create({
				url: "https://testcreative.co.uk/wp-content/uploads/2018/08/Test-Twitter-Icon.jpg",
				name: "Test-Twitter-Icon.jpg",
				user: "jordan@gmail.com",
				latitude: 40.8320147,
				longitude: -73.872721,
				likes: 0
			})
		]);
	} catch (err) {
		console.log(err);
	}
};

module.exports = seedDatabase;
