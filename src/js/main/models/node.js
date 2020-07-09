class Node {
  _nodeID;
  _nodeContent;

  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['content'] !== undefined ? this.Content = options['content'] : this.Content = undefined;
    }
  }

  get ID() { return this._nodeID; }
  set ID(value) { this._nodeID = value; }

  get Content() { return this._nodeContent; }
  set Content(value) { this._nodeContent = value; }
}

module.exports = Node;
