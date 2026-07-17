const carts = new Map<string, { accountId: string; sku: string; quantity: number }[]>([
  ['acct_100', [{ accountId: 'acct_100', sku: 'sku_starter', quantity: 1 }]]
]);

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-Id'
    }
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const accountId = String(body.accountId || 'acct_100');
  const cart = carts.get(accountId) || [];
  const checkout = {
    id: `chk_${Date.now()}`,
    accountId,
    items: cart,
    paymentToken: body.paymentToken,
    total: cart.reduce((sum, item) => sum + item.quantity * 2900, 0)
  };

  return Response.json(checkout, {
    status: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });
}
