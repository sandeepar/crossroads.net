module.exports = function(app) {
  app.delete("/logout", function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(204).end();
  });
};
