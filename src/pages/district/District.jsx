import React, { useEffect, useState } from "react";
import { Table } from "rsuite";
import Flag from "../../components/flag/Flag";
import DistrictPopup from "./components/DistrictPopup";

const { Column, HeaderCell, Cell } = Table;

const District = ({ data, setData }) => {
  const [list, setList] = useState(data.District);
  const [params, setParams] = useState({
    DistrictCode: "",
    DistrictName: "",
  });
  const [popUp, setPopUp] = useState(<></>);
  const [reloadKey, setReloadKey] = useState("0");

  const handleReload = () => {
    setReloadKey(Math.random());
  };

  const handleSearch = () => {
    const arr = [...data.District]
      .filter((item, index) => {
        if (!params.DistrictCode || params.DistrictCode === "") {
          return item;
        }
        return (
          item.DistrictCode &&
          item.DistrictCode.toLowerCase().includes(
            params.DistrictCode.toLowerCase()
          )
        );
      })
      .filter((item, index) => {
        if (!params.DistrictName || params.DistrictName === "") {
          return item;
        }
        return (
          item.DistrictName &&
          item.DistrictName.toLowerCase().includes(
            params.DistrictName.toLowerCase()
          )
        );
      })
      .map((item, index) => {
        return {
          ...item,
          Idx: index + 1,
        };
      });

    setList(arr);
  };

  const handleEdit = (rowData) => {
    const confirmEdit = (formValue) => {
      const arr = data.District.map((item) => {
        if (item.DistrictCode === formValue.DistrictCode) {
          item = formValue;
        }
        return item;
      });

      setData({ ...data, District: arr });
      handleReload();
    };

    setPopUp(
      <DistrictPopup
        uuid={Math.random()}
        rowData={rowData}
        handleClick={confirmEdit}
        title="Chỉnh sửa"
        provinceList={data.Province}
        type="edit"
      />
    );
  };

  const handleDelete = (rowData) => {
    const confirmDelete = (formValue) => {
      const arr = data.District.filter((item) => {
        return item.DistrictCode !== formValue.DistrictCode;
      });

      setData({ ...data, District: arr });
      handleReload();
    };

    setPopUp(
      <DistrictPopup
        uuid={Math.random()}
        rowData={rowData}
        handleClick={confirmDelete}
        title="Xóa"
        provinceList={data.Province}
        type="delete"
      />
    );
  };

  const handleAdd = () => {
    const confirmAdd = (formValue) => {
      const arr = [...data.District, formValue];

      setData({ ...data, District: arr });
      handleReload();
    };

    setPopUp(
      <DistrictPopup
        uuid={Math.random()}
        handleClick={confirmAdd}
        title="Thêm"
        provinceList={data.Province}
        type="add"
        districtList={data.District}
      />
    );
  };

  useEffect(() => {
    setList(data.District);
    handleSearch();
  }, [reloadKey]);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        padding: 10,
      }}
    >
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: 30, gap: 10 }}
      >
        <div className="d-flex flex-column" style={{ gap: 10 }}>
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <label>Tìm theo mã huyện</label>
            <input
              className="form-control"
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, DistrictCode: e.target.value });
              }}
            />
          </div>
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <label>Tìm theo tên huyện</label>
            <input
              className="form-control"
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, DistrictName: e.target.value });
              }}
            />
          </div>
        </div>

        <button className="btn bg-info" onClick={handleSearch}>
          Tìm kiếm
        </button>

        <button className="btn btn-success" onClick={handleAdd}>
          Thêm
        </button>
      </div>

      <div className="table-responsive" style={{ maxHeight: 600 }}>
        <table class="table">
          <thead
            className="bg-secondary"
            style={{ position: "sticky", top: 0, zIndex: 1 }}
          >
            <tr>
              <th scope="col">STT</th>
              <th scope="col">DistrictCode</th>
              <th scope="col">ProvinceCode</th>
              <th scope="col">DistrictName</th>
              <th scope="col">FlagActive</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr>
                  <th scope="row">{item.Idx}</th>
                  <td>{item.DistrictCode}</td>
                  <td>{item.ProvinceCode}</td>
                  <td>{item.DistrictName}</td>
                  <td>
                    <Flag flag={item.FlagActive} />
                  </td>
                  <td>
                    <div className="d-flex" style={{ gap: 10 }}>
                      <button
                        className="btn btn-warning "
                        onClick={() => handleEdit(item)}
                      >
                        Sửa
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {popUp}
    </div>
  );
};

export default District;
