function error(app) {

  app.use((req, res, next) => {
    res.status(404).json({ errorMessage: "No encontramos esta ruta" });

  });
  app.use((error, req, res, next) => {

    
    console.log(error);
    res
      .status(500)
      .json({ errorMessage: "Hubo problemas con el servidor, lo sentimos" });
  });
}

module.exports = error;
