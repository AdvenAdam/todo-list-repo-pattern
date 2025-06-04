import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	// Create todo
	await prisma.todo.createMany({
		data: [
			{ title: 'Learn Prisma', position: 1, completed: false, createdAt: new Date() },
			{ title: 'Build a Todo App', position: 2, completed: false, createdAt: new Date() },
			{ title: 'Write Tests', position: 3, completed: false, createdAt: new Date() },
			{ title: 'Deploy to Production', position: 4, completed: false, createdAt: new Date() },
		],
	})

	console.log('✅ Seed data created')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
