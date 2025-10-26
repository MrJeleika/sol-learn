import { FlipButton } from '../ui/flip-button'
import { SparklesCore } from '../ui/sparkles'
import { WavyBackground } from '../ui/wavy-background'
import { GradientText } from '../ui/gradient-text'

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
        containerClassName="[&>canvas]:-rotate-45 max-sm:[&>canvas]:-rotate-0 [&>canvas]:w-[150%] max-md:[&>canvas]:translate-y-[20%] max-lg:[&>canvas]:translate-y-[10%]"
      >
        <div className="sm:pt-[22vh] pt-[10vh] px-3 sm:px-10 xl:px-20 flex flex-col justify-center overflow-hidden">
          <h1 className="xl:text-7xl text-[28px] sm:text-4xl font-bold  relative z-20">
            Your{' '}
            <GradientText
              text="Solana"
              gradient="linear-gradient(225deg, #24ffa7 0%, #519ed4 25%, #9945ff 50%, #519ed4 75%, #24ffa7 100%)"
            />{' '}
            <br />
            learning platform
          </h1>
          <div className="sm:w-1/2 w-full h-32 xl:h-40 relative">
            <p className="absolute z-50 top-4 xl:text-[22px] lg:text-lg">Build, Learn and Grow</p>
            <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
            <div className="absolute inset-x-0 top-0 bg-linear-to-r from-transparent via-indigo-500 to-transparent h-px w-full" />
            <div className="absolute sm:inset-x-40 inset-x-10 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
            <div className="absolute sm:inset-x-40 inset-x-10 top-0 bg-linear-to-r from-transparent via-sky-500 to-transparent h-px w-1/2" />
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
          <a href="https://app.sol-learn.me/" target="_blank" className="max-sm:w-full" rel="noopener noreferrer">
            <FlipButton
              frontClassName="bg-primary text-background"
              frontText="Launch App"
              className="max-sm:w-full"
              backText="Launch App"
            />
          </a>
        </div>
      </WavyBackground>
    </div>
  )
}
