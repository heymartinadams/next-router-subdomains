// Packages
import { NextResponse } from 'next/server'

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)'
	]
}

export default async (req, _) => {
	const hostname = req.headers.get('host')

	let { pathname, search } = new URL(req.nextUrl)

	const host = hostname.replace(`.ecstatic.dev`, '')

	// Subdomain
	if (host === 'a') {
		const url = new URL(`/_sites/${host}${pathname}${search}`, req.nextUrl)

		if (pathname === '/static-props') {
			console.log(`→ rewrite() to ${url.toString()}`)
			return NextResponse.rewrite(url)
		}

		if (pathname === '/server-side-props') {
			// See: https://github.com/vercel/next.js/pull/41380#issue-1407167566
			const headers = new Headers(req.headers)
			headers.set('x-custom', 'yay 🎉')
			console.log(`→ rewrite() to ${url.toString()} with headers`)
			return NextResponse.rewrite(url, { request: headers })
		}
	}

	console.log('→ next()')
	return NextResponse.next()
}
