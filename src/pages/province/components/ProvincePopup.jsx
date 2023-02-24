import React, { useEffect, useState } from "react";
import { checkExistInArray } from "../../../utils/CheckExistInArray";

const ProvincePopup = ({
  uuid,
  rowData,
  handleClick,
  title,
  provinceList,
  type,
}) => {
  const defaultFormValue = {
    ProvinceCode: null,
    ProvinceName: "",
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
      if (!formValue.ProvinceCode) {
        alert("Vui lòng nhập ProvinceCode!");
        return;
      }

      if (
        checkExistInArray(provinceList, "ProvinceCode", formValue.ProvinceCode)
      ) {
        alert("Mã tỉnh/thành phố bị trùng!");
        return;
      }
    }

    if (type === "edit") {
      if (!formValue.ProvinceName) {
        alert("Vui lòng nhập ProvinceName!");
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
            ProvinceCode
          </label>
          <input
            type="text"
            class="form-control"
            name="ProvinceCode"
            value={formValue.ProvinceCode}
            onChange={(e) =>
              setFormValue({ ...formValue, ProvinceCode: e.target.value })
            }
            disabled={type !== "add"}
          />
        </div>
        <div class="mb-3">
          <label for="" class="form-label">
            ProvinceName
          </label>
          <input
            type="text"
            class="form-control"
            name="ProvinceName"
            value={formValue.ProvinceName}
            onChange={(e) =>
              setFormValue({ ...formValue, ProvinceName: e.target.value })
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

export default ProvincePopup;
