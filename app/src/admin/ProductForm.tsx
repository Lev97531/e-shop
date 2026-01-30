import { useForm } from '@tanstack/react-form'
import { createServerFn } from '@tanstack/react-start'
import { prisma } from 'prisma'
import { toast } from 'sonner'
import { z } from 'zod'
import { FieldError } from '~/components/FieldError'
import NA from '~/shared/NA.jpg'
import { Product } from '~/shared/types'

export const productFormSchema = z.object({
  id: z.number(),
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  priceCents: z.number().int().nonnegative('Price must be >= 0'),
  description: z.string(),
  imageUrl: z
    .union([
      z.string().refine(
        (v) =>
          v === '' ||
          v.startsWith('data:image/') ||
          (() => {
            try {
              return Boolean(new URL(v))
            } catch {
              return false
            }
          })(),
        'Invalid URL',
      ),
      z.null(),
    ])
    .optional(),
  attributes: z
    .object({
      isAvailable: z.boolean(),
      isOnSale: z.boolean(),
      isNew: z.boolean(),
      category: z.string().optional().nullable(),
      size: z.string().optional().nullable(),
      color: z.string().optional().nullable(),
    })
    .optional(),
})

export const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator(productFormSchema)
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

export const createProduct = createServerFn({ method: 'POST' })
  .inputValidator(productFormSchema)
  .handler(async ({ data: product }) => {
    await prisma.product.create({
      data: {
        ...product,
        id: undefined,
        attributes: { create: { ...product.attributes } },
      },
    })
  })

export function ProductForm({ product, onSuccess }: { product: Product; onSuccess?: () => void }) {
  // const parsed = productFormSchema.parse(product)
  const parsed = product as unknown as z.infer<typeof productFormSchema>

  const form = useForm({
    defaultValues: parsed,
    validators: {
      onChange: productFormSchema,
      onSubmit: productFormSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        if (value.id === 0) {
          await createProduct({ data: value })
          toast.success('Product created')
        } else {
          await updateProduct({ data: value })
          toast.success('Product updated')
        }
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
          name="slug"
          children={(field) => (
            <>
              <label className="label">Slug</label>
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
          name="description"
          children={(field) => (
            <>
              <label className="label">Description</label>
              <textarea
                className="textarea textarea-bordered w-full"
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldError field={field} />
            </>
          )}
        />
        <form.Field
          name="imageUrl"
          children={(field) => (
            <>
              <label className="label">Image</label>
              <div className="mt-2 flex items-center gap-4">
                <img width={128} src={field.state.value || NA} alt="Preview" className="rounded-md border" />
                <div className="flex flex-col gap-2">
                  <label className="btn btn-soft">
                    Upload image
                    <input
                      type="file"
                      accept="image/png,image/jpeg"
                      className="hidden"
                      onBlur={field.handleBlur}
                      onChange={async (e) => {
                        const file = e.currentTarget.files?.[0]
                        if (!file) {
                          field.handleChange('')
                          return
                        }
                        if (!['image/jpeg', 'image/png'].includes(file.type)) {
                          toast.error('Please select a JPG or PNG image')
                          return
                        }
                        const reader = new FileReader()
                        reader.onload = () => {
                          const result = reader.result as string
                          field.handleChange(result)
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                  </label>

                  <button type="button" className="btn btn-soft" onClick={() => field.handleChange(null)}>
                    Clear image
                  </button>
                </div>
              </div>
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
        <div className="mt-2 grid grid-cols-2 gap-2">
          <form.Field
            name="attributes.category"
            children={(field) => (
              <>
                <label className="label">Category</label>
                <input
                  type="text"
                  className="input w-full"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </>
            )}
          />
          <form.Field
            name="attributes.size"
            children={(field) => (
              <>
                <label className="label">Size</label>
                <input
                  type="text"
                  className="input w-full"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </>
            )}
          />
          <form.Field
            name="attributes.color"
            children={(field) => (
              <>
                <label className="label">Color</label>
                <input
                  type="text"
                  className="input w-full"
                  value={field.state.value ?? ''}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldError field={field} />
              </>
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
