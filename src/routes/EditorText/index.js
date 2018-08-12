import React, { Component } from "react";
import { getQueryString } from "../../utils";
import Footer from "../../components/Footer";
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
];

const texts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Stage = ({ imgUrl }) => {
  return (
    <div className="body" style={s.body}>
      <div className="stage">
        <img className="origin js-result" src={imgUrl} alt="Kolf" />
      </div>
    </div>
  );
};

const Colors = ({ onChange, value }) => {
  return (
    <div className="colors">
      <ul className="clearfix" style={{ width: colors.length + "rem" }}>
        {colors.map(c => (
          <li
            key={c}
            onClick={e => onChange(c)}
            className={value === c ? "active" : null}
            style={{ background: "#" + c }}
          />
        ))}
      </ul>
    </div>
  );
};

const Texts = ({ onChange, value }) => {
  return (
    <div className="texts">
      <ul className="clearfix" style={{ width: texts.length * 3 + "rem" }}>
        {texts.map((c, index) => (
          <li
            key={index + c}
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

const Input = ({ onChange }) => {
  return (
    <div className="input">
      <input
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
    fontFamliay: "",
    text: ""
  };

  componentWillMount() {
    this.setState({
      resultUrl: getQueryString("imgUrl")
    });
  }

  changeColor = color => {
    this.setState({ color });
  };

  changeText = text => {
    this.setState({ text });
  };

  changeFontFamliay = fontFamliay => {
    this.setState({ fontFamliay });
  };

  goTo = path => {
    this.props.history.push(path);
  };

  close = () => {};

  addText = () => {
    const { text, color, fontFamliay } = this.state;
    if (!text) {
      alert("请输入文字！");
      return;
    }
    if (!color) {
      alert("请选择颜色！");
      return;
    }
    if (!fontFamliay) {
      alert("请选择字体！");
      return;
    }
  };

  render() {
    const { resultUrl, color, fontFamliay } = this.state;
    return (
      <div className="page">
        <Stage imgUrl={resultUrl} />
        <div className="text-root">
          <Input onChange={this.changeText} />
          <Colors onChange={this.changeColor} value={color} />
          <Texts onChange={this.changeFontFamliay} value={fontFamliay} />
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
    paddingBottom: "5rem",
    transition: ".2 all"
  }
};

export default EditorText;
