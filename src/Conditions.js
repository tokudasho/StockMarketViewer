import React from 'react';
import { Form } from 'react-bootstrap';

export default class Conditions extends React.Component {
    constructor(props) {
        super(props);
        this.state = require('./location.json');
        this.handleChangePrefecture = this.handleChangePrefecture.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
    }

    handleChangePrefecture(e) {
        var value = e.target.value;
        this.setState({ prefecture: value });
        this.render();
    }

    handleChangeCity(e) {
        var value = e.target.value;
        this.setState({ cityId: value });
        this.render();
        this.props.onChange(e);
    }

    disableCity() {
        var unselectPref = this.state.prefecture === undefined;
        var invalidSelectedPref = this.state.location.pref.find(pref => pref.title === this.state.prefecture) === undefined;
        return unselectPref || invalidSelectedPref;
    }

    render() {
        var prefectures = [];
        prefectures.push(<option key="0">都道府県を選択してください。</option>);
        for (var i in this.state.location.pref) {
            prefectures.push(<option key={i + 1}>{this.state.location.pref[i].title}</option>);
        }

        var cities = [];
        var selectedPref = this.state.location.pref.find(pref => pref.title === this.state.prefecture) || { city: [] };
        var unselectCity = selectedPref.city.find(city => city.id === this.state.cityId) === undefined;
        cities.push(<option key="0" selected={unselectCity}>市区町村を選択してください。</option>);
        for (var i in selectedPref.city) {
            cities.push(
                <option key={i + 1} value={selectedPref.city[i].id}>
                    {selectedPref.city[i].title}
                </option>
            );
        }

        return (
            <Form>
                <Form.Group controlId="dropdown_prefecture">
                    <Form.Label>都道府県</Form.Label>
                    <Form.Control as="select" onChange={this.handleChangePrefecture}>
                        {prefectures}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="dropdown_city">
                    <Form.Label>市区町村</Form.Label>
                    <Form.Control as="select" onChange={this.handleChangeCity} disabled={this.disableCity()}>
                        {cities}
                    </Form.Control>
                </Form.Group>
            </Form >
        );
    }
}
