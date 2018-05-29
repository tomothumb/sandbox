import React from 'react';
import { StyleSheet, Text, View,
    TextInput,
    ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native';

export default class Main extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- TITLE -</Text>
        </View>
          <ScrollView style={styles.scrollContainer}>

              <Text>111</Text>
          </ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            placeholder='>note'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
    header:{
        // flex:1,
        backgroundColor:'#999999',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#DDD'
    },
    headerText:{
      color:'white',
        fontSize: 18,
        padding: 26

    },
    scrollContainer:{
        flex:1,
        marginBottom:180
    },
    footer:{
    position:'absolute',
        bottom:0,
        left:0,
        right:0,
        zIndex:10,
    },
    textInput:{
      alignSelf:'stretch',
        color:'#FFF',
        padding:20,
        backgroundColor:"#333",
        borderTopWidth: 2,
        borderTopColor: '#DDD'
    },
    addButton:{
    position:'absolute',
        zIndex:11,
        right:20,
        bottom:90,
        backgroundColor:'#987',
        width:90,
        height:90,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        elevation:8,
    },
    addButtonText:{
    fontSize:24,
        color: '#fff'
    }


});
