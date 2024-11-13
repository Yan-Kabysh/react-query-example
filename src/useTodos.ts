import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, addTodo, toggleTodo, deleteTodo, Todo } from './api';

export const useTodos = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery<Todo[], Error>({
    queryKey: ['todos', page, limit],
    queryFn: async () => {
      console.log('Fetching todos from API...');
      return await fetchTodos(page, limit);
    },
    staleTime: 10000,
  });

  const addTodoMutation = useMutation<Todo, Error, string>({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleTodoMutation = useMutation<Todo, Error, { id: number; completed: boolean }>({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const deleteTodoMutation = useMutation<void, Error, number>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return {
    todos,
    isLoading,
    isError,
    addTodoMutation,
    toggleTodoMutation,
    deleteTodoMutation,
  };
};
