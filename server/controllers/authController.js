const bcrypt = require('bcrypt');
const sequelize = require('../sequelize');
const User = require('../models/User')(sequelize);
const authMiddleware = require('../middleware/authMiddleware');

exports.register = async (req, res) => {
  try {
    const { username, senha } = req.body;

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await User.create({ username, senha: hashedPassword });

    return res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, senha } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    const token = authMiddleware.generateToken(user);

    return res.status(200).json({ message: 'Login bem-sucedido', user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};
