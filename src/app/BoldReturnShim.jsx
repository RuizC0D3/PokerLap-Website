'use client'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

function BoldReturnShimContent() {
  const sp = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const status = sp.get('bold-tx-status')
    const orderId = sp.get('bold-order-id')
    if (!status) return

    // Si estamos fuera de /tienda, redirigimos y preservamos los params
    if (pathname !== '/tienda') {
      const q = new URLSearchParams()
      q.set('bold-tx-status', status)
      if (orderId) q.set('bold-order-id', orderId)
      router.replace(`/tienda?${q.toString()}`)
    }
  }, [sp, pathname, router])

  return null
}

export default function BoldReturnShim() {
  return (
    <Suspense fallback={null}>
      <BoldReturnShimContent />
    </Suspense>
  )
}
