import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import logo from './logo_orange.svg'

function App() {
  const [data, setData] = useState([])
  const [nameSearch, setNameSearch] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3000/data',
      );
      setData(result.data.data);
    };
    fetchData();
  }, [])

  const getTable = () => {
    return (
      <div className='patients_table_container'>
        <table className='patients_table'>
          <thead>
            <tr>
              <th class="th_name">Name</th>
              <th class="th_birthday">Birthday</th>
              <th class="th_status">Status</th>
              <th class="th_address">Address</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(obj => obj["name"].toUpperCase().includes(nameSearch.toUpperCase())).map(obj => (
              <tr>
                <td>{obj["name"]}</td>
                <td>{obj["birthday"]}</td>
                <td>{obj["status"]}</td>
                <td>{obj["address"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='navbar'>
        <img className='logo' src={logo} />
      </div>
      <div className='name-search'>
        <label>Find Patient:  </label>
        <input type="text" placeholder='name' onChange={event => setNameSearch(event.target.value)} />
      </div>
      {getTable()}
    </div>
  )
}

export default App;
