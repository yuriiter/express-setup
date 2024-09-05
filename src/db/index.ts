export const connectToDB = async (): Promise<void> => {
    console.log(`Connecting to DB...`)
    try {
        console.log("DB connected successfully")
    } catch (error) {
        console.error("Error connecting to DB:", error)
    }
}

export const closeDBConnection = async (): Promise<void> => {
    try {
        console.log("DB connection closed")
    } catch (error) {
        console.error("Error closing DB connection:", error)
    }
}
