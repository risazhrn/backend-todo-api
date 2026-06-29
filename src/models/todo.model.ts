import { Schema, model, Document} from 'mongoose';

export interface ITodo extends Document {
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: Date;
}

const TodoSchema = new Schema<ITodo>({
  title: { 
    type: String, 
    required: [true, 'Title wajib diisi!'], 
    trim: true 
  },
  description: { 
    type: String, 
    default: '' 
  },
  isCompleted: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const Todo = model<ITodo>('Todo', TodoSchema);