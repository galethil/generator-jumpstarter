var Generator = require('../../common/generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.subgenerator = 'frontend';
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
  }

  async writing() {
    const mainPath = `${this.destinationRoot()}/${this.answers.folderName}/`;
    this.fs.write(`${mainPath}test.js`, 'content');

  }

};
