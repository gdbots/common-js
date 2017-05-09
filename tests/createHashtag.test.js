import test from 'tape';
import createHashtag from '../src/createHashtag';

test('createHashtag tests', function (assert) {
  const samples = [
    {input: 'Homer simpson', output: 'HomerSimpson'},
    {input: 'homer simpson', output: 'HomerSimpson'},
    {input: 'Homer simpson', output: 'Homersimpson', camelize: false},
    {input: 'homer simpson', output: 'homersimpson', camelize: false},
    {input: '#TacoSpice', output: 'TacoSpice'},
    {input: '21 Grams', output: '21Grams'},
    {input: '_ snake _ case', output: '_Snake_Case'},
    {input: '_ snake _ case', output: '_snake_case', camelize: false},
    {input: 'BeyoncéKnowles', output: 'BeyonceKnowles'},
    {input: 'I can\'t believe it\'s not butter!... Spray', output: 'ICantBelieveItsNotButterSpray'},

    {input: '1111', output: null},
    {input: '1111_', output: null},
    {input: '2015-12-25', output: null},
    {input: '- - - -', output: null},
    {input: '(╯°□°)╯︵ ┻━┻', output: null},
    {input: 'ಠ_ಠ', output: null},

    {input: '', output: null},
    {input: '  ', output: null},
    {input: '-', output: null},
    {input: '#', output: null},
    {input: '#_', output: null},
    {input: '#__', output: null},
    {input: '#_ _ _', output: null},
    {input: '- - - 1 - 2', output: null},
    {input: '_1_2_3_4', output: null},
  ];

  samples.forEach(({input, output, camelize = true}) => {
    const actual = createHashtag(input, camelize);
    assert.same(actual, output);
  });

  assert.end();
});
