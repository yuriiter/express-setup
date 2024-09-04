import passport from "passport"
import { type Middleware } from "../types/middleware"

// Middleware for local authentication
export const localAuthMiddleware: Middleware = (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err) {
            next(err)
            return
        }
        if (!user)
            return res
                .status(401)
                .json({ message: info?.message || "Unauthorized" })

        req.user = user
        next()
    })(req, res, next)
}

// Middleware for JWT authentication
export const jwtAuthMiddleware: Middleware = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            next(err)
            return
        }
        if (!user)
            return res
                .status(401)
                .json({ message: info?.message || "Unauthorized" })

        req.user = user
        next()
    })(req, res, next)
}
