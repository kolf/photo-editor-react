import React, { Component } from "react";
import { Stage, Layer, Image, Transformer, Text } from "react-konva";

class TransformerComponent extends React.Component {
  componentDidMount() {
    this.onClick();
  }
  componentDidUpdate() {
    this.onClick();
  }
  onClick() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;

    const selectedNode = stage.findOne("." + selectedShapeName);

    if (selectedNode === this.transformer.node()) {
      return;
    }

    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
        }}
      />
    );
  }
}

class DragImage extends React.Component {
  state = {
    image: new window.Image()
  };
  componentDidMount() {
    this.state.image.src = this.props.src;
    this.state.image.onload = () => {
      this.imageNode.getLayer().batchDraw();
    };
  }

  handleTransform = () => {};

  render() {
    return (
      <Image
        {...this.props}
        height={this.props.width}
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}

class Cropper extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.handleResize, true);
  }

  handleResize = () => {
    this.forceUpdate();
  };

  render() {
    const { children, selectKey } = this.props;
    console.log(selectKey);

    return (
      <Stage {...this.props}>
        <Layer>
          {children}
          <TransformerComponent selectedShapeName={selectKey} />
        </Layer>
      </Stage>
    );
  }
}

Cropper.Image = DragImage;
Cropper.Text = Text;

export default Cropper;
