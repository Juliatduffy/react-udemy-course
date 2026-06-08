import {createContext, useState, useEffect} from 'react';

const NavigationContext = createContext();

function NavigationProvider({children}) {

    const[currentPath, setCurrentPath] = useState(window.location.pathname);

    // handles forward back navigation in browser (when those addresses were pushed with push state)
    useEffect(() => {
        const handler = () => {
            setCurrentPath(window.location.pathname);
        }
        window.addEventListener('popstate', handler);
        
        return (() => { 
            window.removeEventListener('popstate', handler);
        });
    }, []);

    const navigate = (to) => {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
    }

    return (<NavigationContext.Provider value={{currentPath, navigate}}>
        {children}
    </NavigationContext.Provider>);
}

export {NavigationProvider}
export default NavigationContext