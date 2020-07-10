class Node {
  _nodeID;
  _nodeContent;
  _nodeContentPath;

  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['content'] !== undefined ? this.Content = options['content'] : this.Content = undefined;
      options['contentPath'] !== undefined ? this.ContentPath = options['contentPath'] : this.ContentPath = undefined;
    }
  }

  get ID() { return this._nodeID; }
  set ID(value) { this._nodeID = value; }

  get Content() { return this._nodeContent; }
  set Content(value) { this._nodeContent = value; }

  get ContentPath() { return this._nodeContentPath; }
  set ContentPath(value) { this._nodeContentPath = value; }
}

module.exports = Node;
