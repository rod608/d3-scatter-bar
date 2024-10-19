import { Component } from "react";
import * as d3 from "d3";
import "./App.css";

import Child1 from "./components/Child1";
import Child2 from "./components/Child2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    let self = this;

    d3.csv(import.meta.env.BASE_URL + "tips.csv").then((csv_data) => {
      self.setState({ data: csv_data });
      // console.log(csv_data);
    });
  }

  render() {
    return (
      <>
        <Child1 data={this.state.data} />
        <Child2 data={this.state.data} />
      </>
    );
  }
}

export default App;
