import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Text,
} from "recharts";
import styled from "styled-components";
import { BookingsTable } from "../../types";

interface TickProps {
  x?: number;
  y?: number;
  payload?: { value: string | number };
}

const Heading = styled.h2`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const Wrapper = styled.div`
  flex-basis: 60%;
`;

const CustomXAxisTick = ({ x, y, payload }: TickProps) => {
  if (payload && payload.value) {
    return (
      <Text
        fontSize={"14px"}
        width={50}
        x={x}
        y={y}
        textAnchor="middle"
        verticalAnchor="start"
      >
        {payload.value}
      </Text>
    );
  }
  return null;
};

function RoomOccupancy({ data }: { data: BookingsTable[] }) {
  const displayData = [
    {
      name: "Стандарт двухместный",
      value: data.filter((booking) => booking.room === "Стандарт двухместный")
        .length,
    },
    {
      name: "Стандарт четырехместный",
      value: data.filter(
        (booking) => booking.room === "Стандарт четырехместный"
      ).length,
    },
    {
      name: "Комфорт",
      value: data.filter((booking) => booking.room === "Комфорт").length,
    },
    {
      name: "Семейный",
      value: data.filter((booking) => booking.room === "Семейный").length,
    },
  ];

  const colors = ["#F67280", "#C06C84", "#6C5B7B", "#355C7D"];

  return (
    <Wrapper>
      <Heading>Заселяемость номеров</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={displayData}
          margin={{ top: 10, right: 5, bottom: 5, left: -20 }}
        >
          <CartesianGrid strokeDasharray="5" vertical={false} />
          <XAxis
            height={60}
            dataKey="name"
            interval={0}
            tick={<CustomXAxisTick />}
            tickLine={false}
            label={{
              value: "Номер",
              position: "insideBottom",
              fontSize: 18,
              fill: "var(--TEXT_COLOR)",
            }}
          />
          <YAxis
            ticks={[0, 2, 4, 6, 8, 10]}
            interval={0}
            tickCount={6}
            width={70}
            label={{
              value: "Кол-во заселений",
              angle: -90,
              position: "center",
              fontSize: 18,
              fill: "var(--TEXT_COLOR)",
            }}
          />

          <Bar dataKey="value" label={{ fill: "var(--WHITE)", fontSize: 18 }}>
            {displayData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
}

export default RoomOccupancy;
