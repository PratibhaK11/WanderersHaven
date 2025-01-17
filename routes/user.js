//routes/user.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users");
const { isLoggedIn } = require("../middleware");

// Local authentication routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", userController.signup);
router.get("/login", userController.renderLoginForm);
router.post("/login",
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    userController.login
);
//router.get("/logout", userController.logout);
// Logout route
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Error logging out:", err);
            // Optionally handle the error here, such as logging it or sending a response
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listing"); // Redirect to a suitable page after logout
    });
});

// GitHub OAuth routes
router.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', failureFlash: true }),
    (req, res) => {
        res.redirect('/listing');
    }
);



module.exports = router;
