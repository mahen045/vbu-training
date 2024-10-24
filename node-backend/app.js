const express = require('express');
		const mongoose = require('mongoose');
		const bodyParser = require('body-parser');
        const cors = require('cors');

		// Initialize express
		const app = express();
        app.use(cors()); 
		app.use(bodyParser.json());

		// MongoDB connection
		mongoose.connect('mongodb://localhost:27017/restapi', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}).then(() => {
			console.log('Connected to MongoDB');
		}).catch((err) => {
			console.error('Error connecting to MongoDB:', err.message);
		});

		// Define a user schema
		const userSchema = new mongoose.Schema({
			name: String,
			email: String,
			age: Number
		});

		// Create a model from the schema
		const User = mongoose.model('User', userSchema);

		// Routes

		// Create a new user (POST)
		app.post('/users', async (req, res) => {
			try {
				const user = new User(req.body);
				await user.save();
				res.status(201).send(user);
			} catch (error) {
				res.status(400).send(error);
			}
		});

		// Get all users (GET)
		app.get('/users', async (req, res) => {
			try {
				const users = await User.find();
				res.status(200).send(users);
			} catch (error) {
				res.status(500).send(error);
			}
		});

		// Get a user by ID (GET)
		app.get('/users/:id', async (req, res) => {
			try {
				const user = await User.findById(req.params.id);
				if (!user) {
					return res.status(404).send();
				}
				res.status(200).send(user);
			} catch (error) {
				res.status(500).send(error);
			}
		});

		// Update a user by ID (PUT)
		app.put('/users/:id', async (req, res) => {
			try {
				const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
				if (!user) {
					return res.status(404).send();
				}
				res.status(200).send(user);
			} catch (error) {
				res.status(400).send(error);
			}
		});

		// Delete a user by ID (DELETE)
		app.delete('/users/:id', async (req, res) => {
			try {
				const user = await User.findByIdAndDelete(req.params.id);
				if (!user) {
					return res.status(404).send();
				}
				res.status(200).send(user);
			} catch (error) {
				res.status(500).send(error);
			}
		});

		// Start the server
		const PORT = process.env.PORT || 5000;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
