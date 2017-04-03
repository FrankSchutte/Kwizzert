import {REQUEST_REGISTER, RECEIVE_REGISTER} from '../constants';

import kwizzertAPI from '../kwizzertAPI'
import kwizzertWebSocket from '../kwizzertWebSocket';

const registerActionCreator = {
    register(teamName, code) {
        return (dispatch) => {
            dispatch({type: REQUEST_REGISTER});
            kwizzertAPI.validQuizCode(code, (err, res) => {
                if (err) {
                    dispatch({type: RECEIVE_REGISTER, success: false});
                } else {
                    const status = JSON.parse(res.text).status;

                    if (status === 'open') {
                        const request = {
                            action: 'REGISTER',
                            code: code,
                            type: 'team',
                            teamName: teamName
                        };

                        kwizzertWebSocket.send(JSON.stringify(request));
                        dispatch({type: RECEIVE_REGISTER, success: true});
                    }
                }
            });
        }
    }
};

export default registerActionCreator;
