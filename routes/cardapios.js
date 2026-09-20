import { Router } from 'express';
import {
  listarCardapios,
  buscarCardapio,
  criarCardapio,
  atualizarCardapio,
  deletarCardapio,
} from '../controllers/cardapiosController.js';
import autenticar from '../middlewares/autenticar.js';

const router = Router();

// Rotas públicas (livre acesso)
router.get('/', listarCardapios);          // GET /cardapios
router.get('/:id', buscarCardapio);        // GET /cardapios/:id

// Rotas protegidas (exigem o token no header Authorization)
router.post('/', autenticar, criarCardapio);           // 🔒 PROTEGIDO: POST /cardapios
router.put('/:id', autenticar, atualizarCardapio);     // 🔒 PROTEGIDO: PUT /cardapios/:id
router.delete('/:id', autenticar, deletarCardapio);    // 🔒 PROTEGIDO: DELETE /cardapios/:id

export default router;