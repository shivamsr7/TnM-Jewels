import { FaTrashAlt } from "react-icons/fa";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <FaTrashAlt className="text-2xl text-red-600" />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold">
          Delete Product
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Are you sure you want to delete
        </p>

        <p className="mt-2 text-center font-semibold text-black">
          "{productName}"?
        </p>

        <p className="mt-4 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}