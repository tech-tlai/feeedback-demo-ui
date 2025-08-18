<script>
import { TrendingUp, Users, BarChart3, Clock, Shield, CheckCircle } from 'lucide-svelte';
</script>

<section id="features" class="py-20 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-4xl font-bold text-black mb-4">Powerful Features for Modern Education</h2>
			<p class="text-xl text-gray-dark max-w-3xl mx-auto">
				Everything you need to transform raw data into actionable educational insights
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div
				class="border border-gray-light/50 hover:shadow-xl transition-all duration-300 group bg-white rounded-lg p-6"
			>
				<div
					class="bg-gradient-to-r from-graph-green/10 to-graph-green/20 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4"
				>
					<TrendingUp class="h-6 w-6 text-graph-green" />
				</div>
				<h3 class="text-xl font-bold text-black mb-3">Performance Tracking</h3>
				<p class="text-gray-dark">
					Monitor student progress with detailed analytics, trend analysis, and predictive
					insights for better outcomes.
				</p>
			</div>

			<div
				class="border border-gray-light/50 hover:shadow-xl transition-all duration-300 group bg-white rounded-lg p-6"
			>
				<div
					class="bg-gradient-to-r from-graph-blue/10 to-graph-blue/20 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4"
				>
					<Users class="h-6 w-6 text-graph-blue" />
				</div>
				<h3 class="text-xl font-bold text-black mb-3">Class Analytics</h3>
				<p class="text-gray-dark">
					Comprehensive class-wide statistics with comparative analysis and improvement
					recommendations.
				</p>
			</div>

			<div
				class="border border-gray-light/50 hover:shadow-xl transition-all duration-300 group bg-white rounded-lg p-6"
			>
				<div
					class="bg-gradient-to-r from-graph-purple/10 to-graph-purple/20 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4"
				>
					<BarChart3 class="h-6 w-6 text-graph-purple" />
				</div>
				<h3 class="text-xl font-bold text-black mb-3">Visual Reports</h3>
				<p class="text-gray-dark">
					Generate stunning, interactive charts and reports that make complex data easy to
					understand.
				</p>
			</div>

			<div
				class="border border-gray-light/50 hover:shadow-xl transition-all duration-300 group bg-white rounded-lg p-6"
			>
				<div
					class="bg-gradient-to-r from-orange-dark/10 to-orange-dark/20 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4"
				>
					<Clock class="h-6 w-6 text-orange-dark" />
				</div>
				<h3 class="text-xl font-bold text-black mb-3">Real-time Processing</h3>
				<p class="text-gray-dark">
					Lightning-fast analysis with instant results. No waiting, no delays - just immediate
					insights.
				</p>
			</div>

			<div
				class="border border-gray-light/50 hover:shadow-xl transition-all duration-300 group bg-white rounded-lg p-6"
			>
				<div
					class="bg-gradient-to-r from-red-dark/10 to-red-dark/20 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4"
				>
					<Shield class="h-6 w-6 text-red-dark" />
				</div>
				<h3 class="text-xl font-bold text-black mb-3">Enterprise Security</h3>
				<p class="text-gray-dark">
					Military-grade encryption and compliance with educational data protection standards.
				</p>
			</div>

			<div
				class="border border-gray-light/50 hover:shadow-xl transition-all duration-300 group bg-white rounded-lg p-6"
			>
				<div
					class="bg-gradient-to-r from-purple/10 to-purple/20 p-3 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4"
				>
					<CheckCircle class="h-6 w-6 text-purple" />
				</div>
				<h3 class="text-xl font-bold text-black mb-3">Smart Integration</h3>
				<p class="text-gray-dark">
					Seamlessly connects with existing school systems and supports all major file formats.
				</p>
			</div>
		</div>
	</div>
</section>
