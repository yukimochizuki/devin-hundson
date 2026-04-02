import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: '管理者',
      password: hashedPassword,
      role: 'ADMIN',
      locale: 'ja',
      theme: 'SYSTEM',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      email: 'user1@example.com',
      name: '山田太郎',
      password: hashedPassword,
      role: 'MEMBER',
      locale: 'ja',
      theme: 'LIGHT',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      email: 'user2@example.com',
      name: '佐藤花子',
      password: hashedPassword,
      role: 'MEMBER',
      locale: 'ja',
      theme: 'DARK',
    },
  });

  console.log('✓ Users created');

  const project1 = await prisma.project.upsert({
    where: { key: 'DTB' },
    update: {},
    create: {
      name: 'Devin Task Board',
      description: 'タスク管理アプリケーション開発プロジェクト',
      key: 'DTB',
      ownerId: user1.id,
    },
  });

  const project2 = await prisma.project.upsert({
    where: { key: 'DEMO' },
    update: {},
    create: {
      name: 'Demo Project',
      description: 'デモ用プロジェクト',
      key: 'DEMO',
      ownerId: user2.id,
    },
  });

  console.log('✓ Projects created');

  await prisma.projectMember.upsert({
    where: {
      projectId_userId: {
        projectId: project1.id,
        userId: user1.id,
      },
    },
    update: {},
    create: {
      projectId: project1.id,
      userId: user1.id,
      role: 'OWNER',
    },
  });

  await prisma.projectMember.upsert({
    where: {
      projectId_userId: {
        projectId: project1.id,
        userId: user2.id,
      },
    },
    update: {},
    create: {
      projectId: project1.id,
      userId: user2.id,
      role: 'MEMBER',
    },
  });

  await prisma.projectMember.upsert({
    where: {
      projectId_userId: {
        projectId: project1.id,
        userId: user3.id,
      },
    },
    update: {},
    create: {
      projectId: project1.id,
      userId: user3.id,
      role: 'MEMBER',
    },
  });

  console.log('✓ Project members created');

  const category1 = await prisma.category.create({
    data: {
      name: 'フロントエンド',
      color: 'oklch(0.55 0.15 230)',
      projectId: project1.id,
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'バックエンド',
      color: 'oklch(0.65 0.17 160)',
      projectId: project1.id,
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'インフラ',
      color: 'oklch(0.75 0.15 85)',
      projectId: project1.id,
    },
  });

  console.log('✓ Categories created');

  const task1 = await prisma.task.create({
    data: {
      taskNumber: 1,
      title: 'ログイン画面の実装',
      description: 'Auth.js v5 を使用してログイン画面を実装する',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      projectId: project1.id,
      reporterId: user1.id,
      assigneeId: user2.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      estimatedHours: 8,
      sortOrder: 0,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      taskNumber: 2,
      title: 'タスク一覧 API の実装',
      description: 'タスク一覧を取得する REST API を実装する',
      status: 'TODO',
      priority: 'HIGH',
      projectId: project1.id,
      reporterId: user1.id,
      assigneeId: user3.id,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      estimatedHours: 4,
      sortOrder: 1,
    },
  });

  const task3 = await prisma.task.create({
    data: {
      taskNumber: 3,
      title: 'カンバンボードの実装',
      description: '@dnd-kit を使用してドラッグ&ドロップ機能を実装する',
      status: 'BACKLOG',
      priority: 'MEDIUM',
      projectId: project1.id,
      reporterId: user1.id,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      estimatedHours: 16,
      sortOrder: 2,
    },
  });

  const task4 = await prisma.task.create({
    data: {
      taskNumber: 4,
      title: 'Docker Compose の設定',
      description: 'PostgreSQL コンテナの設定を追加する',
      status: 'DONE',
      priority: 'HIGH',
      projectId: project1.id,
      reporterId: user1.id,
      assigneeId: user2.id,
      actualHours: 2,
      sortOrder: 3,
    },
  });

  console.log('✓ Tasks created');

  await prisma.taskCategory.create({
    data: {
      taskId: task1.id,
      categoryId: category1.id,
    },
  });

  await prisma.taskCategory.create({
    data: {
      taskId: task2.id,
      categoryId: category2.id,
    },
  });

  await prisma.taskCategory.create({
    data: {
      taskId: task3.id,
      categoryId: category1.id,
    },
  });

  await prisma.taskCategory.create({
    data: {
      taskId: task4.id,
      categoryId: category3.id,
    },
  });

  console.log('✓ Task categories created');

  await prisma.comment.create({
    data: {
      content: 'Auth.js v5 のドキュメントを確認しました。Credentials Provider を使用する予定です。',
      taskId: task1.id,
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Docker Compose の設定が完了しました。PostgreSQL 16 を使用しています。',
      taskId: task4.id,
      userId: user2.id,
    },
  });

  console.log('✓ Comments created');

  await prisma.activity.create({
    data: {
      type: 'TASK_CREATED',
      description: 'タスク「ログイン画面の実装」を作成しました',
      taskId: task1.id,
      userId: user1.id,
    },
  });

  await prisma.activity.create({
    data: {
      type: 'ASSIGNEE_CHANGED',
      description: '担当者を山田太郎に変更しました',
      taskId: task1.id,
      userId: user1.id,
      metadata: {
        from: null,
        to: user2.id,
      },
    },
  });

  await prisma.activity.create({
    data: {
      type: 'STATUS_CHANGED',
      description: 'ステータスを「進行中」に変更しました',
      taskId: task1.id,
      userId: user2.id,
      metadata: {
        from: 'TODO',
        to: 'IN_PROGRESS',
      },
    },
  });

  console.log('✓ Activities created');

  await prisma.notification.create({
    data: {
      type: 'TASK_ASSIGNED',
      title: 'タスクが割り当てられました',
      message: '「ログイン画面の実装」があなたに割り当てられました',
      userId: user2.id,
      metadata: {
        taskId: task1.id,
        taskTitle: task1.title,
      },
    },
  });

  await prisma.notification.create({
    data: {
      type: 'TASK_ASSIGNED',
      title: 'タスクが割り当てられました',
      message: '「タスク一覧 API の実装」があなたに割り当てられました',
      userId: user3.id,
      metadata: {
        taskId: task2.id,
        taskTitle: task2.title,
      },
    },
  });

  console.log('✓ Notifications created');

  console.log('🎉 Seeding completed successfully!');
};

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
