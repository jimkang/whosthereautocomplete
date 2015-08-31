var canonicalizer = require('canonicalizer');

function isPluralization(base, suggestion) {
  var normalizedSuggestion = suggestion.toLowerCase();
  var forms = canonicalizer.getSingularAndPluralForms(base);
  return (normalizedSuggestion === forms[0].toLowerCase() ||
    normalizedSuggestion === forms[1].toLowerCase());
}

module.exports = isPluralization;
