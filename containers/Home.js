import React, {Component} from 'react';
import {ImageBackground, Text, View, Alert} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import City from '../components/City';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import Demo from '../assets/data/demo_vox.js';
import myApiService,{API_URL} from '../api/apiService';


//const votedata = myApiService.getAllVotes();


class Home extends Component {


    constructor(props) {
       super(props);
       console.log("*************************** Constructor Home *****************************************************")
       //console.log(props.navigation.state.params.user)
        this.state = {
            //user_id: 3,
            user_id: props.navigation.state.params.user[0].id,
            user_email: props.navigation.state.params.user[0].email,
            //user_email: "test@test.de",
           loading: 'initial',
           voteData: [],
           location: null
       }
    }
    async persistVote(userId, voteId, answer) {
       await this.findCoordinates();
        console.log("Persisting Vote!!!!")
        console.log("Location : " + this.state.location)
        myApiService.persistVoteResultForUser(voteId, userId, answer, this.state.location);
    }




    async fetchVotesAsync() {
        try {
            this.setState({...this.state, isFetching: true});
            console.log("Now fetching from ... " + API_URL + '/vote');
            const response = await fetch(API_URL + '/vote', {
                method: 'get',
                headers: new Headers({
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                        'Content-Type': 'application/json'
                    }
                )
            })
            let votes = await response.json();
            console.log("*** VOTES ***");
            console.log(votes);
            votes = this.filterEmptyData(votes)
            //console.log("Votes")
            //console.log(votes)
            return votes
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };




    findCoordinates() {
        console.log("========================FINDING KOOS ====================");
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }


    async filterEmptyData(data) {
        let filterData = [];
        let userVotes = await myApiService.getAllUserVotes(this.state.user_id)
        for(let i = 0; i < data.length; i++) {
            if(data[i].thumbnail === "" || data[i].ruling_party_leader === ""){
                continue;
            }
            if(this.voteExists(userVotes, data[i])){
                continue;
            }
            filterData.push(data[i])
        }
        return filterData
    }

    voteExists(userVotes, voteobject) {
        for (let index = 0; index < userVotes.length; ++index) {
            let user_vote = userVotes[index];
            if (user_vote.vote_id == voteobject.id) {
                return true
            }
        }
        return false;
    }

    componentDidMount() {
        console.log('****** COMPONENT DID MOUNT ************************');
        this.findCoordinates();
        this.setState({ loading: 'true' });
        this.fetchVotesAsync()
            .then((data) => {
                console.log('This happens 7th.');
                //console.log(data);
                this.setState({
                    voteData: data,
                    loading: 'false'
                });
            });
    }

    render() {
            {
                console.log("----------RENDERING-----------------------------")
            }

            if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return (<Text>Intializing...</Text>);
        }


        if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return (<Text>Loading...</Text>);
        }

        if (this.state.voteData === undefined || this.state.voteData.length === 0) {
            return (<Text>Empty...</Text>);
        }

            return (
                <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View style={styles.containerHome}>
                    <View style={styles.top}>
                        <City/>
                        <Text>{this.state.user_email}</Text>
                        {/*<Filters />*/}

                    </View>

                    <CardStack
                        loop={false}
                        verticalSwipe={false}
                        renderNoMoreCards={() => null}
                        ref={swiper => (this.swiper = swiper)}
                    >
                        {this.state.voteData.map((item, index) => (
                            <Card
                                onSwipedLeft={() => {
                                    this.persistVote(this.state.user_id, item.id,false)
                                }}
                                onSwipedRight={() => {
                                    this.persistVote(this.state.user_id, item.id,true)
                                }}
                                key={index}>
                                <CardItem
                                    country={item.country}
                                    text={item.political_leaders}
                                    political_position={item.political_position}
                                    imageurl={item.thumbnail}
                                    state_of_leader={item.state}
                                    licence_text={item.licence_text}
                                    matches="0"
                                    actions
                                    onPressLeft={() => {
                                        this.swiper.swipeLeft()
                                        this.persistVote(this.state.user_id, item.id,false)
                                    }}
                                    onPressRight={() => {
                                        this.swiper.swipeRight()
                                        this.persistVote(this.state.user_id, item.id,true)
                                    }}
                                />
                            </Card>
                        ))}
                    </CardStack>
                </View>
            </ImageBackground>
        );
    }
};

export default Home;
