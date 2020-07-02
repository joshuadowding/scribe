module.exports = { addItemToHierarchy }

const React = require('react');
const ReactDOM = require('react-dom');

const { Item } = require('../components/item');

function addItemToHierarchy(data, parent) {
  ReactDOM.render(<Item items={data} />, parent);
}
