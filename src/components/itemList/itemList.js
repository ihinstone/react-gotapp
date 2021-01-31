import {Component} from 'react';
import './itemList.css';
import GotService from '../../services/gotService';
import {Spinner} from '../spinner/spinner';

export default class ItemList extends Component {

    gotService = new GotService();

    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    renderItens(arr) {
        return arr.map((item, i) => {
            return (
                <li 
                    key={i}
                    className="list-group-item"
                    onClick={ () => this.props.onCharSelected(41 + i)} >
                        {item.name}
                </li>
            )
        })
    }

    render() {
        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>
        }

        const items = this.renderItens(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}