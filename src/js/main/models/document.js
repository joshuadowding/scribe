class Document {
  _objectType;
  _objectID;
  _documentName;
  _documentType;
  _documentPath;
  _documentNodes;

  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['type'] !== undefined ? this.Type = options['type'] : this.Type = undefined;
      options['path'] !== undefined ? this.Path = options['path'] : this.Path = undefined;
      options['nodes'] !== undefined ? this.Nodes = options['nodes'] : this.Nodes = [];
      this.ObjectType = 'File';
    }
  }

  get ObjectType() { return this._objectType; }
  set ObjectType(value) { this._objectType = value; }

  get ID() { return this._objectID; }
  set ID(value) { this._objectID = value; }

  get Name() { return this._documentName; }
  set Name(value) { this._documentName = value; }

  get Type() { return this._documentType; }
  set Type(value) { this._documentType = value; }

  get Path() { return this._documentPath; }
  set Path(value) { this._documentPath = value; }

  get Nodes() { return this._documentNodes; }
  set Nodes(value) { this._documentNodes = value; }
}

module.exports = Document
