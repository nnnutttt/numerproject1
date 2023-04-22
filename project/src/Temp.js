import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { pow, inv, multiply } from 'mathjs';
import { Chart } from 'chart.js';

function Temp() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'My Dataset',
          data: [10, 20, 30, 40, 50, 60, 70],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    return(
        <div>
            {myChart}
        </div>
    )
};
export default Temp