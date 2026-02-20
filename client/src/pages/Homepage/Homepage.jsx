import axios from 'axios';
import { useEffect, useState } from 'react';

import api from '../../api.js';
import SideBarHomepage from '../../components/SideBarHomepage.jsx';

function Homepage() {

    const token = localStorage.getItem('accessToken');
     
    const [userName, setUserName] = useState('');
    const [summaryToday, setSummaryToday] = useState('');
    const [summaryWeek, setSummaryWeek] = useState('');
    const [summaryOutDated, setSummaryOutDated] = useState('');
    const [taskMyDay, setTaskMyDay] = useState([]);
    const [taskWeek, setTaskWeek] = useState([]);

    const fetchAccountInfo = async () => {
        try {
            const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/home-page/account/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setUserName(res.data.name);
        } catch (error) {
            console.log(error);
        }
    }

    const getMyDayTasks = async () => { // Obtener las tareas del dia actual
        try {
            const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/home-page/myday`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(Array.isArray(res.data)){
                setTaskMyDay(res.data);
            } else {
                setTaskMyDay([])
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getNext7DaysTasks = async () => { // Obtener las siguientes tareas de los proximos 7 dias
        try {
            const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/home-page/next7days`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(Array.isArray(res.data)){
                setTaskWeek(res.data);
            } else {
                setTaskWeek([])
            }

            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getTaskSummary = async () => { // Para obtener el conteo de tareas del usuario
        try {
            const res = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/home-page/tasks/summary`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data)
            setSummaryToday(res.data.forToday);
            setSummaryWeek(res.data.forTheWeek);
            setSummaryOutDated(res.data.outOfDate);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => { // Obtener el nombre del usuario para renderizarlo   
        fetchAccountInfo();
        getMyDayTasks();
        getNext7DaysTasks();
        getTaskSummary();
    }, [token]);

    const handleOnMouseUp = (e) => {
        console.log('Desde la fn On mouseUp')
        e.preventDefault();
        const btn = e.currentTarget;
        btn.classList.add('scale-120', 'transition-transform', 'duration-700');



        setTimeout(() => {
            btn.classList.remove('scale-120', 'transition-transform', 'duration-700');
        }, 300)

        
    }


    return (
        <div className='flex'>
            <SideBarHomepage />
            <div className='ml-64 p-6 w-full flex'>
                <div className='bg-white w-1/2'>
                    <div className='m-4'>
                        {userName ? ( <h1 className='text-4xl'>Hi, <span className='text-primary'>{userName}</span>!</h1> ) : ( <h1>Loading...</h1> // o un spinner, o esqueleto de carga
                        )}
                        <p className='my-4 '>Here it goes the short summary of the tasks ;)</p>
                        <div className='flex flex-col gap-2 m-4'>
                            <div>
                                <span className='bg-primary rounded-full m-2 text-white text-md font-semibold px-2 py-1'>{summaryToday}</span>
                                <span>Tasks for today</span>
                            </div> 
                            <div>
                                <span className='bg-secondary rounded-full m-2 text-white text-md font-semibold px-2 py-1'>{summaryWeek}</span>
                                <span>Tasks for the week</span>
                            </div> 
                            <div>
                                <span className='bg-red-400 rounded-full m-2 text-white text-md font-semibold px-2 py-1'>{summaryOutDated}</span>
                                <span>Tasks out dated</span>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                <div className='bg-blue-200 flex flex-col justify-center items-center w-1/2'>
                    <div className='bg-blue-950 text-white w-[90%] p-2'>
                        <h2 className='text-2xl m-2'>Today tasks:</h2>
                        <div>
                            {Array.isArray(taskMyDay) && taskMyDay.map(task => (
                                <div key={task._id} className='text-white flex gap-2 m-2 border-y p-2'>
                                    <button onMouseUp={handleOnMouseUp} className={` group border-1 rounded-full aspect-square h-full my-auto
                                    ${task.priority === 'high' ? 'bg-red-400/20  border border-red-400 hover:bg-red-400/40' : ''}
                                    ${task.priority === 'mid' ? 'bg-amber-300/20  border border-amber-300 hover:bg-amber-300/40' : ''}
                                    ${task.priority === 'default' ? 'hover:bg-gray-200/40' : ''}
                                    transition-colors duration-300`}>
                                        <svg  className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                        ${task.priority === 'high' ? 'text-red-400' : ''}
                                        ${task.priority === 'mid' ? 'text-amber-300' : ''}
                                        ${task.priority === 'default' ? 'text-gray-200' : ''}
                                        `} width="84px" height="84px" viewBox="-2.4 -2.4 28.80 28.80" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z" fill='currentColor'></path> </g></svg>
                                    </button>
                                    <div>
                                        <h3 className='text-md font-medium'>{task.title}</h3>
                                        {task.description && <p className='text-sm'>{task.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='bg-blue-950 text-white w-[90%] p-2'>
                        <h2 className='text-2xl m-2'>Upcoming tasks (Next 7 days):</h2>
                        <div>
                            {Array.isArray(taskWeek) && taskWeek.map(task => (
                                <div key={task._id} className='text-white flex gap-2 m-2 border-y p-2'>
                                    <button onMouseUp={handleOnMouseUp} className={` group border-1 rounded-full aspect-square h-full my-auto
                                    ${task.priority === 'high' ? 'bg-red-400/20  border border-red-400 hover:bg-red-400/40' : ''}
                                    ${task.priority === 'mid' ? 'bg-amber-300/20  border border-amber-300 hover:bg-amber-300/40' : ''}
                                    ${task.priority === 'default' ? 'hover:bg-gray-200/40' : ''}
                                    transition-colors duration-300`}>
                                        <svg  className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                        ${task.priority === 'high' ? 'text-red-400' : ''}
                                        ${task.priority === 'mid' ? 'text-amber-300' : ''}
                                        ${task.priority === 'default' ? 'text-gray-200' : ''}
                                        `} width="84px" height="84px" viewBox="-2.4 -2.4 28.80 28.80" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.2287 6.60355C21.6193 6.99407 21.6193 7.62723 21.2287 8.01776L10.2559 18.9906C9.86788 19.3786 9.23962 19.3814 8.84811 18.9969L2.66257 12.9218C2.26855 12.5349 2.26284 11.9017 2.64983 11.5077L3.35054 10.7942C3.73753 10.4002 4.37067 10.3945 4.7647 10.7815L9.53613 15.4677L19.1074 5.89644C19.4979 5.50592 20.1311 5.50591 20.5216 5.89644L21.2287 6.60355Z" fill='currentColor'></path> </g></svg>
                                    </button>
                                    <div>
                                        <h3 className='text-md font-medium'>{task.title}</h3>
                                        {task.description && <p className='text-sm'>{task.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;