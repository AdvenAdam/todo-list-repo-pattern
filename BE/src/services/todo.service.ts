import { Todo } from '@prisma/client'
import todoRepository from '../repositories/todo.repository'

class TodoService {
	async createTodo(title: string, position: number): Promise<Todo> {
		return todoRepository.create(title, position)
	}

	async getTodos(): Promise<Todo[]> {
		return await todoRepository.findAll()
	}

	async updateTodo(id: number, data: Partial<Todo>): Promise<Todo> {
		return todoRepository.update(id, data)
	}
	async batchUpdateTodo(updates: { id: number; position: number }[]): Promise<(Todo | null)[]> {
		return todoRepository.batchUpdate(updates)
	}

	async deleteTodo(id: number): Promise<Todo> {
		return todoRepository.delete(id)
	}
}

export default new TodoService()
