import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import logger from './middlewares/logger.js';
import tratarErro from './middlewares/tratarErro.js'; 
import authRouter from './routes/auth.js';
import nutricionistasRouter from './routes/nutricionistas.js';
import cardapiosRouter from './routes/cardapios.js';
import categoriasRouter from './routes/categorias.js';
import restricoesRouter from './routes/restricoes.js';
import itensCardapioRouter from './routes/itensCardapio.js';

const app = express();      // cria a aplicação Express
const PORT = process.env.PORT || 3000;           // porta do servidor

app.use(cors()); 
app.use(express.json());    // middleware que parseia JSON do body das requisições
app.use(logger);

// rota raiz — boas-vindas
app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Nutrição está no ar! 🍏' });
});

// rota de health check
app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// registra as rotas dos modelos com seus respectivos prefixos
app.use('/nutricionistas', nutricionistasRouter);
app.use('/cardapios', cardapiosRouter);
app.use('/categorias', categoriasRouter);
app.use('/restricoes', restricoesRouter);
app.use('/itens-cardapio', itensCardapioRouter);
app.use('/auth', authRouter);

// middleware de erro deve ser o último
app.use(tratarErro);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;