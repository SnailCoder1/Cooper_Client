import React, { Component } from 'react'
import{ getData } from '../Modules/PerfomanceData'
import { Line } from 'react-chartjs-2'
import moment from 'moment';



class DisplayPerformanceData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      DisplayPerformanceData: null
    }
  }
  componentDidMount() {
    this.getPerformanceData()
  }

  async getPerformanceData() {
    let result = await getData();
    this.setState({ PerformanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    })
  }

  render() {
    let dataIndex;
    let distances = []
  }


}
