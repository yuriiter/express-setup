import { closeDBConnection } from "@/db"
import { type Middleware } from "@/types/middleware"
import ExpressError from "@errors/ExpressError"
import express, { type Application } from "express"
import { type IController } from "./interfaces/IController"

export class App {
    public app: Application
    private readonly appBasePath: string

    constructor(appBasePath = "v1") {
        this.appBasePath = appBasePath
        this.app = express()
    }

    public initMiddleware(middlewareFns: Middleware[]): void {
        middlewareFns.forEach((middlewareFn) => this.app.use(middlewareFn))
    }

    public attachControllers(controllers: IController[]) {
        controllers.forEach((controller) => {
            this.app.use(this.appBasePath, controller.router)
        })
    }

    public initErrorMiddleware() {
        this.app.use(ExpressError.errorMiddleware)
    }

    public onClose(listener: () => void) {
        this.app.on("close", listener)
        void closeDBConnection()
    }

    public start = (listener: () => void) => {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
        listener()
    }
}
