var _ = require('lodash');

var autocompleteNoise = [
  'translation',
  'translations',
  'meaning',
  'meanings',
  'definition',
  'definitions',
  'define',
  'dictionary',
  'synonym',
  'antonym'
];

function isNotAutoCompleteNoise(suggestion) {
  var verdict = true;
  var lowercaseSuggestion = suggestion.toLowerCase();
  var words = lowercaseSuggestion.split(/\W/);
  var noise = _.intersection(autocompleteNoise, words);
  if (noise.length !== 0) {
    console.log('Found noise:', suggestion);
  }
  return noise.length === 0;
}

module.exports = isNotAutoCompleteNoise;
