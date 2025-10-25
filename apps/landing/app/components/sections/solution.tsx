import { NodesText } from '../nodes/nodes-text'
import { FlickeringGrid } from '../ui/bg-grid'

export function Solution() {
  return (
    <section className="bg-primary-2 min-h-screen sm:pt-12 pt-6 relative text-foreground">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={10}
        gridGap={6}
        color="#FFF"
        maxOpacity={0.1}
        flickerChance={1}
        mask="mountains"
        mountainsOptions={{
          baseHeightRatio: 0.12,
          peaks: [
            { centerRatioX: 0.18, widthRatio: 0.3, heightRatio: 0.18 },
            { centerRatioX: 0.5, widthRatio: 0.45, heightRatio: 0.35 },
            { centerRatioX: 0.82, widthRatio: 0.28, heightRatio: 0.22 },
          ],
          noiseAmplitudeRatio: 0.05,
          noiseFreq1: 2,
          noiseFreq2: 5,
          noiseFreq3: 9,
          noiseSeed: 42,
          jitterAmplitudeRatio: 0.015,
          edgeBandRatio: 0.08,
          overEdgeMaxProb: 0.45,
          underEdgeDropMaxProb: 0.35,
        }}
      />
      <div className="sm:p-12 p-6 flex flex-col flex-1 sm:gap-12 gap-6">
        <h2 className="text-2xl font-bold">Solution</h2>
        <div className="flex lg:flex-row flex-col gap-12">
          <div className="flex w-full lg:w-1/2 flex-col gap-6">
            <NodesText />
          </div>
          <div className="flex -translate-y-10 w-full lg:w-1/2 justify-end gap-8"></div>
        </div>
      </div>
    </section>
  )
}
