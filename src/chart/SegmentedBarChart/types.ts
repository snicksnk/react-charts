import { BarValue } from "../BarChart/types"
import { NumberScale, WordScale } from "../common/types"

export type ClusterBarGroupValue = {
  value: number,
  name: string
}


export type ClusteredBarData = Array<ClusteredBarGroupValue>

export type ClusteredBarGroupValue = {
  groupName: string,
  bars: Array<BarValue>
}

export type ClusteredBarScales = {
  names: { groups: WordScale, bars: WordScale },
  values: NumberScale,
}