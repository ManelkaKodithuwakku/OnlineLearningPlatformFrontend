import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

export const SignUpPage = () => {
    const [, setToken] = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const [emailValue, setEmailValue] = useState('');
    const [usernameValue, setUserNameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');

    const history = useHistory();

    const onSignUpClicked = async () => {
        
        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', {
                username: usernameValue,
                email: emailValue,
                password: passwordValue
            })
            const {token} = response.data;
            if(token) setToken(token);
            history.push('/');
            window.location.reload()
        }catch(e){
            setErrorMessage(e.response.data.message)

        }
        
    }

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={usernameValue}
                onChange={e => setUserNameValue(e.target.value)}
                placeholder="username" />
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com" />
            <input
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password" />
            <input
                type="password"
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                placeholder="re-enter password" />
            <hr />
            <button
                disabled={
                    !emailValue || !passwordValue || !usernameValue || 
                    passwordValue !== confirmPasswordValue
                }
                onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Already have an account? Log In</button>
        </div>
    );
}