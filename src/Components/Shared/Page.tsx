import * as React from 'react';
import { match as IMatch } from 'react-router-dom';

interface IState<TData> {
    data: TData[]
}

interface IProps {
    match: IMatch;
}

export class PageComponent<TData> extends React.Component<IProps, IState<TData>> {
    datafilename: string;
    match: IMatch;
    constructor(props: IProps) {
        super(props);
        this.match = props.match;
        this.state = this.getInitialState();        
    }

    getInitialState(): IState<TData> {
        return {
            data: undefined
        };
    }

    LoadData(): void {
        var endpoint = "/generated/data/" + this.datafilename + ".json";
        let self = this;
        fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json, text/html',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            return r.json();           
        }).then(data => {
            self.setState({ data: data });
        });
    }

    componentDidMount() {
        this.LoadData();
    }

    render() {
        // Handle case where the response is not here yet
        if (!this.state.data) {
            // Note that you can return false it you want nothing to be put in the dom
            // This is also your chance to render a spinner or something...
            return <div>Page is under construction.</div>;
        }
        else if (this.state.data.length === 0) {
            // Gives you the opportunity to handle the case where the ajax request
            // completed but the result array is empty
            return <div>No result found for this subscription</div>;
        }
    }
}