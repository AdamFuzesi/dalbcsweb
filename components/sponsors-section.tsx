"use client"

const sponsors = [
  { name: "Eigen", logo: "/eigenlayerlogotwo.webp" },
  { name: "Coinbase", logo: "/coinbase-logo.png" },
  { name: "Jupiter", logo: "/jupiter.png" },
  { name: "Sonic", logo: "/sonic.avif" },
  { name: "Sui", logo: "/sui.png" },
  { name: "Ethereum", logo: "/eth.webp" },
  { name: "Wu", logo: "/wu.webp" },
  { name: "Ethereum Single", logo: "/ethsingle.png" },
]

function FloatingSponsors() {
  return (
    <div className="relative w-full h-[500px]">
      {sponsors.map((sponsor, index) => {
        const positions = [
          { left: "15%", top: "10%" },
          { left: "45%", top: "5%" },
          { left: "75%", top: "15%" },
          { left: "25%", top: "35%" },
          { left: "60%", top: "30%" },
          { left: "10%", top: "60%" },
          { left: "50%", top: "65%" },
          { left: "80%", top: "55%" },
        ]

        const position = positions[index] || { left: "50%", top: "50%" }

        return (
          <div
            key={sponsor.name}
            className="absolute animate-float opacity-70 hover:opacity-100 transition-all duration-500"
            style={{
              animationDelay: `${index * 0.6}s`,
              left: position.left,
              top: position.top,
              animationDuration: `${3.5 + (index % 3) * 0.5}s`,
            }}
          >
            <img
              src={sponsor.logo || "/placeholder.svg"}
              alt={sponsor.name}
              className="w-24 h-24 object-contain hover:scale-110 transition-transform duration-300 cursor-pointer filter brightness-90 hover:brightness-110"
            />
          </div>
        )
      })}
    </div>
  )
}

export default function SponsorsSection() {
  return (
    <section className="min-h-screen bg-black overflow-hidden relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-yellow-400/5" />

      <div className="relative z-10 flex items-center justify-between px-8 py-20 min-h-screen max-w-7xl mx-auto">
        {/* Left side - Text */}
        <div className="flex-1 max-w-2xl pr-12">
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight leading-none">
            Our
            <br />
            <span className="text-yellow-400">Sponsors</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg leading-relaxed mb-8">
            Powered by leading organizations building the future of blockchain technology and innovation. Together,
            we're shaping the next generation of decentralized solutions.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-sm font-medium tracking-wider">TRUSTED PARTNERS</span>
          </div>
        </div>

        {/* Right side - Animation */}
        <div className="flex-1 flex items-center justify-center">
          <FloatingSponsors />
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}