export default function tratarErro(err, req, res, next) {
  console.error('[ERRO]', err);                     // mostra o erro no terminal
  res.status(500).json({                            // resposta JSON padronizada
    erro: 'Erro interno do servidor',
  });
}