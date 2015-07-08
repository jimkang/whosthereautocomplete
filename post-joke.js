var config = require('./config');
var callNextTick = require('call-next-tick');
var Twit = require('twit');
var async = require('async');
var jokeItUp = require('./joke-it-up');
var createWordnok = require('wordnok').createWordnok;
var autocompl = require('autocompl');

var dryRun = false;
if (process.argv.length > 2) {
  dryRun = (process.argv[2].toLowerCase() == '--dry');
}

var twit = new Twit(config.twitter);

async.waterfall(
  [
    getWords,
    makeJokeWithWord,
    postTweet
  ],
  wrapUp
);

function getWords(done) {
  var wordnok = createWordnok({
    apiKey: config.wordnikAPIKey
  });
  wordnok.getRandomWords({}, done);
}

function makeJokeWithWord(words, done) {
  debugger;
  jokeItUp(
    {
      base: words[0],
      autocompl: autocompl
    },
    done
  );
}

function postTweet(text, done) {
  debugger;
  if (dryRun) {
    console.log('Would have tweeted:', text);
    callNextTick(done);
  }
  else {
    var body = {
      status: text
    };
    twit.post('statuses/update', body, done);
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
