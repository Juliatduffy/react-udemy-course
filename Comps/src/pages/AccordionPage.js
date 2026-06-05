import Accordion from '../components/Accordion';

function AccordionPage(){
  const items = [
    {
      id: 1,
      label: "section 1",
      content: "this is the content for section 1",
      
    },
    {
      id: 2,
      label: "section 2",
      content: "this is the content for section 2",
      
    },
  ]
  return <Accordion items={items}/>
}

export default AccordionPage;