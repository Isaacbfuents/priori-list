import { Link } from 'react-router-dom';

function SideBarItem({ icon, label, to }) {
    return(
        <Link to={to} className='hover:bg-gray-700 p-2 rounded flex gap-2 items-center'>
            {icon && <img src={icon} alt={`${label} icon`} className='h-6' ></img>}
            {label}
        </Link>
    )
}

export default SideBarItem;