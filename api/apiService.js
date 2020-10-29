/**
 *
 *  get the right question belong to the id
 *
 */

const myApiService = {
    getVote: function (voteId) {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/vote' + '?id=eq.' + voteId)
        return fetch('http://o.ssystems.de/api/vote' + '?id=eq.' + voteId, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.nw72C0uncvYbV8Yc45Qzud4cQGWJFM39EHVelzoaED0',
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
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/user' + '?firebase_uid=eq.' + firebaseId)
        return fetch('http://o.ssystems.de/api/user' + '?firebase_uid=eq.' + firebaseId, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.wC01CzL9dlurJYgqszJjDIyE0aQ_MPknUIgxrDkzssc',
                    'Content-Type': 'application/json'
                }
            )
        }).then((response) => response.json())
            .then((json) => {
                console.log("&&&&&&&&&&&&&&&&RESPONSE%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(JSON.stringify(json));

                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    getAllVotes: function () {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/vote')
        return fetch('http://o.ssystems.de/api/vote', {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.wC01CzL9dlurJYgqszJjDIyE0aQ_MPknUIgxrDkzssc',
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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.wC01CzL9dlurJYgqszJjDIyE0aQ_MPknUIgxrDkzssc',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: aemail, firebase_uid: afirebase_uid})
        };
        fetch('http://o.ssystems.de/api/user', requestOptions)
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












    persistVoteResultForUser: function (voteId, userid, answer) {
        console.log("Persisting Answer.......");
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.nw72C0uncvYbV8Yc45Qzud4cQGWJFM39EHVelzoaED0',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vote_id: voteId, user_id: userid, answer: answer})
        };
        fetch('http://o.ssystems.de/api/user_vote', requestOptions)
            .then((response) => {
                console.log("Answer persisted");
                return response;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    getAllUserVotes: function (userid) {
        console.log("Now fetching from  Url : " + 'http://o.ssystems.de/api/user_vote' + '?&user_id=eq.' + userid)
        return fetch('http://o.ssystems.de/api/user_vote' + '?&user_id=eq.' + userid, {
            method: 'get',
            headers: new Headers({
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidm94aXBvX3VzZXIifQ.nw72C0uncvYbV8Yc45Qzud4cQGWJFM39EHVelzoaED0',
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
