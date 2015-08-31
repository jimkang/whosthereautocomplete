var test = require('tape');
var jokeItUp = require('../joke-it-up');
var callNextTick = require('call-next-tick');

var testCases = [
  {
    base: 'hello',
    expected: 'Knock knock!\n' + 
      '    Who\'s there?\n' + 
      'Hello\n' +
      '    Hello who?\n' + 
      'Hello kitty!',
    expectedErrorMessage: undefined
  },
  {
    base: 'meerkats',
    expected: 'Knock knock!\n' + 
      '    Who\'s there?\n' + 
      'Meerkats\n' +
      '    Meerkats who?\n' + 
      'Meerkats facts!',
    expectedErrorMessage: undefined
  },
  {
    base: 'indio',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'aliases',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'activism',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'chandelier',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'Neo-Platonism',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'bookend',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'childishness',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  },
  {
    base: 'birthrate',
    expected: undefined,
    expectedErrorMessage: 'Could not find suitable suggestion.'
  }
];

function mockAutocompl(partialSearchTerm, done) {
  var cannedResults = {
    'hello': ['hello kitty'],
    'meerkats': ['meerkats facts'],
    'indio': ['indio ca'], // Should be NOT be used in joke.
    'aliases': ['aliases band'],
    'activism': ['activism quotes'],
    'chandelier': ['chandelier lyrics'],
    'Neo-Platonism': ['neoplatonism'],
    'bookend': ['bookends'],
    'childishness': ['childishness quotes'],
    'birthrate': ['birth rate']
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
      if (testCase.expectedErrorMessage) {
        t.equal(
          error.message, testCase.expectedErrorMessage, 'Correct error given.'
        );
      }
      else {
        t.ok(!error, 'No error while making joke.');
      }


      t.deepEqual(joke, testCase.expected, 'Joke is correct.');
    }
  });
}
