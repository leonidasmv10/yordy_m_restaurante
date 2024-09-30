import React, { Children } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ActiveLink = ({ children, ...props }) => {
    const location = useLocation();
    const child = Children.only(children);
    let className = child.props.className || '';

    if (location.pathname === props.to && props.activeClassName) {
        className = `${className} ${props.activeClassName}`;
    }

    delete props.activeClassName;

    return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

export default ActiveLink;
