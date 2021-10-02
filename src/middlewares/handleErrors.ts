import { ErrorRequestHandler } from "express";

const handleErrors: ErrorRequestHandler = (err, req, res, next) => {

    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    const errorName = err.error.name || "defaultError";

    res.status(status).send({status, message, errorName});

}

export default handleErrors;