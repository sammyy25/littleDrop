import React from 'react';
import { Link } from 'react-router-dom';


function Verify(props) {

    return (
        <div>
            <form>
            <li>
              <label htmlFor="token">
                            Enter vverification code
                        </label>
                   <input type="text" name="token" id="token" />
                    </li>
            </form>
        
        </div>
    )
}

export default Verify