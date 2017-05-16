import test from 'tape';
import CustomError from '../src/CustomError';
import SampleError from './fixtures/SampleError';

test('CustomError tests', (assert) => {
  const myError = new SampleError('custom message', 500);

  assert.true(myError instanceof Error, 'myError MUST be an instanceOf Error');
  assert.true(myError instanceof CustomError, 'myError MUST be an instanceOf CustomError');
  assert.true(myError instanceof SampleError, 'myError MUST be an instanceOf SampleError');

  assert.equal(myError.getCode(), 500);
  assert.equal(myError.message, 'custom message');
  assert.equal(`${myError}`, 'SampleError: custom message');

  try {
    throw myError;
  } catch (e) {
    assert.true(myError instanceof Error, 'thrown myError MUST be an instanceOf Error');
    assert.true(myError instanceof CustomError, 'thrown myError MUST be an instanceOf CustomError');
    assert.true(myError instanceof SampleError, 'thrown myError MUST be an instanceOf SampleError');
  }

  assert.end();
});

