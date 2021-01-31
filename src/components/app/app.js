import {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import {Header} from '../header/header';
import RandomChar from '../randomChar/randomChar';
import {ErrorMessage} from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';
import GotService from '../../services/gotService';

import './app.css';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';


export default class App extends Component {

    gotService = new GotService();

    state = {
        showRandomChar: true,
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>
        }
        
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onCharSelected={this.onCharSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={(item) => item.name} />
                        </Col>
                        <Col md='6'>
                            <CharDetails 
                            onCharSelected={this.state.selectedChar}
                            getData={this.gotService.getAllHouses}
                            renderItem={(item) => item.name} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};