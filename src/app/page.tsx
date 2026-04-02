const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          Devin Task Board
        </h1>
        <p className="text-lg text-muted-foreground">
          Next.js 16 + PostgreSQL + Prisma + Tailwind CSS v4
        </p>
        <div className="mt-8 p-6 bg-card border border-border rounded-lg">
          <p className="text-success">✓ 環境構築が完了しました</p>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
