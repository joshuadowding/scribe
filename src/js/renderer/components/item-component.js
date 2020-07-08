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

  iterate(item) {
    return item.hierarchy.map((child, key) => {
      if (child.hierarchy && child.hierarchy.length > 0) {
        return (<div className={"item-expand"}>{ this.create(key, child) }{ this.iterate(child) }</div>);
      } else {
        return this.create(key, child);
      }
    });
  }

  build(items) {
    return items.map((item, index) => {
      if (item.hierarchy && item.hierarchy.length > 0) {
        return (<div className={"item-expand"}>{ this.create(index, item) }{ this.iterate(item) }</div>);
      } else {
        return this.create(index, item);
      }
    });
  }

  render() {
    let items = this.props.items;
    let data = this.build(items);
    return <div className={'list-inner'}>{ data }</div>;
  }
}

module.exports = { ItemComponent }
