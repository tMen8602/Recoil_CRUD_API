// src/state/todoState.js
import { atom, selector } from 'recoil';

// Atom để lưu trữ danh sách todos
export const todosState = atom({
  key: 'todosState',
  default: [],
});

// Selector để lấy todos từ API
export const fetchTodos = selector({
  key: 'fetchTodos',
  get: async () => {
    const response = await fetch('https://671aecb0acf9aa94f6ac079c.mockapi.io/BA');
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },
});
