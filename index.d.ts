declare module '@sapper/app' {
    // from sapper/runtime/src/app/types.ts
    // sapper doesn't export its types yet
    interface Redirect {
        statusCode: number
        location: string
    }
    // end

    function goto(href: string): Promise<unknown>
    function prefetch(href: string): Promise<{ redirect?: Redirect; data?: unknown }>
    function prefetchRoutes(pathnames: string[]): Promise<unknown>
    function start(opts: { target: Node }): Promise<unknown>
    const stores: () => unknown

    export { goto, prefetch, prefetchRoutes, start, stores }
}

declare module '@sapper/server' {
    function middleware()

    export { middleware }
}
