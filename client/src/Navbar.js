import logo from './logo_orange.svg'
import { useNavigate } from "react-router-dom";
import './App.css';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <div className='navbar'>
            <img onClick={() => navigate("/")}className='logo' src={logo} />
        </div>
    )
}