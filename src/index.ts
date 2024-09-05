import "module-alias/register"
import "./env"

import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import { App } from "./app"
import { closeDBConnection, connectToDB } from "./db"

const app = new App()

app.initMiddleware([
    cors({ origin: process.env.FRONTEND_URLS.split(","), credentials: true }),
    cookieParser(),
    express.json(),
    express.urlencoded({ extended: true }),
])

app.attachControllers([])

app.initErrorMiddleware()

app.onClose(() => {
    console.log("Closing server...")
    void closeDBConnection()
})

app.start(() => {
    void connectToDB()
})
