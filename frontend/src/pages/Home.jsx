import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1 className="bg-amber-600 p-4">Home</h1>
            <Link to="/auth">sign in</Link>
        </>
    )
}