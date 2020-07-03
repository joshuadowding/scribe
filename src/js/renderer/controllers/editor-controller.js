module.exports = { addItemToHierarchy, clearItemsInHierarchy }

const React = require('react');
const ReactDOM = require('react-dom');

const { Item } = require('../components/item');

function addItemToHierarchy(data, parent) {
  ReactDOM.render(<Item items={data} />, parent);
}

function clearItemsInHierarchy(parent) {
  ReactDOM.unmountComponentAtNode(parent);
}
