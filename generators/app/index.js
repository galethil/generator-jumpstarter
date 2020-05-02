var Generator = require('yeoman-generator');
const inquirer = require('inquirer');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag

    this.answers = {};

    this.storeAnswer = (answerObject, modifierFunction) => {
      Object.keys(answerObject).forEach((answerKey) => {
        if (modifierFunction) {
          answerObject[answerKey] = modifierFunction(answerObject[answerKey]);
        }

        this.answers = { ...this.answers, ...answerObject };
      });
    };
  }

  initializing() {

  }

  async prompting() {
    this.storeAnswer(await inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?'
    }));


    this.storeAnswer(await inquirer.prompt({
      type: 'list',
      name: 'frontend',
      message: 'Pick a frontend that you will use',
      choices: ['React', 'Angular', 'Vuejs', 'other', 'no frontend']
    }));

    this.storeAnswer(await inquirer.prompt({
      type: 'input',
      name: 'backendServicesCount',
      message: 'How many backend services will you use?',
      validate: (value) => {
        if (!value.match(/^[0-9]$/i)) {
          return 'Please input a number between 0-9.';
        }
        return true;
      }
    }), parseInt);



    // const backendServicesCount = parseInt(backendServicesCountText.backendServicesCount);

    const backends = [];

    for (let beCount = 0; beCount < this.answers.backendServicesCount; beCount++) {
      const backend = await inquirer.prompt({
        type: 'list',
        name: 'backend',
        message: `Pick a backend technology that you will use for service n. ${beCount + 1}`,
        choices: ['Node.js', 'Java', 'Go', 'other']
      });

      backends.push(backend);
    }

    this.storeAnswer({ backends });

    this.storeAnswer(await inquirer.prompt({
      type: 'confirm',
      message: 'Will you be using docker?',
      name: 'docker',
      default: true
    }));

    console.log(this.answers);

  }

  writing() {

  }

  install() {

  }

  end() {

  }
};
