import React,{Component} from 'react';
import {Platform, AppRegistry, StyleSheet, Text, TextInput,Button, Alert, View, Image,
    ScrollView,
    FlatList,SectionList,
    TouchableHighlight,TouchableOpacity,TouchableNativeFeedback,TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';


// @continue https://facebook.github.io/react-native/docs/network.html
export default class MainContents extends Component {
    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <Text>aaaas234</Text>
                <Image source={pic} style={{width: 193, height: 110}}/>
                <PizzaTranslator />
                <FetchMovie />
                <ButtonList />
                <MySelection />
                <Greeting name='Rexxar'/>
                <Greeting name='Jaina'/>
                <Greeting name='Valeera'/>
                <Blink text='I love to blink' />
            </View>
            </ScrollView>
        );
    }
}
function getMoviesFromApiAsync(){

}
class FetchMovie extends Component{
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        fetch('https://facebook.github.io/react-native/movies.json')
            // .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.movies,
                }, function(){

                });
                // return responseJson.movies
            })
            .catch((error)=>{
                console.error(error);
            });
    }
    render(){
        if( this.state.isLoading){
            return (
                <View style={{flex:1, padding:20}}>
                    <ActivityIndicator />
                </View>
            )
        }
        return (
            <View style={{flex:1, paddingTop:20}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text> }
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

class MySelection extends Component{
    render(){
        return (
            <View>
                <FlatList
                    data={[
                        {key: 'banana'},
                        {key: 'apple'},
                        {key: 'orange'},
                    ]}
                    renderItem={({item}) => <Text style={styles.list_item}>{item.key}</Text>}
                />

                <SectionList
                    sections={[
                        {title:'A', data:['apple']},
                        {title:'B', data:['banana','bbb']}
                    ]}
                    renderItem={({item}) => <Text style={styles.section_item}>{item}</Text>}
                    renderSectionHeader={({section}) => <Text style={styles.section_header}>{section.title}</Text>}
                    keyExtractor={(item,index) => index}
                />
            </View>
        )
    }
}

class ButtonList extends Component{
    _onPressButton(){
        Alert.alert("You tapped the button!");
    }
    _onLongPressButton() {
        Alert.alert("You long-pressed the button!")
    }

    render(){
        return(
            <View>
                <Button
                    onPress={this._onPressButton}
                    title="Press Me!"
                />
                <TouchableHighlight onPress={this._onPressButton} underlayColor="white">
                    <View style={styles.btn}>
                    <Text style={styles.btntext}>TouchableHighlight</Text>
                    </View>
                </TouchableHighlight>

                <TouchableOpacity onPress={this._onPressButton} >
                    <View style={styles.btn}>
                        <Text style={styles.btntext}>TouchableOpacity</Text>
                    </View>
                </TouchableOpacity>

                <TouchableNativeFeedback onPress={this._onPressButton}
                    background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}
                >
                    <View style={styles.btn}>
                        <Text style={styles.btntext}>TouchableNativeFeedback</Text>
                    </View>
                </TouchableNativeFeedback>

                <TouchableWithoutFeedback onPress={this._onPressButton} >
                    <View style={styles.btn}>
                        <Text style={styles.btntext}>TouchableWithoutFeedback</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableHighlight underlayColor="white"
                    onPress={this._onPressButton}
                    onLongPress={this._onLongPressButton}
                >
                    <View style={styles.btn}>
                        <Text style={styles.btntext}>Touchable with Long Press</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}
class PizzaTranslator extends Component{
    constructor( props){
        super(props);
        this.state = {mytext:''};
    }
    render(){
        return (
            <View style={{padding:10}}>
                <TextInput
                    style={{height:40, backgroundColor:"#FFF", padding:10, borderWidth:1, borderColor:"red"}}
                    placeholder="Type here to translate!"
                    onChangeText={(mytext) => this.setState({mytext})}
                />
                <Text style={{padding:10}}>
                    {this.state.mytext.split(' ').map((word) => word && '🍕').join(' ')}
                </Text>
            </View>
        )
    }
}
class Greeting extends Component {
    render() {
        return (
            <View>
            <Text style={styles.color_red}>Hello {this.props.name}</Text>
            <Text style={[styles.color_red, styles.big_blue]}>Hello {this.props.name}</Text>
            <Text style={[styles.big_blue, styles.color_red]}>Hello {this.props.name}</Text>
                <View style={{
                    // flex:1,
                    // flexDirection:'row',
                    // justifyContent:'flex-end',
                    // alignItems:'center'
                }}>
                    <View style={[styles.flexbox, { backgroundColor:'red'} ]}></View>
                    <View style={[styles.flexbox, { backgroundColor:'green'} ]}></View>
                </View>
            </View>
        )
    }
}

class Blink extends Component{
    constructor(props){
        super(props);
        this.state = {isShowingText: true};

        setInterval(()=>{
            this.setState(previousState =>{
                return {  isShowingText: !previousState.isShowingText };
            });
        },3000);
    }

    render(){
        let display = this.state.isShowingText ? this.props.text : ' ';
        return (
            <Text>{display}</Text>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffC',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    btn:{
        backgroundColor: '#009900',
        borderRadius:5,
        padding:5,
        margin:2
    },
    btntext:{
        color: 'white',
        fontWeight:'bold',
    },
    color_red: {
        color: '#CC0000'
    },
    big_blue: {
        fontWeight:'bold',
        fontSize:24,
        color: '#0000CC',
    },
    flexbox:{
        width:40,
        height:40,
    },
    list_item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    section_header:{
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    section_item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});

AppRegistry.registerComponent('AwesomeProject', () => MainContents);