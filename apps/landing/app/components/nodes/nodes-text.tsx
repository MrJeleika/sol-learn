export const NodesText = () => {
  return (
    <div className="text-lg leading-relaxed ">
      <p>
        Nodes are visual building blocks that represent Solana actions and data. Connect a node&apos;s output handle to
        another node&apos;s input to pass values through the flow.
      </p>
      <p>
        For example: use a Keypair node to create a signer, connect it to a Transaction Builder node, then attach
        Instruction nodes.
      </p>
      <p>Finally, send the Transaction node to execute on chain.</p>
    </div>
  )
}
