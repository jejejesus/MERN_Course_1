import { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, load, reps};

        const res = await fetch('/api/workouts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(workout)
        });

        const json = await res.json();

        if (!res.ok) {
            setError(json.error);
            setEmptyFields(json.error);
        } else {
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
            console.log('Workout added');
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Title</label>
            <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={emptyFields.includes('Title') ? 'error' : ''}
            />
            <label>Load (kg)</label>
            <input
                type='number'
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                className={emptyFields.includes('Load') ? 'error' : ''}
            />
            <label>Reps</label>
            <input
                type='number'
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className={emptyFields.includes('Reps') ? 'error' : ''}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default WorkoutForm;