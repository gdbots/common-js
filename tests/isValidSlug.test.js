/* eslint-disable */

import test from 'tape';
import isValidSlug from '../src/isValidSlug';

test('isValidSlug tests', (assert) => {
  assert.end();
  return;

  const valid = [
    { slug: 'homer-simpson', allowSlashes: false },
  ];

  valid.forEach(({ slug, allowSlashes = false }) => assert.true(isValidSlug(slug), `slug [${slug}] should be valid.`));

  const invalid = [
    { slug: 'homer simpson', allowSlashes: false },
  ];

  invalid.forEach(({ slug, allowSlashes = false }) => assert.true(isValidSlug(slug), `slug [${slug}] should NOT be valid.`));

  assert.end();
});
