import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import down from "./down.png"

function App() {
  const [data, setData] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [statusFilters, setStatusFilters] = useState(["Active", "Churned", "Onboarding", "Inquiry"]);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3000/data',
      );
      setData(result.data);
    };
    fetchData();
  }, [])

  const statusFilterChecked = (status) => {
    if (statusFilters.includes(status)) {
      const index = statusFilters.indexOf(status);
      const newStatusFilters = [...statusFilters];
      newStatusFilters.splice(index, 1);
      setStatusFilters(newStatusFilters)
    } else {
      setStatusFilters(statusFilters.concat(status))
    }
  } 

  const getTable = () => {
    return (
      <div className='patients_table_container'>
        <table className='patients_table'>
          <thead>
            <tr>
              <th className="th_name">Name</th>
              <th className="th_birthday">Birthday</th>
              <th className="th_status">
                Status<img src={down} onClick={() => setShowStatusDropdown(!showStatusDropdown)} className="status-filter-button" />
                {showStatusDropdown ? (
                  <div className="status-filter-dropdown">
                    <div style={{marginBottom: 5}}>
                      <input type="checkbox" className='status-filter-checkbox' checked={statusFilters.includes('Active')} onChange={() => statusFilterChecked('Active')}/><span>Active</span>
                    </div>
                    <div style={{marginBottom: 5}}>
                      <input type="checkbox" className='status-filter-checkbox' checked={statusFilters.includes('Onboarding')} onChange={() => statusFilterChecked('Onboarding')} /><span>Onboarding</span>
                    </div>
                    <div style={{marginBottom: 5}}>
                      <input type="checkbox" className='status-filter-checkbox' checked={statusFilters.includes('Churned')} onChange={() => statusFilterChecked('Churned')} /><span>Churned</span>
                    </div>
                    <div style={{marginBottom: 5}}>
                      <input type="checkbox" className='status-filter-checkbox' checked={statusFilters.includes('Inquiry')} onChange={() => statusFilterChecked('Inquiry')} /><span>Inquiry</span>
                    </div>
                  </div>
                  ) : <></>
                }
              </th>
              <th className="th_address">Address</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(obj => (
                obj["name"].toUpperCase().includes(nameSearch.toUpperCase()) &&
                statusFilters.includes(obj["status"])
              )).map((obj, idx) => (
              <tr key={idx}>
                <td><Link to={"client/" + obj._id} state={{id: obj._id}}>{obj["name"]}</Link></td>
                <td>{obj["birthday"]}</td>
                <td>{obj["status"]}</td>
                <td>{obj["addresses"].map((adr, idx) => <p key={idx} style={{margin:0}}>{adr}</p>)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className='container'>
      <Navbar />
      <div className='name-search'>
        <label>Find Patient:  </label>
        <input type="text" placeholder='name' onChange={event => setNameSearch(event.target.value)} />
      </div>
      {getTable()}
    </div>
  )
}

export default App;
