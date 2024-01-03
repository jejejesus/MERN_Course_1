import {useEffect, useState} from 'react';

// components
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
    const [workouts, setWorkouts] = useState(null);
    useEffect(() => {
        const fetchWorkouts = async () => {
            const res = await fetch('/api/workouts');
            const data = await res.json();
            if(res.ok) {
                setWorkouts(data);
            }
        }
        fetchWorkouts();
    }, []);

    return (
        <div className='home'>
            <div className='workouts'>
                {workouts && workouts.map(workout => (
                    <WorkoutDetails key={workout.id} workout={workout}/>
                ))}
            </div>
        </div>
    );
};

export default Home;