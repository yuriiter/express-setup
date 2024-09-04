import { type NextFunction, type Request, type Response } from "express"
import { ZodError, type ZodSchema } from "zod"

const validateBody = <T extends ZodSchema<any>>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const queryParams = req.body

        try {
            schema.parse(queryParams)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: "Internal server error" })
            }
        }
    }
}

export default validateBody
