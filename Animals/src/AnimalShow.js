import bird from './svg/bird.svg';
import cat from './svg/cat.svg';
import cow from './svg/cow.svg';
import dog from './svg/dog.svg';
import horse from './svg/horse.svg';
import heart from './svg/heart.svg';
import {useState} from 'react';
import './AnimalShow.css'


// You can't write src={bird} or src={cat} 
// directly because you don't know at render time which animal to show. Instead, svgMap[type] dynamically picks the right SVG based on whatever string is passed in.
const svgMap ={
    bird,
    cat,
    cow,
    dog,
    horse
};

function AnimalShow({type}){
    const [clicks, setClicks] = useState(0);
    const handleClick = () => {
        setClicks(clicks + 1);
    };
    
    return (
        <div className="animal-show">
            <div onClick={handleClick}>
                <img className="animal" src={svgMap[type]} alt="animal"></img>
            <img className="heart" src={heart} style={{width: 10 + clicks * 10}} alt="heart"></img>
            </div>
        </div>
    );

}
export default AnimalShow;