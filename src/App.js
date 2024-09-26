import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './redux/todoSlice';
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Text,
  Checkbox,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todoTitle, setTodoTitle] = useState('');
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (todoTitle.trim()) {
      dispatch(
        addTodo({
          id: uuidv4(),
          title: todoTitle,
          status: false,
        })
      );
      setTodoTitle('');
    }
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>
        Redux Todo Application
      </Text>
      <Flex mb={4}>
        <Input
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Enter a todo item"
          mr={2}
        />
        <Button onClick={handleAddTodo} colorScheme="teal">
          Add Todo
        </Button>
      </Flex>
      <List spacing={3}>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            bg="gray.100"
            p={3}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Checkbox
              isChecked={todo.status}
              onChange={() => dispatch(toggleTodo(todo.id))}
              mr={2}
            >
              <Text as={todo.status ? 'del' : ''}>{todo.title}</Text>
            </Checkbox>
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              size="sm"
              onClick={() => dispatch(deleteTodo(todo.id))}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default App;
