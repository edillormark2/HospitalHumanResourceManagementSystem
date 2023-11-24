import React from "react";
import axios from "axios";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { useStateContext } from "../../contexts/ContextProvider";

const DeletePopup = props => {
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const { currentColor, getEndPoint } = useStateContext();
  const navigate = useNavigate();
  const endPoint = getEndPoint();

  const handleDelete = async () => {
    try {
      await axios.delete(`${endPoint}/employees/${EmployeeID}`);
      toast.success("Employee data deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      props.onLeaveCreated();
      setOpenPopup(false);
    } catch (error) {
      toast.error("Error deleting employee", error);
    }
  };

  return (
    <div className="bg-white dark-bg-[#42464D]">
      <Modal open={openPopup}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle style={{ justifyContent: "center" }}>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent className="md-max-sm-flex">
            Are you sure you want to delete this?
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="solid"
              onClick={handleDelete}
              style={{
                backgroundColor: "#DE3163",
                color: "white"
              }}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenPopup(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default DeletePopup;
