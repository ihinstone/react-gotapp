import {Component} from 'react';
import ItemList from '../itemList/itemList';
import CharDetails, {Field} from '../charDetails/charDetails';
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

    onItemSelected = (id) => {
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
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name} (${gender})`} />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar} >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
            </CharDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}