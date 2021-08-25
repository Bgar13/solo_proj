import React from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';

const Link = (props) => {


    return (
        <div>
            <div>
                <button className="editBtn" onClick={ () => navigate(`/thoughts`) }>Go Home</button>
            </div>
            <h1 className="header">Helpful links</h1>
                <p>Websites to seek help</p>
                <div><a  href="https://www.samhsa.gov/find-help/national-helpline">samhsa</a></div>
                <div><a href="https://www.nami.org/Home">nami</a></div>
                <div><a  href="https://www.mentalhealthfirstaid.org/mental-health-resources/">Mental Health First Aid</a></div>
                <div><a  href="https://www.calhope.org/?utm_source=brandgiants&utm_medium=SEM&utm_campaign=calhope&utm_content=ZH&gclid=Cj0KCQjwsZKJBhC0ARIsAJ96n3UyPzeD-_q6Raiqm99FwQ_ydVGZWcs5tI9P1eNam5sjy26jPwJVto8aAnCBEALw_wcB">CalHOPE</a></div>
                <div><a  href="https://www.betterhelp.com/">BetterHelp</a></div>
                <div><a  href="https://www.sprc.org/">Suicide Prevention Resource Center</a></div>
                <div><a  href="https://afsp.org/">American Foundation for Suicide Prevention</a></div>
                <h2>If you or someone you know is struggling with suicide please call:</h2>
                <h2>National Suicide Prevention Lifeline</h2>
                <h1>800-273-8255</h1>
        </div>
    )
};
export default Link;