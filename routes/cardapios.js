import { Router } from 'express';
import {
  listarCardapios,
  buscarCardapio,
  criarCardapio,
  atualizarCardapio,
  deletarCardapio,
} from '../controllers/cardapiosController.js';

const router = Router();

router.get('/', listarCardapios);          // GET /cardapios
router.get('/:id', buscarCardapio);        // GET /cardapios/:id
router.post('/', criarCardapio);           // POST /cardapios
router.put('/:id', atualizarCardapio);     // PUT /cardapios/:id
router.delete('/:id', deletarCardapio);    // DELETE /cardapios/:id

export default router;