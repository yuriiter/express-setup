import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import bcrypt from "bcryptjs"

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            // TODO: Implement user repository
            const user = { username, passwordHash: "" }
            if (!user) {
                done(null, false, { message: "User not found" })
                return
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash)
            if (!isMatch) {
                done(null, false, { message: "Invalid credentials" })
                return
            }

            done(null, user)
            return
        } catch (error) {
            done(error)
        }
    })
)

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || "defaultSecret",
        },
        async (payload, done) => {
            try {
                // TODO: Implement user repository
                const user = { passwordHash: "" }
                if (!user) {
                    done(null, false, { message: "User not found" })
                    return
                }

                done(null, user)
                return
            } catch (error) {
                done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        // TODO: Implement user repository
        const user = { id, passwordHash: "" }
        done(null, user)
    } catch (error) {
        done(error)
    }
})
