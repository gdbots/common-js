import test from 'tape';
import isValidDate from '../src/isValidDate';

test('isValidDate tests', (assert) => {
  const valid = [
    new Date,
    new Date('May 20 2017'),
    new Date('2009-05-19 14:39:22-06:00'),
    new Date(1494185675),
  ];

  valid.forEach(d => assert.true(isValidDate(d), `Date [${d}] should be valid.`));

  const invalid = [
    'May 20 2017',
    '2009-05-19 14:39:22-06:00',
    1494185675,
  ];

  invalid.forEach(d => assert.false(isValidDate(d), `Date [${d}] should NOT be valid.`));

  assert.end();
});
