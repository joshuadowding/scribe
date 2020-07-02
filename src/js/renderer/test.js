module.exports = { init }

const React = require('react');
const ReactDOM = require('react-dom');

const { Item } = require('../components/item');

function init(data) {
  ReactDOM.render(<Item items={data} />, document.getElementById('item-list'));
}
