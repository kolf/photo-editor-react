import React, { Component } from "react";
import "./style.css";
import Footer from "../../components/Footer";

import imgUrl from "../../assets/bg1.jpg";
import imageIcon from "../../assets/image.gif";
import textIcon from "../../assets/text.gif";

const FooterItem = Footer.Item;

const footers = [
  {
    text: "图片",
    path: "image",
    icon: imageIcon
  },
  {
    text: "文字",
    path: "text",
    icon: textIcon
  }
];

const Stage = ({ imgUrl }) => {
  return (
    <div className="body">
      <div className="stage">
        <img className="origin js-result" src={imgUrl} alt="Kolf"/>
      </div>
    </div>
  );
};

class Home extends Component {
  render() {
    return (
      <div className="page">
        <Stage imgUrl={imgUrl} />
        <Footer>
          {footers.map(f => (
            <FooterItem
              key={f.path + f.icon}
              icon={f.icon}
              path={f.path + "?imgUrl=" + imgUrl}
            >
              {f.text}
            </FooterItem>
          ))}
        </Footer>
      </div>
    );
  }
}

export default Home;
