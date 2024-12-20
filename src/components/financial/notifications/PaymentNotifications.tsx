import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  associateName: string;
  value: number;
  dueDate: string;
  daysUntilDue: number;
}

export const PaymentNotifications = () => {
  const { toast } = useToast();
  const [notifications] = useState<Payment[]>([
    {
      id: "1",
      associateName: "João Silva",
      value: 250.0,
      dueDate: "2024-04-15",
      daysUntilDue: 2,
    },
    {
      id: "2",
      associateName: "Maria Santos",
      value: 150.0,
      dueDate: "2024-04-16",
      daysUntilDue: 3,
    },
  ]);

  const handleNotificationClick = (payment: Payment) => {
    toast({
      title: "Notificação de Vencimento",
      description: `Mensalidade de ${payment.associateName} vence em ${payment.daysUntilDue} dias.`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-bold">Próximos Vencimentos</CardTitle>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
              onClick={() => handleNotificationClick(payment)}
            >
              <div className="flex items-center space-x-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{payment.associateName}</p>
                  <p className="text-sm text-muted-foreground">
                    Vence em {payment.daysUntilDue} dias
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(payment.value)}
                </span>
                <Badge variant={payment.daysUntilDue <= 2 ? "destructive" : "default"}>
                  {payment.daysUntilDue <= 2 ? "Urgente" : "Pendente"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};