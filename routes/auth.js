import { Router } from 'express';
import { register, login } from '../controllers/authController.js'; // <-- Adicionado o login no import

const router = Router();

router.post('/register', register);
router.post('/login', login); // <-- Rota de login habilitada

export default router;