import 'reflect-metadata'
import './container'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import routes from './routes'
import dotenv from 'dotenv'
import AppError from './errors/AppError'
dotenv.config()

const app = express()
app.use(express.json())

app.use(cors())
app.use('/api', routes)
app.use(
    (err: Error, _request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            })
        }
        console.error(err)
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
    }
)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
