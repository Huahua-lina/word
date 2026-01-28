import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Router, Route, Switch } from 'wouter'
import ErrorBoundary from '@/components/ErrorBoundary'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Layout from '@/components/Layout'

// Pages
import Home from '@/pages/Home'
import Library from '@/pages/Library'
import IdiomDetail from '@/pages/IdiomDetail'
import Discrimination from '@/pages/Discrimination'
import Comparison from '@/pages/Comparison'
import Mine from '@/pages/Mine'
import Import from '@/pages/Import'
import NotFound from '@/pages/NotFound'
import { useBrowserLocation } from 'wouter/use-browser-location'

function AppRouter() {
	return (
		<Router hook={useBrowserLocation}>
			<Layout>
				<Switch>
					<Route path="/" component={Home} />
					<Route path="/library" component={Library} />
					<Route path="/idiom/:id" component={IdiomDetail} />
					<Route path="/discrimination" component={Discrimination} />
					<Route path="/comparison" component={Comparison} />
					<Route path="/mine" component={Mine} />
					<Route path="/import" component={Import} />
					<Route component={NotFound} />
				</Switch>
			</Layout>
		</Router>
	)
}

function App() {
	return (
		<ErrorBoundary>
			<ThemeProvider defaultTheme="light">
				<TooltipProvider>
					<Toaster position="top-center" />
					<AppRouter />
				</TooltipProvider>
			</ThemeProvider>
		</ErrorBoundary>
	)
}

export default App
