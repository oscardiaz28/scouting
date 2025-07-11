import React, { createContext, useContext, useState } from "react"
import { v4 as uuidv4 } from "uuid"

type ToastType = "success" | "error"

interface Toast {
    id: string,
    message: string,
    type: ToastType
}

interface ToastContextType {
    toasts: Toast[],
    showToast: (message: string, type: ToastType) => void,
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([])
    const showToast = (message: string, type: ToastType) => {
        const id = uuidv4()
        const toast = { id, message, type }
        setToasts(prev => [...prev, toast])
        setTimeout(() => removeToast(id), 5000)
    }

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }} >
            {children}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`flex items-start justify-between p-6 px-7 rounded-md shadow-md text-white min-w-[350px] ${toast.type === "success" ? "bg-green-600" : "bg-[#7F1D1D]"
                            } relative`}
                    >   
                        <div className="flex flex-col gap-2">
                            <p className="text-white/80">{toast.message}</p>
                        </div>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="ml-5 text-white text-lg hover:opacity-70 cursor-pointer"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )

}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
