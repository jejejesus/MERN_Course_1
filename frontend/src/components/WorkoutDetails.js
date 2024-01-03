import { useWorkoutContext } from "../hooks/useWorkoutContext";

// date-fns
import { formatDistanceToNow } from 'date-fns';

const WorkoutDetails = ({workout}) => {
    const { dispatch } = useWorkoutContext();

    const handleClick = async () => {
        const res = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE'
        });
        const json = await res.json();

        if (!res.ok) {
            console.log('Error deleting workout');
        } else {
            dispatch({ type: 'DELETE_WORKOUT', payload: json });
            console.log('Workout deleted');
        }
    }

    return (
        <div className='workout-details'>
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    );
};

export default WorkoutDetails;