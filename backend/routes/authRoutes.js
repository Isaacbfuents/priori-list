import express from 'express';
import { register, login, authenticate } from '../controllers/authController.js';
import verifyRefreshToken from '../helpers/verifyRefreshToken.js';
import resendAuthenticationEmail from '../helpers/resendAuthenticationEmail.js';
import logout from '../helpers/logout.js';
const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/verify/:verificationToken', authenticate);

router.post('/resend-verificationToken', resendAuthenticationEmail);

router.post('/token', verifyRefreshToken);

router.delete('/logout', logout);


export default router;