import { Link } from 'react-router-dom';

export default function Auth() {
    return (
        <>
            <h1>Auth</h1>
            <Link to="/dashboard">sign in</Link>
        </>
    )
}