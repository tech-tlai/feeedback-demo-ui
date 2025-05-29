<script>
	import {
		Upload,
		BarChart3,
		Users,
		FileText,
		CheckCircle,
		TrendingUp,
		Clock,
		Shield,
		Zap,
		Target,
		Award
	} from 'lucide-svelte';

	import { goto } from '$app/navigation';
	import DummyBarChart from '$lib/components/charts/DummyBarChart.svelte';
	import { CommonDashCard, MultiFileUpload } from '$lib';
	import { ProductFeatures, UploadSteps } from '$lib/components/landing-page';
	import ContentUploadSection from '$lib/components/landing-page/ContentUploadSection.svelte';

	function handleFileUpload(e) {
		goto('/dashboard-portal');
	}

	let files = [];

	function handleFileChange(event) {
		const selectedFiles = Array.from(event.target.files);
		files = selectedFiles;
	}

	function handleUpload() {
		console.log('Uploading files:', files);
	}

	function scrollToSection(sectionId) {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="bg-white shadow-lg relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-white to-accent-blue/20"></div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center py-6">
				<div class="flex items-center">
					<div class="">
						<BarChart3 class="h-6 w-6 text-black" />
					</div>
					<span class="ml-3 text-xl font-bold text-black">EduMetrics</span>
				</div>

				<nav class="hidden md:flex space-x-8">
					<a href="#">
						<button
							onclick={() => scrollToSection('features')}
							class="text-black hover:text-black/80 transition-colors"
						>
							Features
						</button>
					</a>
					<a href="#upload">
						<button
							onclick={() => scrollToSection('upload')}
							class="text-black hover:text-black/80 transition-colors"
						>
							Upload
						</button>
					</a>
					<!-- <button
						onclick={() => scrollToSection('analytics')}
						class="text-gray-light hover:text-white transition-colors"
					>
						Analytics
					</button>
					<button
						onclick={() => scrollToSection('contact')}
						class="text-gray-light hover:text-white transition-colors"
					>
						Contact
					</button> -->
				</nav>
				<a href="#upload">
					<button
						class=" bg-black/80 text-white border-0 px-6 py-2 rounded-lg font-medium text-base transition-all"
					>
						Start Analysis
					</button>
				</a>
			</div>
		</div>
	</header>

	<!-- Hero Section -->
	<section class="relative py-24 bg-gradient-to-br from-white to-accent-blue/30">
		<div
			class="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200&query=abstract geometric pattern')] opacity-5"
		></div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid lg:grid-cols-2 gap-12 items-center">
				<div>
					<div
						class="inline-flex items-center bg-purple/50 text-black px-4 py-2 rounded-full text-sm font-medium mb-6"
					>
						<Zap class="h-4 w-4 mr-2" />
						AI-Powered Analytics
					</div>
					<h1 class="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
						Smart
						<span class="bg-gradient-to-r from-accent-blue to-black bg-clip-text text-transparent">
							Performance</span
						>
						<br />
						Analytics
					</h1>
					<p class="text-xl text-black mb-8 leading-relaxed">
						Transform exam data into powerful insights. Upload results, get instant analytics, and
						drive educational excellence with our cutting-edge platform.
					</p>
					<div class="flex flex-col sm:flex-row gap-4">
						<a href="#upload">
							<button
								class=" bg-black/80 text-white border-0 px-8 py-3 rounded-lg font-medium text-lg transition-all"
							>
								Start Analysis
							</button>
						</a>
					</div>
				</div>

				<div>
					<div class="relative">
						<div
							class="bg-gradient-to-br from-purple/20 to-accent-blue/20 rounded-3xl p-8 backdrop-blur-sm border border-gray-light/20"
						>
							<div class="bg-white rounded-2xl p-6 shadow-2xl">
								<DummyBarChart />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- File Upload Section -->
	<section id="upload" class="py-20 bg-gray-light/30">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="text-center mb-8">
				<div
					class="inline-flex items-center bg-orange-light text-orange-dark px-4 py-2 rounded-full text-sm font-medium mb-4"
				>
					<Upload class="h-4 w-4 mr-2" />
					Quick Upload
				</div>
				<h2 class="text-4xl font-bold text-black mb-4">Upload & Analyze in Seconds</h2>
				<p class="text-xl text-gray-dark max-w-2xl mx-auto">
					Drag, drop, and discover insights instantly. Support for CSV, Excel, PDF, and more.
				</p>
			</div>

			<!-- <UploadSteps/> -->
			<ContentUploadSection onFileUploadSubmit={handleFileUpload} />
		</div>
	</section>

	<!-- Features Grid -->
	<ProductFeatures />

	<!-- CTA Section -->
	<section
		class="py-20 bg-gradient-to-r from-gray-light via-accent-blue/40 to-accent-blue/10 relative overflow-hidden"
	>
		<div
			class="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200&query=geometric pattern')] opacity-10"
		></div>
		<div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="text-4xl font-bold text-black mb-6">Ready to Revolutionize Your Analytics?</h2>
			<p class="text-xl text-black mb-8 max-w-2xl mx-auto">
				Join the AI revolution to drive student success and improve learning outcomes.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="#upload">
					<button
						class="bg-white text-black hover:bg-gray-light px-8 py-3 rounded-lg font-medium text-lg transition-all"
					>
						Start Analysis
					</button>
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-black text-white py-16">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid md:grid-cols-4 gap-8 mb-8">
				<div>
					<div class="flex items-center mb-6">
						<div class="bg-gradient-to-r from-purple to-link p-2 rounded-lg">
							<BarChart3 class="h-6 w-6 text-white" />
						</div>
						<span class="ml-3 text-xl font-bold">EduMetrics</span>
					</div>
					<p class="text-gray-light leading-relaxed">
						Transforming education through intelligent analytics and data-driven insights.
					</p>
				</div>
				<div>
					<h3 class="font-bold mb-4 text-white">Product</h3>
					<ul class="space-y-3 text-gray-light">
						<li><a href="#" class="hover:text-purple transition-colors">Features</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Pricing</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">API</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Integrations</a></li>
					</ul>
				</div>
				<div>
					<h3 class="font-bold mb-4 text-white">Support</h3>
					<ul class="space-y-3 text-gray-light">
						<li><a href="#" class="hover:text-purple transition-colors">Documentation</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Help Center</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Contact</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Training</a></li>
					</ul>
				</div>
				<div>
					<h3 class="font-bold mb-4 text-white">Company</h3>
					<ul class="space-y-3 text-gray-light">
						<li><a href="#" class="hover:text-purple transition-colors">About</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Blog</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Careers</a></li>
						<li><a href="#" class="hover:text-purple transition-colors">Press</a></li>
					</ul>
				</div>
			</div>
			<div class="border-t border-gray-dark pt-8 text-center">
				<p class="text-gray-light">
					&copy; 2025 EduMetrics. All rights reserved. Built for educators, by educators.
				</p>
			</div>
		</div>
	</footer>
</div>

<!-- <style>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';
</style> -->
