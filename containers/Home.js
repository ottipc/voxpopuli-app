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
       console.log("*************************** Constructor *****************************************************")
       this.state = {
            voteData: [],
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

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
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
            }).then(res => res.json())
                .then(
                    (result) => {
                        this.setState({voteData: Demo, isFetching: false});
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    })
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    };
    //fetchVotes = this.fetchVotesAsync;




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

    componentDidUpdate(){
        /*if(this.state.voteData != Demo){
            this.setState({
                isLoaded: true,
                voteData: Demo
            });
        }*/
        console.log("*************************** component Did Update *****************************************************")


    }

    componentDidMount() {
        this.fetchVotesAsync();
        //this.timer = setInterval(() => this.fetchVotesAsync(), 5000);
    }

    /*componentDidMount() {
        console.log("*************************** component Did Mount *****************************************************")
        this.setState({
            isLoaded: true,
            voteData: Demo
        });
       /* fetch('http://o.ssystems.de/api/vote', {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.wC01CzL9dlurJYgqszJjDIyE0aQ_MPknUIgxrDkzssc',
                    'Content-Type': 'application/json'
                }
            )
        }).then(res => res.json())
            .then(
                (result) => {
                    //console.log("Setting items")
                    //console.log(result)

                    this.setState({
                        isLoaded: true,
                        voteData: Demo
                    });
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
            //this.forceUpdate()
            /*console.log("*************************** component DID Mount *****************************************************")
            await myApiService.getAllVotes().then(data => {
                this.setState({voteData: Demo, fields : []})
                console.log("setting vote data ......")
            //    console.log(JSON.stringify(this.state.voteData))
            }).catch(()=>
            {
                //...
            });*/
        //}

    render() {
            const voteData = this.state.voteData.slice(0,3)
            {
                console.log("----------RENDERING-----------------------------")
                console.log("----------VOTE DATA IN RENDERING-----------------------------")
                console.log(voteData)
            }
            return (



                <ImageBackground
                source={require('../assets/images/bg.png')}
                style={styles.bg}
            >
                <View style={styles.containerHome}>
                    <View style={styles.top}>
                        <City/>
                        <Text>voxipo</Text>
                        {/*<Filters />*/}
                    </View>

                    <CardStack
                        loop={true}
                        verticalSwipe={false}
                        renderNoMoreCards={() => null}
                        ref={swiper => (this.swiper = swiper)}
                    >
                        {Demo.map((item, index) => (
                            <Card key={index}>
                                <CardItem
                                    text={item.ruling_party_leader}
                                    detail={item.political_position}
                                    imageurl={item.picture_link}
                                    state_of_leader={item.state}
                                    matches="0"
                                    actions
                                    onPressLeft={() => this.swiper.swipeLeft()}
                                    onPressRight={() => this.swiper.swipeRight()}
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
