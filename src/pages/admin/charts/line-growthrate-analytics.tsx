import React, { MouseEvent, useRef, useState } from "react";
import { Bar, getElementAtEvent, Line } from "react-chartjs-2";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@components/ui/select";
import useGetReportGrowthRateMonthly from "../../../hooks/api/get/useGetReportGrowthRateMonthly";
import useGetReportGrowthRateDistribution from "../../../hooks/api/get/useGetReportGrowthRateDistribution";
import { Card } from "../../../components/ui/card";
import { ChartOptions } from "chart.js";

const GrowthRateLineChartAnalytics = () => {
  const chartRef = useRef();
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [startMonth, setStartMonth] = useState<string>("1");
  const [activeLabel, setActiveLabel] = useState<string>("");
  const [endMonth, setEndMonth] = useState<string>("12");
  const { data: growthMonthly, isLoading } = useGetReportGrowthRateMonthly({
    year: selectedYear,
    start: startMonth,
    end: endMonth
  });
  const { data: growthDistribution } = useGetReportGrowthRateDistribution({
    month: activeLabel
  });

  const handleChangeYear = (year: string) => {
    setSelectedYear(year);
  };

  const handleChangeStartMonth = (month: string) => {
    setStartMonth(month);
  };

  const handleChangeEndMonth = (month: string) => {
    setEndMonth(month);
  };

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const data = {
    labels: Object.keys(growthMonthly || {}),
    datasets: [
      {
        label: "Growth Rate",
        data: Object.values(growthMonthly || {}),
        borderColor: "rgb(46, 139, 87)",
        backgroundColor: "rgba(46, 139, 87, 0.5)",
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.2
      }
    ]
  };
  const dataGrowth = {
    labels: growthDistribution?.map(item => item.crop_name),
    datasets: [
      {
        label: "Growth Rate",
        data: growthDistribution?.map(item => item.percentage_distribution),
        backgroundColor: ["rgba(183, 235, 199, 1)"]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  const optionsBar: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y"
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const index = getElementAtEvent(chartRef.current, event)[0].index;
      const growthRate = Object.values(growthMonthly || {})[index];

      // Check if growth rate equals 0
      if (Number(growthRate) === 0) {
        return null; // Disable further execution
      }
      const activeLabel = index + 1;
      setActiveLabel(String(activeLabel) || "");
    }
  };

  return (
    <>
      <Card className="p-5">
        <div className="flex justify-between flex-wrap sm:flex-nowrap">
          <div>
            <h2 className="text-xl font-bold tracking-tight ">
              Farms Growth Rate
            </h2>
            <p className="text-xs text-gray-400">
              Click the dots to view the growth rate summary of that month
            </p>
          </div>
          <div className="flex gap-4 justify-end">
            <Select onValueChange={e => handleChangeYear(e)}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={e => handleChangeStartMonth(e)}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Month From" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={e => handleChangeEndMonth(e)}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Month To" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem
                    key={month.value}
                    value={month.value}
                    onClick={() => handleChangeEndMonth(month.value)}
                  >
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className=" h-[350px] mt-4">
          <Line
            ref={chartRef}
            onClick={onClick}
            data={data}
            options={options}
          />
        </div>
      </Card>
      {Number(growthDistribution?.length || 0) > 0 && (
        <Card className={` mt-4 p-5 duration-300`}>
          <h2 className="text-lg font-bold tracking-tight ">
            Crops Growth Rate Distribution
          </h2>
          <div className="h-[350px]">
            <Bar data={dataGrowth} options={optionsBar} />
          </div>
        </Card>
      )}
    </>
  );
};

export default GrowthRateLineChartAnalytics;