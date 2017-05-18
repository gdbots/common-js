/* eslint-disable */

import test from 'tape';
import slugHumanize from '../src/slugHumanize';

test('slugHumanize tests', (assert) => {
  const samples = [
    { input: 'homer-simpson', output: 'Homer Simpson' },
    { input: 'simpson-s-01-ep-12', output: 'Simpson S 01 Ep 12' },
    { input: '2017/05/20/simpson-s-01-ep-12', output: 'Simpson S 01 Ep 12' }
  ];

  samples.forEach(({ input, output }) => {
    const actual = slugHumanize(input);
    assert.same(actual, output);
  });

  assert.end();
});
