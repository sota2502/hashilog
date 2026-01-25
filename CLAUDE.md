- 今度は更新・削除に失敗することがわかった。
以下はエラーログ

# 更新時

  249         status: 401
  250     });
  251 }
竊252 const existingRun = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].run.findUnique({
        where: {
          id: undefined,
      ?   AND?: RunWhereInput | RunWhereInput[],
      ?   OR?: RunWhereInput[],
      ?   NOT?: RunWhereInput | RunWhereInput[],
      ?   userId?: StringFilter | String,
      ?   date?: DateTimeFilter | DateTime,
      ?   distance?: FloatFilter | Float,
      ?   duration?: IntNullableFilter | Int | Null,
      ?   pace?: FloatNullableFilter | Float | Null,
      ?   memo?: StringNullableFilter | String | Null,
      ?   createdAt?: DateTimeFilter | DateTime,
      ?   updatedAt?: DateTimeFilter | DateTime,
      ?   user?: UserScalarRelationFilter | UserWhereInput
        }
      })

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:64:42)
    at async PATCH (src/app/api/runs/[id]/route.ts:64:25)
  62 |     }
  63 |
> 64 |     const existingRun = await prisma.run.findUnique({
     |                                          ^
  65 |       where: { id: params.id },
  66 |     });
  67 | {
  clientVersion: '7.3.0'
}
 PATCH /api/runs/cmkt5fla700037u9khvcljc8s 500 in 811ms (compile: 12ms, render: 799ms)

# 削除時

竊321 const existingRun = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].run.findUnique({
        where: {
          id: undefined,
      ?   AND?: RunWhereInput | RunWhereInput[],
      ?   OR?: RunWhereInput[],
      ?   NOT?: RunWhereInput | RunWhereInput[],
      ?   userId?: StringFilter | String,
      ?   date?: DateTimeFilter | DateTime,
      ?   distance?: FloatFilter | Float,
      ?   duration?: IntNullableFilter | Int | Null,
      ?   pace?: FloatNullableFilter | Float | Null,
      ?   memo?: StringNullableFilter | String | Null,
      ?   createdAt?: DateTimeFilter | DateTime,
      ?   updatedAt?: DateTimeFilter | DateTime,
      ?   user?: UserScalarRelationFilter | UserWhereInput
        }
      })

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:135:42)
    at async DELETE (src/app/api/runs/[id]/route.ts:135:25)
  133 |     }
  134 |
> 135 |     const existingRun = await prisma.run.findUnique({
      |                                          ^
  136 |       where: { id: params.id },
  137 |     });
  138 | {
  clientVersion: '7.3.0'
}
 DELETE /api/runs/cmkt5fla700037u9khvcljc8s 500 in 297ms (compile: 14ms, render: 283ms)
- 今度は更新・削除に失敗することがわかった。
以下はエラーログ

# 更新時

  249         status: 401
  250     });
  251 }
竊252 const existingRun = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].run.findUnique({
        where: {
          id: undefined,
      ?   AND?: RunWhereInput | RunWhereInput[],
      ?   OR?: RunWhereInput[],
      ?   NOT?: RunWhereInput | RunWhereInput[],
      ?   userId?: StringFilter | String,
      ?   date?: DateTimeFilter | DateTime,
      ?   distance?: FloatFilter | Float,
      ?   duration?: IntNullableFilter | Int | Null,
      ?   pace?: FloatNullableFilter | Float | Null,
      ?   memo?: StringNullableFilter | String | Null,
      ?   createdAt?: DateTimeFilter | DateTime,
      ?   updatedAt?: DateTimeFilter | DateTime,
      ?   user?: UserScalarRelationFilter | UserWhereInput
        }
      })

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:64:42)
    at async PATCH (src/app/api/runs/[id]/route.ts:64:25)
  62 |     }
  63 |
> 64 |     const existingRun = await prisma.run.findUnique({
     |                                          ^
  65 |       where: { id: params.id },
  66 |     });
  67 | {
  clientVersion: '7.3.0'
}
 PATCH /api/runs/cmkt5fla700037u9khvcljc8s 500 in 811ms (compile: 12ms, render: 799ms)

# 削除時

竊321 const existingRun = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].run.findUnique({
        where: {
          id: undefined,
      ?   AND?: RunWhereInput | RunWhereInput[],
      ?   OR?: RunWhereInput[],
      ?   NOT?: RunWhereInput | RunWhereInput[],
      ?   userId?: StringFilter | String,
      ?   date?: DateTimeFilter | DateTime,
      ?   distance?: FloatFilter | Float,
      ?   duration?: IntNullableFilter | Int | Null,
      ?   pace?: FloatNullableFilter | Float | Null,
      ?   memo?: StringNullableFilter | String | Null,
      ?   createdAt?: DateTimeFilter | DateTime,
      ?   updatedAt?: DateTimeFilter | DateTime,
      ?   user?: UserScalarRelationFilter | UserWhereInput
        }
      })

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:135:42)
    at async DELETE (src/app/api/runs/[id]/route.ts:135:25)
  133 |     }
  134 |
> 135 |     const existingRun = await prisma.run.findUnique({
      |                                          ^
  136 |       where: { id: params.id },
  137 |     });
  138 | {
  clientVersion: '7.3.0'
}
 DELETE /api/runs/cmkt5fla700037u9khvcljc8s 500 in 297ms (compile: 14ms, render: 283ms)
- 更新・削除に失敗する。
以下はエラーログ

---

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:64:42)
    at async PATCH (src/app/api/runs/[id]/route.ts:64:25)
  62 |     }
  63 |
> 64 |     const existingRun = await prisma.run.findUnique({
     |                                          ^
  65 |       where: { id: params.id },
  66 |     });
  67 | {
  clientVersion: '7.3.0'
}
 PATCH /api/runs/cmkt5fla700037u9khvcljc8s 500 in 811ms (compile: 12ms, render: 799ms)

---

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:135:42)
    at async DELETE (src/app/api/runs/[id]/route.ts:135:25)
  133 |     }
  134 |
> 135 |     const existingRun = await prisma.run.findUnique({
      |                                          ^
  136 |       where: { id: params.id },
  137 |     });
  138 | {
  clientVersion: '7.3.0'
}
 DELETE /api/runs/cmkt5fla700037u9khvcljc8s 500 in 297ms (compile: 14ms, render: 283ms)
- 更新・削除に失敗する。
以下はエラーログ

---

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:64:42)
    at async PATCH (src/app/api/runs/[id]/route.ts:64:25)
  62 |     }
  63 |
> 64 |     const existingRun = await prisma.run.findUnique({
     |                                          ^
  65 |       where: { id: params.id },
  66 |     });
  67 | {
  clientVersion: '7.3.0'
}
 PATCH /api/runs/cmkt5fla700037u9khvcljc8s 500 in 811ms (compile: 12ms, render: 799ms)

---

Argument `where` of type RunWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
    at <unknown> (src/app/api/runs/[id]/route.ts:135:42)
    at async DELETE (src/app/api/runs/[id]/route.ts:135:25)
  133 |     }
  134 |
> 135 |     const existingRun = await prisma.run.findUnique({
      |                                          ^
  136 |       where: { id: params.id },
  137 |     });
  138 | {
  clientVersion: '7.3.0'
}
 DELETE /api/runs/cmkt5fla700037u9khvcljc8s 500 in 297ms (compile: 14ms, render: 283ms)