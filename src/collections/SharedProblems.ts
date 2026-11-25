import type { Access, CollectionConfig } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'

export const SharedProblems: CollectionConfig = {
  slug: 'shared-problems',
  access: {
    create: isPayloadAdmin,
    delete: isPayloadAdmin,
    read: () => true,
    update: isPayloadAdmin,
  },
  admin: {
    group: '깨움',
    useAsTitle: 'problem',
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      label: '공유한 사람',
      required: true,
    },
    {
      name: 'problem',
      type: 'text',
      label: '문제',
      required: true,
    },
    {
      name: 'answer',
      type: 'text',
      label: '정답',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: '문제 유형',
      defaultValue: 'mixed',
      options: [
        { label: '빠른 계산', value: 'quick' },
        { label: '혼합 계산', value: 'mixed' },
        { label: '집중력', value: 'focus' },
      ],
      required: true,
    },
    {
      name: 'difficulty',
      type: 'select',
      label: '난이도',
      defaultValue: 'normal',
      options: [
        { label: '쉬움', value: 'easy' },
        { label: '보통', value: 'normal' },
        { label: '어려움', value: 'hard' },
      ],
      required: true,
    },
    {
      name: 'sharedAt',
      type: 'date',
      label: '공유 시각',
      defaultValue: () => new Date().toISOString(),
      required: true,
    },
  ],
}
