import test from 'tape';
import createSlug from '../src/createSlug';

test('createSlug tests', (assert) => {
  const samples = [
    { input: null, output: null },
    { input: '     ', output: null },
    { input: '- - - -', output: null },
    { input: 'ಠ_ಠ', output: null },
    { input: '///////', output: null, allowSlashes: true },
    { input: '(╯°□°)╯︵ ┻━┻', output: null, allowSlashes: true },
    { input: 3.14, output: '3-14' },
    { input: 'Beyoncé Knowles', output: 'beyonce-knowles' },
    { input: 'Beyoncé Knowles', output: 'beyonce-knowles', allowSlashes: true },
    { input: 'Homer simpson', output: 'homer-simpson' },
    { input: 'homer simpson', output: 'homer-simpson' },
    { input: 'homer sim@pson', output: 'homer-sim-at-pson' },
    { input: 'homer simp123son', output: 'homer-simp-123-son' },
    { input: 'homer simp123son', output: 'homer-simp-123-son', allowSlashes: true },
    { input: 'homer sim@ps/on', output: 'homer-sim-at-ps/on', allowSlashes: true },
    { input: 'homer sim@ps/() on ', output: 'homer-sim-at-ps/on', allowSlashes: true },
    { input: 'homer sim@ps/on', output: 'homer-sim-at-ps-on', allowSlashes: false },
  ];

  samples.forEach(({ input, output, allowSlashes = false }) => {
    const actual = createSlug(input, allowSlashes);
    assert.same(actual, output);
  });

  assert.end();
});
