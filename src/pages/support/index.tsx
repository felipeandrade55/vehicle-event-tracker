import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketList } from "@/components/support/TicketList";
import { NewTicketButton } from "@/components/support/NewTicketButton";

export default function SupportPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Central de Suporte</h1>
        <NewTicketButton />
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Meus Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <TicketList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}