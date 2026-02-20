import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true,
        enum: ['to do', 'doing', 'done'],
        default: 'to do'
    },
    priority: {
        type: String, 
        enum: ['default', 'mid', 'high'],
        default: 'default'
    },
    dueDate: {
        type: Date,
        default: function () {
            return new Date();
        }
    },
    endDate: {
        type: Date
    },
    reminderAt: {
        type: Date
    },
    tags: [{
        type: String,
        trim: true
    }],
    createAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });

// Middleware para actualizar updatedAt en cada modificacion
taskSchema.pre("save", function(next) {
    this.updatedAt = new Date();
    next();  
});

const Task = mongoose.model("Task", taskSchema);
export default Task;

