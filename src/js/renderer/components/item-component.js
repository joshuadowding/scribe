const React = require('react');

class ItemComponent extends React.Component {
  render() {
    let items = this.props.items;
    let data = items.map((item, index) => (
      <div className={`${ item.hierarchy ? "item-expand" : `item item-${ item.type }`}`}>
        { item.hierarchy ?
          <div key={ index } data-id={ item.id } className={`item item-${ item.type }`}>
            <span><i className="ri-folder-line" />{ item.name }</span>
          </div>
          : <span><i className="ri-file-line" />{ item.name }</span>
        }

        { item.hierarchy ? item.hierarchy.map((child, i) => {
          if (child.hierarchy && child.hierarchy.length > 0) {
            return <ItemComponent items={ child.hierarchy } /> // Recurse
          } else {
            return (
              <div key={ i } data-id={ child.id } className={`item item-${ child.type }`}>
                { child.name }
              </div>
            )
          }
        }) : null }
      </div>
    ));
    return <div>{ data }</div>;
  }
}

module.exports = { ItemComponent }
