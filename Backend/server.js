import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './auth.js';
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY],
  maxAge: 24 * 60 * 60 * 1000, // 1 day
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: false
  }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

app.get('/auth/failure', (req, res) => {
  res.send('Google Login Failed!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
