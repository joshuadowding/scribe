class Document {
  _objectType;
  _documentID;
  _documentName;
  _documentType;
  _documentPath;

  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['type'] !== undefined ? this.Type = options['type'] : this.Type = undefined;
      options['path'] !== undefined ? this.Path = options['path'] : this.Path = undefined;
      this.ObjectType = 'File';
    }
  }

  get ObjectType() { return this._objectType; }
  set ObjectType(value) { this._objectType = value; }

  get ID() { return this._documentID; }
  set ID(value) { this._documentID = value; }

  get Name() { return this._documentName; }
  set Name(value) { this._documentName = value; }

  get Type() { return this._documentType; }
  set Type(value) { this._documentType = value; }

  get Path() { return this._documentPath; }
  set Path(value) { this._documentPath = value; }
}

module.exports = Document
