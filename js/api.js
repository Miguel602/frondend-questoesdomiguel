// URL do backend - altere para a URL do seu Render
const API_BASE_URL = 'https://questoes-do-miguel.onrender.com';
import { User } from "./models/User.js";
import bcrypt from "bcrypt";

app.get("/create-admin", async (req, res) => {
  try {
    const username = "admin";
    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user, created] = await User.findOrCreate({
      where: { username },
      defaults: { password: hashedPassword }
    });

    if (created) {
      res.send("Usuário admin criado com sucesso!");
    } else {
      res.send("Usuário admin já existe.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar admin.");
  }
});

