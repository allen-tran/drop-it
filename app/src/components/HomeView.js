
import React from "react";
import FileList from "./FileList";

function HomeView(appProps) {
  return (
    appProps.authenticated &&
    <div>
      <p>
        through the years, and shed so many tears
      </p>
      <FileList {...appProps} />
      null
    </div>
  );
}

export default HomeView;