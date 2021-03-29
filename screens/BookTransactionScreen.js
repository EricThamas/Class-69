import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity } from 'react-native';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import {BarCodeScanner} from "expo-barcode-scanner"
import *as Permissions from "expo-permissions"

export default class TransactionScreen extends React.Component {

  constructor(){
    super()
    this.state={
      hasCameraPermission:null,
      scanned:false,
      scannedData:"",
      buttonState:"normal"
    }
  }


  getCameraPermission= async()=>{
    const {status}= await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      // status === "granted" true when user has granted permission
      // status === "granted" false when user hasnot garnted permission
       hasCameraPermission: status==="granted",
       buttonState:"clicked",
      scanned:false,
       //scannedData:""
    })
  }


  handleBarcode= async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:"norma"
    })
  }
    render() {
      if(this.state.hasCameraPermission==="true"){
        return(
          <BarCodeScanner
          onBarCodeScanned={this.state.scanned? "no data yet" : this.handleBarcode}
          style={StyleSheet.absoluteFillObject}>
          </BarCodeScanner>
        )
      }
      else{
        return (
          <View style={styles.container}>
            <Text>{this.state.hasCameraPermission ? this.state.scannedData :"request permission"}</Text>
            <TouchableOpacity
            onPress={()=>{
              this.getCameraPermission
            }} style={styles.scanbutton}>

            <Text style={styles.scantext}>Scan QR Code </Text>
            </TouchableOpacity>
          </View>
        );
      }
      
    }
  }

  const styles= StyleSheet.create({
     container:{
       flex:1,
       justifyContent:"center",
       alignItems:"center"
     },
     scanbutton:{
       backgroundColor:"lightblue",
       height:30,
     },
     scantext:{
       fontSize:20,
       fontWeight:"bold",
       
     }
  })