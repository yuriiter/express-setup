import { join } from "path"
import dotenv from "dotenv"
import { existsSync } from "fs"

const projectRoot = process.cwd()

;[
    ".env",
    ".env.local",
    `.env.${process.env.NODE_ENV}`,
    `.env.${process.env.NODE_ENV}.local`,
].forEach((envPath) => {
    const fullPath = join(projectRoot, envPath)
    if (existsSync(fullPath)) {
        console.log("Env file used: ", fullPath)
        dotenv.config({ path: fullPath, override: true })
    }
})

export const { FRONTEND_URL: FRONTEND_URLS, PORT, NODE_ENV } = process.env
