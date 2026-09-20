import { Router } from 'express';
import {
  listarCategorias,
  buscarCategoria,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
} from '../controllers/categoriasController.js';

const router = Router();

router.get('/', listarCategorias);          // GET /categorias
router.get('/:id', buscarCategoria);        // GET /categorias/:id
router.post('/', criarCategoria);           // POST /categorias
router.put('/:id', atualizarCategoria);     // PUT /categorias/:id
router.delete('/:id', deletarCategoria);    // DELETE /categorias/:id

export default router;