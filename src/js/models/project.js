class Project {
  projectName;
  projectAuthor;
  projectPath;
  projectFilePath;
  projectHierarchy;

  constructor() {}

  getName() {
    return this.projectName;
  }

  setName(projectName) {
    this.projectName = projectName;
  }

  getAuthor() {
    return this.projectAuthor;
  }

  setAuthor(projectAuthor) {
    this.projectAuthor = projectAuthor;
  }

  getPath() {
    return this.projectPath;
  }

  setPath(projectPath) {
    this.projectPath = projectPath;
  }

  getFilePath() {
    return this.projectFilePath;
  }

  setFilePath(projectFilePath) {
    this.projectFilePath = projectFilePath;
  }

  getHierarchy() {
    return this.projectHierarchy;
  }

  setHierarchy(projectHierarchy) {
    this.projectHierarchy = projectHierarchy;
  }
}

module.exports = Project
