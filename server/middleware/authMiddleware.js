const jwt = require('jsonwebtoken');

const secretKey = 'segredo';

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, secretKey, options);
}

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  token = token.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { generateToken, verifyToken };
