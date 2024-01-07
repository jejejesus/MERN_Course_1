import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext(); 
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts', {
                headers: { 'Authorization': `Bearer ${user.token}` }
            });
            const data = await res.json();
            if(res.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data })
            }
        }

        if (user) fetchWorkouts();
    }, [dispatch, user]);

    return (
        <div className='homepage'>
            <div className='workouts'>
                {workouts && workouts.length === 0 && <div className='message'>No workouts yet!</div>}
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm /> 
        </div>
    );
};

export default Home;