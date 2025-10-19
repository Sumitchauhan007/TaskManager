import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({data, colors}) => {
    return (
        <ResponsiveContainer width="100%" height={325}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={130}
                    dataKey="count"
                    nameKey="status" 
                    labelLine={false}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip  />} />
                <Legend content={<CustomLegend />} />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;