import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default class Note extends React.Component {

  render() {
    return (
      <View key={this.props.keyVal} style={styles.note}>
          <Text style={styles.noteTextDate}>{this.props.val.date}</Text>
          <Text style={styles.noteTextNote}>{this.props.val.note}</Text>
          <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
              <Text style={styles.noteDeleteText}>Delete</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    note:{
        position:'relative',
        padding:20,
        paddingRight:100,
        borderBottomWidth:1,
        borderBottomColor:'#CCCCCC',
    },
    noteTextDate:{
        paddingLeft:20,
        borderLeftWidth:1,
        borderLeftColor:"#CC0000",
    },
    noteTextNote:{
        paddingLeft:20,
        borderLeftWidth:1,
        borderLeftColor:"#00CC00",
    },
    noteDelete:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#CC0000',
        padding:10,
        top:10,
        right:10
    },
    noteDeleteText:{
        color:"#FFFFFF"

    }
});
