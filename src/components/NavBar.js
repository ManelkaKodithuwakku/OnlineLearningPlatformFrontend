import { Link } from 'react-router-dom';
import { useUser } from '../auth/useUser';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const NavBar = () => {
    const user = useUser();
    const isAdmin = user ? user.isAdmin : false;
    const history = useHistory();

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/courses">Courses</Link>
                </li>
                {user && !isAdmin && <li>
                    <Link to={`/enroll/${user.id}`}>Enrollment</Link>
                </li>}
                {isAdmin && <li>
                    <Link to="/admin">Admin Dashboard</Link>
                </li>}
                {isAdmin && <li>
                    <Link to="/admin/manage-courses">Manage Courses</Link>
                </li>}
            </ul>
            <div className="nav-right">
                {user
                ? <button onClick={()=>{
                    window.location.reload()
                    localStorage.removeItem('token');
                    history.push('/login')
                }}
                >Log Out</button>
                : <button onClick={() => {
                    history.push('/login');
                }}>Log In</button>}
            </div>
        </nav>
    );
}

export default NavBar;