import highlightText from './src/main';

highlightText.install = Vue => {
  Vue.component(highlightText.name, highlightText);
};

export default highlightText;
