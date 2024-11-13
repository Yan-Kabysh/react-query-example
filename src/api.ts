export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }

  const url = 'https://6733713f2a1b1a4ae11393a0.mockapi.io/todos'
  
  export const fetchTodos = async (page: number, limit: number): Promise<Todo[]> => {
    const response = await fetch(
      `${url}?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  };
  
  export const addTodo = async (title: string): Promise<Todo> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        completed: false,
      }),
    });
    if (!response.ok) {
      throw new Error('Error adding a task');
    }
    return response.json();
  };
  
  export const toggleTodo = async (todo: { id: number; completed: boolean }): Promise<Todo> => {
    const response = await fetch(`${url}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: todo.completed,
      }),
    });
    if (!response.ok) {
      throw new Error('Task state change error');
    }
    return response.json();
  };
  
  export const deleteTodo = async (id: number): Promise<void> => {
    const response = await fetch(`${url}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Task deletion error');
    }
  };
  