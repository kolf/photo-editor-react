import React, { Component } from "react";
import axios from "axios";
import localforage from "localforage";
import { createObjectURL, canvasToBlob, dataURLToBlob } from "blob-util";

import { getQueryString, uid } from "../utils";

import Footer from "../components/Footer";
import Cropper from "../components/Cropper";

import Transformer from "../components/Transformer";

import imageIcon from "../assets/image.gif";
import textIcon from "../assets/text.gif";

const API_ROOT = "http://gold.dreamdeck.cn";
const FooterItem = Footer.Item;

const footers = [
  {
    text: "图片",
    path: "/photo/editor-image",
    icon: imageIcon
  },
  {
    text: "文字",
    path: "/photo/editor-text",
    icon: textIcon
  }
];
class Home extends Component {
  state = {
    imageMap: new Map(),
    activeKey: "",
    stageWidth: 1,
    stage: {
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      initScale: 1
    }
  };

  defaultStage = null;

  componentDidMount() {
    const stageWidth = Math.min(window.innerWidth, 640) * 0.8;
    this.defaultStage = {
      ...this.state.stage,
      x: stageWidth / 2,
      y: stageWidth / 2,
      offset: {
        x: stageWidth / 2,
        y: stageWidth / 2
      }
    };
    this.setState({
      stageWidth,
      stage: {
        ...this.defaultStage
      }
    });
    this.initStage();
  }

  loadScrUrl = () => {
    const imgId = getQueryString("getQueryString") || "img01";

    return axios
      .get(`${API_ROOT}/mc/app/read/v1/base/box/img/info?imgId=${imgId}`)
      .then(
        res => `${API_ROOT}/app/icons${res.data.object.baseBoxImgInfo.imgPath}`
      );
  };

  initStage = async () => {
    const { imageMap } = this.state;
    const stageKey = await localforage.getItem("stageKey"); // 保存并发布后清除
    let stageJson = await localforage.getItem("stageJson");

    if (typeof stageJson === "string") {
      stageJson = JSON.parse(stageJson);
    }

    if (stageJson && stageKey) {
      const images = (stageJson.children[0] || {}).children || [];

      for (const { attrs } of images) {
        const key = attrs.uid;
        if (!/bg|image|text/g.test(key)) {
          break;
        }
        const rotation = attrs.rotation || 0;
        imageMap.set(key, {
          ...attrs,
          rotation,
          uid: key
        });
      }
    } else {
      const srcUrl = await this.loadScrUrl();
      this.push({
        src: srcUrl
      });
    }
    if (imageMap.size > 0) {
      this.setState(
        { imageMap, activeKey: [...imageMap.keys()][0] },
        this.saveStage
      );
    }
  };

  push = ({ src }) => {
    const { stageWidth, imageMap } = this.state;
    const key = uid.get("bg-");

    imageMap.set(key, {
      x: stageWidth / 2,
      y: stageWidth / 2,
      maxWidth: stageWidth,
      maxHeight: stageWidth,
      scaleX: 1,
      scaleY: 1,
      rotation: 0,
      src,
      uid: key
    });
  };

  saveStage = e => {
    if (this.stageRef) {
      const stageJson = this.stageRef.getStage().toJSON();
      localforage.setItem("stageJson", stageJson);
      localforage.setItem("stageKey", Date.now());
    }
  };

  onUpload = e => {
    this.updateStage(
      {
        ...this.defaultStage,
        x: 0,
        y: 0,
        offset: {
          x: 0,
          y: 0
        }
      },
      () => {
        const blob = dataURLToBlob(this.stageRef.getStage().toDataURL());

        axios
          .post(`${API_ROOT}/mc/app/write/v1/base/img/edit/upload`, blob, {
            headers: { "content-type": "multipart/form-data" }
          })
          .then(res => {
            console.log(res, "res");
          });

        // console.log();
        // canvasToBlob(this.stageRef, "image/png").then(blob => {
        //   console.log(blob);
        // });
      }
    );
  };

  handlePressMove = e => {
    const { stage } = this.state;

    this.updateStage({
      x: e.deltaX + stage.x,
      y: e.deltaY + stage.y
    });
  };

  handlePinch = e => {
    const { stage } = this.state;
    const scale = e.zoom * stage.initScale;

    this.updateStage({
      scaleX: scale,
      scaleY: scale
    });
  };

  handleRotate = e => {
    const { stage } = this.state;

    this.updateStage({
      rotation: e.angle + stage.rotation
    });
  };

  hanleMultipointStart = e => {
    const { stage } = this.state;

    this.updateStage({
      initScale: stage.scaleX || 1
    });
  };

  updateStage = (props, callback) => {
    this.setState(
      {
        stage: {
          ...this.state.stage,
          ...props
        }
      },
      () => {
        callback && callback();
      }
    );
  };

  render() {
    const { imageMap, stageWidth, stage } = this.state;
    const images = [...imageMap.values()];

    if (images.length === 0) {
      return <div className="page" />;
    }

    return (
      <div className="page">
        <div className="body">
          <div className="stage">
            <Transformer
              onMultipointStart={this.hanleMultipointStart}
              onPinch={this.handlePinch}
              onPressMove={this.handlePressMove}
              onRotate={this.handleRotate}
            >
              <Cropper
                layerProps={{
                  ...stage
                }}
                style={{ background: "#333" }}
                stageRef={f => (this.stageRef = f)}
                width={stageWidth}
              >
                {images.map(image => {
                  const key = image.uid;
                  return /image|bg/.test(key) ? (
                    <Cropper.Image key={key} {...image} center />
                  ) : (
                    <Cropper.Text key={key} {...image} />
                  );
                })}
              </Cropper>
            </Transformer>
            <div className="save-btn">
              <span onClick={this.onUpload}>保存并上传</span>
            </div>
          </div>
        </div>

        <Footer>
          {footers.map((f, i) => (
            <FooterItem key={f.path + i} icon={f.icon} path={`${f.path}`}>
              {f.text}
            </FooterItem>
          ))}
        </Footer>
      </div>
    );
  }
}

export default Home;
