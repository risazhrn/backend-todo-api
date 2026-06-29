import Fastify from 'fastify';
import mongoose from 'mongoose';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { todoRoutes } from './routes/todo.routes';

const fastify = Fastify({
    logger:true
});

fastify.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Todo List API',
      description: 'Dokumentasi API Todo List menggunakan Fastify, TypeScript, dan MongoDB',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server'
      }
    ],
  },
});

fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    },
});

fastify.register(todoRoutes);

const start = async () => {
  try {
    const mongoURI = 'mongodb://localhost:27017/todo_db';
    await mongoose.connect(mongoURI);
    fastify.log.info('🍃 Connected to MongoDB smoothly via Mongoose');

    // Menjalankan server Fastify di port 3000
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('\n🚀 Server is running at http://localhost:3000');
    console.log('📖 API Documentation available at http://localhost:3000/docs\n');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();