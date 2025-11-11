import { Cart } from './Cart'

export const Header = () => {
  return (
    <div className="h-24 bg-[#22223b]">
      Header
      <div>
        <button
          className="btn btn-secondary"
          onClick={() => (document.getElementById('shopping-cart') as HTMLDialogElement)?.showModal()}
        >
          Košík
        </button>
        <Cart />
      </div>
    </div>
  )
}
