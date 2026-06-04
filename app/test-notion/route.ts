export async function GET() {
  const token = process.env.NOTION_TOKEN;
  const dbId = "375b383bef80806f8a83000b92be11b5";

  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const data = await res.json();

  return Response.json({
    status: res.status,
    tokenPrefix: token?.slice(0, 15) + "...",
    data,
  });
}
