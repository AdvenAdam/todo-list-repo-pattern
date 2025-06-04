import { CSS } from '@dnd-kit/utilities';
import { Button } from "@/components/ui/button";
import { Check, GripVertical, Pencil, RotateCcw, Trash } from "lucide-react";
import { useSortable } from '@dnd-kit/sortable';
import { useTodoDelete, useTodoUpdate } from '@/hooks/useTodosMutation';
import { useState } from 'react';
import { Input } from './ui/input';

type Props = {
    id: number;
    text: string;
    completed: boolean;
};

export function TodoItem({ id, text, completed }: Props) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const { mutate: deleteTodo, isPending } = useTodoDelete();
    const { mutate: updateTodo } = useTodoUpdate(); // Assuming you have a mutation for updating todos
    // Added local state to handle editing
    const [edit, setEdit] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    function handleDelete() {
        deleteTodo(id);
    }

    function handleSave() {
        // TODO: Call your update mutation here, e.g. useTodoUpdate().mutate({ id, text: editedText })
        console.log('Saving edited text:', editedText);
        updateTodo({ id, title: editedText });
        setEdit(false);
    }
    function handleComplete() {
        updateTodo({ id, completed: !completed });
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center justify-between w-full bg-white p-4 rounded-xl shadow-sm border mb-2"
        >
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    {...listeners}
                >
                    <GripVertical className="w-4 h-4" />
                </Button>

                {edit ? (
                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="h-9 w-full  focus:ring-0"
                            autoFocus
                            onBlur={() => setEdit(false)}
                            placeholder="Edit todo text"
                        />
                        <Button
                            size="icon"
                            className=''
                            onClick={handleSave}
                        >
                            <Pencil />
                        </Button>
                    </div>
                ) : (
                    <span onClick={() => setEdit(true)} className={`text-gray-800 cursor-pointer ${completed ? 'line-through text-gray-500' : ''}`}>
                        {text}
                    </span>
                )}
            </div>

            <div className="flex-none flex items-center">
                <Button
                    variant={'ghost'}
                    size="icon"
                    className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                    onClick={handleDelete}
                    disabled={isPending}
                >
                    <Trash />
                </Button>
                <Button
                    size="icon"
                    variant={'ghost'}
                    onClick={handleComplete}
                    disabled={isPending}
                >
                    {!completed ? <Check className="text-green-500" /> : <RotateCcw className="text-gray-400" />}
                </Button>
            </div>
        </div>
    );
}
