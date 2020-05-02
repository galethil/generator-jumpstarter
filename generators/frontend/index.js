var Generator = require('../../common/generator');

const { prompt } = require('../../common/helpers');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.name = 'frontend';
  }

  initializing() {
    this.log('Frontend setup');
  }

  async prompting() {

    await this.prompt({
      type: 'input',
      name: 'projectName',
      message: 'What is folder name for frontend?'
    });

    await this.prompt({
      type: 'confirm',
      message: 'Would you like to use typescript?',
      name: 'typescript',
      default: true
    });

    await this.prompt({
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

};
