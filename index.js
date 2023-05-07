const firebase = require('./src/firebase');
const cors = require('cors');
const express = require('express');
const app = express();
const auth_mid = require('./src/auth_middleware')
app.use(cors);

// setup port
const port = 3000;

app.use('/', auth_middleware);

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => {
	console.log(`Hello world app listening on port ${port}!`);
});

app.post('/user', (req, res) => {
	const new_user = db.collection('users').doc('${req.id}');
	new_user.set({
		user_data: req.body,
	});
})

app.post('/post', (req, res) => {
	console.log("New post yay!");
})
