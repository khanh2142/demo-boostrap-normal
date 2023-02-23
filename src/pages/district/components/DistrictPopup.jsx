import React, { useEffect, useState } from "react";
import { checkExistInArray } from "../../../utils/CheckExistInArray";

const DistrictPopup = ({
  uuid,
  rowData,
  handleClick,
  title,
  provinceList,
  districtList,
  type,
}) => {
  const defaultFormValue = {
    DistrictCode: null,
    ProvinceCode: null,
    DistrictName: "",
    FlagActive: "1",
  };

  const [open, setOpen] = useState(false);
  const [formValue, setFormValue] = useState(defaultFormValue);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    if (rowData) {
      setFormValue(rowData);
    } else {
      setFormValue(defaultFormValue);
    }
  }, [uuid, rowData, type]);

  const handleSubmit = () => {
    if (type === "add") {
      if (!formValue.DistrictCode) {
        alert("Vui lòng nhập DistrictCode!");
        return;
      }

      if (
        checkExistInArray(districtList, "DistrictCode", formValue.DistrictCode)
      ) {
        alert("Mã quận/huyện bị trùng!");
        return;
      }
    }

    if (type === "edit") {
      if (!formValue.ProvinceCode) {
        alert("Vui lòng nhập ProvinceCode!");
        return;
      }

      if (!formValue.DistrictName) {
        alert("Vui lòng nhập DistrictName!");
        return;
      }
    }

    handleClick(formValue);
    handleClose();
  };

  const renderBody = () => {
    return (
      <form>
        <div class="mb-3">
          <label for="" class="form-label">
            DistrictCode
          </label>
          <input
            type="number"
            class="form-control"
            name="DistrictCode"
            value={formValue.DistrictCode}
            onChange={(e) =>
              setFormValue({ ...formValue, DistrictCode: e.target.value })
            }
            disabled={type !== "add"}
          />
        </div>
        <div className="mb-3">
          <label for="" class="form-label">
            ProvinceCode
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            value={formValue.ProvinceCode}
            onChange={(e) =>
              setFormValue({ ...formValue, ProvinceCode: e.target.value })
            }
            disabled={type === "delete"}
          >
            <option selected value="">
              Vui lòng chọn
            </option>
            {provinceList.map((item) => {
              return (
                <option value={item.ProvinceCode}>{item.ProvinceName}</option>
              );
            })}
          </select>
        </div>

        <div class="mb-3">
          <label for="" class="form-label">
            DistrictName
          </label>
          <input
            type="text"
            class="form-control"
            name="DistrictName"
            value={formValue.DistrictName}
            onChange={(e) =>
              setFormValue({ ...formValue, DistrictName: e.target.value })
            }
            disabled={type === "delete"}
          />
        </div>

        <div class="form-check form-switch">
          <label class="form-check-label" for="">
            FlagActive
          </label>
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            checked={formValue.FlagActive === "1"}
            onChange={(e) => {
              setFormValue({
                ...formValue,
                FlagActive: e.target.checked ? "1" : "0",
              });
            }}
            disabled={type === "delete"}
          />
        </div>
      </form>
    );
  };

  return (
    open && (
      <div
        className="bg-body-secondary position-fixed shadow-lg rounded p-2"
        style={{
          width: 500,
          top: 50,
          left: "calc(50% - 150px)",
          zIndex: 100,
        }}
      >
        <h3>{title}</h3>
        <>{renderBody()}</>
        <div className="d-flex justify-content-end" style={{ gap: 10 }}>
          <button
            className={`btn btn-${
              type === "edit"
                ? "warning"
                : type === "delete"
                ? "danger"
                : "success"
            }`}
            onClick={handleSubmit}
          >
            OK
          </button>
          <button className="btn btn-secondary" onClick={handleClose}>
            Thoát
          </button>
        </div>
      </div>
    )
  );
};

export default DistrictPopup;
