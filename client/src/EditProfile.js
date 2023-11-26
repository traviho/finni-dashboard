import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import Navbar from "./Navbar";
import axios from "axios";
import close from "./close.png"


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

    const addField = () => {
        const additional_information = 'additional_information' in profile ? profile.additional_information : [];
        const newProfile = {...profile};
        additional_information.push({"":""})
        newProfile["additional_information"] = additional_information;
        setProfile(newProfile)
    }

    const deleteField = (idx) => {
        const newProfile = {...profile};
        newProfile["additional_information"].splice(idx, 1)
        setProfile(newProfile);
    }

    const editFieldKey = (idx, key) => {
        console.log(idx)
        console.log(key)
        const newProfile = {...profile};
        const obj = profile.additional_information[idx];
        const value = Object.values(obj)[0]
        newProfile.additional_information[idx] = {[key]: value}
        setProfile(newProfile)
    }

    const editFieldValue = (idx, value) => {
        console.log(idx)
        console.log(value)
        const newProfile = {...profile};
        const obj = profile.additional_information[idx];
        const key = Object.keys(obj)[0]
        newProfile.additional_information[idx] = {[key]: value}
        setProfile(newProfile)
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
                    <div style={{marginBottom: '30px'}}>
                        {profile.addresses.map((adr, idx) => (
                            <input key={idx} className="edit-form-input-2" type="text" value={adr} onChange={event => editAddress(idx, event.target.value)} />
                        ))}
                    </div>

                    <strong className="edit-form-label">Additional Information</strong>
                    {('additional_information' in profile) ? profile.additional_information.map((obj, idx) => Object.entries(obj).map(entry => (
                        <div>
                            <div>
                                <div>
                                    <input className="edit-form-input-3" type="text" value={entry[0]} onChange={event => editFieldKey(idx, event.target.value)} />
                                    <img onClick={() => deleteField(idx)} className="delete-field" src={close}/>
                                </div>
                                <input className="edit-form-input" type="text" value={entry[1]} onChange={event => editFieldValue(idx, event.target.value)} />
                            </div>
                        </div>
                    ))) : <></>}

                    <button className="add-field-button" onClick={() => addField()}>Add Field</button>
                    
                    <button onClick={() => navigate(`/client/${profile._id}`)}>Cancel</button>
                    <button onClick={() => axios.post("http://localhost:3000/updateClient", {profile}).then(res => navigate(`/client/${profile._id}`))}>Submit</button>
                </div>
            </div>
        </div>
    )
}