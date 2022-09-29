class AuthRouter {
  constructor(express, authService) {
    this.express = express;
    this.authService = authService;
  }
  router() {
    let router = this.express.Router();

    router.post("/login", this.login.bind(this));
    router.post("/signup", this.signup.bind(this));
    return router;
  }

  login(req, res) {
    return this.authService
      .login(req.body.email, req.body.password)
      .then((token) => {
        res.json(token);
        console.log("Sign complete")
      })
      .catch(() => res.sendStatus(401));
  }

  signup(req, res) {
    return this.authService
      .signup(req.body.email, req.body.name, req.body.password)
      .then((result) => {
        res.send(result);
      })
      .catch(() => res.sendStatus(401));
  }
}
module.exports = AuthRouter;