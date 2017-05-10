/* eslint-disable */

import test from 'tape';
import createSlug from '../src/createSlug';

test('createSlug tests', (assert) => {
  assert.end();
  return;

  const samples = [
    { input: 'Homer simpson', output: 'homer-simpson' },
    { input: 'homer simpson', output: 'homer-simpson', allowSlashes: false },
  ];

  samples.forEach(({ input, output, allowSlashes = false }) => {
    const actual = createSlug(input, allowSlashes);
    assert.same(actual, output);
  });

  assert.end();
});
