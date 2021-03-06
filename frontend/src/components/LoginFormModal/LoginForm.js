import { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'

function LoginForm() {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            }
        )
    }

    const handleDemoSubmit = (e) => {
        e.preventDefault()
        // setCredential('Demo-lition');
        // setPassword('password');
        // console.log(`HEY HEY HEY`, credential, password)
        setErrors([])
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' })).catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            }
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Username or Email
				<input
                        type='text'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
				<input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type='submit'>Log In</button>
            </form>

            <form onSubmit={handleDemoSubmit}>
                <input
                    type='hidden'
                    value='Demo-lition'
                />
                <input
                    type='hidden'
                    value='password'
                />
                <button type='submit'>Demo Login</button>
            </form>
            {/* <button >Demo Login</button> */}
        </>
    )
}

export default LoginForm
