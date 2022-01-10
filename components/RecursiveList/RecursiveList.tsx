import { forwardRef } from "react"
import tw, { css } from "twin.macro"

import type { Node } from "./index"

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    tw="inline w-4 h-4 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 5l7 7m0 0l-7 7m7-7H3"
    />
  </svg>
)

const RecursiveList = forwardRef<HTMLElement, { tree: Node[] }>(
  ({ tree }, ref): JSX.Element => (
    <nav
      ref={ref}
      tw="p-4 lg:(sticky left-0 top-0)"
      css={css`
        ${tw`transition-all duration-75 text-primary`}
        li svg {
          ${tw`opacity-0`}
        }
        li li svg {
          ${tw`mr-6 ml--3`}
        }
        li.active > svg {
          ${tw`opacity-100`}
        }
        .active /*> a:first-of-type*/ {
          ${tw`text-accent`}
        }
        ul li {
          ${tw`pl-3`}
        }
        li li {
          ${tw`text-sm leading-6`}
        }
      `}
    >
      {tree
        ? tree.map(branch => {
            const { slug, title, nodes } = branch || {}
            return <Branch key={slug} slug={slug} title={title} nodes={nodes} />
          })
        : null}
    </nav>
  ),
)

const Branch = ({ title, nodes, slug }: Node): JSX.Element => {
  const hasChildren = nodes && nodes.length

  return (
    <ul>
      <li>
        <ArrowRight />
        <a href={`#${slug}`}>{title}</a>
        {hasChildren &&
          nodes.map(branch => {
            const { slug, title, nodes } = branch || {}
            return <Branch key={slug} slug={slug} title={title} nodes={nodes} />
          })}
      </li>
    </ul>
  )
}

export default RecursiveList
