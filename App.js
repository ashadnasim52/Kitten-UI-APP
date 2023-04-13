import {Alert, StyleSheet} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import * as React from 'react';
import {Input} from '@ui-kitten/components';
const HeartIcon = props => <Icon {...props} name="heart" />;
import Snackbar from 'react-native-snackbar';
export default () => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [users, setUsers] = React.useState([{username: 'a', password: 'a'}]);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const handleSignIn = async () => {
    if (!userName && userName.trim().length < 1)
      return Snackbar.show({
        text: 'Please provide user name',
        duration: Snackbar.LENGTH_SHORT,
      });
    if (!password && password.trim().length < 1)
      return Snackbar.show({
        text: 'Please provide user password',
        duration: Snackbar.LENGTH_SHORT,
      });

    users.map(user => {
      if (isSignUp) {
        setUsers([
          ...users,
          {
            username: userName,
            password,
          },
        ]);
        setUserName('');
        setPassword('');
        return setIsSignUp(false);
      }
      if (user?.username === userName) {
        Snackbar.show({
          text: 'User Present',
          duration: Snackbar.LENGTH_SHORT,
        });
        setIsSignUp(false);
      } else {
        Snackbar.show({
          text: 'User not present, Sign Up?',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'OK',
            textColor: 'green',
            onPress: () => {
              setIsSignUp(true);
            },
          },
        });

        setIsSignUp(true);
      }
    });
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            Welcome to UI Kitten 😻
          </Text>
          <Text style={styles.text} category="h5">
            {isSignUp ? 'SignUp Please' : 'Sign In'}
          </Text>
          <Text style={styles.text} appearance="hint">
            {JSON.stringify(users)}{' '}
          </Text>
          <Input
            placeholder="Place your user name"
            value={userName}
            onChangeText={nextValue => setUserName(nextValue)}
          />
          <Input
            placeholder="Place your user password"
            value={password}
            onChangeText={nextValue => setPassword(nextValue)}
          />
          <Button
            style={styles.likeButton}
            onPress={handleSignIn}
            // accessoryLeft={HeartIcon}
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </Layout>
      </ApplicationProvider>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
