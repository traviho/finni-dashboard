import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Navbar from './Navbar'
import {Link} from 'react-router-dom'

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
              <th className="th_name">Name</th>
              <th className="th_birthday">Birthday</th>
              <th className="th_status">Status</th>
              <th className="th_address">Address</th>
            </tr>
          </thead>
          <tbody>
            {data.filter(obj => obj["name"].toUpperCase().includes(nameSearch.toUpperCase())).map((obj, idx) => (
              <tr key={idx}>
                <td><Link to={"client/" + idx} state={{profile: obj}}>{obj["name"]}</Link></td>
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
