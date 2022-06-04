
import React from "react";
import FileList from "./FileList";

function HomeView(appProps) {
  return (
    appProps.authenticated &&
    <div>
      <FileList {...appProps} />
    </div>
  );
}

export default HomeView;