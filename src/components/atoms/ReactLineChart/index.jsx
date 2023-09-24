import React from 'react'
import { Line } from 'react-chartjs-2';
import {   Chart as ChartJS, PointElement, LineElement, CategoryScale, LinearScale, Legend, Tooltip, Title } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register( PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend)
// ChartJS.register(ChartDataLabels, PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

import "./style.scss"

const ReactLineChart = (props) => {
	const { labels, graph_data } = props
	const data = {
		labels: [...labels],
		datasets: [
			{
				label: 'My Chart',
				data: [...graph_data],
				borderColor: '#4e0c08',
				// backgroundColor: "#4e0c08",
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			// datalabels: {
			// 	// display: true, // Enable data labels
			// 	// color: 'white', // Label color
			// 	font: {
			// 		size: 14, // Label font size
			// 	},
			// 	formatter: (value, context) => value, // Function to format the label text
			// },
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Budget Record',
			},
		},
		maintainAspectRatio: false, // Set this to false to make the chart responsive
		responsive: true, // Enable responsiveness
		scales: {
			x: {
				// X-axis options
				title: {
					display: true,
					text: 'X-Axis Label', // X-axis label text
				},
				// grid: {
				// 	display: false, // Hide y-axis grid lines
				// },
			},
			y: {
				// Y-axis options
				title: {
					display: true,
					text: 'Total Budget ( ₹ )', // Y-axis label text
				},
				// grid: {
				// 	display: false, // Hide y-axis grid lines
				// },
				// min: 0, // Minimum Y-axis value
				// max: 100, // Maximum Y-axis value
				// stepSize: 10, // Step size between ticks
			},
		},
		elements: {
			point: {
				radius: 5, // Size of data points
				hoverRadius: 8, // Size of data points on hover
				pointStyle: 'circle', // Point style (circle, cross, star, etc.)
				backgroundColor: '#fbc500', // Point background color
				borderColor: '#fbc500', // Point border color
			},
			line: {
				tension: 0.4, // Line tension (0 for straight lines, 1 for very smooth curves)
				backgroundColor: '#f2f2f2'
			},
		},
		tooltips: {
			enabled: true, // Show tooltips on hover
			mode: 'nearest', // Tooltip display mode (nearest, average, etc.)
		},
	};
	return (
		<>
			<div className="my-chart">
				<Line data={data} options={options} />
			</div>
		</>
	)
}

export default ReactLineChart