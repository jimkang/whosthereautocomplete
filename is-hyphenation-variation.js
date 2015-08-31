var hyphenRegex = /\-/g;

function isHyphenationVariation(base, suggestion) {
  var hyphenlessBase = base.toLowerCase().replace(hyphenRegex, '');
  var hyphenlessSuggestion = suggestion.toLowerCase().replace(hyphenRegex, '');
  return hyphenlessBase == hyphenlessSuggestion;
}

module.exports = isHyphenationVariation;
