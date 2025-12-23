const app = require("./app");
const sequelize = require("./config/database");
const authRoutes = require("./routes/auth.routes");


app.use("/auth", authRoutes);
sequelize.sync().then(() => {
  app.listen(3333, () => {
    console.log("Servidor rodando na porta 3333");
  });
});
