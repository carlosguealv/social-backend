const firebase = require("./firebase");

function auth_middleware(req, res, next) {
  const header_token = req.headers.authorization;
  if (!header_token) {
    return res.send({ message: "No token provided" }).status(401);
  }

  if (header_token && header_token.split(" ")[0] !== "Bearer") {
    res.send({ message: "Invalid token" }).status(401);
  }

  const token = header_token.split(" ")[1];
  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => {
	    req.id = token.uid
	    next()
    })
    .catch(() => res.send({ message: "Could not authorize" }).status(403));
}

const auth = auth_middleware;

exports.auth = auth;
