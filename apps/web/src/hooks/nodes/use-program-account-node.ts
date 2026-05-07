import { useCallback, useEffect, useMemo, useState } from 'react'
import { Position, useUpdateNodeInternals } from '@xyflow/react'
import type { Idl, IdlAccount } from '@/types/nodes/programs/idl-node'
import type { Network } from '@/types/network'
import type { ProgramAccountNodeData } from '@/types/nodes/programs/program-account-node'
import { useTypedNodesData } from '@/hooks/flow/use-typed-nodes-data'
import { useTypedReactFlow } from '@/hooks/flow/use-typed-react-flow'
import { useAccountInfo } from '@/hooks/solana/query/use-account-info'
import { decodeAccount, idlTypeToHandleDataType } from '@/utils/idl'

export const useProgramAccountNode = (nodeId: string, initialSelectedAccount?: string) => {
  const { updateNodeData } = useTypedReactFlow()
  const updateNodeInternals = useUpdateNodeInternals()

  const resolved = useTypedNodesData<'idl' | 'programId' | 'network' | 'address'>(nodeId)

  const { idl, network, address } = useMemo(
    () => ({
      idl: (resolved.idl?.value as Idl | null) ?? null,
      programId: (resolved.programId?.value as string) ?? '',
      network: (resolved.network?.value as Network) ?? null,
      address: (resolved.address?.value as string) ?? '',
    }),
    [resolved]
  )

  const [selectedAccount, setSelectedAccount] = useState<string>(initialSelectedAccount ?? '')
  const [refreshKey, setRefreshKey] = useState(1)
  const refresh = useCallback(() => setRefreshKey((k) => k + 1), [])

  const selectedAccountDef = useMemo<IdlAccount | null>(() => {
    if (!idl || !selectedAccount) return null
    return idl.accounts?.find((a) => a.name === selectedAccount) ?? null
  }, [idl, selectedAccount])

  const { data: accountInfo, isLoading, error: fetchError } = useAccountInfo(address, network, refreshKey)

  const extraHandles = useMemo(() => {
    if (!selectedAccountDef) return []
    return selectedAccountDef.type.fields.map((field) => ({
      position: Position.Right,
      type: 'source' as const,
      dataField: `field_${field.name}`,
      label: field.name,
      dataType: idlTypeToHandleDataType(field.type),
    }))
  }, [selectedAccountDef])

  useEffect(() => {
    updateNodeInternals(nodeId)
  }, [extraHandles, nodeId, updateNodeInternals])

  const [decodeError, setDecodeError] = useState<string | null>(null)
  const [decoded, setDecoded] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    if (!selectedAccountDef || !accountInfo) {
      setDecoded(null)
      setDecodeError(null)
      return
    }
    try {
      const result = decodeAccount(selectedAccountDef, accountInfo.data)
      setDecoded(result.fields)
      setDecodeError(null)
    } catch (e) {
      setDecoded(null)
      setDecodeError(e instanceof Error ? e.message : 'Decode failed')
    }
  }, [selectedAccountDef, accountInfo])

  useEffect(() => {
    const fieldEntries: Record<string, unknown> = {}
    if (decoded) {
      for (const [name, value] of Object.entries(decoded)) {
        fieldEntries[`field_${name}`] = value
      }
    }
    updateNodeData<ProgramAccountNodeData>(nodeId, {
      idl,
      selectedAccount,
      decoded,
      error: decodeError ?? (fetchError instanceof Error ? fetchError.message : null),
      ...fieldEntries,
    })
  }, [nodeId, idl, selectedAccount, decoded, decodeError, fetchError, updateNodeData])

  return {
    idl,
    address,
    network,
    selectedAccount,
    setSelectedAccount,
    selectedAccountDef,
    extraHandles,
    decoded,
    decodeError,
    isLoading,
    fetchError,
    accountFound: !!accountInfo,
    refresh,
  }
}
