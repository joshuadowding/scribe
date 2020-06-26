class Project {
  constructor(options) {
    if (options !== undefined) {
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['author'] !== undefined ? this.Author = options['author'] : this.Author = undefined;
      options['filePath'] !== undefined ? this.FilePath = options['filePath'] : this.FilePath = undefined;
      options['projectPath'] !== undefined ? this.ProjectPath = options['projectPath'] : this.ProjectPath = undefined;
      options['hierarchy'] !== undefined ? this.Hierarchy = options['hierarchy'] : this.Hierarchy = [];
    }
  }

  get Name() { return this.projectName; }
  set Name(value) { this.projectName = value; }

  get Author() { return this.projectAuthor; }
  set Author(value) { this.projectAuthor = value; }

  get FilePath() { return this.projectFilePath; }
  set FilePath(value) { this.projectFilePath = value; }

  get ProjectPath() { return this.projectPath; }
  set ProjectPath(value) { this.projectPath = value; }

  get Hierarchy() { return this.projectHierarchy; }
  set Hierarchy(value) { this.projectHierarchy = value; }
}

module.exports = Project
