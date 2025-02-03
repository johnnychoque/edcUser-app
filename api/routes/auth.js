import { Router } from 'express'
import passport from 'passport';
import { AuthController } from '../controllers/auth.js'

export const authRouter = Router()

authRouter.get('/login', (req, res, next) => {
  console.log('Acceso a la ruta /login detectado:', new Date().toISOString());
  passport.authenticate('oauth2')(req, res, next);
});

authRouter.get('/callback', (req, res, next) => {
  console.log('Acceso a la ruta /callback detectado:', new Date().toISOString());
  passport.authenticate('oauth2', { failureRedirect: '/' })(req, res, (err) => {
    if (err) {
      return next(err);
    }
    AuthController.handleCallback(req, res, next);
  });
});

authRouter.get('/profile', AuthController.getProfile);

authRouter.get('/logout', AuthController.logout);
