import test from 'tape';
import isValidIpv4 from '../src/isValidIpv4';

test('isValidIpv4 tests', (assert) => {
  const valid = [
    '192.168.1.1',
    '255.255.255.255',
    '0.0.0.0',
  ];

  valid.forEach(ip => assert.true(isValidIpv4(ip), `ip; [${ip}] should be valid ipv4.`));

  const invalid = [
    null,
    '#@%.^%.#$@#.$@#',
    '192.168.1.1a',
    '.192.168.1',
    '192.168.1',
    '192.168.1.',
    '192.168.1.1.2',
    '192.256.1.1',
  ];

  invalid.forEach(ip => assert.false(isValidIpv4(ip), `ip [${ip}] should NOT be valid ipv4.`));

  assert.end();
});
