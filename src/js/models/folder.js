class Folder {
  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['type'] !== undefined ? this.Type = options['type'] : this.Type = undefined;
      options['path'] !== undefined ? this.Path = options['path'] : this.Path = undefined;
      options['hierarchy'] !== undefined ? this.Hierarchy = options['hierarchy'] : this.Hierarchy = [];
    }
  }

  get ID() { return this.folderID; }
  set ID(value) { this.folderID = value; }

  get Name() { return this.folderName; }
  set Name(value) { this.folderName = value; }

  get Type() { return this.folderType; }
  set Type(value) { this.folderType = value; }

  get Path() { return this.folderPath; }
  set Path(value) { this.folderPath = value; }

  get Hierarchy() { return this.folderHierarchy; }
  set Hierarchy(value) { this.folderHierarchy = value; }
}

module.exports = Folder
