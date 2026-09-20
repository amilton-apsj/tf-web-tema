import { Router } from 'express';
import {
  listarNutricionistas,
  buscarNutricionista,
  criarNutricionista,
  atualizarNutricionista,
  deletarNutricionista,
} from '../controllers/nutricionistasController.js';

const router = Router();

router.get('/', listarNutricionistas);          // GET /nutricionistas
router.get('/:id', buscarNutricionista);        // GET /nutricionistas/:id
router.post('/', criarNutricionista);           // POST /nutricionistas
router.put('/:id', atualizarNutricionista);     // PUT /nutricionistas/:id
router.delete('/:id', deletarNutricionista);    // DELETE /nutricionistas/:id

export default router;