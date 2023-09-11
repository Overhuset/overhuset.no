import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),

    defineField({
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [
        {
          type: 'company',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
