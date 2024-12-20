import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CashFlowData {
  month: string;
  receitas: number;
  despesas: number;
}

interface CashFlowChartProps {
  data: CashFlowData[];
}

export const CashFlowChart = ({ data }: CashFlowChartProps) => {
  const chartConfig = {
    receitas: {
      label: "Receitas",
      theme: {
        light: "#22c55e",
        dark: "#22c55e",
      },
    },
    despesas: {
      label: "Despesas",
      theme: {
        light: "#ef4444",
        dark: "#ef4444",
      },
    },
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Fluxo de Caixa</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) =>
                  new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    notation: "compact",
                  }).format(value)
                }
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (!active || !payload) return null;
                  return (
                    <ChartTooltipContent
                      className="w-64"
                      payload={payload}
                      formatter={(value, name) => {
                        return [
                          new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(value as number),
                          name,
                        ];
                      }}
                    />
                  );
                }}
              />
              <Legend />
              <Bar dataKey="receitas" fill="#22c55e" name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};