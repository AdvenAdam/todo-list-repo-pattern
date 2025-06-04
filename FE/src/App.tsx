

import './App.css'
import { TodoList } from './components/TodoList';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';

function App() {

  return (
    <>
      <div className="max-w-screen min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
        <div className="w-full">

          <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>
                <h1 className="text-2xl font-bold text-center">📝 My Todo List</h1>
              </CardTitle>
              <CardDescription>
                <p className="text-center">Manage your tasks efficiently!</p>
              </CardDescription>
            </CardHeader>
            <CardContent>

              <TodoList />
            </CardContent>
          </Card>
        </div>
      </div>

    </>
  )
}

export default App
