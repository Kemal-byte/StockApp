import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { flexCenter, modalStyle } from "../../styles/globalStyle";
import { TextField } from "@mui/material";
import useStockCalls from "../../hooks/useStockCalls";

export default function FirmModal({ open, setOpen, info, setInfo }) {
  const { PostFirm, PutFirm } = useStockCalls();
  function handleChange(e) {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (info.id) {
      PutFirm(info);
      console.log("put firm clicked");
    } else {
      console.log("POSTED firm clicked");
      PostFirm(info);
    }
    setOpen(false);
    setInfo({});
  }

  const { name, phone, address, image } = info;
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={flexCenter} component="form" onSubmit={handleSubmit}>
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={name || ""}
              onChange={handleChange}
            />
            <TextField
              label="Phone Number"
              name="phone"
              id="phone"
              type="text"
              variant="outlined"
              value={phone || ""}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={address || ""}
              onChange={handleChange}
            />
            <TextField
              label="Image URL"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={image || ""}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="large">
              {info?.id ? "Update Firm" : "Save Firm"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
