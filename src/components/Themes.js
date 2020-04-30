import React, { Fragment, useState, useEffect } from 'react';
import { getContext } from '../Twitch';

const Themes = () => {

    const colors = ['purple', 'darkpurple', 'newpurple', 'green', 'blue', 'red', 'glacier'];

    const [theme, setTheme] = useState({});
    const [color, setColor] = useState(localStorage.getItem('raidscolor'));

    const changeColor = clickedColor => {
        setColor(clickedColor);
        localStorage.setItem('raidscolor', clickedColor);
    }

    const setContext = (ctx) => {
        setTheme({ ...ctx });
    }

    useEffect(() => {
        if (color === null) changeColor('purple');
    }, []);

    useEffect(() => {
        const context = getContext();
        setContext(context);
    }, []);

    return (
        <Fragment>
            <div>{ color }</div>
            { colors.map(color => (<div className={`theme ${color}`} key={color} onClick={ () => changeColor(color) }></div>)) }
            <div>{ theme.theme }</div>
        </Fragment>
    );
}

export default Themes;
