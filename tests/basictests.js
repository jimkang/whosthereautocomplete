var test = require('tape');
var jokeItUp = require('../joke-it-up');
var callNextTick = require('call-next-tick');

var testCases = [
  {
    base: 'hello',
    expected: 'Knock knock!\n' + 
      '\tWho\'s there?\n' + 
      'Hello\n' +
      '\tHello who?\n' + 
      'Hello kitty!'
  },
  {
    base: 'meerkats',
    expected: 'Knock knock!\n' + 
      '\tWho\'s there?\n' + 
      'Meerkats\n' +
      '\tMeerkats who?\n' + 
      'Meerkats facts!'
  }
];

function mockAutocompl(partialSearchTerm, done) {
  var cannedResults = {
    'hello': ['hello kitty'],
    'meerkats': ['meerkats facts']
  };
  callNextTick(done, null, cannedResults[partialSearchTerm]);
}

testCases.forEach(runTest);

function runTest(testCase) {
  test('Basic test', function basicTest(t) {
    t.plan(2);

    jokeItUp(
      {
        base: testCase.base,
        autocompl: mockAutocompl
      },
      checkJoke
    );

    function checkJoke(error, joke) {
      console.log(joke);
      t.ok(!error, 'No error while making joke.');
      t.deepEqual(joke, testCase.expected, 'Joke is correct.');
    }
  });
}
