import Enum from '../../src/Enum';

class IntEnum extends Enum {
}

IntEnum.configure({
  ENUM1: 1,
  ENUM2: 2,
}, 'gdbots:common:int-enum');

export default IntEnum;
