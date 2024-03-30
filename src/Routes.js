import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { CourseListPage } from './pages/CourseListPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { EnrollPage } from './pages/EnrollPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { PrivateRoute } from './auth/PrivateRoute';

const Routes = () => {

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/signup">
                    <SignUpPage />
                </Route>
                <PrivateRoute path="/courses" exact>
                    <CourseListPage />
                </PrivateRoute>
                <PrivateRoute path="/courses/:id">
                    <CourseDetailPage />
                </PrivateRoute>
                <PrivateRoute path="/enroll/:id">
                    <EnrollPage />
                </PrivateRoute>
                <PrivateRoute path="/admin" adminOnly>
                    <AdminDashboard />
                </PrivateRoute>
                <PrivateRoute path="/admin/manage-courses" adminOnly>
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
