import React, {Component} from 'react';
import {Image, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import City from '../components/City';
import CardItem from '../components/CardItem';
import Demo from '../assets/data/demo_vox.js';
import myApiService from '../api/apiService';
import { firebase } from '../src/firebase/config'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//const votedata = myApiService.getAllVotes();
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    }
})
class Registration extends Component {

    onRegisterPress = () => {
        if (this.state.setPassword !== this.state.setConfirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.setEmail, this.state.setPassword)
            .then((response) => {
                const uid = response.user.uid
                alert("Response")
                console.log(response)
                const data = {
                    id: uid,
                    email:this.state.setEmail,
                    fullName:this.state.setFullName,
                }
                //const usersRef = firebase.firestore().collection('users')
                this.props.navigation.navigate('Home', {user: data})

                /*usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        alert("Navigate")
                        console.log("Navigate......")

                        //navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        console.log("Error")
                        console.log(error)
                        alert(error)
                    });*/
            })
            .catch((error) => {
                alert(error)
            });
    }



    constructor(props, navigation) {
       super(props);
       console.ignoredYellowBox = ['Setting a timer'];
       console.log("*************************** Constructor *****************************************************")
       this.state = {
           navigation : navigation,
           voteData: [],
            fullName:'',
           setFullName:'',
           email : '',
           setEmail:'',
           password:'',
           setPassword:'',
           confirmPassword:'',
           setConfirmPassword:''


       }
        //this.fetchVotesAsync().then(r => console.log(r))
        /*fetch('http://o.ssystems.de/api/vote', {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.wC01CzL9dlurJYgqszJjDIyE0aQ_MPknUIgxrDkzssc',
                    'Content-Type': 'application/json'
                }isFetching: true
            )
        }).then(res => res.json())
            .then(
                (result) => {
                    //console.log("Setting items")
                    //console.log(result)
                    this.state = {
                        voteData: Demo,
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )*/



        /*myApiService.getAllVotes().then(data => {
            this.state = {
                voteData: Demo,
            }
            //console.log("Data in Constructor ......")
            //console.log(this.state.voteData)
        })*/
        //this.voteData = this.voteData.bind(this)
        //.then(console.log("VoteData : " + this.state.voteData)); // data.message = 'updated message'

    }


    /*filterEmptyData(data) {
        let filterData = [];
        for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            //alert(obj);
        }
    }
*/
   /* componentWillMount() {
        console.log("*************************** component WILL Mount *****************************************************")
        myApiService.getAllVotes().then(data => {
            this.setState({voteData: Demo, fields : []})
            console.log("setting vote data ......")
            console.log(JSON.stringify(this.state.voteData))
        })
    }
*/


    render() {
            return (

                <View style={styles.container}>
                    <KeyboardAwareScrollView
                        style={{ flex: 1, width: '100%' }}
                        keyboardShouldPersistTaps="always">

                        <TextInput
                            style={styles.input}
                            placeholder='Full Name'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) =>  this.setState({
                                setFullName: text,
                            })}
                            value={this.state.setFullName}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor="#aaaaaa"
                            onChangeText={(text) =>  this.setState({
                                setEmail: text,
                            })}
                            value={this.state.setEmail}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) =>  this.setState({
                                setPassword: text,
                            })}
                            value={this.state.setPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="#aaaaaa"
                            secureTextEntry
                            placeholder='Confirm Password'
                            onChangeText={(text) =>  this.setState({
                                setConfirmPassword: text,
                            })}
                            value={this.state.setConfirmPassword}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            onPress={() => this.onRegisterPress()}>
                            <Text>Create account</Text>
                        </TouchableOpacity>
                    </KeyboardAwareScrollView>
                </View>
        );
    }
};

export default Registration;
