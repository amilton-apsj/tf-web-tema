import { Router } from 'express';
import {
  listarNutricionistas,
  buscarNutricionista,
  atualizarNutricionista,
  deletarNutricionista,
} from '../controllers/nutricionistasController.js';
import autenticar from '../middlewares/autenticar.js'; // 1. Importa o middleware

const router = Router();

router.get('/', listarNutricionistas);
router.get('/:id', buscarNutricionista);
router.put('/:id', autenticar, atualizarNutricionista); // 2. Protege a rota de edição
router.delete('/:id', autenticar, deletarNutricionista); // Opcional, mas recomendado

export default router;