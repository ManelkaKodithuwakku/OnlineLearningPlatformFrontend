import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { PrivateRoute } from './auth/PrivateRoute';
import { CourseListPage } from './pages/CourseListPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { EnrollPage } from './pages/EnrollPage';
// import { AdminDashboard } from './pages/AdminDashboard';
import NavBar from './components/NavBar';
import { useUser } from './auth/useUser';
import {ManageCoursesPage} from './pages/ManageCoursesPage';

const Routes = () => {

    const user = useUser();

    return (
        <Router>
            {user && <NavBar />}
            <Switch>
                <Route path="/login">
                    <LogInPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <PrivateRoute path="/courses" exact>
                    <CourseListPage />
                </PrivateRoute>
                <PrivateRoute path="/courses/:courseId">
                    <CourseDetailPage />
                </PrivateRoute>
                <PrivateRoute path="/enroll/:id">
                    <EnrollPage />
                </PrivateRoute>
                {/* <PrivateRoute path="/admin" exact adminOnly>
                    <AdminDashboard />
                </PrivateRoute> */}
                <PrivateRoute path="/admin/manage-courses" exact adminOnly>
                    <ManageCoursesPage />
                </PrivateRoute>
                <Route path="/">
                    <Redirect to="/courses" />
                </Route>
            </Switch>
        </Router>
    );
};

export default Routes;
