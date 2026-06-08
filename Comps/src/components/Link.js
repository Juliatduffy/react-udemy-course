import useNavigation from '../hooks/use-navigation';
import { useContext } from 'react';
import classNames from 'classnames';

function Link({to, children, className, activeClassName}){

    const {navigate, currentPath} = useNavigation();

    const classes = classNames(
        'text-blue-500', 
        className,
        currentPath === to && activeClassName
    );

    const handleClick = (e) => {
        if(!(e.metaKey || e.ctrlKey)){
            e.preventDefault();
            navigate(to);
        }
    }

    return <a className={classes} onClick={handleClick} href={to}>{children}</a>
}
export default Link;