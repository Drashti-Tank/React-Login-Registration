import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTodos(response.data))
  }, []);

  return (
    <div>
      <h1>Todos</h1>
      <Table striped bordered hover variant="secondary">
        <thead>
          <tr>
            <th>userId</th>
            <th>id</th>
            <th>title</th>
            <th>completed</th>
          </tr>
        </thead>
        <tbody>
          {
            todos?.map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>{todo.userId}</td>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed.toString()}</td>
                </tr>

              )
            })
          }
        </tbody>
      </Table>

    </div>
  );
}

export default TodoList;
