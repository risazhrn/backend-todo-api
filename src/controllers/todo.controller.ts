import { FastifyRequest, FastifyReply } from 'fastify';
import { Todo } from '../models/todo.model';

// ==========================================
// 1. REUSABLE SWAGGER SCHEMAS (Blueprint Data)
// ==========================================
const todoResponseSchema = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    isCompleted: { type: 'boolean' },
    createdAt: { type: 'string', format: 'date-time' }
  }
};

// ==========================================
// 2. ROUTE SCHEMAS & CONTROLLERS
// ==========================================

// --- GET ALL TODOS ---
export const getAllTodosSchema = {
  schema: {
    description: 'Mengambil semua daftar tugas (Todo)',
    tags: ['Todo'],
    response: {
      200: {
        type: 'array',
        items: todoResponseSchema
      }
    }
  }
};

export const getAllTodosHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  return todos;
};

// --- CREATE TODO ---
export const createTodoSchema = {
  schema: {
    description: 'Membuat tugas (Todo) baru',
    tags: ['Todo'],
    body: {
      type: 'object',
      required: ['title'], // Mengunci bahwa title WAJIB dikirim oleh client
      properties: {
        title: { type: 'string', minLength: 1 },
        description: { type: 'string' }
      }
    },
    response: {
      201: todoResponseSchema
    }
  }
};

interface CreateTodoBody {
  title: string;
  description?: string;
}

export const createTodoHandler = async (request: FastifyRequest<{ Body: CreateTodoBody }>, reply: FastifyReply) => {
  const { title, description } = request.body;
  const newTodo = await Todo.create({ title, description });
  reply.code(201);
  return newTodo;
};

// --- UPDATE TODO ---
export const updateTodoSchema = {
  schema: {
    description: 'Mengubah status atau detail tugas berdasarkan ID',
    tags: ['Todo'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'MongoDB Object ID' }
      }
    },
    body: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isCompleted: { type: 'boolean' }
      }
    },
    response: {
      200: todoResponseSchema,
      404: { type: 'object', properties: { message: { type: 'string' } } }
    }
  }
};

interface TodoParams { id: string; }
interface UpdateTodoBody { title?: string; description?: string; isCompleted?: boolean; }

export const updateTodoHandler = async (
  request: FastifyRequest<{ Params: TodoParams; Body: UpdateTodoBody }>, 
  reply: FastifyReply
) => {
  const { id } = request.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });
  
  if (!updatedTodo) {
    reply.code(404);
    return { message: 'Tugas tidak ditemukan!' };
  }
  return updatedTodo;
};

// --- DELETE TODO ---
export const deleteTodoSchema = {
  schema: {
    description: 'Menghapus tugas berdasarkan ID',
    tags: ['Todo'],
    params: {
      type: 'object',
      properties: {
        id: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      404: { type: 'object', properties: { message: { type: 'string' } } }
    }
  }
};

export const deleteTodoHandler = async (request: FastifyRequest<{ Params: TodoParams }>, reply: FastifyReply) => {
  const { id } = request.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    reply.code(404);
    return { message: 'Tugas gagal dihapus, ID tidak ditemukan!' };
  }
  return { message: 'Tugas berhasil dihapus!' };
};