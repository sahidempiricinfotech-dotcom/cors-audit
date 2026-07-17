const newsletterOrigins = ['https://www.acme.com'];
const subscribers = new Map<string, { email: string; source: string; subscribedAt: string }>();

function headersFor(request: Request) {
  const origin = request.headers.get('origin');

  if (origin && newsletterOrigins.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      Vary: 'Origin'
    };
  }

  return {};
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 204,
    headers: headersFor(request)
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const subscriber = {
    email: String(body.email),
    source: String(body.source || 'footer'),
    subscribedAt: new Date().toISOString()
  };

  subscribers.set(subscriber.email, subscriber);
  return Response.json({ subscribed: true, email: subscriber.email }, { status: 201, headers: headersFor(request) });
}
