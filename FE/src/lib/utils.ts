import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function baseUrl(id?: string) {
	if (id) {
		return `${import.meta.env.VITE_BASE_URL || 'http://localhost:4000/todos'}/${id}`
	}
	return import.meta.env.VITE_BASE_URL || 'http://localhost:4000/todos'
}
