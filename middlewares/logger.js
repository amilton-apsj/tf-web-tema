export default function logger(req, res, next) {
  const inicio = Date.now();
  
  res.on('finish', () => {
    const agora = new Date().toISOString();     // timestamp no formato ISO
    const metodo = req.method;                  // GET, POST, PUT, DELETE
    const url = req.originalUrl;
    const status = res.statusCode;
    const duracao = Date.now() - inicio;
    
    console.log(`[${agora}] ${metodo} ${url} -> ${status} (${duracao}ms)`);
  });
  
  next();
}