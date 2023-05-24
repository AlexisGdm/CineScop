import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function MovieImage({ images }) {
  const API_IMAGE = "https://image.tmdb.org/t/p/w500/";

  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap">
        {images.map((image) => {
          return (
            <div key={image.file_path}>
              <img
                src={`${API_IMAGE}${image.file_path}`}
                alt=""
                className="object-cover w-[200px] h-[300px] m-[6px] border-2 border-white rounded-[8px]"
                onClick={() => handleOpen(image)}
              />
            </div>
          );
        })}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <img
            src={`${API_IMAGE}${selectedImage.file_path}`}
            alt=""
            className="object-cover h-[850px] mx-auto border-2 border-white rounded-[8px]"
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}
