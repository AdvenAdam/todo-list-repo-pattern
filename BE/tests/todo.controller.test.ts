import request from 'supertest'
import express, { Express } from 'express'
import todoService from '../src/services/todo.service'
import todoRoutes from '../src/routes/todo.routes'

// Mock the todoService
jest.mock('../src/services/todo.service')

const mockedTodoService = todoService as jest.Mocked<typeof todoService>

describe('TodoController', () => {
	let app: Express

	beforeAll(() => {
		app = express()
		app.use(express.json())
		app.use('/todos', todoRoutes)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	test('GET /todos - should return all todos', async () => {
		const todos = [
			{ id: 1, title: 'Test Todo 1', position: 1, completed: false, createdAt: new Date() },
			{ id: 2, title: 'Test Todo 2', position: 2, completed: true, createdAt: new Date() },
		]

		mockedTodoService.getTodos.mockResolvedValue(todos)

		const res = await request(app).get('/todos')

		expect(res.status).toBe(200)
		expect(res.body).toEqual(
			expect.arrayContaining([expect.objectContaining({ id: 1, title: 'Test Todo 1' }), expect.objectContaining({ id: 2, title: 'Test Todo 2' })])
		)
		expect(mockedTodoService.getTodos).toHaveBeenCalledTimes(1)
	})

	test('POST /todos - should create a todo', async () => {
		const newTodo = { id: 3, title: 'New Todo', position: 3, completed: false, createdAt: new Date() }
		mockedTodoService.createTodo.mockResolvedValue(newTodo)

		const res = await request(app).post('/todos').send({ title: 'New Todo', position: 3 })

		expect(res.status).toBe(201)
		expect(res.body).toMatchObject({ id: 3, title: 'New Todo', position: 3 })
		expect(mockedTodoService.createTodo).toHaveBeenCalledWith('New Todo', 3)
	})

	test('PUT /todos/:id - should update a todo', async () => {
		const updatedTodo = { id: 1, title: 'Updated Todo', position: 1, completed: true, createdAt: new Date() }
		mockedTodoService.updateTodo.mockResolvedValue(updatedTodo)

		const res = await request(app).put('/todos/1').send({ title: 'Updated Todo', completed: true })

		expect(res.status).toBe(200)
		expect(res.body).toMatchObject({ id: 1, title: 'Updated Todo', completed: true })
		expect(mockedTodoService.updateTodo).toHaveBeenCalledWith(1, { title: 'Updated Todo', completed: true })
	})

	test('DELETE /todos/:id - should delete a todo', async () => {
		const deletedTodo = { id: 1, title: 'Deleted Todo', position: 1, completed: false, createdAt: new Date() }
		mockedTodoService.deleteTodo.mockResolvedValue(deletedTodo)

		const res = await request(app).delete('/todos/1')

		expect(res.status).toBe(200)
		expect(res.body).toMatchObject({ id: 1 })
		expect(mockedTodoService.deleteTodo).toHaveBeenCalledWith(1)
	})
})
