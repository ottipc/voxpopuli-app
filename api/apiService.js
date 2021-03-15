/**
 *
 *  get the right question belong to the id
 *
 */
export const API_URL = "https://voxipo.com/api";
import axios from 'axios';



const myApiService = {
    getVote: function (voteId) {
        console.log("Now fetching from  Url : " + API_URL + '/vote' + '?id=eq.' + voteId)
        return fetch(API_URL + '/vote' + '?id=eq.' + voteId, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                //console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },


    getUserByFireBaseUid: function (firebaseId) {
        console.log("Now fetching from  Url : " + API_URL + '/user' + '?firebase_uid=eq.' + firebaseId)
        return fetch(API_URL + '/user' + '?firebase_uid=eq.' + firebaseId, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
//                console.log("&&&&&&&&&&&&&&&&RESPONSE%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
//                console.log(JSON.stringify(json));

                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    getAllVotes: function () {
        console.log("Now fetching from  Url : " + API_URL + '/vote')
        return fetch(API_URL + '/vote', {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                //console.log(JSON.stringify(json))
                return json;
            }).catch((error) => {
                console.error(error);
            });
    },

    persistUser: function (aemail, afirebase_uid) {
        console.log("Persisting User.......");
        console.log("Email "  + aemail);
        console.log("Firebase "  + afirebase_uid);

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: aemail, firebase_uid: afirebase_uid})
        };
        console.log("Now do POST to : " + API_URL + '/user');
        console.log("REQUEST OPTIONS : ");
        console.log(requestOptions);
        fetch(API_URL + '/user', requestOptions)
            .then((response) => {
                console.log("User persisted Response : ");
                console.log(response);
                return response;
            })
            .catch((error) => {
                alert(error)
                console.error(error);
            });
    },

    persistVoteResultForUser: function (voteId, userid, answer, location) {
        console.log("Persisting Answer.......");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vote_id: voteId, user_id: userid, answer: answer, location : location})
        };
        fetch(API_URL + '/user_vote', requestOptions)
            .then((response) => {
                //console.log("************************************Answer persisted REsponse***************************************************");
                //console.log(response);
                return response;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    getAllUserVotes: function (userid) {
        console.log("Now fetching from  Url : " + API_URL + + '/user_vote' + '?&user_id=eq.' + userid)
        return fetch(API_URL + '/user_vote' + '?&user_id=eq.' + userid, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX2NhbGxfdXNlciJ9.-L80lMF-idtBCYa79iMsKforizCbwtwWL4YwhG56k70',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                //console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },

   /* getQuestionWithAxios: function (questionId) {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/question' + '?id=eq.' + questionId)
        let config = {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoicXVlc3Rpb25fYXBwX3VzZXIifQ.P5lcq--gTbuw-ZNvnNDpuE61QyWNFg6RvnK9OzEG3pU',
                'Content-Type': 'application/json'
            }
        }
        return axios.get('http://o.ssystems.de/api/question' + '?id=eq.' + questionId, config
        ).then((response) => response.json())
            .then((json) => {
                console.log(json);
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },*/

};


export default myApiService
