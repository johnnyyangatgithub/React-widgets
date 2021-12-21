import React from 'react';

const Link = ({ className, href, children }) => {

    const onClick = (e) => {
        //These are both boolean properties on Mac OS we make use of metal key.
        // On windows we make use of control key.
        // These are going to be either true or false to indicate whether or not 
        // that respective key was held down when a user clicked on this thing.
        // So if either these are true, then we're going to not want to run any of this stuff.
        // Instead, we're going to want to allow the browser to just do its normal thing, which is to open up
        // a new tab and navigate to href on this link.
        if (e.metaKey || e.ctrlKey) {
            return;
        }
        // This is because we don't want reload page when every-single-time users click the navgation bar.
        e.preventDefault();
        // This is to change the URL without refresh the whole page
        window.history.pushState({}, '', href);
        // This is going to communicate over to those root components that the url has just changed.
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    };

    return (
        <a onClick={onClick} className={className} href={href}>
            {children}
        </a>
    );
};

export default Link;