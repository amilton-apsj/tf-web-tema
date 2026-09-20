import { Router } from 'express';
import {
  listarRestricoes,
  buscarRestricao,
  criarRestricao,
  atualizarRestricao,
  deletarRestricao,
} from '../controllers/restricoesController.js';

const router = Router();

router.get('/', listarRestricoes);          // GET /restricoes
router.get('/:id', buscarRestricao);        // GET /restricoes/:id
router.post('/', criarRestricao);           // POST /restricoes
router.put('/:id', atualizarRestricao);     // PUT /restricoes/:id
router.delete('/:id', deletarRestricao);    // DELETE /restricoes/:id

export default router;