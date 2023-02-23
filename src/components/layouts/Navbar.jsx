import React from "react";

const Navbar = ({ list, activeKey, setActiveKey }) => {
  return (
    <div
      className="d-flex flex-column p-2 bg-success-subtle"
      style={{ height: "100vh", width: 300, gap: 10 }}
    >
      {list.map((item) => {
        return (
          <div
            className={`p-1 rounded ${activeKey === item.key && "bg-success"}`}
            key={item.key}
            style={{ width: "100%", cursor: "pointer" }}
            onClick={() => setActiveKey(item.key)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
