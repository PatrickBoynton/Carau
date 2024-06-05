/** @type {import("next").NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [320, 420, 768, 1024, 1200],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [{
			protocol: "https",
			hostname: "cdn.pixabay.com"
		}]
	}
}

export default nextConfig
