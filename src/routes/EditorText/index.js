import React, { Component } from "react";
import { getQueryString } from "../../utils";
import Footer from "../../components/Footer";
import Cropper from "../../components/Cropper";
import addTextUrl from "../../assets/addText.png";
import "./style.css";

const colors = [
  "fff45c",
  "fde800",
  "ffcb15",
  "ffa921",
  "ff691f",
  "c53f46",
  "d6004a",
  "ff1d6b",
  "ff4da9",
  "ff80c5",
  "ffb4ce",
  "f043ec",
  "c92cc5",
  "ab1ea8",
  "ddf56d",
  "b0f346",
  "6fe113",
  "87c943",
  "129527",
  "059d7f",
  "5feacb",
  "30d6ce",
  "3c41dd",
  "00589c",
  "4676d9",
  "4e99df",
  "5faaff",
  "3abcff",
  "70d8ff",
  "7d65e9",
  "5e45cd",
  "cccccc",
  "999999",
  "666666",
  "333333",
  "000000"
].map(c => "#" + c);

const fontFamilys = ["font1", "font2", "font3", "font4", "font5"];

const Colors = ({ onChange, value }) => {
  return (
    <div className="colors">
      <ul className="clearfix" style={{ width: colors.length + "rem" }}>
        {colors.map(c => (
          <li
            key={c}
            onClick={e => onChange(c)}
            className={value === c ? "active" : null}
            style={{ background: c }}
          />
        ))}
      </ul>
    </div>
  );
};

const Texts = ({ onChange, value }) => {
  return (
    <div className="texts">
      <ul
        className="clearfix"
        style={{ width: fontFamilys.length * 3 + "rem" }}
      >
        {fontFamilys.map((c, index) => (
          <li
            key={index + c}
            style={{
              fontFamily: c
            }}
            onClick={e => onChange(c)}
            className={value === c ? "active" : null}
          >
            金魔方
          </li>
        ))}
      </ul>
    </div>
  );
};

const Input = ({ onChange, value }) => {
  return (
    <div className="input">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="点击输入文字"
      />
    </div>
  );
};

class EditorText extends Component {
  state = {
    resultUrl: "",
    color: "",
    fontFamily: "",
    texts: [],
    text: ""
  };

  componentWillMount() {
    this.pushText();
    this.setState({
      resultUrl: getQueryString("imgUrl")
    });
  }

  changeColor = color => {
    const activeIndex = this.findActiveIndex();
    if (activeIndex !== -1) {
      this.updateText(activeIndex, {
        fill: color
      });
    }
    this.setState({ color });
  };

  changeText = text => {
    const activeIndex = this.findActiveIndex();
    if (activeIndex !== -1) {
      this.updateText(activeIndex, {
        text
      });
    }
    this.setState({ text });
  };

  changefontFamily = fontFamily => {
    const activeIndex = this.findActiveIndex();
    if (activeIndex !== -1) {
      this.updateText(activeIndex, {
        fontFamily
      });
    }
    this.setState({ fontFamily });
  };

  goTo = path => {
    this.props.history.push(path);
  };

  close = () => {};

  addText = () => {
    const { text, color, fontFamily } = this.state;
    if (!text) {
      alert("请输入文字！");
      return;
    }
    if (!color) {
      alert("请选择颜色！");
      return;
    }
    if (!fontFamily) {
      alert("请选择字体！");
      return;
    }
  };

  pushText = () => {
    const { texts } = this.state;
    this.setState({
      texts: [
        ...texts,
        {
          fill: colors[0],
          // fontFamily,
          text: "快来开启金魔方魔幻路程吧",
          name: "text_" + Date.now()
        }
      ]
    });
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
        activeKey: ""
      });
      return;
    }

    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    const name = e.target.name();
    const t = this.state.texts.find(i => i.name === name);
    if (t) {
      this.setState({
        activeKey: name
      });
    } else {
      this.setState({
        activeKey: ""
      });
    }
  };

  updateText = (index, newProps) => {
    const texts = this.state.texts.concat();
    texts[index] = {
      ...texts[index],
      ...newProps
    };

    this.setState({ texts });
  };

  findActiveIndex = () => {
    const { texts, activeKey } = this.state;
    return texts.findIndex(text => text.name === activeKey);
  };

  render() {
    const { resultUrl, color, fontFamily, activeKey, texts, text } = this.state;
    const stageWidth = window.innerWidth * 0.8;

    return (
      <div className="page">
        <div className="body" style={s.body}>
          <div className="stage">
            <Cropper
              width={stageWidth}
              height={stageWidth}
              selectKey={activeKey}
              onTouchStart={this.handleStageMouseDown}
            >
              <Cropper.Image
                key="backgroundImage"
                draggable={false}
                src={resultUrl}
                width={stageWidth}
              />
              {texts.map((text, index) => (
                <Cropper.Text
                  {...text}
                  fontSize={20}
                  key={text.name + index}
                  draggable={true}
                />
              ))}
            </Cropper>
          </div>
        </div>
        <div className="text-root">
          <div className="add">
            <span onClick={this.pushText}>
              <img src={addTextUrl} alt="添加" />
            </span>
          </div>
          <Input onChange={this.changeText} value={text} />
          <Colors onChange={this.changeColor} value={color} />
          <Texts onChange={this.changefontFamily} value={fontFamily} />
        </div>
        <Footer>
          <Footer.CancelIcon onClick={e => this.goTo("/home")} />
          <Footer.Title>文字</Footer.Title>
          <Footer.OkIcon onClick={this.addText} />
        </Footer>
      </div>
    );
  }
}

const s = {
  body: {
    paddingBottom: "7rem",
    transition: ".2 all"
  }
};

export default EditorText;
