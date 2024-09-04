import { codeToMessage } from "@/code"
import { JWT_EXPIRES, JWT_SECRET } from "@/config"
import { type Permission } from "@/types/user"
import argon2 from "argon2"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { type FilterQuery, type Model } from "mongoose"

export const hashPassword = (password: string): Promise<string> => {
    return argon2.hash(password)
}

export const validateHash = async (
    password: string,
    hashToBeValidated: string
): Promise<boolean> => {
    return argon2.verify(hashToBeValidated, password)
}

export const buildResponse = <T>(
    statusCode: number,
    data?: T | undefined,
    message?: string | undefined
) => ({
    statusCode,
    message: message ?? codeToMessage[statusCode],
    data,
})

export const createJWT = (email: string, permission: Permission) =>
    jwt.sign({ email, permission }, JWT_SECRET, { expiresIn: JWT_EXPIRES })

export const verifyJWT = (token: string): Promise<string | JwtPayload> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    })
}

export const getDocumentsAndCount = <T, D extends { [P in keyof T]?: any }>(
    model: Model<D>,
    query: FilterQuery<D>,
    skip: number,
    limit: number
) =>
    Promise.all([
        model.find(query).skip(skip).limit(limit).lean(),
        model.countDocuments(query),
    ])
