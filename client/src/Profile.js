import { useLocation } from "react-router-dom";
import './App.css';
import Navbar from "./Navbar";
import user_icon from './user.png'
import calendar_icon from './calendar.png'
import info_icon from './info.png'
import hourse_icon from './house.png'

export default function Profile() {
    const location = useLocation()
    const {profile} = location.state
    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <h3>Basic Information</h3>
                <img src={user_icon} /><strong>Name</strong>
                <p className="profile-field">{profile.name}</p>

                <img src={calendar_icon} /><strong>Date of Birth</strong>
                <p className="profile-field">{profile.birthday}</p>

                <img src={info_icon} /><strong>Status</strong>
                <p className="profile-field">{profile.status}</p>

                <img src={hourse_icon} /><strong>Address</strong>
                <div style={{marginTop: 10}}>
                    {profile.addresses.map((adr, idx) => (<li key={idx}>{adr}</li>))}
                </div>
                

                <h3 style={{marginTop: 30}}>Additional Information</h3>
            </div>
        </div>
    )
}