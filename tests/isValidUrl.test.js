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
    'ftp://username:password@host.com/',
    'http://foo.bar/?q=Test%20URL-en_coded%20stuff;',
    'http://foo.bar?q=Spaces+has+been+encoded',
    'http://10.1.1.254',
    'http://localhost',
    'http://[::1]',
    'mailto:info@example.com',
    'mailto:user@[255.192.168.1]',
    'http://[2001:db8:a0b:12f0::1]/test',
  ];

  valid.forEach(url => assert.same(isValidUrl(url), true, `url [${url}] should be valid.`));

  const invalid = [
    null,
    ' ',
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
    'sftp://foo.bar/',
    'http:shouldfail.com',
    'http:/shouldfail.com',
    'http:// shouldfail.com',
    ' http://www.withleadingspaces.com',
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
    'htt://shouldfailed.com',
    'scheme://shouldfailed.com',
    'emailto:info@example.com',
    'urn:isbn:0451450523',
    'mailto:user@[255:192:168:1]',
    'mailto:user@[info@example.com]',
    ' mailto:leadingspaces@[255.192.168.1]',
    'mailto:user@[255.192.168.1',
  ];

  invalid.forEach(url => assert.same(isValidUrl(url), false, `url [${url}] should NOT be valid.`));

  assert.end();
});
