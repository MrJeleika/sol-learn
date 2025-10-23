import { FlipButton } from '../ui/flip-button'
import { SparklesCore } from '../ui/sparkles'
import { WavyBackground } from '../ui/wavy-background'

export function Main() {
  return (
    <div className="overflow-hidden h-[calc(100vh-96px)]">
      <WavyBackground
        backgroundFill="#171717"
        colors={['#24ffa7', '#519ed4', '#9945ff']}
        waveWidth={30}
        blur={8}
        speed="slow"
        waveOpacity={0.3}
        className="w-full text-foreground"
        containerClassName="[&>canvas]:-rotate-45 [&>canvas]:w-[150%] "
      >
        <div className="pt-[22vh] px-10 xl:px-20 flex flex-col justify-center overflow-hidden">
          <h1 className="text-7xl font-bold  max-w-[800px] relative z-20">
            Your{' '}
            <span className="bg-linear-to-bl from-[#24ffa7] via-[#519ed4] to-[#9945ff] bg-clip-text text-transparent">
              Solana
            </span>{' '}
            learning platform
          </h1>
          <div className="w-[800px] h-40 relative">
            <p className="absolute z-50 top-4 text-[22px]">Build, Learn, and Grow</p>
            <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
            <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
            <div className="absolute inset-x-40 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
            <div className="absolute inset-x-40 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-px w-1/2" />
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />
            <div className="absolute inset-0 w-full h-full bg-background mask-[radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
          <FlipButton frontClassName="bg-primary text-background" frontText="Launch App" backText="Launch App" />
        </div>
      </WavyBackground>
    </div>
  )
}
