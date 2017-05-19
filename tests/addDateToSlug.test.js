import test from 'tape';
import addDateToSlug, { formatSlugDate } from '../src/addDateToSlug';

test('addDateToSlug tests', (assert) => {
  const d = new Date(2017, 4, 20);
  const today = formatSlugDate(new Date());
  const inputs = [
    { slug: '2017/05/16', output: '2017/05/20/' },
    { slug: 'homer-simpson', output: '2017/05/20/homer-simpson' },
    { slug: '2017/05/16/homer-simpson', output: '2017/05/20/homer-simpson' },
    { slug: 'homer-simpson', date: 'invalid', output: `${today}/homer-simpson` },
  ];

  inputs.forEach(({ slug, date = d, output }) => {
    const actual = addDateToSlug(slug, date);
    assert.same(actual, output);
  });

  assert.end();
});
