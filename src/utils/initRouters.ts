import { type Express, Router } from "express"

const initRouters = (
    app: Express,
    routers: Router[],
    apiBaseURL: string = "/"
): void => {
    const mainRouter = Router()
    routers.forEach((router) => mainRouter.use(apiBaseURL, router))
    app.use(mainRouter)
}

export default initRouters
