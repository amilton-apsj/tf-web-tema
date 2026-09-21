import { Router } from 'express';
import {
  listarNutricionistas,
  buscarNutricionista,
  atualizarNutricionista,
  deletarNutricionista,
} from '../controllers/nutricionistasController.js';
import autenticar from '../middlewares/autenticar.js';
import autorizar from '../middlewares/autorizar.js';

const router = Router();

// Rotas públicas
router.get('/', listarNutricionistas);
router.get('/:id', buscarNutricionista);

// Rota protegida por autenticação (o próprio nutricionista edita o seu perfil)
router.put('/:id', autenticar, atualizarNutricionista);

// Rota protegida por autenticação e autorização (apenas ADMINs podem apagar)
router.delete('/:id', autenticar, autorizar('ADMIN'), deletarNutricionista);

export default router;