import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import "./LogoutDialog.css";
import { useHistory } from "react-router-dom";

function LogoutDialog(props) {
  const history = useHistory();
  return (
    <Dialog open={props.open}>
      <DialogTitle className="LogoutDialog-style">{"Fazer logout"}</DialogTitle>

      <DialogContent className="LogoutDialog-style">
        <DialogContentText color="fourth" className="LogoutDialog-style">
          Tem certeza que deseja sair?
        </DialogContentText>
        <div className="LogoutDialog-buttons">
          <Button
            color="sixth"
            variant="outlined"
            sx={{
              marginRight: 1,
            }}
            onClick={() => {
              props.closeDialog();
            }}
          >
            Não
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              props.closeDialog();
              history.replace("/");
            }}
          >
            Sim, sair
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
