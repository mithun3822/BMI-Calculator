import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function InputTextField({ value, onChange, children }) {
  return (
    <div className="form-group">
      <label className="mb-1">{children}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder={children}
        title={`Enter the ${children}`}
      />
    </div>
  );
}

function BMIApp() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [BMIValue, setBMIValue] = useState("");
  const [alertColor, setAlertColor] = useState("primary");
  const [alertText, setAlertText] = useState("Normal");

  function fnClear() {
    setHeight("");
    setWeight("");
    setBMIValue("");
  }

  function fnCheckBMI() {
    const parsedHeight = parseFloat(height);
    const parsedWeight = parseFloat(weight);

    if (
      isNaN(parsedHeight) ||
      isNaN(parsedWeight) ||
      parsedHeight <= 0 ||
      parsedWeight <= 0
    ) {
      alert("Please enter valid height and weight.");
      return;
    }

    const bmi = (parsedWeight / (parsedHeight * parsedHeight)) * 10000;
    setBMIValue(bmi.toFixed(2));
    if (bmi < 20) {
      setAlertColor("primary");
      setAlertText("Under weight");
    } else if (bmi > 20 && bmi < 25) {
      setAlertColor("success");
      setAlertText("Normal");
    } else {
      setAlertColor("danger");
      setAlertText("Over weight");
    }
  }
  return (
    <div
      className="container mt-5 text-center"
      style={{ fontVariant: "small-caps" }}
    >
      <div className="card p-4" style={{ maxWidth: "400px" }}>
        <h2 className="card-title mb-4">BMI Calculator</h2>
        <InputTextField
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          children="Height (cm)"
        />
        <InputTextField
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          children="Weight (kg)"
        />
        <div className="mt-4">
          <button className="btn btn-primary me-2" onClick={fnCheckBMI}>
            Check BMI
          </button>
          <button className="btn btn-danger" onClick={fnClear}>
            Clear
          </button>
        </div>
        {BMIValue && (
          <>
            <h5 className="mt-4">Your BMI is: {BMIValue}</h5>
            <div
              className={`alert alert-${alertColor} font-monospace p-2`}
              style={{ fontVariant: "normal" }}
            >
              {alertText}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BMIApp;
