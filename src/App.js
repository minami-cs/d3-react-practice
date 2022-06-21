import React, { useState } from "react";
import "./App.css";
import LineChart from "./pages/LineChart";
import BarChart from "./pages/BarChart";
import MultiLineChart from "./pages/MultiLineChart";

function App() {
  const [data, setData] = useState([158, 56, 87, 54, 65, 9, 59]);

  const updateData = () => {
    setData(
      data.map((value) => {
        if (value >= 190) return value;
        else return value + 5;
      })
    );
  };

  const filterData = () => {
    setData(data.filter((value) => value < 50));
  };

  const addRandomData = () => {
    setData([...data, Math.round(Math.random() * 120)]);
  };

  return (
    <React.Fragment>
      <div className="wrapper">
        {/* <LineChart data={data} /> */}
        <BarChart data={data} />
        <div className="button-group">
          <button onClick={updateData}>Update data</button>
          <button onClick={filterData}>Filter data</button>
          <button onClick={addRandomData}>Add data</button>
        </div>
        {/* <MultiLineChart /> */}
      </div>
    </React.Fragment>
  );
}

export default App;
