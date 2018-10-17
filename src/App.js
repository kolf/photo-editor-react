import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Home from "./containers/Home";
import EditorImage from "./containers/EditorImage";
import EditorText from "./containers/EditorText";
import Clipping from "./containers/Clipping";
import ClipHome from "./containers/ClipHome";
import FilterClip from "./containers/FilterClip";
import CutClip from "./containers/CutClip";
import Resources from "./containers/Resources";
import Success from "./containers/Success";

const Root = () => {
  return <div className="App" />;
};
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/photo" component={Home} />
            <Route path="/photo/editor-image" component={EditorImage} />
            <Route path="/photo/editor-text" component={EditorText} />
            <Route path="/photo/image-upload/clipping" component={Clipping} />
            <Route path="/photo/image-upload/index" component={ClipHome} />
            <Route
              path="/photo/image-upload/filter-clip"
              component={FilterClip}
            />
            <Route path="/photo/image-upload/cut-clip" component={CutClip} />
            <Route path="/photo/resources" component={Resources} />
            <Route path="/photo/success" component={Success} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
