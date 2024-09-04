import { codeToMessage } from "@/constants/response-codes"
import { buildResponse } from "@utils/utils"
import { type NextFunction, type Request, type Response } from "express"

export default class ExpressError extends Error {
    public statusCode: number
    public message: string

    constructor(statusCode: number, customMessage?: string) {
        super(customMessage ?? codeToMessage[statusCode])
        this.message = customMessage ?? codeToMessage[statusCode]
        this.statusCode = statusCode
    }

    public static errorMiddleware(
        err: ExpressError | Error,
        req: Request,
        res: Response,
        _next: NextFunction
    ): void {
        let statusCode: number
        if (err instanceof ExpressError) {
            statusCode = err.statusCode
        } else {
            statusCode = 500
        }
        if (statusCode >= 500) {
            console.error("\n")
            console.error("==========", new Date().toUTCString(), "==========")
            console.error("Original URL: ", req.originalUrl)
            console.error(err)
            console.error("\n")
        }

        res.status(statusCode).json(buildResponse(statusCode, undefined))
    }

    public static NOT_FOUND = new ExpressError(404)
    public static INTERNAL_SERVER_ERROR = new ExpressError(500)
    public static BAD_REQUEST = new ExpressError(400)
    public static BAD_CREDENTIALS = new ExpressError(401)
}
