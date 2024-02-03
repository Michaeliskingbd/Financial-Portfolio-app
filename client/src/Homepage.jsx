import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Chart from 'react-apexcharts';
import InputSlider from 'react-input-slider';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import avatar from "./ascot1.png";

const Homepage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [riskScore, setRiskScore] = useState(0);



  const fetchPortfolioData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/portfolio/${riskScore}`);
      setPortfolioData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [riskScore]);

  const handleRiskScoreChange = (value) => {
    setRiskScore(value);
  };

  const chartOptions = {
    chart: {
      type: 'radar',
    },
    xaxis: {
      categories: Object.keys(portfolioData?.instrumentsWeight || {}),
    },
  };

  const chartSeries = [
    {
      name: 'Portfolio',
      data: Object.values(portfolioData?.instrumentsWeight || {}),
    },
  ];

  const barChartData = Object.entries(portfolioData?.instrumentsWeight || []).map(([label, value]) => ({
    label,
    value,
  }));

  const getSliderColor = (value) => {
    const percentage = (value / 10) * 100;
    const color = `linear-gradient(90deg,  #f32013 ${percentage}%, #4BB543 ${percentage}%)`;
    return color;
  };

  const barChartXAxisTickStyle = {
    fontSize: 10, 
  };
    const totalSum = Object.values(portfolioData?.instrumentsWeight || {}).reduce((sum, value) => sum + value, 0);
    const barChartDataPercentage = Object.entries(portfolioData?.instrumentsWeight || {}).map(([label, value]) => ({
      label,
      value: (value / totalSum) * 100,
    }));

    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="custom-tooltip">
            <p>{data.label}</p>
            <p>{`Value: ${data.value.toFixed(2)}%`}</p>
          </div>
        );
      }
      return null;
    };

    const getInvestmentSuggestions = () => {
      if (!portfolioData) {
        return 'Loading data...';
      }
    
      const instruments = Object.keys(portfolioData.instrumentsWeight);
    
      const sortedSuggestions = instruments
        .map((instrument) => ({
          label: instrument,
          value: portfolioData.instrumentsWeight[instrument],
        }))
        .sort((a, b) => b.value - a.value);
    
      return (
        <div className="suggestion-container">
          {sortedSuggestions.map((suggestion) => {
            const percentage = suggestion.value;
            const barStyle = {
              width: `${percentage}%`,
            };
    
            return (
              <div key={suggestion.label} className="suggestion-bar-container">
                <div className="suggestion-bar" style={barStyle}></div>
                <span className="suggestion-label">{`${suggestion.label}: ${percentage.toFixed(2)}%`}</span>
              </div>
            );
          })}
        </div>
      );
    };
  return (
    <section>
      <div className='section-title'>
        <h3>User Profile</h3>
        <div className='profile-picture'>
          <img src={avatar} alt='pp' />
        </div>
        <span>Michael1234</span>
      </div>

      <div className='rad'>
        <h3>Choose Your Risk Tolerance</h3>
        <div className="slider-container">
          <div className="risk-score-label">Risk Score: {riskScore}</div>
          <InputSlider
            axis="x"
            x={riskScore}
            xmax={10}
            onChange={({ x }) => handleRiskScoreChange(x)}
            styles={{
              track: {
                background: getSliderColor(riskScore),
              },
              active: {
                background: getSliderColor(riskScore),
              },
             
            }}
          />
        </div>
      </div>

       <div className="tabs-container">
        {portfolioData && (
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Bar Chart</Tab>
              <Tab>Radar Chart</Tab>
            </TabList>

            <TabPanel>
            <div>
              <p>{getInvestmentSuggestions()}</p>
            </div>
            </TabPanel>

            <TabPanel>
              <div className="bar-chart-container">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={barChartDataPercentage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" tick={{ ...barChartXAxisTickStyle }} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>

            <TabPanel>
              <Chart options={chartOptions} series={chartSeries} type="radar" height={500} />
            </TabPanel>

            



          </Tabs>
        )}
      </div>

      

    </section>
  );
};

export default Homepage;
