const products = [
  { sku: 'sku_starter', name: 'Starter Plan', price: 2900, currency: 'USD' },
  { sku: 'sku_growth', name: 'Growth Plan', price: 9900, currency: 'USD' },
  { sku: 'sku_enterprise', name: 'Enterprise Plan', price: 24900, currency: 'USD' }
];

export async function GET() {
  return Response.json({ products });
}
