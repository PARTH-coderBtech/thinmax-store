const adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  next();
};

module.exports = adminMiddleware;
