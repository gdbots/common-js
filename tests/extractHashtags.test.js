import test from 'tape';
import extractHashtags from '../src/extractHashtags';

test('extractHashtags tests', function (assert) {
  const samples = [
    {
      input: 'Hello #HomerSimpson',
      output: [
        'HomerSimpson',
      ]
    },
  ];

  samples.forEach(({input, output}) => {
    const hashtags = extractHashtags(input);
    assert.same(hashtags, output);
  });

  assert.end();
});
