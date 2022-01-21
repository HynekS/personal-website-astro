import slugify from "slugify"

export type Node = {
  nodes?: undefined | Node[]
  title?: string
  slug?: string
  level?: number
}

export function checkIfNestingIsValid(arr: Node[]) {
  if (!Array.isArray(arr) || !arr.length || !arr[0].level) return false

  const canBeParsedAsInteger = (val: unknown) => Number.isInteger(Number(val))

  const baseLevel = arr[0].level
  let IsValid = true

  for (const [i, el] of arr.entries()) {
    // check if propName exists and can be cast to integer (beware of boolean edge case!)
    if (!canBeParsedAsInteger(el.level)) {
      IsValid = false
      break
    }
    // Any elements level can not be higher than the first ones
    if (el.level && el.level < baseLevel) {
      IsValid = false
      break
    }
    // The nesting must go deeper step by step, only one by one
    if (arr[i + 1]?.level && Number(arr[i + 1]?.level) - Number(el?.level) > 1) {
      IsValid = false
      break
    }
  }
  return IsValid
}

export function createTableOfContents(content: string) {
  const regexp = new RegExp(/(#{2,6} )(.+?)(?=\r\n)/, "gm")
  const headings = [...content.matchAll(regexp)]

  const tableOfContents = headings.length
    ? headings.map(heading => {
        const headingText = heading[2].trim()
        const headingType = heading[1].trim().length
        const headingLink = slugify(headingText, { lower: true })

        return {
          title: headingText,
          slug: headingLink,
          level: headingType,
        }
      })
    : []

  const headingsOffset = tableOfContents[0] && tableOfContents[0].level - 1

  const WithadjustedLevels = headingsOffset
    ? tableOfContents.map(heading => ({
        ...heading,
        level: heading.level - headingsOffset,
      }))
    : []

  function buildTree(array: typeof WithadjustedLevels) {
    const levels: Node[] = [{ nodes: undefined }]
    array.forEach(function (a) {
      levels.length = a.level
      levels[a.level - 1].nodes = levels[a.level - 1].nodes || []
      levels[a.level - 1].nodes?.push(a)
      levels[a.level] = a
    })

    return levels[0].nodes
  }

  return checkIfNestingIsValid(WithadjustedLevels) ? buildTree(WithadjustedLevels) : []
}

export default { checkIfNestingIsValid, createTableOfContents }
