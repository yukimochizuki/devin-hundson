import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">ダッシュボード</h1>
        <p className="mt-2 text-muted-foreground">
          ようこそ、{session.user.name}さん
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            総タスク数
          </h3>
          <p className="mt-2 text-3xl font-bold text-foreground">0</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            進行中
          </h3>
          <p className="mt-2 text-3xl font-bold text-info">0</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">完了</h3>
          <p className="mt-2 text-3xl font-bold text-success">0</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            期限切れ
          </h3>
          <p className="mt-2 text-3xl font-bold text-danger">0</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold text-foreground">
          最近のタスク
        </h2>
        <p className="mt-4 text-center text-muted-foreground">
          タスクがまだありません
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
