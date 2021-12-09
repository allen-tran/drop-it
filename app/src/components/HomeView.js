
import React from "react";
import FileList from "./FileList";

function HomeView(appProps) {
  return (
    appProps.authenticated &&
    <div>
      <p>
        there is nothing to see here, how about we drop something?
      </p>
      <FileList {...appProps} />
      null
    </div>
  );
}

export default HomeView;