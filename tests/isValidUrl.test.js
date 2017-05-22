import test from 'tape';
import isValidUrl from '../src/isValidUrl';

test('isValidUrl tests', (assert) => {
  const valid = [
    'http://www.test.com',
    'http://1.2.me',
    'http://test.com',
    'http://www.test.com.us',
    'http://sub.test.net',
    'https://www.test.com/',
    'https://www.test.com/dir',
    'https://www.test.com/dir/filename.jpg',
    'https://www.test.com/dir/filename.jpg?',
    'https://www.test.com/dir/filename.jpg?var1=foo&var2=bar',
    'https://www.test.com/dir/filename.jpg?var1=foo#hashTag',
  ];

  valid.forEach(url => assert.true(isValidUrl(url), `url [${url}] should be valid.`));

  const invalid = [
    null,
    'word',
    'foo@demo.net',
    'http:/www.test.com',
    'www.test.com',
    'http://www.',
  ];

  invalid.forEach(url => assert.false(isValidUrl(url), `url [${url}] should NOT be valid.`));

  assert.end();
});
