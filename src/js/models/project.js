class Project {
  projectName;
  projectAuthor;
  projectPath;
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

  getHierarchy() {
    return this.projectHierarchy;
  }

  setHierarchy(projectHierarchy) {
    this.projectHierarchy = projectHierarchy;
  }
}

module.exports = Project
