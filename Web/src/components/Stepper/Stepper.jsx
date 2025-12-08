import React from "react";
import "./Stepper.css";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LoginIcon from "@mui/icons-material/Login";
import CheckIcon from "@mui/icons-material/Check";
import EastIcon from "@mui/icons-material/East";
function Icon(props) {
  return (
    <span className={`Stepper-icon ${props.active ? "active" : "inactive"}`}>
      {props.children}
    </span>
  );
}
function Separator(props) {
  return <div className={`Stepper-separator ${props.passed}  `} />;
}

function Stepper({ currentStep }) {
  const checkIcon = (
    <CheckIcon color="fourth" fontSize="large" sx={{ marginTop: "2.5%" }} />
  );

  return (
    <div className="Stepper-container">
      <Icon active={true}>
        {currentStep > 0 ? (
          checkIcon
        ) : (
          <PersonOutlinedIcon
            color="fourth"
            fontSize="large"
            sx={{ marginTop: "2.5%" }}
          />
        )}
      </Icon>
      <Separator passed={currentStep > 0 ? "passed" : "didntPass"} />
      <Icon active={currentStep > 0}>
        {currentStep > 1 ? (
          checkIcon
        ) : (
          <LoginIcon
            color="fourth"
            fontSize="large"
            sx={{ marginTop: "6.5%", marginRight: "7%" }}
          />
        )}
      </Icon>
      <Separator passed={currentStep > 1 ? "passed" : "didntPass"} />
      <Icon active={currentStep > 1}>
        {currentStep > 2 ? (
          checkIcon
        ) : (
          <EastIcon
            color="fourth"
            fontSize="large"
            sx={{ marginTop: "5.5%" }}
          />
        )}
      </Icon>
    </div>
  );
}

export default Stepper;
