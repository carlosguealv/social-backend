const cors = require('cors');
const express = require('express');
const app = express();
const auth_mid = require('./src/auth_middleware');
app.use(cors);

// setup port
const port = 3000;

// setup firebase
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('../social-backend-22b0f-firebase-adminsdk-11lvo-a4f5494abe.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

// use authentiction middleware
app.use('/', auth_mid);

app.get('/', (req, res) => {
	res.send('Hello World, from express');
});


/**************
 * CRUD Users *
 *************/
app.post('/create_user', async (req, res) => {
	try{
		const user_json = {
			"name": req.body.name,
			"year": req.body.year,
			"dev": req.body.dev,
			"des": req.body.des,
			"pm": req.body.pm,
			"core": req.body.core,
			"mentor": req.body.mentor,
			"major": req.body.major,
			"minor": req.body.minor,
			"birthday": req.body.birthday,
			"home": req.body.home,
			"quote": req.body.quote,
			"favorite thing 1": req.body.favorite1,
			"favorite thing 2": req.body.favorite2,
			"favorite thing 3": req.body.favorite3,
			"favorite dartmouth tradition": req.body.favoritedart,
			"fun fact": req.body.funfact,
		}
		const new_user = await db.collection('users').doc('${req.id}');
		const response = new_user.set(user_json);
		res.send(response);
	} catch(error) {
		res.send(error);
	}
})

app.get('/users/:user_id', async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const user = await db.collection('users').doc(user_id).get();
		res.send(user.data());
	} catch(error) {
		res.send(error);
	}
});

app.post('/update/:user_id', async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const response = await db.collection('users').doc(user_id).update(req.body);
		res.send(response);
	} catch(error) {
		res.send(error);
	}
});

app.delete('/delete_user/:user_id', async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const response = await db.collection('users').doc(user_id).delete();
		res.send(response);
	} catch(error) {
		res.send(error);
	}
})

/**************
 * CRUD Users *
 *************/
app.post('/create_post/', async (req, res) => {
	try {
		const postJSON = {
			"user": req.body.user,
			"caption": req.body.caption,
			"likes": 0,
			"comments": new Object(),
		}
		const new_post = await db.collection('posts').doc('${req.id}');
		const response = new_post.set(postJSON);
		res.send(response);
	} catch (error) {
		res.send(error);
	}
});

app.get('/posts/:post_id', async (req, res) => {
	try {
		const post_id = req.params.post_id;
		const post = await db.collection('posts').doc(post_id).get();
		res.send(post.data());
	} catch(error) {
		res.send(error);
	}
});

app.post('/update_post/:post_id', async (req, res) => {
	try {
		const post_id = req.params.post_id;
		const response = await db.collection('posts').doc(post_id).update(req.body);
		res.send(response);
	} catch(error) {
		res.send(error);
	}
})

app.delete('delete_post/:post_id', async(req, res) => {
	try {
		const post_id = req.params.post_id;
		const response = await db.collection('posts').doc(post_id).delete();
		res.send(response);
	} catch(error) {
		res.send(error);
	}
})
