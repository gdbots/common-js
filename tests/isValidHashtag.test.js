import test from 'tape';
import isValidHashtag from '../src/isValidHashtag';

test('isValidHashtag tests', function (assert) {
  const valid = [
    '#HomerSimpson',
    'HomerSimpson'
  ];

  valid.forEach((hashtag) => assert.true(isValidHashtag(hashtag), `hashtag [${hashtag}] should be valid.`));

  const invalid = [
    '#Homer Simpson',
    'Homer Simpson'
  ];

  invalid.forEach((hashtag) => assert.false(isValidHashtag(hashtag), `hashtag [${hashtag}] should NOT be valid.`));

  assert.end();
});
