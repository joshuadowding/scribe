class Folder {
  _objectType;
  _folderID;
  _folderName;
  _folderType;
  _folderPath;
  _folderHierarchy;

  constructor(options) {
    if (options !== undefined) {
      options['id'] !== undefined ? this.ID = options['id'] : this.ID = undefined;
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['type'] !== undefined ? this.Type = options['type'] : this.Type = undefined;
      options['path'] !== undefined ? this.Path = options['path'] : this.Path = undefined;
      options['hierarchy'] !== undefined ? this.Hierarchy = options['hierarchy'] : this.Hierarchy = [];
      this.ObjectType = 'Folder';
    }
  }

  get ObjectType() { return this._objectType; }
  set ObjectType(value) { this._objectType = value; }

  get ID() { return this._folderID; }
  set ID(value) { this._folderID = value; }

  get Name() { return this._folderName; }
  set Name(value) { this._folderName = value; }

  get Type() { return this._folderType; }
  set Type(value) { this._folderType = value; }

  get Path() { return this._folderPath; }
  set Path(value) { this._folderPath = value; }

  get Hierarchy() { return this._folderHierarchy; }
  set Hierarchy(value) { this._folderHierarchy = value; }
}

module.exports = Folder
