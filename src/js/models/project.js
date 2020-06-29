class Project {
  _projectName;
  _projectAuthor;
  _projectFilePath;
  _projectPath;
  _projectHierarchy;

  constructor(options) {
    if (options !== undefined) {
      options['name'] !== undefined ? this.Name = options['name'] : this.Name = undefined;
      options['author'] !== undefined ? this.Author = options['author'] : this.Author = undefined;
      options['filePath'] !== undefined ? this.FilePath = options['filePath'] : this.FilePath = undefined;
      options['projectPath'] !== undefined ? this.ProjectPath = options['projectPath'] : this.ProjectPath = undefined;
      options['hierarchy'] !== undefined ? this.Hierarchy = options['hierarchy'] : this.Hierarchy = [];
    }
  }

  get Name() { return this._projectName; }
  set Name(value) { this._projectName = value; }

  get Author() { return this._projectAuthor; }
  set Author(value) { this._projectAuthor = value; }

  get FilePath() { return this._projectFilePath; }
  set FilePath(value) { this._projectFilePath = value; }

  get ProjectPath() { return this._projectPath; }
  set ProjectPath(value) { this._projectPath = value; }

  get Hierarchy() { return this._projectHierarchy; }
  set Hierarchy(value) { this._projectHierarchy = value; }
}

module.exports = Project
