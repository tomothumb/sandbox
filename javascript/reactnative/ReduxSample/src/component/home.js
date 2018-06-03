// home.js
import React, {Component} from 'react';
import {View, Text, TextInput, Button,ScrollView, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import { action_btn_activate, action_btn_close} from '../store/btn/action';
import { addTodo,
    completeTodo,
    removeTodo,
    setVisibilityFilter
} from '../store/todo/action';
import styles from '../assets/style/style_home'



let Todo = ({item,index,completeTodo,removeTodo}) => {

    const complete_button = (item.completed)
        ? <Text>Completed!</Text>
        : <Button
            onPress={() => completeTodo(index)}
            title="Done!"
        />;

    return (
        <View style={{borderBottomWidth:1,borderBottomColor:'#CCCCCC',backgroundColor:'white',padding:10}}>
            <Text>{item.text}</Text>
            {complete_button}
            <Button
                onPress={() => removeTodo(index)}
                title="Delete"
            />;
        </View>
    )
};

const mapDispatchToPropsTodo = (dispatch, ownProp) => {
    return {
        completeTodo: (e) => {dispatch(completeTodo(e))},
        removeTodo: (e) => {dispatch(removeTodo(e))},
    }
};
Todo = connect(
    null,
    mapDispatchToPropsTodo
)(Todo);

let TodoList = ({todos}) => {
    return (
        <View>
            {todos.map((item,idx)=>{
                console.log(idx);
                return (
                    <Todo key={idx} index={idx} item={item} />
                )
            })}
        </View>
    )
};

const mapStateToPropsTodoList = (state, ownProp) => {
    return {
        todos: state.todo_reducer.items
    }
};
TodoList = connect(
    mapStateToPropsTodoList,
    null
)(TodoList);


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text:'',
        };
        this._handlePressAdd = this._handlePressAdd.bind(this);
        this._handleTextInput = this._handleTextInput.bind(this);
    }

    _handlePressAdd(){
        this.props.addTodo( this.state.text );
        this.setState({text:""});
    }
    _handleTextInput(text){
        this.setState({text})
    }

    render() {

        return (
            <View>
                <ScrollView>
                <Text style={styles.text}>{this.props.btnstate.title || '未設定'}</Text>
                {this.props.btnstate.title ?
                    <Button
                        onPress={this.props.action_btn_close}
                        title="Reset"
                        style={styles.button}
                    /> :
                    <Button
                        onPress={() => this.props.action_btn_activate({ title: 'アクティブです' })}
                        title="Set Active"
                        style={styles.button}
                        accessibilityLabel="Learn more about this purple button"
                    />
                }

                <TextInput
                    style={styles.input_text}
                    onChangeText={this._handleTextInput}
                    value={this.state.text}
                />

                <Button
                    title="Add"
                    style={{color:'green'}}
                    onPress={this._handlePressAdd}
                />

                <TodoList />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps= (state, ownProp) => {
    return {
        btnstate: state.btn_reducer,
        todostate: state.todo_reducer
    }
};

const mapDispatchToProps = (dispatch,ownProp) => {
    return {
        action_btn_activate: (e) => { dispatch(action_btn_activate(e)); },
        action_btn_close: () => { dispatch(action_btn_close()); },
        addTodo: (e) => { dispatch(addTodo(e)); },
        setVisibilityFilter: (e) => { dispatch(setVisibilityFilter(e)); }
    }
};

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default Container;



