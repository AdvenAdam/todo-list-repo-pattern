import { Router } from 'express'
import todoController from '../controllers/todo.controller'

const todoRoutes = Router()

todoRoutes.post('/', todoController.create)
todoRoutes.get('/', todoController.findAll)
todoRoutes.put('/:id', todoController.update)
todoRoutes.patch('/batch', todoController.batchUpdate)
todoRoutes.patch('/:id', todoController.update) // Allow partial updates
todoRoutes.delete('/:id', todoController.delete)

export default todoRoutes
