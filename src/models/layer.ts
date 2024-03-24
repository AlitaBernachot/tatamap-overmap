import type { MapContextLayer } from "@geospatial-sdk/core"

export type Layer = {
    id: string
    name?: string
    isBaseLayer?: boolean
    layerDefinition: MapContextLayer
}