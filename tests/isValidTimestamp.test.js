import test from 'tape';
import isValidTimestamp from '../src/isValidTimestamp';

test('isValidTimestamp (allowNegative=false) tests', (assert) => {
  const valid = [
    1494185675,
    '1494185675',
    0,
    '0',
    Number.MAX_SAFE_INTEGER,
  ];

  valid.forEach(ts => assert.true(isValidTimestamp(ts), `ts [${ts}] should be valid.`));

  const invalid = [
    'a',
    '1.1',
    1.1,
    '-1',
    -1,
  ];

  invalid.forEach(ts => assert.false(isValidTimestamp(ts), `ts [${ts}] should NOT be valid.`));

  assert.end();
});


test('isValidTimestamp (allowNegative=true) tests', (assert) => {
  const valid = [
    1494185675,
    '1494185675',
    0,
    '0',
    Number.MAX_SAFE_INTEGER,
    -1494185675,
    '-1494185675',
    -12219292800,
  ];

  valid.forEach(ts => assert.true(isValidTimestamp(ts, true), `ts [${ts}] should be valid.`));

  const invalid = [
    'a',
    '1.1',
    1.1,
    '-1.1',
    -1.1,
    Number.MIN_VALUE,
    Number.MIN_SAFE_INTEGER,
    -12219292801,
  ];

  invalid.forEach(ts => assert.false(isValidTimestamp(ts, true), `ts [${ts}] should NOT be valid.`));

  assert.end();
});
