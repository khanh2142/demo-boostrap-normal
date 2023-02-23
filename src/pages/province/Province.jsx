import React, { useEffect, useState } from "react";
import { Table } from "rsuite";
import Flag from "../../components/flag/Flag";
import ProvincePopup from "./components/ProvincePopup";

const { Column, HeaderCell, Cell } = Table;

const Province = ({ data, setData }) => {
  const [list, setList] = useState(data.Province);
  const [params, setParams] = useState({
    ProvinceName: "",
    ProvinceCode: "",
  });

  const [popUp, setPopUp] = useState(<></>);
  const [reloadKey, setReloadKey] = useState("0");

  const handleReload = () => {
    setReloadKey(Math.random());
  };

  const handleSearch = () => {
    const arr = [...data.Province]
      .filter((item, index) => {
        if (!params.ProvinceName || params.ProvinceName === "") {
          return item;
        }
        return (
          item.ProvinceName &&
          item.ProvinceName.toLowerCase().includes(
            params.ProvinceName.toLowerCase()
          )
        );
      })
      .filter((item, index) => {
        if (!params.ProvinceCode || params.ProvinceCode === "") {
          return item;
        }
        return (
          item.ProvinceCode &&
          item.ProvinceCode.toLowerCase().includes(
            params.ProvinceCode.toLowerCase()
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
      const arr = data.Province.map((item) => {
        if (item.ProvinceCode === formValue.ProvinceCode) {
          item = formValue;
        }
        return item;
      });

      setData({ ...data, Province: arr });
      handleReload();
    };

    setPopUp(
      <ProvincePopup
        uuid={Math.random()}
        rowData={rowData}
        handleClick={confirmEdit}
        title="Chỉnh sửa"
        type="edit"
      />
    );
  };

  const handleDelete = (rowData) => {
    const confirmDelete = (formValue) => {
      const arr = data.Province.filter((item) => {
        return item.ProvinceCode !== formValue.ProvinceCode;
      });

      setData({
        ...data,
        Province: arr,
        District: data.District.filter(
          (item) => item.ProvinceCode !== formValue.ProvinceCode
        ),
      });
      handleReload();
    };

    setPopUp(
      <ProvincePopup
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
      const arr = [...data.Province, formValue];

      setData({ ...data, Province: arr });
      handleReload();
    };

    setPopUp(
      <ProvincePopup
        uuid={Math.random()}
        handleClick={confirmAdd}
        title="Thêm"
        type="add"
        provinceList={data.Province}
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
            <label>Tìm theo mã tỉnh</label>
            <input
              className="form-control"
              style={{ width: 300 }}
              onChange={(e) => {
                setParams({ ...params, ProvinceCode: e.target.value });
              }}
            />
          </div>
          <div className="d-flex align-items-center" style={{ gap: 10 }}>
            <label>Tìm theo tên tỉnh</label>
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
                  <td>{item.ProvinceCode}</td>
                  <td>{item.ProvinceName}</td>
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

export default Province;
