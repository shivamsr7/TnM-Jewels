import { FaExclamationCircle } from "react-icons/fa";

export default function StatusConfirmModal({
  open,
  currentStatus,
  newStatus,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-6 flex justify-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">

            <FaExclamationCircle className="text-3xl text-yellow-500" />

          </div>

        </div>

        <h2 className="text-center text-2xl font-bold">
          Update Order Status
        </h2>

        <p className="mt-4 text-center text-gray-600">
          Are you sure you want to change the status?
        </p>

        <div className="my-8 flex items-center justify-center gap-4">

          <span className="rounded-full bg-gray-100 px-4 py-2 font-medium">
            {currentStatus}
          </span>

          <span className="text-xl">→</span>

          <span className="rounded-full bg-[#C8A45C] px-4 py-2 font-medium text-white">
            {newStatus}
          </span>

        </div>

        <div className="flex gap-4">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border py-3 font-semibold hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-[#C8A45C] py-3 font-semibold text-white hover:bg-black"
          >
            Update Status
          </button>

        </div>

      </div>

    </div>
  );
}