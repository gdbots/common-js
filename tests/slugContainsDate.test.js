/* eslint-disable */

import test from 'tape';
import slugContainsDate from '../src/slugContainsDate';

test('slugContainsDate tests', (assert) => {
  const slugHasDates = '2017/05/16/homer-simpson';
  assert.true(slugContainsDate(slugHasDates), `slug [${slugHasDates}] should contains date.`);

  const slugHasNoDates = ['homer-simpson', 'homer-simpson/2017/05/16/'];
  slugHasNoDates.forEach(({ slug }) => assert.false(slugContainsDate(slug), `slug [${slug}] should NOT be valid.`));

  assert.end();
});
