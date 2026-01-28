import { useLayoutEffect } from 'react'
import { useLocation } from 'wouter'
import { useBrowserLocation } from 'wouter/use-browser-location'

const hypotheticalRouterGlobalState: any = {}

export const interceptingHook = (router) => {
	const [path, navigate] = useBrowserLocation(router)

	const wrappedNavigate = (...args) => {
		hypotheticalRouterGlobalState.currentNavigateOptions = args[1] ?? {}
		//@ts-ignore
		navigate(...args)
	}

	return [path, wrappedNavigate]
}

const updateScroll = () => {
	const options = hypotheticalRouterGlobalState.currentNavigateOptions
	hypotheticalRouterGlobalState.currentNavigateOptions = null
	if (!options || options.noScroll) {
		return
	}
	const hash = document.location.hash?.substring(1)
	const target = hash ? document.getElementById(hash) : null
	if (target) {
		target.scrollIntoView({
			behavior: 'instant',
			block: 'start',
			inline: 'nearest',
		})
	} else {
		window.scrollTo(0, 0)
	}
}

export const ScrollRestorer = () => {
	const [path] = useLocation()
	useLayoutEffect(updateScroll, [path])

	return null
}
