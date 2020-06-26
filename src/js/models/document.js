class Document {
  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['type'] !== undefined ? this.Type = options['type'] : this.Type = undefined;
      options['path'] !== undefined ? this.Path = options['path'] : this.Path = undefined;
    }
  }

  get ID() { return this.documentID; }
  set ID(value) { this.documentID = value; }

  get Name() { return this.documentName; }
  set Name(value) { this.documentName = value; }

  get Type() { return this.documentType; }
  set Type(value) { this.documentType = value; }

  get Path() { return this.documentPath; }
  set Path(value) { this.documentPath = value; }
}

module.exports = Document
