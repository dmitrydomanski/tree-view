import React, { Component } from 'react';
import * as d3 from "d3";
import * as data from '../../data/data.json'

class FamilyTree extends Component {

  state = {
    data: data,
    paths: null,
    nodes: null
  }

  componentDidMount() {
    const width = 800, height = 800;

    const tree = d3.tree().size([height, width - 160]);
    // const stratify = d3.stratify().id((d) => {
    //   return d.name;
    // }).parentId((d) => {
    //   return d.parent;
    // });
    // const root = stratify(this.state.data)
    //   .sort((a, b) => {
    //     return (a.height - b.height) || a.id.localeCompare(b.id);
    //   });

    const root = d3.hierarchy(this.state.data);
    this.setState({ paths: tree(root).links() });
    // this.setState({ paths: root.links() });   
    this.setState({ nodes: root.descendants() })
  }

  render() {
    let paths = this.state.paths && this.state.paths.map(item => {
      let d = d3
        .linkHorizontal()
        .x((d) => {
          return d.y;
        })
        .y((d) => {
          return d.x;
        });
      return <path
        fill="none"
        stroke="#97a6ff"
        strokeWidth="2px"
        className='link' d={d(item)} />
    })

    let nodes = this.state.nodes && this.state.nodes.map((node, i) => {
      return <g key={node.id} className={"node" + node.children ? " node--internal" : " node--leaf"}
        transform={ `translate(${node.y}, ${node.x})` }>
        <circle r="10" style={{ fill: node.children ? 'lightsteelblue' : 'red' }} />
        <text y="0" dy="0" textAnchor="middle"
          style={{ 'fillOpacity': 1 }}>{node.name}</text>
      </g>
    })
    return (
      <svg className="tree-chart-basic" ref={(r) => this.chartRf = r} style={{ width: '800px', height: '800px' }}>
        <g transform='translate(20,20)'>
          {nodes}
          {paths}
        </g>
      </svg>
    );
  }

}

export default FamilyTree;