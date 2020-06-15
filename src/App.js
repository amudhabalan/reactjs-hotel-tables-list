import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          process.env.REACT_APP_API_URL +
            '/tables?apikey=5fe2d632-3e25-4e78-9950-85b01b88092a'
        );
        if (response.status !== 200) {
          console.log(response);
          return;
        }
        setTables(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <th>Room</th>
          <th>Table ID</th>
          <th>Name</th>
          <th></th>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <tr key={index}>
              <td>{table.room}</td>
              <td>{table.tableId}</td>
              <td>{table.tableName}</td>
              <td>
                <a href={table.qrCode}>QRCode</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
