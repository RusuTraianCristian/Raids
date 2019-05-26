


    post = () => {
        window.Twitch.ext.onAuthorized(async auth => {
            const { price } = store.getState();
            const { target } = store.getState();
            const postURL = 'https://fng6b6xn2c.execute-api.us-east-1.amazonaws.com/firstStage/tasks';
            fetch(postURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: auth.channelId,
                    task: auth.channelId,
                    required: priceofbitsSetByStreamerInConfig,
                    target: target
                })
            });
            const channelId = auth.channelId;
            const ref = firebase.database().ref('channels/').child(channelId);
            ref.set(0);
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="welcome">Hello and welcome, <span>{ this.state.displayName }</span>!</div>
                <div className="section">
                    <form>
                        <label>
                            <span>Bits required for raid:</span>
                            <input type="text" pattern="[0-9]*" placeholder={ this.state.price } onChange={ (e) => { this.props.changePrice(e.target.value); this.realtime(e.target.value) } } />
                            <span>Raid target channel:</span>
                            <input type="text" placeholder={ this.state.target } onChange={ (e) => { this.props.changeTarget(e.target.value); this.myTarget(e.target.value) } } />
                        </label>
                    </form>
                    <button className="submit" onClick={ this.post }>save settings</button>
                </div>
                <div className="section">
                    <div className="bgbar">
                        <div className="childbar">
                            <div className="dot"></div>
                        </div>
                    </div>
                    <div id="price">Your raid's target channel is: <span>{ this.state.target }</span></div>
                    <div id="price">bits raised: { this.state.bitsRaised }</div>
                    <div id="price">bits required: { this.state.price }</div>
                    <div id="price">{ Math.floor(this.state.bitsRaised / this.state.price * 100) + "%" }</div>
                </div>
            </React.Fragment>
        );
    }
