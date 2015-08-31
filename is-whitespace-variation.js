var spaceRegex = /\s/g;

function isWhitespaceVariation(base, suggestion) {
  var spacelessBase = base.toLowerCase().replace(spaceRegex, '');
  var spacelessSuggestion = suggestion.toLowerCase().replace(spaceRegex, '');
  return spacelessBase == spacelessSuggestion;
}

module.exports = isWhitespaceVariation;
