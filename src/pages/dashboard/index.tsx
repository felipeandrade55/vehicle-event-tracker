import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Este é o dashboard principal do sistema.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;