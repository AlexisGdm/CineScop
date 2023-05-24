import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function MovieVideos({ videos }) {
  const API_VIDEO = "https://www.youtube.com/embed/";

  const [open, setOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState("");
  const handleOpen = (video) => {
    setSelectedVideo(video);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-evenly mx-auto">
        {videos.map((video) => {
          return (
            <div key={video.id} className="my-3 ">
              <img
                className="mx-auto"
                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                onClick={() => handleOpen(video)}
              ></img>
              <p className="text-white font-semibold text-center mx-auto mt-2">{`${video.name}`}</p>
            </div>
          );
        })}
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <iframe
            width="1120"
            height="630"
            src={`${API_VIDEO}${selectedVideo.key}`}
            title={selectedVideo.name}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
            allowfullscreen
          ></iframe>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
