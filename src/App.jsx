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

    d3.csv("/tips.csv")
      .then((csv_data) => {
        console.log("Loaded CSV data:", csv_data); 
        self.setState({ data: csv_data });
      })
      .catch((error) => {
        console.error("Error loading CSV data:", error); 
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
