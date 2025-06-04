import { baseUrl } from '@/lib/utils'
import type { Todo, TodoCreate } from '@/types/todo'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useTodoAdd = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (newTodo: TodoCreate) => {
			const response = await fetch(baseUrl(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newTodo),
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		},

		onSuccess: (newTodo: Todo) => {
			queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [...old, newTodo])
			toast.success('Todo added successfully!')
		},
	})
}

export const useTodoDelete = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (todoId: number) => {
			const response = await fetch(`${baseUrl()}/${todoId}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return todoId
		},

		onSuccess: (todoId: number) => {
			queryClient.setQueryData<Todo[]>(['todos'], (old = []) => old.filter((todo) => todo.id !== todoId))
			toast.success('Todo deleted successfully!')
		},
	})
}

export const useTodoBatchUpdate = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (todo: Partial<Todo>[]) => {
			const response = await fetch(`${baseUrl()}/batch`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		},

		onSuccess: (updatedTodo: Todo) => {
			queryClient.setQueryData<Todo[]>(['todos'], (old = []) => old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
			toast.success('Todo reordered successfully!')
		},
	})
}

export const useTodoUpdate = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (todo: Partial<Todo>) => {
			const response = await fetch(`${baseUrl()}/${todo.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(todo),
			})
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		},

		onSuccess: (updatedTodo: Todo) => {
			queryClient.setQueryData<Todo[]>(['todos'], (old = []) => old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)))
			toast.success('Todo updated successfully!')
		},
	})
}
