var Generator = require('yeoman-generator');
const { prompt } = require('enquirer');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  initializing() {

  }

  async prompting() {
    const response = await prompt({
      type: 'input',
      name: 'username',
      message: 'What is your username?'
    });
  }

  writing() {

  }

  install() {

  }

  end() {

  }
};
