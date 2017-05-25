import Enum from '../../src/Enum';

class StringEnum extends Enum {
}

StringEnum.configure({
  ENUM1: 'val1',
  ENUM2: 'val2',
}, 'gdbots:common:string-enum');

export default StringEnum;
