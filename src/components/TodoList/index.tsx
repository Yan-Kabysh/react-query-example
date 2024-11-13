import { ChangeEvent, useState } from 'react';
import { useTodos } from '../../useTodos';
import { Spinner } from '../Spinner';
import './TodoList.css'; 

export const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5; 
  const {
    todos,
    isLoading,
    isError,
    addTodoMutation,
    toggleTodoMutation,
    deleteTodoMutation,
  } = useTodos(page, limit);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodoMutation.mutate(newTodo);
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleTodoMutation.mutate({ id, completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation.mutate(id);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value)
  }

  const handleToggleTodoClick = (id: number, completed: boolean) => () => {
    handleToggleTodo(id, !completed)
  }

  const handleDeleteTodoClick = (id: number) => () => {
    handleDeleteTodo(id)
  }

  if (isLoading) return <Spinner />;
    if (isError) return <div>Data loading error</div>;

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="New Task"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos?.map(({id, completed, title}) => (
          <li key={id} className="todo-item">
            <span
              className={completed ? 'completed' : ''}
              onClick={handleToggleTodoClick(id, completed)}
            >
              {title}
            </span>
            <button onClick={handleDeleteTodoClick(id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

