import { StatusBar } from 'native-base';
import { Text, Center } from 'native-base';

export function SignIn() {
  return (
    <Center flex={1} bgColor="gray.900">
      <Text color="white" fontSize={24} fontFamily="heading">
        SignIn
      </Text>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </Center>
  );
}
