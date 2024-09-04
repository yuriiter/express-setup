declare global {
    namespace NodeJS {
        interface ProcessEnv {
            FRONTEND_URLS: string
            PORT: number
            JWT_SECRET: string
            JWT_EXPIRES: number
            NODE_ENV: "development" | "production"
            DB_HOST: string
            DB_USER: string
            DB_NAME: string
            DB_PASSWORD: string
            DB_PORT: number
        }
    }
}

export {}
