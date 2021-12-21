import { useEffect, useState } from 'react';

//Ternary expession to decide which children widgets should we display
const Route = ({ path, children }) => {

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        //Create a call back function is only for remove it easily later on RETURN syntax
        const onLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
        };
    }, []);

    return currentPath === path
        ? children
        : null;
};

export default Route;