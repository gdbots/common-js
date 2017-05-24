import test from 'tape';
import isValidUri from '../src/isValidUri';

test('isValidUri tests', (assert) => {
  const valid = [
    'http://localhost',
    'lol:P',
    'urn:www-example-org:validator:1',
    'ftp://cnn.example.com&story=breaking_news@10.0.0.1/top_story.htm',
    'ftp://ftp.is.co.za/rfc/rfc1808.txt',
    'http://www.ietf.org/rfc/rfc2396.txt',
    'ldap://[2001:db8::7]/c=GB?objectClass?one',
    'mailto:John.Doe@example.com',
    'news:comp.infosystems.www.servers.unix',
    'tel:+1-816-555-1212',
    'telnet://192.0.2.16:80/',
    'urn:isbn:0451450523',
    'urn:oid:2.16.840',
    'urn:isan:0000-0000-9E59-0000-O-0000-0000-2',
    'urn:oasis:names:specification:docbook:dtd:xml:4.1.2',
    'http://localhost/test/somefile.php?query=someval&variable=value#fragment',
    'http://[2001:db8:a0b:12f0::1]/test',
    'ftp://username:password@domain.com/path/to/file/somefile.html?queryVariable=value#fragment',
    'https://subdomain.domain.com/path/to/file.php?query=value#fragment',
    'https://subdomain.example.com/path/to/file.php?query=value#fragment',
    'mailto:john.smith(comment)@example.com',
    'mailto:user@[2001:DB8::1]',
    'mailto:M.Handley@cs.ucl.ac.uk',
    'http://localhost:4433/path/to/file?query#fragment',
  ];

  valid.forEach(uri => assert.true(isValidUri(uri), `uri [${uri}] should be valid.`));

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
    'foo',
    'mailto:user@[255:192:168:1]',
  ];

  invalid.forEach(uri => assert.false(isValidUri(uri), `uri [${uri}] should NOT be valid.`));

  assert.end();
});
