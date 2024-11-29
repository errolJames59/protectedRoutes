import { Link } from "react-router-dom"

interface NavbarProps {
    className?: string;
}

const Navbar: React.FC<NavbarProps> = ({className}) => {
  return (
    <header className={`${className}`}>
        <nav className="p-4">
            <ul className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="dashboard">Dashboard</Link>
                <Link to="about">About</Link>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar
