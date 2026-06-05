import Button from '../components/Button';
import { LuCat } from "react-icons/lu";
import { FaBluesky } from "react-icons/fa6";
import Accordioin from '../components/Accordion';

function ButtonPage() {

  const handleClick = () => 
  {
    console.log('click');
  }

  return (
    <div>
      <div>
        <Button className={"mb-5"} secondary outline rounded onClick={handleClick}>          
          <LuCat/>
          Click me!!
        </Button>
      </div>
      <div>
        <Button danger outline>
        <FaBluesky/>
          Buy Now!
        </Button>
      </div>
      <div>
        <Button warning>See Deal!</Button>
      </div>
      <div>
        <Button secondary outline>
          Hide Ads!
        </Button>
      </div>
      <div>
        <Button primary rounded>
          Something!
        </Button>
      </div>
    </div>
  );
}

export default ButtonPage;