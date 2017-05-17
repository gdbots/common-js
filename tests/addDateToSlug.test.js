/* eslint-disable */

import test from 'tape';
import addDateToSlug from '../src/addDateToSlug';

test('addDateFromSlug tests', (assert) => {
  // assert.end();
  // return;

  const d = new Date(2017, 4, 20);
  const inputs = [
    { slug: '2017/05/16', output: '2017/05/20/' },
    { slug: 'homer-simpson', output: '2017/05/20/homer-simpson' },
    { slug: '2017/05/16/homer-simpson', output: '2017/05/20/homer-simpson' },
    { slug: 'homer-simpson', date: 'invalid', output: null },
  ];

  inputs.forEach(({ slug, date = d, output }) => {
    const actual = addDateToSlug(slug, date);
    assert.same(actual, output);
  });

  assert.end();
});
