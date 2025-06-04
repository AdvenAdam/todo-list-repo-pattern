import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import { useTodos } from '@/hooks/useTodos'
import { Input } from './ui/input'
import { Plus } from 'lucide-react'
import { Button } from './ui/button'
import { useTodoAdd, useTodoBatchUpdate } from '@/hooks/useTodosMutation'

export function TodoList() {
    const { data: todosData = [], isLoading, error } = useTodos()
    const { mutate: addTodo, } = useTodoAdd()
    const { mutate: batchUpdateTodo } = useTodoBatchUpdate()

    const [todos, setTodos] = useState(todosData)
    const [title, setTitle] = useState('')

    useEffect(() => {
        setTodos(todosData)
    }, [todosData])

    const handleAddTodo = () => {
        if (!title.trim()) return
        const biggestPosition = Math.max(...todos.map(t => t.position), 0)
        addTodo({ title: title.trim(), completed: false, position: biggestPosition + 1 })
        setTitle('')
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = todos.findIndex(t => t.id === active.id)
        const newIndex = todos.findIndex(t => t.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return

        const newOrder = arrayMove(todos, oldIndex, newIndex)
        setTodos(newOrder)

        const updatedTodos = newOrder.map((todo, index) => ({
            id: todo.id,
            position: index + 1,
        }))

        batchUpdateTodo(updatedTodos)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading todos</div>

    return (
        <>
            <div className="flex justify-end mb-4 gap-2">
                <Input
                    placeholder="Add new todo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button onClick={handleAddTodo} className='w-12 h-12' disabled={!title.trim() || isLoading}>
                    <Plus />
                </Button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext
                    items={todos.map(todo => todo.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="max-w-md mt-8 space-y-2">
                        {todos.map(todo => (
                            <TodoItem key={todo.id} id={todo.id} text={todo.title} completed={todo.completed} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </>
    )
}
