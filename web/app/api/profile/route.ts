const profiles = new Map<string, { id: string; email: string; name: string; plan: string }>([
  ['acct_100', { id: 'acct_100', email: 'ada@acme.com', name: 'Ada Lovelace', plan: 'growth' }],
  ['acct_200', { id: 'acct_200', email: 'grace@acme.com', name: 'Grace Hopper', plan: 'enterprise' }]
]);

export async function GET(request: Request) {
  const accountId = new URL(request.url).searchParams.get('accountId') || 'acct_100';
  const profile = profiles.get(accountId) || {
    id: accountId,
    email: `${accountId}@acme.com`,
    name: 'Acme User',
    plan: 'starter'
  };

  return Response.json(profile);
}
