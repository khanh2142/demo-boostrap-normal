import React, { useState } from "react";
import Navbar from "../src/components/layouts/Navbar";
import "./App.css";
import * as districtList from "./data/Mst_District.json";
import * as provinceList from "./data/Mst_Province.json";
import District from "./pages/district/District";
import Province from "./pages/province/Province";

function App() {
  const defaultDistrictList = Object.values(districtList)
    .map((item, index) => {
      if (item.DistrictCode) {
        return {
          ...item,
          Idx: index + 1,
        };
      }
    })
    .filter((item) => item);
  const defaultProvinceList = Object.values(provinceList)
    .map((item, index) => {
      if (item.ProvinceCode) {
        return {
          ...item,
          Idx: index + 1,
        };
      }
    })
    .filter((item) => item);

  const [data, setData] = useState({
    District: defaultDistrictList,
    Province: defaultProvinceList,
  });

  const components = [
    {
      key: "1",
      title: "Quận/Huyện",
      component: <District data={data} setData={setData} />,
    },
    {
      key: "2",
      title: "Tỉnh/Thành phố",
      component: <Province data={data} setData={setData} />,
    },
  ];

  const [activeKey, setActiveKey] = React.useState("1");

  return (
    <div className="App">
      <Navbar
        list={components}
        setActiveKey={setActiveKey}
        activeKey={activeKey}
      />

      <div
        style={{
          height: "100vh",
          width: "100%",
          paddingRight: 10,
        }}
      >
        {components.find((item) => item.key === activeKey) &&
          components.find((item) => item.key === activeKey).component}
      </div>
    </div>
  );
}

export default App;
