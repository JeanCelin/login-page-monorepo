const User = require("../models/User");

async function register(req, res) {
  // Pegar senha e email cadastrado
  const { email, password } = req.body;

  // Verificar se os campos foram preenchidos

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }


  try {
    // Verifica se o usuário já existe
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(409).json({
        message: "Usuário já existe",
      });
    }
    // Cria o usuário
    const user = await User.create({
      email,
      password, 
    });

    // Retorna o usuario
    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erro ao criar usuário",
      error: err.message,
    });
  }
}

async function login(req, res) {
  // Pegando os dados da requisição
  const { email, password } = req.body;

  // Validando se os dados são existentes
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  // Buscando o usuário correspondente
  const user = await User.findOne({ where: { email } });

  // Validando se o usuário existe
  if (!user) {
    return res.status(401).json({ message: "Usuário ou senha inválidos" });
  }

  return res.status(200).json({ message: "Login realizado com sucesso" });
}



module.exports = { register, login  };
