import { useEffect } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

// components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutsForm from '../components/WorkoutsForm';

const Home = () => {
    const { workouts, dispatch } = useWorkoutContext(); 

    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts');
            const data = await res.json();
            if(res.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: data })
            }
        }
        fetchWorkouts();
    }, [dispatch]);

    return (
        <div className='home'>
            <WorkoutsForm /> 
            <div className='workouts'>
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
        </div>
    );
};

export default Home;