import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import logo from './logo_orange.svg'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:3000/data',
      );
      setData(result.data.data);
    };
    fetchData();
  }, [])

  return (
    <div className='container'>
      <div className='navbar'>
        <img className='logo' src={logo} />
      </div>
      <table className='patients_table'>
        <tr>
          <th>Name</th>
          <th>Birthday</th>
          <th>Status</th>
          <th>Address</th>
        </tr>
        {data.map(obj => (
          <tr>
            <td>{obj["name"]}</td>
            <td>{obj["birthday"]}</td>
            <td>{obj["status"]}</td>
            <td>{obj["address"]}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default App;
