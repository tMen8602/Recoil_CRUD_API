// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { todosState, fetchTodos } from '../state/todoState';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const loadableTodos = useRecoilValueLoadable(fetchTodos);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (loadableTodos.state === 'hasValue') {
      setTodos(loadableTodos.contents);
    }
  }, [loadableTodos, setTodos]);

  const addOrUpdateTodo = () => {
    if (input) {
      if (editId) {
        // Cập nhật todo
        setTodos((prev) =>
          prev.map((todo) => (todo.id === editId ? { ...todo, title: input } : todo))
        );
        setEditId(null); // Đặt lại editId
      } else {
        // Thêm mới todo
        const newTodo = { id: Date.now(), title: input, completed: false };
        setTodos((prev) => [...prev, newTodo]);
      }
      setInput('');
    }
  };

  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEditing = (todo) => {
    setInput(todo.title);
    setEditId(todo.id); // Đặt editId để biết đang chỉnh sửa công việc nào
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Enter todo"
      />
      <Button title={editId ? "Update Todo" : "Add Todo"} onPress={addOrUpdateTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Button title="Edit" onPress={() => startEditing(item)} />
            <Button title="Remove" onPress={() => removeTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default TodoList;
