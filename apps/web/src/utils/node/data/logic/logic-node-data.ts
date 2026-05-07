import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

const booleanSourceHandle = {
  position: Position.Right,
  type: 'source',
  dataField: 'result',
  label: 'Result',
  dataType: 'boolean',
} satisfies NodeConfig['handles'][number]

const binaryLogicHandles = [
  {
    position: Position.Left,
    type: 'target',
    dataField: 'a',
    label: 'A',
    dataType: 'boolean',
    maxConnections: 1,
  },
  {
    position: Position.Left,
    type: 'target',
    dataField: 'b',
    label: 'B',
    dataType: 'boolean',
    maxConnections: 1,
  },
  booleanSourceHandle,
] satisfies NodeConfig['handles']

const unaryLogicHandles = [
  {
    position: Position.Left,
    type: 'target',
    dataField: 'a',
    label: 'A',
    dataType: 'boolean',
    maxConnections: 1,
  },
  booleanSourceHandle,
] satisfies NodeConfig['handles']

const createLogicNodeConfig = <T extends NodeConfig['handles']>(label: string, handles: T) =>
  ({
    label,
    handles,
    actions: [],
  }) satisfies NodeConfig

export const booleanNodeConfig = {
  label: 'BOOLEAN',
  handles: [
    {
      position: Position.Right,
      type: 'source',
      dataField: 'value',
      label: 'Value',
      dataType: 'boolean',
    },
  ],
  actions: [],
} as const satisfies NodeConfig

export const andNodeConfig = createLogicNodeConfig('AND', binaryLogicHandles)
export const orNodeConfig = createLogicNodeConfig('OR', binaryLogicHandles)
export const notNodeConfig = createLogicNodeConfig('NOT', unaryLogicHandles)

export const equalNodeConfig = {
  label: 'EQUAL',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'a',
      label: 'A',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'b',
      label: 'B',
      maxConnections: 1,
    },
    booleanSourceHandle,
  ],
  actions: [],
} as const satisfies NodeConfig

export const compareNodeConfig = {
  label: 'COMPARE',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'a',
      label: 'A',
      dataType: 'number',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'b',
      label: 'B',
      dataType: 'number',
      maxConnections: 1,
    },
    booleanSourceHandle,
  ],
  actions: [],
} as const satisfies NodeConfig

export const hasValueNodeConfig = {
  label: 'HAS VALUE',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'value',
      label: 'Value',
      maxConnections: 1,
    },
    booleanSourceHandle,
  ],
  actions: [],
} as const satisfies NodeConfig

export const ifNodeConfig = {
  label: 'IF',
  handles: [
    {
      position: Position.Left,
      type: 'target',
      dataField: 'condition',
      label: 'Condition',
      dataType: 'boolean',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'whenTrue',
      label: 'True',
      maxConnections: 1,
    },
    {
      position: Position.Left,
      type: 'target',
      dataField: 'whenFalse',
      label: 'False',
      maxConnections: 1,
    },
    {
      position: Position.Right,
      type: 'source',
      dataField: 'value',
      label: 'Value',
      dataType: 'any',
    },
  ],
  actions: [],
} as const satisfies NodeConfig
