//This method will use d3 to render
//pass in ref to a node
//data = array of objects { symbol: MSFT, type: series, values: [{date: "2017=01=41" ...Other data}] }
import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';



export default class LineChart extends Component {
  static propTypes = {
    // data: PropTypes.array.isRequired,
  }

  state = {
    drawing: false,
    currData: [],
  };

  dataPoints = [1,2,3];

  componentWillMount() {
    this.createLineChart = this.createLineChart.bind(this);
  }

  componentDidMount() {
    this.createLineChart();
    // d3.select(this.node).on('mousemove', this.listen.bind(this));

    //need to use bind b/c d3.select().on binds an object to listen
    d3.select(this.node).on('mousedown', this.listen.bind(this));

  }

  // bindSetState(obj) {
  //   this.setState({...obj});
  // }

  listen() {
    this.setState({drawing: true}, () => {
      this.path = this.svg
        .append('path')
        .data([this.state.currData])
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'black')
        .attr('d', this.line);
      console.log('listen state', this.state.currData);
        // console.log('d3.mouse is', d3.mouse(this.node));
        if (d3.event.type === 'mousedown') {
          d3.select(this.node).on("mousemove", this.onMove.bind(this));
        } else {
          d3.select(this.node).on("touchmove", this.onMove.bind(this));
        }
    });
  }

  onMove() {
    let point, type = d3.event.type;

    if (type === 'mousemove') {
      point = d3.mouse(this.node);
      // console.log('POINT IS', point)
    } else { //only single touch input
      point = d3.touches(this.node)[0];
      // console.log('Point is touch', point);
    }

    let obj = { x: point[0], y: point[1] };
    this.setState({currData: this.state.currData.concat([obj]) });
    console.log('on Move ts', this.state.currData);
    this.tick();
  }

  tick() {
    let line = this.line;
    console.log('tick linse', this.path);
    this.path.attr('d', (d) => {
      console.log('Here is d', d);
      return this.line(this.state.currData);
    });
  }

  line = d3.line()
    .x((d, i) => d.x )
    .y((d, i) => d.y );

  

  createLineChart() {
    const node = this.node;
    const data = this.props.data;
    let yMax, yMin, xMax, xMin;

    var width = this.props.width, height = this.props.height;

    this.svg = d3.select(node)
      .append('g');

    var bordercolor = 'black';
    var border = 1;
    var borderPath = this.svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", height)
      .attr("width", width)
      .style("stroke", bordercolor)
      .style("fill", "none")
      .style("stroke-width", border);
  


  }

  render() {
    const { height, width } = this.props;
    // console.log('State currData', this.state.currData);
    return (<svg 
              ref={node => this.node = node} 
              width={width} height={height}
              style={{margin: '10px'}}
            >
            </svg>);
  }

}