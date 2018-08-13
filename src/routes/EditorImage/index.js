import React, { Component } from "react";
import { getQueryString } from "../../utils";
import Footer from "../../components/Footer";
import Cropper from "../../components/Cropper";
import "./style.css";
import uploadUrl from "../../assets/upload.gif";

import p2Url from "../../assets/p2.png";
import p3Url from "../../assets/p3.jpg";
import p4Url from "../../assets/p4.jpg";

const thumbs = [p2Url, p3Url, p4Url];

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
    resultUrl: "",
    selectedShapeName: ""
  };

  componentWillMount() {
    this.setState({
      resultUrl: getQueryString("imgUrl"),
      images: []
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize, true);
  }

  goTo = path => {
    this.props.history.push(path);
  };

  close = () => {};

  handleThumbClick = src => {
    this.setState({
      images: [
        ...this.state.images,
        {
          src,
          name: "image_" + Date.now()
        }
      ]
    });
  };

  handleResize = () => {
    this.forceUpdate();
  };

  handleStageMouseDown = e => {
    console.log(
      e.target.name(),
      e.target.getParent(),
      e.target.getStage(),
      "----------"
    );

    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: ""
      });
      return;
    }

    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    const image = this.state.images.find(i => i.name === name);
    if (image) {
      this.setState({
        selectedShapeName: name
      });
    } else {
      this.setState({
        selectedShapeName: ""
      });
    }
  };

  getImageStyle = stageWidth => {
    const width = stageWidth * 0.8;
    const left = stageWidth * 0.1;
    return {
      x: left,
      y: left,
      width,
      height: width
    };
  };

  render() {
    const { resultUrl, images, selectedShapeName } = this.state;
    const stageWidth = window.innerWidth * 0.8;

    return (
      <div className="page">
        <div className="body" style={s.body}>
          <div className="stage">
            <Cropper
              width={stageWidth}
              height={stageWidth}
              selectKey={selectedShapeName}
              onTouchStart={this.handleStageMouseDown}
            >
              <Cropper.Image
                key="backgroundImage"
                draggable={false}
                src={resultUrl}
                width={stageWidth}
              />
              {images.map((image, index) => (
                <Cropper.Image
                  name={image.name}
                  key={image.name + index}
                  draggable={true}
                  width={stageWidth * 0.6}
                  src={image.src}
                />
              ))}
            </Cropper>
          </div>
        </div>
        <Thumbs items={thumbs} onClick={this.handleThumbClick} />
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
