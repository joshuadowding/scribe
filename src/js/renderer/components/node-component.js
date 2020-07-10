const React = require('react');

class NodeComponent extends React.Component {
  create(key, node) {
    return (
      <div key={ key } className={`node`}>
        <span className={`node-content`}>{ node._nodeContent }</span>
      </div>
    );
  }

  build(nodes) {
    return nodes.map((node, index) => {
      console.log(node);
      return this.create(index, node);
    });
  }

  render() {
    let nodes = this.props.nodes;
    let data = this.build(nodes);
    return <div className={'content-inner'}>{ data }</div>;
  }
}

module.exports = { NodeComponent }
