import { toast } from 'vue-sonner'

export async function post(url: string, data: any = {}) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify(data),
    })
    let errText = response.statusText || 'Request failed'
    if (response.ok) {
        const result = await response.json()
        const { errNo, errMsg, data = {} } = result
        if (errNo === 0) {
            return data
        }
        errText = errMsg
    }
    toast.error(errText)
    throw new Error(errText)
}

export async function get(url: string, params?: Record<string, any>) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : ''
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}${query}`, {
        method: 'GET'
    })
    let errText = response.statusText || 'Request failed'
    if (response.ok) {
        const result = await response.json()
        const { errNo, errMsg, data = {} } = result
        if (errNo === 0) {
            return data
        }
        errText = errMsg
    }
    toast.error(errText)
    throw new Error(errText)
}