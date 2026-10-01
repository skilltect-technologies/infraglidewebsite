import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  beforeLoad: () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://docs.infraglide.com';
    }
  },
  component: () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://docs.infraglide.com';
    }
    return null;
  },
})
