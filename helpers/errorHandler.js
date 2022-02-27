function errorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401).json({message: "User not authorized"});
    }

    if (err.name === "ValidationError") {
        // validation error
        return res.status(401).json({message: err.message});
    }
    // default error handler
    return res.status(500).json(err);
}

module.exports = errorHandler;