import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { createRunSchema } from '@/lib/validations/run';
import { NextResponse } from 'next/server';

// GET /api/runs - ランニング記録一覧取得
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    const where: any = {
      userId: session.user.id,
    };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate);
      if (endDate) where.date.lte = new Date(endDate);
    }

    const [runs, total] = await Promise.all([
      prisma.run.findMany({
        where,
        orderBy: { date: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.run.count({ where }),
    ]);

    // ペースを計算
    const runsWithPace = runs.map((run) => ({
      ...run,
      pace: run.duration > 0 ? run.duration / 60 / run.distance : null,
    }));

    return NextResponse.json({
      runs: runsWithPace,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Runs fetch error:', error);
    return NextResponse.json(
      { error: 'ランニング記録の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST /api/runs - ランニング記録作成
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createRunSchema.parse(body);

    // ペースを計算（時間が入力されている場合のみ）
    const pace =
      validatedData.duration && validatedData.duration > 0
        ? validatedData.duration / 60 / validatedData.distance
        : null;

    const run = await prisma.run.create({
      data: {
        userId: session.user.id,
        date: new Date(validatedData.date),
        distance: validatedData.distance,
        duration: validatedData.duration || null,
        pace,
        memo: validatedData.memo || null,
      },
    });

    return NextResponse.json({ run }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: error },
        { status: 400 }
      );
    }

    console.error('Run creation error:', error);
    return NextResponse.json(
      { error: 'ランニング記録の作成に失敗しました' },
      { status: 500 }
    );
  }
}
