class Content {
  _objectID;
  _documentName;
  _documentContent;

  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['content'] !== undefined ? this.Content = options['content'] : this.Content = undefined;
    }
  }

  get ID() { return this._objectID; }
  set ID(value) { this._objectID = value; }

  get Name() { return this._documentName; }
  set Name(value) { this._documentName = value; }

  get Content() { return this._documentContent; }
  set Content(value) { this._documentContent = value; }
}

module.exports = Content
