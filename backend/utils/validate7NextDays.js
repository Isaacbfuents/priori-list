
const validate7NextDays = (req, res, next) => {
    try {
        const { dueDate } = req.body;

        const today = new Date(); // Fecha del dia de hoy
        today.setHours(0, 0, 0, 0);

        const next7Days = new Date(); // El dia num 7 despues de hoy
        next7Days.setDate(today.getDate() + 7);
        next7Days.setHours(23, 59, 59, 999);

        const taskDate = new Date(dueDate); 

        // Validar que la fecha esté dentro del rango
        if (taskDate < today || taskDate > next7Days) {
            return res.status(400).json({ message: "La fecha debe estar dentro de los próximos 7 días." });
        }

        next(); // Continuar con la creación de la tarea
    } catch (error) {
        console.error("Error al validar fecha en /next7days:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export default validate7NextDays;