import React, { Fragment, useState, useRef, useEffect, useContext } from 'react';
import { RaidsContext } from './Context';
import firebase from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCrown, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
library.add(faCrown, faAngleRight, faAngleLeft);

const Products = () => {

    const { bits, required, target, channelId, userId, clientId, token } = useContext(RaidsContext);
    const [products, setProducts] = useState([]);
    const [pageOne, setPageOne] = useState({ display: 'block' });
    const [pageTwo, setPageTwo] = useState({ display: 'none' });
    const prod = useRef(0);
    let currentProducts = prod.current;
    const getProducts = () => {
        setProducts([...currentProducts]);
    }
    const next = () => {
        setPageOne({ ...pageOne, display: 'none' });
        setPageTwo({ ...pageTwo, display: 'block' });
    }
    const previous = () => {
        setPageTwo({ ...pageTwo, display: 'none' });
        setPageOne({ ...pageOne, display: 'block' });
    }
    const arr1 = products.slice(0, 12).map(item => item);
    const arr2 = products.slice(arr1.length, products.length).map(item => item);

    const buyRaid = (e) => {
        window.Twitch.ext.bits.getProducts().then(products => {
            Twitch.ext.bits.useBits(`raid${e}`);
            window.Twitch.ext.bits.onTransactionComplete(TransactionObject => {
                const amount = TransactionObject.product.cost.amount;
                const raider = TransactionObject.displayName;
                sendExtensionChatMessage(raider, amount);
                pushBits(amount);
            });
        });
    }

    const sendExtensionChatMessage = (raider, amount) => {
        const twitchUrl = `https://api.twitch.tv/extensions/${clientId}/0.0.2/channels/${channelId}/chat`;
        fetch(twitchUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'Client-ID': clientId
            },
            body: JSON.stringify({
                'text': `${raider} joined the raid using ${amount} bits. Visit https://raids.app for more information.`
            })
        });
    }

    const pushBits = (arg) => {
        const ref = firebase.database().ref('channels/').child(channelId);
        ref.transaction(current => {
            return current + arg;
        });
    }

    useEffect(() => {
        window.Twitch.ext.bits.getProducts().then(products => {
            let newArr = products.map(item => {
                return item.cost.amount;
            });
            newArr.sort((a, b) => a - b);
            return newArr;
        }).then((newArr) => {
            currentProducts = newArr;
            getProducts();
        });
    }, []);

    return (
        <Fragment>
            <div className="container">
                <div className="leader">
                    <FontAwesomeIcon icon="crown" /> CristiWins <FontAwesomeIcon icon="crown" /> <span>(raid leader)</span>
                </div>
                <div className="products">
                    <div className="pageOne" style={ pageOne }>
                        { arr1.map(item => (<div className="raid" key={ item } onClick={ () => buyRaid(item) }>{ item } bits</div>)) }
                    </div>
                    <div className="pageTwo" style={ pageTwo }>
                        { arr2.map(item => (<div className="raid" key={ item } onClick={ () => buyRaid(item) }>{ item } bits</div>)) }
                    </div>
                </div>
                <div className="footer">
                    <div className="pagination">
                        <button className="navButton" onClick={ previous }><FontAwesomeIcon icon="angle-left" /></button>
                        <button className="navButton" onClick={ next }><FontAwesomeIcon icon="angle-right" /></button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Products;
