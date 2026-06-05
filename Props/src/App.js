import ProfileCard from './Profile';
import AlexaImage from './images/alexa.png';
import SiriImage from './images/siri.png';
import 'bulma/css/bulma.css'

function App() {
  const alexa = "Alexa";
  const alexaUser = "Alexa99";
  const siri = "Siri";
  const siriUser = "Siri99";

  return (
  <div>    
    <ProfileCard title = {alexa} user = {alexaUser} image={AlexaImage}/>
    <ProfileCard title = {siri} user = {siriUser} image = {SiriImage}/>
  </div>
  );
  
}

export default App;
