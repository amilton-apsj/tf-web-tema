// factory: recebe os papéis permitidos e devolve um middleware
export default function autorizar(...rolesPermitidos) {
  return function (req, res, next) {
    // req.nutricionista foi populado pelo autenticar (que SEMPRE roda antes)
    if (!rolesPermitidos.includes(req.nutricionista.role)) {
      return res.status(403).json({ erro: 'Acesso negado' });
    }

    next(); // o papel é permitido — segue para o controller
  };
}