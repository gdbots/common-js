import test from 'tape';
import isValidUrl from '../src/isValidUrl';

test('isValidUrl tests', (assert) => {
  const valid = [
    'http://www.foo.bar./',
    'http://userid:password@example.com:8080',
    'http://userid:password@example.com:8080/',
    'http://userid@example.com',
    'http://userid@example.com/',
    'http://userid@example.com:8080',
    'http://userid@example.com:80',
    'http://userid:password@example.com',
    'http://userid:password@example.com/',
    'http://142.42.1.1/',
    'http://127.0.0.1:8080/',
    'http://foo.com/blah_(wikipedia)#cite-1',
    'http://foo.com/blah_(wikipedia)_blah#cite-1',
    'http://foo.com/(something)?after=parens',
    'http://code.google.com/events/sub/#&product=browser',
    'http://j.mp',
    'http://www.google.com.me',
    'http://www.example.ninja',
    'http://www.example.com/page?q=test&qq=tteesstt#hashtags',
    'ftp://foo.bar/baz',
    'sftp://foo.bar/',
    'http://foo.bar/?q=Test%20URL-en_coded%20stuff;',
    'http://foo.bar?q=Spaces+has+been+encoded',
    'http://10.1.1.254',
    'http://localhost',
  ];

  valid.forEach(url => assert.true(isValidUrl(url), `url [${url}] should be valid.`));

  const invalid = [
    'http://',
    'http://.',
    'http://..',
    'http://../',
    'http://?',
    'http://??',
    'http://??/',
    'http://#',
    'http://##',
    'http://##/',
    'http://foo.bar?q=Spaces should be encoded',
    '//',
    '//a',
    '///a',
    '///',
    'http:///a',
    'foo.com',
    'rdar://1234',
    'h://test',
    'http:// shouldfail.com',
    ' http://www.shouldfail.com',
    ':// should fail',
    'http://foo.bar/foo(bar)baz quux',
    'http://-error-.invalid/',
    'http://-a.b.co',
    'http://a.b-.co',
    'http://1.1.1.1.1',
    'http://123.123.123',
    'http://3628126748',
    'http://.www.foo.bar/',
    'http://.www.foo.bar./',
    'http://مثال.إختبار',
    'http://例子.测试',
    'http://➡.ws/䨹',
    'http://⌘.ws',
    'http://foo.com/unicode_(✪)_in_parens',
    'http://☺.damowmow.com/',
  ];

  invalid.forEach(url => assert.false(isValidUrl(url), `url [${url}] should NOT be valid.`));

  assert.end();
});
