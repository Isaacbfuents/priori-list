
const isSameDay = (dueDate, todayDate, res) => {
    const today = todayDate;
    const taskDay = new Date(dueDate);

    if(taskDay.getUTCFullYear() === today.getUTCFullYear() && taskDay.getUTCMonth() === today.getUTCMonth() && taskDay.getUTCDate() === today.getUTCDate()) {
        // Si las fechas coinciden
        return true;
    } else {
        // Si las fechas no coinciden
        return false;
    };
}

export default isSameDay;