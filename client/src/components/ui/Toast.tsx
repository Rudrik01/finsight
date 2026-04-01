import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToastStore, type ToastMessage } from '../../store/useToastStore';

function ToastItem({ toast }: { toast: ToastMessage }) {
  const removeToast = useToastStore((state) => state.removeToast);

  const icons = {
    success: <CheckCircle className="text-secondary-500" size={20} />,
    error: <AlertCircle className="text-tertiary-500" size={20} />,
    info: <Info className="text-primary-500" size={20} />
  };

  const borderColors = {
    success: 'border-secondary-500',
    error: 'border-tertiary-500',
    info: 'border-primary-500'
  };

  return (
    <div
      className={`glass-panel border-l-4 ${borderColors[toast.type]} rounded-md p-4 min-w-[300px] flex items-start gap-4 animate-in slide-in-from-right-8`}
    >
      <div className="mt-0.5">{icons[toast.type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-on-surface">{toast.message}</p>
        <div className="h-1 bg-surface-variant w-full mt-2 rounded-full overflow-hidden">
          <div className="h-full bg-outline-variant animate-[shrink_4s_linear]" />
        </div>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="text-on-surface-variant hover:text-on-surface"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
