import test from 'tape';
import isValidEmail from '../src/isValidEmail';

test('isValidEmail tests', (assert) => {
  const valid = [
    'foo@bar.com',
    'bar.ba@test.co.uk',
    'foo-12345@bar.com',
    'foo+bar@bar.com',
    '"email"@domain.com',
    'email@[123.123.123.123]',
    'foo_12345@bar-dash.com',
    '_______@domain.com',
    '123@123.net',
  ];

  valid.forEach(email => assert.true(isValidEmail(email), `email [${email}] should be valid.`));

  const invalid = [
    null,
    '#@%^%#$@#$@#.com',
    'foo@bar',
    'fo@o@bar',
    '@domain.com',
    'Joe Smith <email@domain.com>',
    'foo@ba$r.com',
    'email@123.123.123.123',
    'email@[123.123.123.300]',
    'email@domain..com',
    'foo.bar.baz',
  ];

  invalid.forEach(email => assert.false(isValidEmail(email), `email [${email}] should NOT be valid.`));

  assert.end();
});
