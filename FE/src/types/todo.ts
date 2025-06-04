export type Todo = {
	id: number
	title: string
	completed: boolean
	position: number
	createdAt: string
}

export type TodoCreate = Omit<Todo, 'id' | 'createdAt'>
