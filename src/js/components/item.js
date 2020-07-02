const React = require('react');

class Item extends React.Component {
  render() {
    let items = this.props.items;
    let data = items.map((item) => <div data-id={item.id} className={`item item-${item.type}`}>{item.name}</div>)

    return (<div>{data}</div>);
  }
}

module.exports = { Item }
