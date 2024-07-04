import { Elysia, t } from "elysia";
import { prisma } from "../../libs/prisma";

export const hit = (app: Elysia) =>
	app
		.post(
			"/hit",
			async ({ request, body, set }: any) => {
				const { id, headers, url } = body;

				const ip = request.headers.get("true-client-ip") || "127.0.0.1";
				const result: any = await prisma.$queryRaw`
        WITH upsert AS (
          INSERT INTO "user" (id, ip, website_id)
          VALUES (gen_random_uuid(), ${ip}, ${id})
          ON CONFLICT (ip, website_id) DO NOTHING
          RETURNING id
        )
        SELECT id FROM upsert
        UNION ALL
        SELECT id FROM "user" WHERE ip = ${ip} AND website_id = ${id}
        LIMIT 1;
      `;
				await prisma.hit.create({
					data: {
						headers,
						url,
						user_id: result[0].id,
					},
				});
				return {
					success: true,
					message: `recorded !`,
				};
			},
			{
				body: t.Object({
					id: t.String(),
					url: t.String(),
					headers: t.Object({}),
				}),
			}
		)
		.onError(() => "Some Fields Are Required");
