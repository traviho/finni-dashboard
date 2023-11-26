import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from "./Navbar";
import user_icon from './user.png'
import calendar_icon from './calendar.png'
import info_icon from './info.png'
import hourse_icon from './house.png'
import axios from 'axios'

export default function Profile() {
    const location = useLocation();
    const [profile, setProfile] = useState({})
    const id = location.pathname.split("/")[2];
    console.log(profile)

    useEffect(() => {
        const fetchData = async () => {
            console.log(id)
            const result = await axios.get(
              'http://localhost:3000/patient', {params: {id: id}}
            );
            setProfile(result.data);
          };
          fetchData();
    }, [id])
    
    return Object.keys(profile).length === 0 ? <div /> : (
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
                {('additional_information' in profile) ? profile.additional_information.map(obj => Object.entries(obj).map(entry => (
                    <div>
                        <strong>{entry[0]}</strong>
                        <p className="profile-field">{entry[1]}</p>
                    </div>
                ))) : <></>}
                <button className="edit-profile"><Link to={"edit"} state={{profile}}>Edit Profile</Link></button>
            </div>
        </div>
    )
}