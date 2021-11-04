import { forwardRef } from "react"
import tw, { css } from "twin.macro"
/*
{tree &&
  tree.map(branch => {
    const { _key, text, nodes } = branch || {}
    return <RecursiveList key={_key} id={_key} name={text} items={nodes} />
  })}
*/
type Branch = Array<{
  _key: string
  text: string
  nodes: Array<Branch>
}>

const RecursiveList = forwardRef<HTMLElement, { tree: Branch }>(
  ({ tree }, ref): JSX.Element => (
    <nav
      ref={ref}
      tw="p-4 lg:(sticky left-0 top-0)"
      css={css`
        .active > a:first-of-type {
          color: var(--color-primary);
          transition: all 50ms ease-in-out;
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
            const { _key, text, nodes } = branch || {}
            return <ListLevel key={_key} id={_key} name={text} nodes={nodes} />
          })
        : null}
    </nav>
  ),
)

const ListLevel = ({ name, nodes, id }): JSX.Element => {
  const hasChildren = nodes && nodes.length

  return (
    <ul>
      <li>
        <a href={`#${id}`}>{name}</a>
        {hasChildren &&
          nodes.map(branch => {
            const { _key, text, nodes } = branch || {}
            return <ListLevel key={_key} id={_key} name={text} nodes={nodes}></ListLevel>
          })}
      </li>
    </ul>
  )
}

export default RecursiveList
