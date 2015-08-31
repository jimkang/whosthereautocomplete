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
  'antonym',
  'band',
  'activism',
  'lyrics',
  'quotes',

  'al',
  'ak',
  'as',
  'az',
  'ar',
  'ca',
  'co',
  'ct',
  'de',
  'dc',
  'fm',
  'fl',
  'ga',
  'gu',
  'hi',
  'id',
  'il',
  'in',
  'ia',
  'ks',
  'ky',
  'la',
  'mh',
  'md',
  'ma',
  'mi',
  'mn',
  'ms',
  'mo',
  'mt',
  'ne',
  'nv',
  'nh',
  'nj',
  'nm',
  'ny',
  'nc',
  'nd',
  'mp',
  'pw',
  'pa',
  'pr',
  'ri',
  'sc',
  'sd',
  'tn',
  'tx',
  'ut',
  'vt',
  'vi',
  'va',
  'wa',
  'wv',
  'wi',
  'wy'
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
