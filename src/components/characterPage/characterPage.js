import {Component} from 'react';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import {ErrorMessage} from '../errorMessage/errorMessage';
import GotService from '../../services/gotService';
import {RowBlock} from '../rowBlock/rowBlock';


export default class CharacterPage extends Component {

    gotService = new GotService();

    state = {
        selectedChar: 130,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }
        const itemList = (
            <ItemList 
            onCharSelected={this.onCharSelected}
            getData={this.gotService.getAllCharacters}
            renderItem={({name, gender}) => `${name} (${gender})`} />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar} />
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}