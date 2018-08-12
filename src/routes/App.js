import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./Home";
import EditorText from "./EditorText";
import EditorImage from "./EditorImage";
import PhotoUpload from "./PhotoUpload";

const App = () => (
  <Router>
    <div style={s.app}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/text" component={EditorText} />
        <Route path="/image" component={EditorImage} />
        <Route path="/upload" component={PhotoUpload} />
        <Redirect to="/" />
      </Switch>
    </div>
  </Router>
);

const s = {
  app: {
    backgroundColor: "#000",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    maxWidth: 640,
    margin: "0 auto"
  }
};

export default App;
