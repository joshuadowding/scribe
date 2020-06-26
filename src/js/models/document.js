class Document {
  documentID;
  documentName;
  documentType;
  documentPath;

  constructor() {}

  getID() {
    return this.documentID;
  }

  setID(documentID) {
    this.documentID = documentID;
  }

  getName() {
    return this.documentName;
  }

  setName(documentName) {
    this.documentName = documentName;
  }

  getType() {
    return this.documentType;
  }

  setType(documentType) {
    this.documentType = documentType;
  }

  getPath() {
    return this.documentPath;
  }

  setPath(documentPath) {
    this.documentPath = documentPath;
  }
}

module.exports = Document
