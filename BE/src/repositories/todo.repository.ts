import { Prisma, Todo } from '@prisma/client'
import prisma from '../prisma/client'

class TodoRepository {
	async create(title: string, position: number): Promise<Todo> {
		return prisma.todo.create({ data: { title, position } })
	}

	async findAll(): Promise<Todo[]> {
		return prisma.todo.findMany({ orderBy: { position: 'asc' } })
	}

	async update(id: number, data: Partial<Todo>): Promise<Todo> {
		return prisma.todo.update({ where: { id }, data })
	}
	async batchUpdate(updates: { id: number; position: number }[]): Promise<Todo[]> {
		return Promise.all(
			updates.map(({ id, position }) => {
				return prisma.todo.update({
					where: { id },
					data: { position },
				})
			})
		)
	}

	async delete(id: number): Promise<Todo> {
		return prisma.todo.delete({ where: { id } })
	}
}

export default new TodoRepository()
