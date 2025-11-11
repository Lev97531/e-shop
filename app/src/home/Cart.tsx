import { Dialog } from './Dialog'

export const Cart = () => {
  const items = [1, 2, 3]

  return (
    <Dialog>
      {items.map((item) => (
        <div>{item}</div>
      ))}
    </Dialog>
  )
}
