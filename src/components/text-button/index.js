import TextButton from './src/main';

TextButton.install = Vue => {
  Vue.component(TextButton.name, TextButton);
};

export default TextButton;
