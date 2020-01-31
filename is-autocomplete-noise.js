var _ = require('lodash');

var autocompleteNoise = [
  'translation',
  'translations',
  'meaning',
  'meanings',
  'definition',
  'definitions',
  'def',
  'define',
  'dictionary',
  'synonym',
  'antonym',
  'band',
  'activism',
  'lyrics',
  'quotes',
  'spelling',

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

var badEndings = [
  'summary',
  'crossword clue',
  'are called',
  'pronunciation',
  'sb',
  'was used to'
];

var badSuffixes = ['ly', 'ing', 'y', 'ity'];

function isAutoCompleteNoise(base, suggestion) {
  var lowercaseSuggestion = suggestion.toLowerCase();
  var words = lowercaseSuggestion.split(/\W/);
  var foundNoise = _.intersection(autocompleteNoise, words).length !== 0;
  if (!foundNoise) {
    foundNoise = badEndings.some(suggestionEndsWithWord);
  }
  if (!foundNoise) {
    foundNoise = badSuffixes.some(suggestionIsJustBaseWithBadSuffix);
  }

  if (foundNoise) {
    console.log('Found noise:', suggestion);
  }
  return foundNoise;

  function suggestionEndsWithWord(word) {
    return lowercaseSuggestion.endsWith(word);
  }

  function suggestionIsJustBaseWithBadSuffix(suffix) {
    return base.toLowerCase() + suffix === lowercaseSuggestion;
  }
}

module.exports = isAutoCompleteNoise;
