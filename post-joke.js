/* global process */

var config = require('./config');
var async = require('async');
var jokeItUp = require('./joke-it-up');
var createWordnok = require('wordnok').createWordnok;
var autocompl = require('autocompl');
var postIt = require('@jimkang/post-it');
var randomId = require('idmaker').randomId;

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = process.argv[2].toLowerCase() == '--dry';
}

async.waterfall([getWords, makeJokeWithWord, postToTargets], wrapUp);

function getWords(done) {
  var wordnok = createWordnok({
    apiKey: config.wordnikAPIKey
  });
  wordnok.getRandomWords({}, done);
}

function makeJokeWithWord(words, done) {
  jokeItUp(
    {
      base: words[0],
      autocompl
    },
    done
  );
}

function postToTargets(text, done) {
  if (dryRun) {
    console.log('Would have tweeted:', text);
  } else {
    postIt(
      {
        id: 'joke-' + randomId(8),
        text,
        targets: [
          {
            type: 'noteTaker',
            config: config.noteTaker
          },
          {
            type: 'mastodon',
            config: config.mastodon
          },
          {
            type: 'twitter',
            config: config.twitter
          }
        ]
      },
      done
    );
  }
}

function wrapUp(error, data) {
  if (error) {
    console.log(error, error.stack);

    if (data) {
      console.log('data:', data);
    }
  }
}
