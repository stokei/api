import { registerEnumType } from '@nestjs/graphql';

enum MyEnum {}
registerEnumType(MyEnum, {
  name: 'MyEnum'
});

export { MyEnum };
