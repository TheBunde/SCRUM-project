import React, {Component} from 'react';
import '../../css/Back.css';
import { createHashHistory } from 'history';

const history = createHashHistory();
/**
 * @class Back
 */
class Back extends Component{

    render() {
        return (
            <div id="backBtn">
                <button type="button" class="btn btn-danger"  onClick={this.back}>Back</button>
            </div>
        );
    }

    back(){
        history.goBack();
    }
}

export default Back;