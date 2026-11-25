import config from '@payload-config'
import { getPayload } from 'payload'
import WakeApp, { type SharedProblemNotification } from './WakeApp'

const categoryLabels: Record<string, string> = {
  focus: '집중력',
  mixed: '혼합 계산',
  quick: '빠른 계산',
}

const difficultyLabels: Record<string, string> = {
  easy: '쉬움',
  hard: '어려움',
  normal: '보통',
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'shared-problems',
    limit: 4,
    overrideAccess: false,
    sort: '-sharedAt',
  })

  const sharedProblems: SharedProblemNotification[] = result.docs.map((item) => ({
    authorName: item.authorName,
    category: categoryLabels[item.category] ?? item.category,
    difficulty: difficultyLabels[item.difficulty] ?? item.difficulty,
    id: String(item.id),
    problem: item.problem,
    sharedAt: new Intl.DateTimeFormat('ko-KR', {
      day: 'numeric',
      month: 'long',
    }).format(new Date(item.sharedAt)),
  }))

  return <WakeApp sharedProblems={sharedProblems} />
}
