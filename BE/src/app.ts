import express from 'express'
import todoRoutes from './routes/todo.routes'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/todos', todoRoutes)

export default app
