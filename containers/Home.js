import React, {Component} from 'react';
import {ImageBackground, Text, View} from 'react-native';
import CardStack, {Card} from 'react-native-card-stack-swiper';
import City from '../components/City';
import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import Demo from '../assets/data/demo_vox.js';
import myApiService from '../api/apiService';


//const votedata = myApiService.getAllVotes();


class Home extends Component {


    constructor(props) {
       super(props);
       console.log("*************************** Constructor Home *****************************************************")
       console.log(props.navigation.state.params.user)
        this.state = {
           user_id: props.navigation.state.params.user[0].id,
           user_email: props.navigation.state.params.user[0].email,
           loading: 'initial',
           voteData: []
       }
    }
    persistVote(userId, voteId, answer) {
        console.log("Persisting Vote!!!!")
        myApiService.persistVoteResultForUser(voteId, userId, answer);
    }




    async fetchVotesAsync() {
        try {
            this.setState({...this.state, isFetching: true});
            const response = await fetch('http://o.ssystems.de/api/vote', {
                method: 'get',
                headers: new Headers({
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.wC01CzL9dlurJYgqszJjDIyE0aQ_MPknUIgxrDkzssc',
                        'Content-Type': 'application/json'
                    }
                )
            })
            let votes = await response.json();
            votes = this.filterEmptyData(votes)
            //console.log("Votes")
            //console.log(votes)
            return votes
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };

    async filterEmptyData(data) {
        let filterData = [];
        let userVotes = await myApiService.getAllUserVotes(this.state.user_id)
        for(let i = 0; i < data.length; i++) {
            if(data[i].picture_link === "" || data[i].ruling_party_leader === ""){
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
        console.log('This happens 3rd.');

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
                console.log("----------VOTE DATA IN RENDERING-----------------------------")
            //    console.log(voteData)
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
                            <Card key={index}>
                                <CardItem
                                    text={item.ruling_party_leader}
                                    detail={item.political_position}
                                    imageurl={item.picture_link}
                                    state_of_leader={item.state}
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
