import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CP_setting } from './src/component/setting'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>RemoCon</Text>
          <CP_setting />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
