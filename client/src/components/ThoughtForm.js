import { navigate} from '@reach/router';
import React from 'react';


const ThoughtForm = (props) => {
    const{thought,setThought ,errors,submitHandler,buttonLabel} = props;

    const moods = [ 
        'Happy', 
        'Sad',
        'Angry',
        'Disappointed',
        'Indifferent', 
        'Humorous', 
        'Gloomy', 
        'Romantic',
        'Lighthearted',
        'Lonely', 
        'Aggravated',
        'Bitter',
        'Contempt',
        'Cynical',
        'Disdain',
        'Disgruntled',
        'Irate',
        'Moody',
        'On edge',
        'Outraged',
        'Pissed',
        'Resentful',
        'Upset',
        'Vindictive',
        'Centered',
        'Content',
        'Fulfilled',
        'Patient',
        'Peaceful',
        'Present',
        'Relaxed',
    ];
    

    const inputChange = (e) =>{
        console.log("e.target.name: " +e.target.name);
        console.log("e.target.value: " +e.target.value);

        let newStateObject = { ...thought };
        newStateObject[e.target.name ]= e.target.value;
        setThought(newStateObject);

    };

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div>
                <label>Thought of the day </label>
                    {
                        errors.myThought ?
                        <span className="error-text">{errors.myThought.message}</span>
                        : null
                    }
                    <input
                        type="text"
                        name="myThought"
                        value={thought.myThought}
                        onChange={inputChange}
                    />
                </div>
                <div>
                    <label>My Mood </label>
                    {
                    errors.mood ?
                        <span className="error-text">{errors.mood.message}</span>
                        : null
                    }
                    <select
                    name="mood"
                    value={ thought.mood }
                    onChange={ (e) => inputChange(e) }
                    >
                    <option value=""></option>
                    {
                        moods.map((mood, index) => (
                        <option value={ mood } key={ 'mood-' + index }>{ mood }</option>
                        ))
                    }
                    </select>
                </div>
                <button>{ buttonLabel }</button>
                <button onClick={ () => navigate("/thoughts") } className="cancelBtn">Cancel</button>

            </form>
        </div>
    )
}
export default ThoughtForm;