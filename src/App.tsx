import React from 'react';
import logo from './logo.svg';
import './App.scss';
import * as d3 from 'd3';

interface IProps {
}

interface IState {
}

class App extends React.Component<IProps, IState> {
  ref!: SVGSVGElement;

  private buildGraph(data: Array<number>) {
    const width = 200,
      scaleFactor = 10,
      barHeight = 20;

    const graph = d3.select(this.ref)
      .attr("transform","rotate(-90)")
      .attr("width", width)
      .attr("height", barHeight * data.length);

    const bar = graph.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
      });

    bar.append("rect")
      .attr("width", function (d) {
        return d * scaleFactor;
      })
      .attr("height", barHeight - 1);

    bar.append("text")
      .attr("x", function (d) {
        return (d * scaleFactor);
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) {
        return d;
      });

  }

  componentDidMount() {
    this.buildGraph([5, 10, 12, 20, 15 , 11, 9])
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <code> Graph: </code>
            <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width="100" height="100"/>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
