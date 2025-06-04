import { baseUrl } from '@/lib/utils'
import type { Todo } from '@/types/todo'
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

export const useTodos = (): UseQueryResult<Todo[]> =>
	useQuery({
		queryKey: ['todos'],
		queryFn: async (): Promise<Todo[]> => {
			const response = await fetch(baseUrl())
			if (!response.ok) {
				throw new Error('Network response was not ok')
			}
			return response.json()
		},
	})
