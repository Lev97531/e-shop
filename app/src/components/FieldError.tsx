import { AnyFieldApi } from '@tanstack/react-form'

export function FieldError({ field }: { field: AnyFieldApi }) {
  if (field.state.meta.isValid) {
    return null
  }

  return <em className="text-error">{field.state.meta.errors.map((error) => error?.message).join(', ')}</em>
}
