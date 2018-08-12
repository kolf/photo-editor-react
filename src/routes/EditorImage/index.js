import React, { Component } from "react";
import { getQueryString } from "../../utils";
import Footer from "../../components/Footer";
import "./style.css";
import uploadUrl from "../../assets/upload.gif";

import p2Url from "../../assets/p2.png";
import p3Url from "../../assets/p3.jpg";
import p4Url from "../../assets/p4.jpg";

const images = [p2Url, p3Url, p4Url];

const Stage = ({ imgUrl }) => {
  return (
    <div className="body" style={s.body}>
      <div className="stage">
        <img className="origin js-result" src={imgUrl} alt="Kolf" />
      </div>
    </div>
  );
};

const Thumbs = ({ items, onClick }) => {
  return (
    <div className="upload-image-root">
      <div className="upload-box">
        <div className="upload-btn">
          <img src={uploadUrl} alt="Kolf" />
          <input type="file" name="" id="" />
        </div>
        <div className="upload-list">
          <ul style={{ width: 3.6 * items.length + "rem" }}>
            {items.map((item, index) => (
              <li key={item + index} onClick={e => onClick(item)}>
                <img src={item} alt="Kolf" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

class EditorImage extends Component {
  state = {
    resultUrl: ""
  };

  componentWillMount() {
    this.setState({
      resultUrl: getQueryString("imgUrl")
    });
  }

  goTo = path => {
    this.props.history.push(path);
  };

  close = () => {};

  handleThumbClick = url => {
    console.log(url);
  };

  render() {
    const { resultUrl } = this.state;
    return (
      <div className="page">
        <Stage imgUrl={resultUrl} />
        <Thumbs items={images} onClick={this.handleThumbClick} />
        <Footer>
          <Footer.CancelIcon onClick={e => this.goTo("/home")} />
          <Footer.Title>图片</Footer.Title>
          <Footer.OkIcon onClick={e => this.goTo("/home")} />
        </Footer>
      </div>
    );
  }
}

const s = {
  body: {
    paddingBottom: "5rem",
    transition: ".2 all"
  }
};

export default EditorImage;
