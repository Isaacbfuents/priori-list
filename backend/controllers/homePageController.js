import jwt from 'jsonwebtoken';
import 'dotenv/config';
import RefreshToken from '../models/RefreshToken.js';
import Task from '../models/Task.js';
import isSameDay from '../utils/isSameDay.js';
import User from '../models/User.js';

const getTaskSummary = async (req, res) => {
    const { id } = req.user; // Id del usuario
    const tasks = await Task.find({userId: id});

    const today = new Date;
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));

    const taskSummary = {
        forToday: 0,
        forTheWeek: 0,
        outOfDate: 0,
    };

    tasks.forEach((task) => {
        const due = new Date(task.dueDate);

        if (due < startOfToday) {
            taskSummary.outOfDate++;
        } else if (due >= startOfToday && due < endOfToday) {
            taskSummary.forToday++;
        } else if (due >= endOfToday && due <= endOfWeek) {
            taskSummary.forTheWeek++;
        }
    })

    return res.json(taskSummary);
}

const getTasks = async (req, res) => {
    const { id } = req.user;
    const tasks = await Task.find({userId: id}) // Buscar las tareas con el mismo userId
    res.json(tasks)
}

const createTask = async (req, res) => {
    try {
        const taskInfo = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        const { id } = req.user;
        const taskData = {
            userId: id,
            ...taskInfo
        }

        const task = new Task(taskData);
        await task.save();
        
        return res.status(200).json({message: 'Tarea creada con exito'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

// Obtener tareas de MyDay
const getMyDay = async (req, res) => {
    try {
        const { id } = req.user; // Acceder al id

        const tasks = await Task.find({userId: id}); // Acceder a las tareas del usuario
    
        let myDayTasks = tasks.filter(task => isSameDay(task.dueDate, new Date())); // Filtrar las tareas que sean del usuario, y que su dueDate sea el mismo dia 
    
        if(myDayTasks.length === 0) { // Si no hay tareas, decir que no hay tareas
            return res.json({message: 'No hay ninguna tarea para el día de hoy.'})
        }
    
        return res.json(myDayTasks); // Si si hay tareas res.json 

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    } 
}

// Obtener tareas de los Next 7 days
const getNext7Days = async (req, res) => {
    try {
        const { id } = req.user;
        
        // Obtener la fecha de hoy y la de 7 días después
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Resetear la hora a 00:00:00

        const next7Days = new Date();
        next7Days.setDate(today.getDate() + 7);
        next7Days.setHours(23, 59, 59, 999); // Final del séptimo día

        const nextTasks = await Task.find({
            userId: id,
            dueDate: { $gte: today, $lte: next7Days}
        });
        
        if(nextTasks.length === 0) {
            return res.json({message: 'No hay tareas para esta semana'})
        } 

        return res.json(nextTasks)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

// Obtener tareas con un tag especifico
const getTasksWithTag = async (req, res) => {
    try {
        const { id } = req.user; // Acceder al id del usuario
        const { tag } = req.params; // Acceder al tag en el url
        
        const tasksWithTag = await Task.find({userId: id, tags: tag}); // Encontrar las tareas que tengan el mismo id y el mismo tag
        
        if(tasksWithTag.length === 0) { // Si no se encontraron tareas con el tag
            res.status(404).json({ message: "No se encontraron tareas con este tag."})
        }

        return res.json(tasksWithTag); // Retornar las tareas que coincidan con el tag

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

// Obtener info del usuario
const getPerfilInfo = async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id).select('-password -auth');

        return res.json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

// Actualizar info usuario
const updatePerfilInfo = async (req, res) => {
    try {

        const { id } = req.user;
        const updatedUserInfo = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updatedUserInfo, {new: true});
        res.json(updatedUser)
    } catch (error) {
        
    }
}

// Eliminar tareas
const deleteTask = async (req, res) => {
    try {
        const { idTask } = req.params;

        console.log(idTask)
        
        await Task.findByIdAndDelete(idTask);
        
        return res.satus(200).json({ message: "Tarea eliminada correctamente" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

// Calendar tasks
const getCalendarTasks = async (req, res) => {
    try {
        const { id } = req.user;

        const tasks = await Task.find({userId: id});
        
        const events = tasks.map( task => ({
            id: task._id,
            title: task.title,
            start: task.dueDate,
            end: task.endDate || task.dueDate,
            description: task.description || '',
            status: task.status,
            priority: task.priority,
            tags: task.tags
        }) )

        res.json(events);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

export {
    getTaskSummary,
    getTasks,
    createTask,
    getMyDay,
    getNext7Days,
    getTasksWithTag,
    getPerfilInfo,
    updatePerfilInfo,
    deleteTask,
    getCalendarTasks
}