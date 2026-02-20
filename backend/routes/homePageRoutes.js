import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { getTaskSummary, getTasks, createTask, getMyDay, getNext7Days, getTasksWithTag, deleteTask, getPerfilInfo, updatePerfilInfo, getCalendarTasks } from '../controllers/homePageController.js';
import isSameDay from '../utils/isSameDay.js';
import validate7NextDays from '../utils/validate7NextDays.js';
import Task from '../models/Task.js';

const router = express.Router();

router.get('/tasks/summary', authenticateToken, getTaskSummary);


router.route('/tasks/all')
    .get(authenticateToken, getTasks) // Obtener todas las tareas
    .post(authenticateToken, createTask); // Crear tareas y agregarlas

router.delete('/tasks/all/:idTask', authenticateToken, deleteTask);


router.route('/myday')
    .get(authenticateToken, getMyDay)
    .post(authenticateToken, (req, res, next) => {
        if( !isSameDay(req.body.dueDate, new Date()) ) { // Si la due date no es el mismo dia
            return res.status(400).json({ message: "La due date de la tarea debe ser para hoy"})       
        }
        next();
    }, createTask); // Crear tareas y agregarlas 
    // Comment: Despues de hacer el post y crear la tarea, recargar y asegurarse que sea para el mismo dia o ver si es mejor solo crear tareas para el mismo dia

router.delete('/myday/:idTask', authenticateToken, deleteTask);


router.route('/next7days')
    .get(authenticateToken, getNext7Days)
    .post(authenticateToken, validate7NextDays, createTask); // Crear tareas y agregarlas 

router.delete('/next7days/:idTask', authenticateToken, deleteTask); 


router.route('/tasks/:tag')
    .get(authenticateToken, getTasksWithTag)
    .post(authenticateToken, (req, res, next) => {
        const { tag } = req.params;
        if( !req.body.tags.includes(tag) ) { // si el tag del url no esta en los tag en la creacion devolver error
            return res.status(400).json({ message: `Los tags deben incluir el tag ${tag}` });
        }

        next();

    }, createTask);

router.delete('/tasks/:tag/:idTask', authenticateToken, async (req, res, next) => {
    try {
        const {tag, idTask} = req.params;
    
        const taskEliminated = await Task.findOneAndDelete({_id: idTask, tags: tag});
        
        if( !taskEliminated ) {
            return res.status(404).json({ message: "Tarea por eliminar no encontrada." })
        }

        return res.json({ message: "Tarea eliminada correctamente", taskEliminated});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
})


router.get('/account/profile', authenticateToken, getPerfilInfo);

router.route('/account/profile/edit')
    .get(authenticateToken, getPerfilInfo)
    .post(authenticateToken, updatePerfilInfo);


router.route('/calendar')
    .get(authenticateToken, getCalendarTasks)
    .post(authenticateToken, createTask);

export default router;