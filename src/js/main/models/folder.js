class Folder {
  folderID;
  folderName;
  folderType;
  folderPath;
  folderHierarchy = [];

  constructor(id, name, type, path) {
    this.folderID = id;
    this.folderName = name;
    this.folderType = type;
    this.folderPath = path;
    this.folderHierarchy = [];
  }

  getID() {
    return this.folderID;
  }

  setID(folderID) {
    this.folderID = folderID;
  }

  getName() {
    return this.folderName;
  }

  setName(folderName) {
    this.folderName = folderName;
  }

  getType() {
    return this.folderType;
  }

  setType(folderType) {
    this.folderType = folderType;
  }

  getPath() {
    return this.folderPath;
  }

  setPath(folderPath) {
    this.folderPath = folderPath;
  }

  getHierarchy() {
    return this.folderHierarchy;
  }

  setHierarchy(folderHierarchy) {
    this.folderHierarchy = folderHierarchy;
  }
}

module.exports = Folder
