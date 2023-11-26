import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./Navbar";
import axios from "axios";


export default function EditProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(location.state.profile);

    const editName = (name) => {
        setProfile({
            ...profile,
            name
        });
    }

    const editBirthday = (birthday) => {
        setProfile({
            ...profile,
            birthday
        });
    }

    const editStatus = (status) => {
        setProfile({
            ...profile,
            status
        });
    }

    const editAddress = (idx, address) => {
        const newAddresses = profile.addresses;
        newAddresses[idx] = address
        setProfile({
            ...profile,
            addresses: newAddresses
        });
    }

    console.log(profile);
    console.log("Edit form")
    return (
        <div>
            <Navbar />
            <div className="edit-form">
                
                <div>
                    <strong className="edit-form-label">Name</strong>
                    <input className="edit-form-input" type="text" value={profile.name} onChange={event => editName(event.target.value)} />

                    <strong className="edit-form-label">Date of Birth</strong>
                    <input className="edit-form-input" type="text" value={profile.birthday} onChange={event => editBirthday(event.target.value)} />

                    <strong className="edit-form-label">Status</strong>
                    <input className="edit-form-input" type="text" value={profile.status} onChange={event => editStatus(event.target.value)}/>

                    <strong className="edit-form-label">Addresses</strong>
                    <div style={{marginBottom: '40px'}}>
                        {profile.addresses.map((adr, idx) => (
                            <input key={idx} className="edit-form-input-2" type="text" value={adr} onChange={event => editAddress(idx, event.target.value)} />
                        ))}
                    </div>
                    

                    <button onClick={() => navigate(`/client/${profile._id}`)}>Cancel</button>
                    {/* <button onClick={() => axios({method: 'post', headers: {'Content-Type':'application/json'}, url: "http://localhost:3000/updateClient", data: {profile}}).then(res => navigate(`/client/${profile._id}`))}>Submit</button> */}
                    <button onClick={() => axios.post("http://localhost:3000/updateClient", {profile}).then(res => navigate(`/client/${profile._id}`))}>Submit</button>
                </div>
            </div>
        </div>
    )
}