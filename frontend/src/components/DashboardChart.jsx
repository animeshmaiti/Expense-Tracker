import React from "react";
import styled from "styled-components";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useGlobalContext } from "../context/globalContext";
import { dateFormat } from "../utils/dateFormat";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const DashboardChart = () => {
  const { incomes, expenses } = useGlobalContext();

  // Function to aggregate amounts by date
  const aggregateByDate = (items) => {
    return items.reduce((acc, item) => {
      const date = dateFormat(item.date);
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += item.amount;
      return acc;
    }, {});
  };

  // Aggregate incomes and expenses
  const incomeAggregated = aggregateByDate(incomes);
  const expenseAggregated = aggregateByDate(expenses);

  // Combine and sort the dates from both incomes and expenses
  const allDates = [...new Set([...Object.keys(incomeAggregated), ...Object.keys(expenseAggregated)])].sort((a, b) => new Date(a) - new Date(b));

  // Map the aggregated amounts to the dates
  const incomeData = allDates.map(date => incomeAggregated[date] || 0);
  const expenseData = allDates.map(date => expenseAggregated[date] || 0);

  const data = {
    labels: allDates,
    datasets: [
      {
        label: "Income",
        data: incomeData,
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.2
      },
      {
        label: "Expense",
        data: expenseData,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.2
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
};

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
`;
