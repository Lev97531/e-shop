import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { FieldError } from '~/components/FieldError'
import { toast } from 'sonner'
import { Product } from '~/shared/types'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { ProductUncheckedUpdateInput, ProductUpdateArgs, ProductUpdateInput } from 'prisma/generated/models'

export const productFormSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  priceCents: z.number().int().nonnegative('Price must be >= 0'),
  attributes: z
    .object({
      isAvailable: z.boolean(),
      isOnSale: z.boolean(),
      isNew: z.boolean(),
    })
    .optional(),
})

export const updateProduct = createServerFn()
  .inputValidator(
    productFormSchema,
    // .transform((product): ProductUpdateArgs => ({ ...product, attributes: undefined }))
  )
  .handler(async ({ data: product }) => {
    const existing = await prisma.product.findUnique({ where: { id: product.id }, include: { attributes: true } })
    if (!existing) {
      throw new Error('Product not found')
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        ...product,
        attributes: { upsert: { update: { ...product.attributes }, create: { ...product.attributes } } },
      },
    })
  })

export function ProductForm({ product, onSuccess }: { product: Product; onSuccess?: () => void }) {
  const parsed = productFormSchema.parse(product)

  const form = useForm({
    defaultValues: parsed,
    validators: {
      onChange: productFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await updateProduct({ data: value })
        toast.success('Product updated')
        onSuccess?.()
      } catch (error) {
        toast.error((error as Error).message)
      }
    },
  })

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Edit product</h3>
      <fieldset className="fieldset">
        <form.Field
          name="name"
          children={(field) => (
            <>
              <label className="label">Name</label>
              <input
                type="text"
                className="input w-full"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError field={field} />
            </>
          )}
        />
        <form.Field
          name="priceCents"
          children={(field) => (
            <>
              <label className="label">Price (cents)</label>
              <input
                type="number"
                min={0}
                className="input w-full"
                value={String(field.state.value ?? '')}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
              <FieldError field={field} />
            </>
          )}
        />
        <div className="mt-2 grid grid-cols-3 gap-2">
          <form.Field
            name="attributes.isAvailable"
            children={(field) => (
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={field.state.value ?? false}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                <span>Available</span>
              </label>
            )}
          />
          <form.Field
            name="attributes.isOnSale"
            children={(field) => (
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={field.state.value ?? false}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                <span>On Sale</span>
              </label>
            )}
          />
          <form.Field
            name="attributes.isNew"
            children={(field) => (
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={field.state.value ?? false}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
                <span>New</span>
              </label>
            )}
          />
        </div>
        <button
          className="btn btn-neutral mt-4"
          onClick={() => {
            form.handleSubmit()
          }}
        >
          Save
        </button>
      </fieldset>
    </div>
  )
}
