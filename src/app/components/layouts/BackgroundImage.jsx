import React from "react";

function BackgroundImage(props) {
  // const imageUrl = "https://www.zupimages.net/up/23/06/4gde.jpg";
  const imageUrl = "src/app/assets/img/bg.jpg";
  

  return (
    <div
      className="bg-cover bg-center h-full"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {props.children}
    </div>
  );
}

export default BackgroundImage;