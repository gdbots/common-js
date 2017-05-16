/* eslint-disable */

import test from 'tape';
import isValidSlug from '../src/isValidSlug';

test('isValidSlug tests', (assert) => {
  // assert.end();
  // return;

  const valid = [
    { slug: 'homer-simpson' },
    { slug: 'homer-simpson', allowSlashes: false },
    { slug: 'homer-simpson', allowSlashes: true },
    { slug: '2017/05/16/homer-simpson', allowSlashes: true },
  ];

  valid.forEach(({ slug, allowSlashes = false }) => assert.true(isValidSlug(slug, allowSlashes), `slug [${slug}] should be valid.`));

  const invalid = [
    { slug: 'Homer-simpson' },
    { slug: 'homer simpson', allowSlashes: false },
    { slug: '2017/05/16/homer-simpson', allowSlashes: false },
    { slug: '2017/05/16/ homer-simpson', allowSlashes: true },
  ];

  invalid.forEach(({ slug, allowSlashes = false }) => assert.false(isValidSlug(slug, allowSlashes), `slug [${slug}] should NOT be valid.`));

  assert.end();
});
