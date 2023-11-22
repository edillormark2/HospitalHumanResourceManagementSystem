import React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useStateContext } from "../../contexts/ContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteLeavePopup = (props) => {
  const { currentColor, getEndPoint } = useStateContext();
  const { openDeletePopup, setOpenDeletePopup, EmployeeID } = props;
  const { getEndpoint } = useStateContext();
  const endPoint = getEndPoint();

  const handleDelete = async () => {
    try {
      // Send a DELETE request to your server to delete the employee
      await axios.delete(
        `${endPoint}/deleteEmployeesLeaves/${EmployeeID}`
      );

      toast.success("Employee Leave deleted ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      props.onLeaveCreated();
      setOpenDeletePopup(false); // Close the delete popup after deletion
    } catch (error) {
      // Handle error and display the error message
      toast.error("Error deleting employee: " + error.message);
    }
  };

  return (
    <div className="bg-white dark-bg-[#42464D]">
      <Modal open={openDeletePopup}>
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
                color: "white",
              }}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpenDeletePopup(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default DeleteLeavePopup;
