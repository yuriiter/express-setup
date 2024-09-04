import ExpressError from "@errors/ExpressError"
import { getUserByEmail } from "@services/user.service"
import { type Permission } from "@/types/user"
import { verifyJWT } from "@utils/utils"
import { type NextFunction, type Request, type Response } from "express"

const authorizationMiddleware = (minPermissionRole: Permission) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        void (async () => {
            try {
                const authHeader = req.headers.authorization ?? ""
                const jwtFromAuthHeader = authHeader.split("Bearer ")[1]

                const token: string | undefined =
                    req.cookies.jwt ?? jwtFromAuthHeader
                if (token === undefined) {
                    if (minPermissionRole === "user")
                        throw ExpressError.BAD_CREDENTIALS
                    next()
                } else {
                    const decoded = await verifyJWT(token)

                    if (!decoded) throw ExpressError.BAD_CREDENTIALS

                    const { email, permission, fullName } = decoded as any

                    const user = await getUserByEmail(email)
                    if (user) {
                        if (
                            permission === "user" &&
                            minPermissionRole === "admin"
                        )
                            throw ExpressError.BAD_CREDENTIALS
                        req.locals = {
                            user: {
                                email,
                                fullName,
                                permission,
                            },
                        }

                        next()
                    } else if (minPermissionRole !== "anonymous")
                        throw ExpressError.BAD_CREDENTIALS
                }
            } catch (err) {
                next(err)
            }
        })()
    }
}

export default authorizationMiddleware
