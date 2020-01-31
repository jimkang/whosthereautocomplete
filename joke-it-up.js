var createIsCool = require('iscool');
var isAutoCompleteNoise = require('./is-autocomplete-noise');
var isHyphenationVariation = require('./is-hyphenation-variation');
var isPluralization = require('./is-pluralization');
var isWhitespaceVariation = require('./is-whitespace-variation');
var iscool = createIsCool();
var probable = require('probable');

const breakString = '<br>';
const indent = '&nbsp;&nbsp;&nbsp;&nbsp;';

function jokeItUp(opts, done) {
  var base;
  var autocompl;

  if (opts) {
    base = opts.base;
    autocompl = opts.autocompl;
  }

  autocompl(base, makeJokeWithSuggestions);

  function makeJokeWithSuggestions(error, suggestions) {
    if (error) {
      done(error);
    } else if (!suggestions || suggestions.length < 1) {
      done(new Error('Got no suggestions.'));
    } else {
      var whosThere;
      suggestions = probable.shuffle(suggestions);

      for (var i = 0; i < suggestions.length; ++i) {
        var suggestion = suggestions[i];
        if (
          suggestion !== base.toLowerCase() &&
          !isHyphenationVariation(base, suggestion) &&
          !isPluralization(base, suggestion) &&
          !isWhitespaceVariation(base, suggestion) &&
          !isAutoCompleteNoise(base, suggestion) &&
          iscool(suggestion)
        ) {
          whosThere = suggestion;
          break;
        }
      }

      if (!whosThere) {
        done(new Error('Could not find suitable suggestion.'));
      } else {
        done(null, formatJoke(base, whosThere));
      }
    }
  }
}

const jokeTemplate =
  'Knock knock!' +
  breakString +
  indent +
  "Who's there?" +
  breakString +
  '%base%' +
  breakString +
  indent +
  '%base% who?' +
  breakString +
  '%whosthere%!';

function formatJoke(base, whosThere) {
  return jokeTemplate
    .replace(/%base%/g, capitalizeFirst(base))
    .replace('%whosthere%', capitalizeFirst(whosThere));
}

function capitalizeFirst(s) {
  var capitalized = '';
  if (s.length > 0) {
    capitalized += s.slice(0, 1).toUpperCase();
  }
  if (s.length > 1) {
    capitalized += s.slice(1);
  }
  return capitalized;
}

module.exports = jokeItUp;
