import React from "react";
import {Center, Divider, Flex} from "@chakra-ui/react";
import * as d3 from "d3";
import './dashboard.scss'

interface IProps {
}

interface IState {
}

export class Dashboard extends React.Component<IProps, IState> {
  ref!: SVGSVGElement;

  private buildGraph(data: Array<number>) {
    const width = 200,
      scaleFactor = 10,
      barHeight = 20;

    const graph = d3.select(this.ref)
      .attr("transform", "rotate(-90)")
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
    this.buildGraph([5, 10, 12, 20, 15, 11, 9])
  }

  render() {
    return (
      <>
        <Flex h='100vh' backgroundColor='blackAlpha.200'>
          <Center w='100%' flexDir='column' mt={5}>
            <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width="100" height="100"/>
          </Center>
        </Flex>
        <Divider/>
      </>
    )
  }
}