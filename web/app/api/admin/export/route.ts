const exportRows = [
  { accountId: 'acct_100', email: 'ada@acme.com', totalSpend: 238000, lastLogin: '2026-07-13T18:20:00+05:30' },
  { accountId: 'acct_200', email: 'grace@acme.com', totalSpend: 884000, lastLogin: '2026-07-14T09:10:00+05:30' }
];

export async function GET() {
  return Response.json({ generatedAt: new Date().toISOString(), rows: exportRows }, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
}
