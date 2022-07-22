import React from "react";
import "./Location.css";

const Location = () => {
  return (
    <>
      <div className="primary">
        <iframe
          width="600"
          height="280"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=Av.%20Pres.%20Per%C3%B3n%208438%20Oeste,%20S2000%20Rosario,%20Santa%20Fe&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        ></iframe>
      </div>
    </>
  );
};

export default Location;
