import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Payment {
  id: string;
  description: string;
  dueDate: Date;
  value: number;
  daysUntilDue: number;
}

interface UpcomingPaymentsProps {
  payments: Payment[];
}

export const UpcomingPayments = ({ payments }: UpcomingPaymentsProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Próximos Vencimentos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {payment.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  Vence em {payment.daysUntilDue} dias
                </p>
              </div>
              <div className="ml-auto font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(payment.value)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};