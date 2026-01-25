import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { updateRunSchema } from '@/lib/validations/run';
import { NextResponse } from 'next/server';

// GET /api/runs/[id] - 個別のランニング記録取得
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { id } = await params;
    const run = await prisma.run.findUnique({
      where: { id },
    });

    if (!run) {
      return NextResponse.json(
        { error: '記録が見つかりません' },
        { status: 404 }
      );
    }

    if (run.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'この記録にアクセスする権限がありません' },
        { status: 403 }
      );
    }

    // ペースを計算
    const runWithPace = {
      ...run,
      pace: run.duration && run.duration > 0 ? run.duration / 60 / run.distance : null,
    };

    return NextResponse.json({ run: runWithPace });
  } catch (error) {
    console.error('Run fetch error:', error);
    return NextResponse.json(
      { error: 'ランニング記録の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PATCH /api/runs/[id] - ランニング記録更新
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { id } = await params;
    const existingRun = await prisma.run.findUnique({
      where: { id },
    });

    if (!existingRun) {
      return NextResponse.json(
        { error: '記録が見つかりません' },
        { status: 404 }
      );
    }

    if (existingRun.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'この記録を更新する権限がありません' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = updateRunSchema.parse(body);

    // 更新データを準備
    const updateData: any = {};
    if (validatedData.date) updateData.date = new Date(validatedData.date);
    if (validatedData.distance !== undefined)
      updateData.distance = validatedData.distance;
    if (validatedData.duration !== undefined)
      updateData.duration = validatedData.duration;
    if (validatedData.memo !== undefined) updateData.memo = validatedData.memo;

    // ペースを再計算（距離または時間が更新された場合）
    if (validatedData.distance !== undefined || validatedData.duration !== undefined) {
      const distance = validatedData.distance ?? existingRun.distance;
      const duration = validatedData.duration ?? existingRun.duration;
      updateData.pace = duration && duration > 0 ? duration / 60 / distance : null;
    }

    const run = await prisma.run.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ run });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'バリデーションエラー', details: error },
        { status: 400 }
      );
    }

    console.error('Run update error:', error);
    return NextResponse.json(
      { error: 'ランニング記録の更新に失敗しました' },
      { status: 500 }
    );
  }
}

// DELETE /api/runs/[id] - ランニング記録削除
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const { id } = await params;
    const existingRun = await prisma.run.findUnique({
      where: { id },
    });

    if (!existingRun) {
      return NextResponse.json(
        { error: '記録が見つかりません' },
        { status: 404 }
      );
    }

    if (existingRun.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'この記録を削除する権限がありません' },
        { status: 403 }
      );
    }

    await prisma.run.delete({
      where: { id },
    });

    return NextResponse.json({ message: '削除しました' });
  } catch (error) {
    console.error('Run deletion error:', error);
    return NextResponse.json(
      { error: 'ランニング記録の削除に失敗しました' },
      { status: 500 }
    );
  }
}
