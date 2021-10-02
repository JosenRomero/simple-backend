import { Request, Response, NextFunction } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {

    res.status(404).send({error: "No Found 404"});

}

export default notFound;