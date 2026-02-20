import { Link } from "react-router-dom";
import SideBarItem from "./SideBarItem.jsx";

import logo from "../assets/logo.jpg";
import myDay from '../assets/myDay.svg';
import next7Days from  '../assets/next7Days.svg';
import tasks from '../assets/tasks.svg';
import calendar from '../assets/calendar.svg';
import plus from '../assets/plus.svg';

function SideBarHomepage() {
    return(
        <div className="h-screen w-64 bg-secondary text-white flex flex-col p-4 fixed">
            <div></div>
            <img src={logo} alt="logo" className="object-contain rounded-xl m-2"></img>
            <nav className="flex flex-col gap-4 mt-4">
                <SideBarItem to='/myDay' icon={myDay} label='My Day' />
                <SideBarItem to="/next7days" icon={next7Days} label='Next 7 days' />
                <SideBarItem to="/tasks/all" icon={tasks} label='All my tasks' />
                <SideBarItem to="/calendar"  icon={calendar} label='Calendar' />
                <div className="border"></div>
                <div className="flex justify-between mx-2">
                    <span>My lists</span>
                    <button className='cursor-pointer'>
                        <img src={plus} className="h-6"></img>
                    </button>
                </div>
                <div className="border"></div>
                <div className="mx-2">
                    <span>Tags</span>
                </div>
                
            </nav>
      </div>
    )
}

export default SideBarHomepage;