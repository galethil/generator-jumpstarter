var Generator = require('../../common/generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.subgenerator = 'frontend';
    this.opts = opts;
    this.rootAnswers = opts.answers;
  }

  initializing() {
    this.log('Frontend setup');
  }

  async prompting() {

    await this.question({
      type: 'input',
      name: 'folderName',
      message: 'What is folder name for frontend?'
    });

    await this.question({
      type: 'confirm',
      message: 'Would you like to use typescript?',
      name: 'typescript',
      default: true
    });

    await this.question({
      type: 'list',
      name: 'uiFramework',
      message: 'What UI framework do you want to use?',
      choices: [
        { name:'Material UI', value:'materialUi'},
        { name:'Semantic UI', value:'semanticUi'},
        { name:'Bootstrap', value:'bootstrap'},
      ]
    });

    await this.question({
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager do you want to use?',
      choices: [
        { name:'Npm', value:'npm'},
        { name:'Yarn', value:'yarn'},
      ]
    });

    await this.question({
      type: 'confirm',
      message: 'Do you want to use recommended settings regarding eslint, prettier, etc.?',
      name: 'codeStyleDefaults',
      default: true
    });
  }

  async writingConfigFile() {
    const mainPath = `${this.destinationRoot()}/`;
    this.fs.extendJSON(`${mainPath}generator.config.json`, { frontendDetails: this.answers });
  }

  async writing() {
    const templateDirs = {
      'React': 'react',
      'Angular': 'angular',
      'Vuejs': 'vue'
    };
    switch (this.rootAnswers.feFramework) {
      case 'React':
        const options = ['react-app', this.answers.folderName];
        if (this.answers.typescript === true) {
          options.push('--template', 'typescript');
        }

        if (this.answers.packageManager === 'npm') {
          this.spawnCommandSync('npm', ['init', ...options]);
        } else if (this.answers.packageManager === 'yarn') {
          this.spawnCommandSync('yarn', ['create', ...options]);
        }

      break;
      default:

    }
    // if (templateDirs[opts.feFramework]) {
    //   this.fs.copy(
    //     this.templatePath(`templates/${templateDirs[opts.feFramework]}`),
    //     this.destinationPath(`./${this.answers.folderName}`)
    //   );
    // }
    // const mainPath = `${this.destinationRoot()}/${this.answers.folderName}/`;
    // this.fs.write(`${mainPath}test.js`, 'content');


  }

};
