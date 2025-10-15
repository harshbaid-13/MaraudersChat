import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateRegister, validateLogin } from '../validations/auth.validation';

const router = Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/refresh', authController.refreshToken);

export default router;