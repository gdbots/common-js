import test from 'tape';
import createSlug from '../src/createSlug';

test('createSlug tests', (assert) => {
  const samples = [
    { input: null, output: null },
    { input: '     ', output: null },
    { input: '- - - -', output: null },
    { input: 'ಠ_ಠ', output: null },
    { input: '///////', output: null, allowSlashes: true },
    { input: ' / Too-Many // Slashes /// what / ', output: 'too-many/slashes/what', allowSlashes: true },
    { input: ' still-/-/too_many/-slashes-/-/test-/-', output: 'still/too-many/slashes/test', allowSlashes: true },
    { input: '(╯°□°)╯︵ ┻━┻', output: null, allowSlashes: true },
    { input: 3.14, output: '3-14' },
    { input: false, output: 'false' },
    { input: true, output: 'true' },
    { input: 'Beyoncé Knowles', output: 'beyonce-knowles' },
    { input: 'Beyoncé Knowles', output: 'beyonce-knowles', allowSlashes: true },
    { input: 'Homer simpson', output: 'homer-simpson' },
    { input: 'homer simpson', output: 'homer-simpson' },
    { input: 'homer sim@pson', output: 'homer-sim-at-pson' },
    { input: 'homer simp123son', output: 'homer-simp-123-son' },
    { input: 'homer simp123son', output: 'homer-simp-123-son', allowSlashes: true },
    { input: 'homer sim@ps/on', output: 'homer-sim-at-ps/on', allowSlashes: true },
    { input: 'homer sim@ps/on', output: 'homer-sim-at-ps-on', allowSlashes: false },
    { input: 'homer sim@ps/() on ', output: 'homer-sim-at-ps/on', allowSlashes: true },
  ];

  samples.forEach(({ input, output, allowSlashes = false }) => {
    const actual = createSlug(input, allowSlashes);
    assert.same(actual, output);
  });

  assert.end();
});
