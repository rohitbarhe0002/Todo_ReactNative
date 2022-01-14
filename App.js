import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import { FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';


const COLORS = {primary:'#1f145c',white:'#fff'}

export default function App() {

  const [show,setShow] = useState(false)
  const [textInput,setTextInput] = useState( '')
  const [todos,setTodos] = useState([
    {id:1,task:"first Todo",completed:false},
        {id:2,task:"second Todo",completed:true},
  ])
 console.log("this",{todos});

  const ListItem = ({todo}) =>{

    console.log(todo);
    console.log("this is s",show);

  const passData = (todoId) =>{
    markTodoComplete(todoId)
    setShow(!show)
  }

    return (

    <View style={styles.listitems}>
    <View style={{flex:1}}>
      <Text style={{fontWeight:'bold',fontSize:15,color:COLORS.primary,
      textDecorationLine:todo?.completed?'line-through':'none',}}>{todo.task}</Text>
      <Text style={{fontWeight:'bold',fontSize:15,color:COLORS.primary,}}>{todo.id}</Text>
    </View>

  
<TouchableOpacity style ={[styles.actionIcon]} onPress={()=>passData(todo.id)}>
  <Icon name="done" size={20} color={COLORS.white}/>
</TouchableOpacity>
 

<TouchableOpacity style ={[styles.actionIcon,{backgroundColor:'red'}]}  onPress={()=>deleteTodo(todo.id)}>
  <Icon name="delete" size={20} color={COLORS.white}/>
</TouchableOpacity>


<TouchableOpacity style ={[styles.actionIcon,{backgroundColor:'white'}]}  onPress={()=>edittodo(todo.id)}>
  <Icon name="edit" size={20} color={COLORS.primary}/>
</TouchableOpacity>

    </View>
    )
  }
  const addTodo = () => {
    if(textInput=='')
    {
      Alert.alert("error","please input todo")
    }
    else{
    const newTodo = {
      id:Math.random(),
      task:textInput,
      completed:false,
    }
    setTodos([...todos,newTodo]);
    setTextInput('')
  }
}


const markTodoComplete = todoId => {
  if(show){
  const newTodos = todos.map((item)=>{
    if(item.id == todoId){
      return{...item,completed:true}
    }
    return item;
  })
  setTodos(newTodos)
  console.log(todoId);
}
else{
  const newTodos = todos.map((item)=>{
    if(item.id == todoId){
      return{...item,completed:false}
    }
    return item;
  })
  setTodos(newTodos)
  console.log(todoId);
}
}
const deleteTodo = (todoId) =>{
  const newTodos = todos.filter(item=>item.id !== todoId)
  setTodos(newTodos)
}

const edittodo = (todoId) =>{
console.log("thi",todoId);
  const newTodos = todos.find(item=>item.id == todoId)
  setTextInput(newTodos.task)
  console.log("this",newTodos.task);
}

  return (
  <SafeAreaView style={{flex:1,backgroundColor:COLORS.white}}>
    <View style={styles.header}>
    <Text style={{fontWeight:'bold',fontSize:20,color:COLORS.primary}}>TODO APP</Text>
         
          </View>
          <FlatList 
          showsVerticalScrollIndicator={false}
          contentContainerStyle = {{padding:20,paddingBottom:100}}
           data={todos} renderItem={({item})=> <ListItem todo = {item} />}
           />
          <View style={styles.footer}>
            <View style={styles.InputContainer}>
              <TextInput placeholder='Add-Todo' value={textInput}onChangeText={(text)=>setTextInput(text)}/>
            </View>
         
          <TouchableOpacity onPress={addTodo}>
            <View style={styles.IconContainer}>
              <Icon
              name="add"
              color={COLORS.white}
              size={30}
              />
              
            </View>
          </TouchableOpacity>
        </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionIcon:{
    height:25,
    width:25,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    borderRadius:3,
  },
  listitems:{
    padding:20,
    backgroundColor:'skyblue',
    flexDirection:'row',
    elevation:12,
    borederRadius:7,
    marginVertical:10,
  },
  header: {
   padding:20,
   flexDirection:'column',
   textAlign:'center',
   justifyContent:'space-between',
   backgroundColor:'pink'

  },
  footer:{
    position:'absolute',
    bottom:0,
    color:COLORS.white,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20

  },
  InputContainer:{
    backgroundColor:COLORS.white,
    elevation:40,
    flex:1,
    height:50,
    marginVertical:20,
    marginRight:20,
    borderRadius:30,
    paddingHorizontal:20,
  },
  IconContainer:{
    height:50,
    widht:50,
    backgroundColor:COLORS.primary,
    borderRadius:25,
    elevation:40,
    justifyContent:'center',
    alignItems:'center'
  }
});
