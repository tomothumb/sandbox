import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


function getCurrentPosition(timeoutMillis = 10000) {
    console.log(navigator.geolocation);
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: timeoutMillis });
    });
}


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state={
            coords: null
        }
    }

    async componentDidMount(){
        try {
            const position = await getCurrentPosition(5000);
            const { latitude , longitude } = position.coords;
            this.setState({
                coords: {
                    latitude,
                    longitude
                }
            });
        } catch (e) {
            alert(e.message);
        }
    }

  render() {
    return (
      <View style={styles.container}>
          <Text>Welcome!</Text>
          { this.state.coords ?
              <Text>here: {this.state.coords.latitude}, {this.state.coords.longitude}</Text>
              : null
          }
          <Text>Fiinish!</Text>
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
