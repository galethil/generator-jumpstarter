var Generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');

const { prompt } = require('./helpers');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag

    this.answers = {};
    if (opts.answers) {
      this.otherAnswers = opts.answers;
    }

    this.steps = [];
    this.actualStep = 0;

    this.setStep = (stepName) => {
      const foundIndex = _.findIndex(this.steps, { 'name': stepName });

      if (foundIndex === -1) {
        throw Error('Step not found');
      }

      this.actualStep = foundIndex;
    };

    this.clear = () => {
      console.clear();
    };

    this.printSteps = () => {
      let stepsText = '';
      this.steps.forEach((step, index) => {
        if (this.actualStep === index) {
          stepsText += chalk.bold.bgYellow(step.label);
        } else if (this.actualStep > index) {
          stepsText += chalk.bold(step.label);
        } else if (this.actualStep < index) {
          stepsText += chalk.gray(step.label);
        }

        if (index+1 < this.steps.length) {
          stepsText += chalk.gray(' ----- ');
        }
      });

      console.clear();
      this.log(stepsText);


    };

    this.question = async (options) => {
      this.printSteps();

      let def;
      if (this.subgenerator) {
        const subgeneratorConfig = this.config.get(this.subgenerator);
        def = subgeneratorConfig[options.name];
      } else {
        def = this.config.get(options.name);
      }

      if (def && !options.default) {
        options.default = def;
      }

      const result = await this.prompt(options);
      this.storeAnswer(result);
    };

    this.storeAnswer = (answer) => {
      Object.keys(answer).forEach((key) => {
        if (this.subgenerator) {
          const config = this.config.get(this.subgenerator);
          this.config.set(this.subgenerator, { ...config, key: answer[key]});
        } else {
          this.config.set(key, answer[key]);
        }

      });

      this.answers = { ...this.answers, ...answer};
    };


  }

}
