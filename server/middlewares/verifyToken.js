// Middleware that we could use for the controller/routes

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) res.status(403).json("Token is invalid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  console.log(" inside the verifyTokenAndAuthorization func", req.body);
  verifyToken(req, res, () => {
    if (req.user.slug === req.params.slug || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const verifyTokenSendEmail = (req, res) => {
  console.log("inside the email secret key", process.env.JWT_SECRET);
  try {
    const verify = jwt.verify(req.params.token, process.env.JWT_SECRET);
    res.send("verified");
  } catch (error) {
    console.log(error);
    res.send("not verified");
  }
};
