import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from './components/AddBuilding';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            filterText: '',
            selectedBuilding: 0
        };
    }

    filterUpdate(value) {
        this.setState({
            filterText: value
        });
    }

    selectedUpdate(id) {
        this.setState({
            selectedBuilding: id
        });
    }
  

    addBuilding(code, name, longitude, latitude, address) {
        var Lid = this.state.data[this.state.data.length - 1].id;
        var DataInput = this.state.data;
        DataInput.push({
            id: Lid + 1,
            code: code,
            name: name,
            coordinates: {
                longitude: longitude,
                latitude: latitude
            },
            address: address
        });
        this.setState({
            data: DataInput
        });
    }

    removeBuilding(id) {
        var DataInput = this.state.data.filter(building => {
            return building.id !== id;
        });
        this.setState({
            data: DataInput
        });
    }

    render() {

        return (
            <div className="bg">
                <h1 class="header">UF Directory App</h1>
                <Search
                    filterText={ this.state.filterText }
                    filterUpdate={this.filterUpdate.bind(this)}
                />
                <main>
                    <div className="row">
                        <div className="column1">
                            <div className="tableWrapper">
                                <BuildingList
                                    data={this.state.data}
                                    filterText={this.state.filterText}
                                    selectedUpdate={this.selectedUpdate.bind(this)}
                                    removeBuilding={this.removeBuilding.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="column2">
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        Building Information
                                    </h3>

                                    <ViewBuilding
                                        data={this.state.data}
                                        buildingId={this.state.selectedBuilding}
                                    />
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <h3 class="card-title">
                                        Add Building
                                    </h3>
                                    <AddBuilding addBuilding={this.addBuilding.bind(this)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Credit />
                </main>
            </div>
        );
    }
}

export default App;
