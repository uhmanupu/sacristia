import React, { useState } from 'react';
import { Check, Plus, Trash, Circle } from 'lucide-react';
import { TodoItem } from '../types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: '1', text: 'Revisar relatório do projeto', completed: false },
    { id: '2', text: 'Comprar café', completed: true },
    { id: '3', text: 'Agendar dentista', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const task: TodoItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false
    };
    setTodos([task, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-[#1e212d] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] group">
        <div className="bg-gradient-to-r from-emerald-900/40 to-transparent p-4 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-gray-100 tracking-wide">Minhas Tarefas</h3>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/20">
                {todos.filter(t => !t.completed).length} pendentes
            </span>
        </div>
        
        <div className="p-3 bg-[#151720]/50 border-b border-white/5">
            <form onSubmit={addTodo} className="flex gap-2">
                <input 
                    type="text" 
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="+ Nova tarefa"
                    className="w-full bg-[#2a2d3a] border-none rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:ring-1 focus:ring-emerald-500"
                />
            </form>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {todos.length === 0 && (
                <div className="text-center text-gray-500 text-sm mt-10">Nenhuma tarefa pendente.</div>
            )}
            {todos.map(todo => (
                <div key={todo.id} className="group/item flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <button 
                        onClick={() => toggleTodo(todo.id)}
                        className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all
                            ${todo.completed 
                                ? 'bg-emerald-500 border-emerald-500 text-[#1A1D29]' 
                                : 'border-gray-500 hover:border-emerald-400'}`}
                    >
                        {todo.completed && <Check size={12} strokeWidth={4} />}
                    </button>
                    <span className={`flex-1 text-sm ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                        {todo.text}
                    </span>
                    <button 
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-600 hover:text-red-400 opacity-0 group-hover/item:opacity-100 transition-opacity p-1"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TodoList;