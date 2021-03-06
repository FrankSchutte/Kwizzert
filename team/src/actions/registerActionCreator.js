import {PENDING_REGISTER, RECEIVE_REGISTER, KICK_TEAM} from '../constants';

import kwizzertAPI from '../kwizzertAPI'
import kwizzertWebSocket from '../kwizzertWebSocket';

const registerActionCreator = {
    register(teamName, code) {
        return (dispatch) => {
            dispatch({type: PENDING_REGISTER});
            kwizzertAPI.validQuizCode(code, (err, res) => {
                if (err || res.status !== 'open') {
                    dispatch({type: RECEIVE_REGISTER, success: false});
                } else {
                    if (res.status === 'open') {
                        kwizzertWebSocket.register(code, teamName);
                        dispatch({type: RECEIVE_REGISTER, success: true, code: code, teamName: teamName});
                    }
                }
            });
        }
    },
    kick() {
        return {type: KICK_TEAM};
    }
};

export default registerActionCreator;
