import { Request, Response } from 'express'
import todoService from '../services/todo.service'

class TodoController {
	async create(req: Request, res: Response) {
		const { title, position } = req.body
		const todo = await todoService.createTodo(title, position)
		res.status(201).json(todo)
	}

	async findAll(req: Request, res: Response) {
		const todos = await todoService.getTodos()
		res.json(todos)
	}

	async update(req: Request, res: Response) {
		const id = Number(req.params.id)
		const data = req.body
		const todo = await todoService.updateTodo(id, data)
		res.json(todo)
	}

	async batchUpdate(req: Request, res: Response) {
		const updates = req.body
		const todos = await todoService.batchUpdateTodo(updates)
		res.json(todos)
	}

	async delete(req: Request, res: Response) {
		const id = Number(req.params.id)
		const todo = await todoService.deleteTodo(id)
		res.json(todo)
	}
}

export default new TodoController()
