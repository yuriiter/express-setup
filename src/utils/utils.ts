import { codeToMessage } from "@/constants/response-codes"

export const buildResponse = <T>(
    statusCode: number,
    data?: T | undefined,
    message?: string | undefined
) => ({
    statusCode,
    message: message ?? codeToMessage[statusCode],
    data,
})
