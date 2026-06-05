// 5 steps to create a component and display on the screen:

// 1. Import the React and React DOM libraries note: nice to have both libraries since one is for basic react and the other
// is specific to displaying things in the browser since react can be used on mobile as well

import React from 'react'; // defines what a component is
import ReactDOM from 'react-dom/client' // knows how to take components, turn them into html, and show it on a browser

// 2. Get reference to div with ID root
const el = document.getElementById('root');

// 3. Tell React to take control of that element
const root = ReactDOM.createRoot(el);

// 4. Create a component
function App() {
  return (
    <div className="wrapper">
      <textarea
        readonly
        maxLength={3}
        spellCheck
        style= {{ backgroundColor: 'gray'}}
      />
    </div>
  );   
}

// 5. Show component on the screen
root.render(<App/>)