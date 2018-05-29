import React from 'react';
import { StyleSheet, Text, View,
    TextInput,
    ScrollView, TouchableOpacity, AsyncStorage
} from 'react-native';
import Note from './Note';



export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            noteArray:[],
            noteText:'',
        };
    }
    componentWillMount(){
        AsyncStorage.getItem('noteArray')
            .then((data) => {
                if(data){
                    this.setState({ noteArray: JSON.parse(data) });
                }
            });
    }


    addNote(){
        if(this.state.noteText){
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear()
                        + "/"+ (d.getMonth() +1)
                        + "/"+ d.getDate()
                        + " "+ d.getHours()
                        + ":"+ d.getMinutes()
                        + ":"+ d.getSeconds(),
                'note': this.state.noteText
            });
            this.setState({ noteArray: this.state.noteArray });
            this.setState({ noteText:''});

            AsyncStorage.setItem('noteArray',JSON.stringify(this.state.noteArray));
        }
    }

    deleteNote(key) {
        this.state.noteArray.splice(key,1);
        this.setState({noteArray: this.state.noteArray});
        AsyncStorage.setItem('noteArray',JSON.stringify(this.state.noteArray));

    }

  render() {

        let notes = this.state.noteArray.map((val,key)=>{
            return <Note key={key} keyVal={key} val={val}
                deleteMethod={ ()=>{ this.deleteNote(key)} }
            />
        });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>- TITLE -</Text>
        </View>
          <ScrollView style={styles.scrollContainer}>
              {notes}
          </ScrollView>
        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(noteText)=>this.setState({noteText})}
            value={this.state.noteText}
            placeholder='>note'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'
          />
        </View>

          <TouchableOpacity onPress={ this.addNote.bind(this)} style={styles.addButton}>
              <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>

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
        width:60,
        height:60,
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
