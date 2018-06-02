import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { testCall } from '../actions/testAction';
import { getTimeSeriesData } from '../actions/timeseries/timeSeriesAction';
import { fetchSuggestions, clearSuggestions, downloadStocks } from '../actions/timeseries/stockSuggestionsActions';
import { connect } from 'react-redux';
import AutoCompleteInput from '../components/inputs/AutoCompleteInput';
import classNames from 'classnames/bind';
import style from 'css/components/autosuggest';
import _ from 'lodash';
import OHLC from '../components/canvas/OHLC';
import ajax from '../../utils/ajax';
import PathFinder, { Button } from 'react-pathfinder';

const cx = classNames.bind(style);
class Main extends Component {
  state = {
    value: '',
  }

  handleClick() {
      // this.props.getTimeSeriesData(this.state.value);
      // ajax.get('/stocks/database/post', {})
      //   .then(() => {
      //     console.log('Finito');
      //   })

      ajax.post('/stocks/test/route', { data: { value: this.state.value } })
        .then((res) => {
          console.log('done here', res);
        });

  };

  onSuggestionsFetchRequested = ({ value }) => {
      this.props.fetchSuggestions(value);
  }

  onSuggestionsClearRequested = () => {
      this.props.clearSuggestions();
  }

  getSuggestionValue = (suggestion) => {
    return suggestion.value;
  };

  onChange = (value) => {
    this.setState({
      value: value.toUpperCase(),
    })
  };

  render() {
    console.log('Series is', this.props.series);

    return (
      <Row>
        
        <Col xs={3} style={styles.column}>
          <div>
          <Button 
            disabled={this.state.invalid} 
            bsStyle="primary" 
            onClick={() => this.handleClick()} 
            bgColor="orange"
            hoverColor="darkOrange"
          >
            Click Here
          </Button>
          <AutoCompleteInput 
            suggestions={this.props.suggestions}
            placeholder="e.g. MSFT"
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            onChange={this.onChange}
          />
          {this.state.invalid &&
            <span>Invalid Stock</span>
          }
            <PathFinder height={500} width={500}/>
            {/* <div>
              <OHLC height={400} width={400}/>
            </div> */}
     
          <span>test</span>
          </div>
     
        </Col>
    
      </Row>

    )
  };
}

const styles = {
  column: {
    margin: "10px"
  }
}

function mapStateToProps(state) {
  return {
    suggestions: state.stockSuggestions.suggestions,
    gettingSeries: state.timeSeries.gettingSeries,
    series: state.timeSeries.series,
  };
}

export default connect(mapStateToProps, {testCall, getTimeSeriesData, fetchSuggestions, clearSuggestions })(Main);
