const React = require('react');

class Item extends React.Component {
  render() {
    let items = this.props.items;
    let data = items.map((item, index) => (
      <div className={`${ item.hierarchy ? "item-expand" : `item item-${ item.type }`}`}>
        { item.hierarchy ?
          <div key={ index } data-id={ item.id } className={`item item-${ item.type }`}>
            { item.name }
          </div>
          : item.name
        }

        { item.hierarchy ? item.hierarchy.map((c, i) => (
          <div key={ i } data-id={ c.id } className={`item item-${ c.type }`}>
            { c.name }
          </div>
        )) : null }
      </div>
    ));
    return (<div>{ data }</div>);
  }
}

module.exports = { Item }
