export function checkIfNestingIsValid(arr = [], propName) {
  if (!Array.isArray(arr) || !arr.length) return false

  const canBeParsedAsInteger = val => Number.isInteger(Number(val))

  let baseLevel = arr[0].propName
  let IsValid = true

  for (let [i, el] of arr.entries()) {
    // check if propName exists and can be cast to integer (beware of boolean edge case!)
    if (!canBeParsedAsInteger(el[propName])) {
      IsValid = false
      break
    }
    // Any elements level can not be higher than the first ones
    if (el[propName] < baseLevel) {
      IsValid = false
      break
    }
    // The nesting must go deeper step by step, only one by one
    if (arr[i + 1] && arr[i + 1][propName] - el[propName] > 1) {
      IsValid = false
      break
    }
  }
  return IsValid
}

export function prepareHeadings(body) {
  const headings = body
    .filter(el => /h[1-6]/.test(el.style))
    .map(el => Object.assign({}, el, { level: Number(el.style.match(/\d+/)) }))
    .map(el =>
      el.children
        ? Object.assign({}, el, {
            text: el.children.reduce((accum, child) => `${accum} ${child.text}`, "").trim(),
          })
        : el,
    )

  const headingsOffset = headings[0] && headings[0].level - 1

  const WithadjustedLevels = headingsOffset
    ? headings.map(heading => Object.assign({}, heading, { level: heading.level - headingsOffset }))
    : []

  return WithadjustedLevels
}

export function buildTree(array) {
  var levels = [{ nodes: undefined }]
  array.forEach(function (a) {
    levels.length = a.level
    levels[a.level - 1].nodes = levels[a.level - 1].nodes || []
    levels[a.level - 1].nodes.push(a)
    levels[a.level] = a
  })
  return levels[0].nodes
}

export default { checkIfNestingIsValid, prepareHeadings, buildTree }