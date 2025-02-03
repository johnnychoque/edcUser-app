import express, { json } from 'express' 
import config from 'config'

import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';

import { edcRouter } from './routes/edc.js'
import { authRouter } from './routes/auth.js'
import { fiwareRouter } from './routes/fiware.js'
import { eventRouter } from './routes/event.js';

import { ErrorHandler } from "./middlewares/ErrorHandler.js";
import { corsMiddleware } from './middlewares/cors.js'

const HOST = config.get('server.host');
const PORT = config.get('server.port');

const app = express()
app.use(corsMiddleware())
app.use(express.json())
app.disable('x-powered-by')

// Configuración de la sesión
app.use(session({
  secret: config.get('server.secret'),
  resave: false,
  saveUninitialized: true,
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Configuración de la estrategia OAuth2
passport.use(new OAuth2Strategy({
    authorizationURL: config.get('oauth.authorizationURL'),
    tokenURL: config.get('oauth.tokenURL'),
    clientID: config.get('oauth.clientID'),
    clientSecret: config.get('oauth.clientSecret'),
    callbackURL: config.get('oauth.callbackURL'),
    scope: config.get('oauth.scope'),
    state: config.get('oauth.state')
}, (accessToken, refreshToken, profile, done) => {
    // Aquí puedes guardar el perfil del usuario en la sesión    
    return done(null, { accessToken, refreshToken, profile });
}));

// Serialización y deserialización del usuario
passport.serializeUser((user, done) => {
  console.log('user ', user);
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use('/edc', edcRouter);
app.use('/auth', authRouter);
app.use('/fiware', fiwareRouter);
app.use('/event', eventRouter);

app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`server listening on ${HOST}:${PORT}`)
})

