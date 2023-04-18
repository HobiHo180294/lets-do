import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    username: { type: String },
    author: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    task: { type: String, required: true, default: '' },
    status: { type: String, required: true, default: 'OPEN' },
  },
  { timestamps: true }
);

export default mongoose.model('Todo', TodoSchema);
