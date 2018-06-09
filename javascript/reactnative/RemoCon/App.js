import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CP_setting } from './src/component/setting'
import { CP_remocon } from './src/component/remocon'

export default class App extends React.Component {
  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
            <Text>RemoCon</Text>
              <CP_setting />
              <CP_remocon />
          </View>
        </ScrollView>
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
