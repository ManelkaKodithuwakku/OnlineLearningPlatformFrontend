import { Redirect, Route } from 'react-router-dom';
import { useUser } from './useUser';

export const PrivateRoute = ({adminOnly, ...rest}) => {
    const user = useUser();

    // console.log(user)
    // console.log(adminOnly)
    // console.log(rest)

    if (!user) return <Redirect to="/login" />

    if (adminOnly) return <Redirect to="/admin" />
    
    return <Route {...rest} />
}