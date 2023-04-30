export function returnUnauthorized() {
    return new Response('Unauthorized', { status: 401 });
}
