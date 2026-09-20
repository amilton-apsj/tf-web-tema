import { Router } from 'express';
import {
  listarItensCardapio,
  buscarItemCardapio,
  criarItemCardapio,
  atualizarItemCardapio,
  deletarItemCardapio,
} from '../controllers/itensCardapioController.js';

const router = Router();

router.get('/', listarItensCardapio);          // GET /itens-cardapio
router.get('/:id', buscarItemCardapio);        // GET /itens-cardapio/:id
router.post('/', criarItemCardapio);           // POST /itens-cardapio
router.put('/:id', atualizarItemCardapio);     // PUT /itens-cardapio/:id
router.delete('/:id', deletarItemCardapio);    // DELETE /itens-cardapio/:id

export default router;