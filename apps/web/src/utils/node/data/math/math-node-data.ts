import { Position } from '@xyflow/react'
import type { NodeConfig } from '@/types/node-config'

const binaryMathHandles = [
  {
    position: Position.Left,
    type: 'target',
    label: 'a',
    dataField: 'a',
    dataType: 'number',
    maxConnections: 1,
  },
  {
    position: Position.Left,
    type: 'target',
    label: 'b',
    dataField: 'b',
    dataType: 'number',
    maxConnections: 1,
  },
  {
    position: Position.Right,
    type: 'source',
    dataField: 'result',
    dataType: 'number',
  },
] satisfies NodeConfig['handles']

const unaryMathHandles = [
  {
    position: Position.Left,
    type: 'target',
    label: 'a',
    dataField: 'a',
    dataType: 'number',
    maxConnections: 1,
  },
  {
    position: Position.Right,
    type: 'source',
    dataField: 'result',
    dataType: 'number',
  },
] satisfies NodeConfig['handles']

const createMathNodeConfig = (label: string, handles = binaryMathHandles) =>
  ({
    label,
    handles,
    actions: [],
  }) satisfies NodeConfig

export const addNodeConfig = createMathNodeConfig('ADD')
export const subtractNodeConfig = createMathNodeConfig('SUBTRACT')
export const multiplyNodeConfig = createMathNodeConfig('MULTIPLY')
export const divideNodeConfig = createMathNodeConfig('DIVIDE')
export const moduloNodeConfig = createMathNodeConfig('MODULO')
export const exponentNodeConfig = createMathNodeConfig('EXPONENT')
export const roundNodeConfig = createMathNodeConfig('ROUND', unaryMathHandles)
export const minNodeConfig = createMathNodeConfig('MIN')
export const maxNodeConfig = createMathNodeConfig('MAX')
