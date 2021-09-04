import React from "react";

class MiniChart extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js";
    script.async = false;
    script.innerHTML = JSON.stringify({
      symbol: this.props.name,
      colorTheme: "dark",
      isTransparent: false,
      locale: "uk",
    });
    this.myRef.current.appendChild(script);
  }

  render() {
    return (
      <div className="tradingview-widget-container" ref={this.myRef}></div>
    );
  }
}

export default MiniChart;
