import React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const DeletePerformancePopup = (props) => {
  const { currentColor } = useStateContext();
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const navigate = useNavigate();

  const deletePerformanceData = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/deletePerformance/${EmployeeID}`);
      toast.success("Employee performance data deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
      props.onEvalDeleted();
      setOpenPopup(false);
    } catch (error) {
      toast.error("Error deleting performance Data", error);
      setOpenPopup(false);
      console.error('Error deleting employees:', error);
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
            Are you sure you want to delete this employee performance data?
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              variant="solid"
              onClick={deletePerformanceData}
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

export default DeletePerformancePopup;
