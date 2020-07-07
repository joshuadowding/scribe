const React = require('react');

class ItemComponent extends React.Component {
  create(key, item) {
    return (
      <div key={ key } data-id={ item.id } className={`item item-${ item.type }`}>
        { item.hierarchy ?
          <span><i className="ri-folder-line" />{ item.name }</span> :
          <span><i className="ri-file-line" />{ item.name }</span>
        }
      </div>
    );
  }
  
  render() {
    let items = this.props.items;
    let data = items.map((item, index) => {
      if (item.hierarchy && item.hierarchy.length > 0) { // It's a folder.
        return (
          <div className={"item-expand"}>
            { item.hierarchy.map((child, key) => {
              if (child.hierarchy && child.hierarchy.length > 0) {
                return <ItemComponent items={ child.hierarchy } /> // Recurse
              } else {
                return this.create(key, child);
              }
            })}
          </div>
        );
      } else { // It's a document.
        return this.create(index, item);
      }
    });

    return <div>{ data }</div>;
  }
}

module.exports = { ItemComponent }
