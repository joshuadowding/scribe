class Document {
  documentID;
  documentName;
  documentAuthor;
  documentType;
  documentPath;

  constructor(id, name, author, type, path) {
    this.documentID = id;
    this.documentName = name;
    this.documentAuthor = author;
    this.documentType = type;
    this.documentPath = path;
  }

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

  getAuthor() {
    return this.documentAuthor;
  }

  setAuthor(documentAuthor) {
    this.documentAuthor = documentAuthor;
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
