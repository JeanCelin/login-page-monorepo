const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      email,
      password: hashedPassword,
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

  try {
    const user = await User.findOne({ where: { email } });
    // Caso não encontre o email
    if (!user) {
      return res.status(401).json({
        message: "Email ou senha invalidos",
      });
    }

    // Comparar as senhas, sintaxe bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Caso a senha comparada seja inválida

    // Criar o token
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email ou senha inválidos",
      });
    }

        const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );


    // Caso a senha seja válida

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Erro ao realizar login",
      error: err.message,
    });
  }
}

module.exports = { register, login };
