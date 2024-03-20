import { FC, useState } from 'react';
import arrow from '../assets/icons/icons8-arrow-50.png';
import icon from '../assets/images/1.webp';
import '../../styles/styles.scss';

const App: FC = () => {
    const [count, setCount] = useState<number>(0);

    console.log(process.env.REACT_APP_HOSTNAME);

    return (
        <div className='hello'>
            <div>   
                test
            </div>
            <h1>Счетчик {count}</h1>

            <img src={icon} alt='test'/>

            <img src={arrow} alt='arrow'/>

            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
        </div>
    )
}

export default App;