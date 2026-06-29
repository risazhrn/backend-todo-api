import { FastifyInstance } from 'fastify';
import {
  getAllTodosSchema, getAllTodosHandler,
  createTodoSchema, createTodoHandler,
  updateTodoSchema, updateTodoHandler,
  deleteTodoSchema, deleteTodoHandler
} from '../controllers/todo.controller';

export async function todoRoutes(fastify: FastifyInstance) {
  // Semua rute ini otomatis terdaftar ke Swagger karena menyertakan objek Schema
  fastify.get('/api/todos', getAllTodosSchema, getAllTodosHandler);
  fastify.post('/api/todos', createTodoSchema, createTodoHandler);
  fastify.put('/api/todos/:id', updateTodoSchema, updateTodoHandler);
  fastify.delete('/api/todos/:id', deleteTodoSchema, deleteTodoHandler);
}