/* eslint-disable */

import test from 'tape';
import createSlug from '../src/createSlug';

test('createSlug tests', (assert) => {
  // assert.end();
  // return;

  const samples = [
    { input: 'Homer simpson', output: 'homer-simpson' },
    { input: 'homer simpson', output: 'homer-simpson' },
    { input: 'homer sim@pson', output: 'homer-sim-at-pson' },
    { input: 'homer sim@ps/on', output: 'homer-sim-at-ps/on', allowSlashes: true },
    { input: 'homer sim@ps/() on ', output: 'homer-sim-at-ps/on', allowSlashes: true },
    { input: 'homer sim@ps/on', output: 'homer-sim-at-pson', allowSlashes: false },
  ];

  samples.forEach(({ input, output, allowSlashes = false }) => {
    const actual = createSlug(input, allowSlashes);
    assert.same(actual, output);
  });

  assert.end();
});
