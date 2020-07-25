const redisRoutes = require('./redisRoutes');


const constructorMethod = app => {
    app.use("/api/people", redisRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error:'Not found'});
      });
};

module.exports = constructorMethod;